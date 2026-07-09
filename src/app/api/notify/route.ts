import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { EVENT } from '@/lib/data/event'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const notifySchema = z.object({
  email: z.string().trim().email().max(150),
})

/**
 * Samma "best effort"-rate-limit som /api/contact – in-memory per instans.
 * (Egen Map: notify och contact ska inte äta av varandras kvot.)
 */
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

/**
 * Intresseanmälan för biljettsläppet. Ingen databas – varje anmälan mejlas
 * till mässans inkorg (samma mottagare som kontaktformuläret), så Johan kan
 * svara alla när Billetto-eventet är live.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot – samma mönster som kontaktformuläret.
    if (typeof body?.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: 'För många förfrågningar. Försök igen om en stund.' },
        { status: 429 }
      )
    }

    const result = notifySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: 'Ogiltig e-postadress.' }, { status: 400 })
    }

    const { email } = result.data
    const recipient = process.env.RESEND_TO_OVERRIDE ?? EVENT.email

    const { error: sendError } = await getResend().emails.send({
      from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
      to: recipient,
      replyTo: email,
      subject: 'Intresseanmälan – biljettsläpp',
      html: [
        `<h2>Intresseanmälan biljettsläpp via erotikmassan.com</h2>`,
        `<p><strong>E-post:</strong> ${email.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`,
        `<p>Besökaren vill få besked när biljetterna släpps på Billetto.</p>`,
      ].join('\n'),
    })

    if (sendError) {
      // Resend returnerar ett fel-objekt (name/message) som inte serialiseras
      // tydligt med bara `sendError` – logga message explicit så grundorsaken syns.
      console.error('Resend error (notify):', sendError.message ?? sendError)
      return NextResponse.json({ error: 'Kunde inte skicka. Försök igen.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Notify error:', error)
    return NextResponse.json({ error: 'Ett fel uppstod. Försök igen senare.' }, { status: 500 })
  }
}
