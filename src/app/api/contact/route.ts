import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'
import { EVENT } from '@/lib/data/event'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

/**
 * Enkel rate limit per IP (glidande fönster). In-memory → gäller per
 * server-instans, så det är ett "best effort"-skydd mot spam/abuse utan
 * extra beroende. Räcker gott för ett kontaktformulär med låg trafik.
 */
const RATE_LIMIT = 5 // max antal skickade förfrågningar
const RATE_WINDOW_MS = 60 * 60 * 1000 // per timme
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
  // Städa bort gamla IP:n så Map:en inte växer obegränsat.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

/** Läs klientens IP från standard-proxyheaders (Vercel/Cloudflare). */
function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

/** Fälten kommer från ett publikt formulär – escapa innan de läggs i HTML-mejlet. */
function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot: fältet "website" är osynligt för människor – ifyllt = bot.
    // Svara "ok" så att boten inte försöker igen.
    if (typeof body?.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ success: true, message: 'Din förfrågan har mottagits' }, { status: 200 })
    }

    // Rate limit per IP – stoppar spam/abuse av e-postutskicket.
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: 'För många förfrågningar. Försök igen om en stund.' },
        { status: 429 }
      )
    }

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Ogiltiga fältdata', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { namn, email, telefon, foretag, amne, meddelande } = result.data

    const recipient = process.env.RESEND_TO_OVERRIDE ?? EVENT.email

    const { error: sendError } = await getResend().emails.send({
      from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
      to: recipient,
      replyTo: email,
      subject: amne ? `${amne} – ${namn}` : `Nytt meddelande från ${namn}`,
      html: [
        `<h2>Nytt meddelande via erotikmassan.com</h2>`,
        `<p><strong>Namn:</strong> ${esc(namn)}</p>`,
        foretag ? `<p><strong>Företag:</strong> ${esc(foretag)}</p>` : '',
        `<p><strong>E-post:</strong> ${esc(email)}</p>`,
        telefon ? `<p><strong>Telefon:</strong> ${esc(telefon)}</p>` : '',
        amne ? `<p><strong>Ämne:</strong> ${esc(amne)}</p>` : '',
        meddelande ? `<p><strong>Meddelande:</strong> ${esc(meddelande)}</p>` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })

    if (sendError) {
      // Resend returnerar ett fel-objekt (name/message) som inte serialiseras
      // tydligt med bara `sendError` – logga message explicit så grundorsaken syns.
      console.error('Resend error (contact):', sendError.message ?? sendError)
      return NextResponse.json({ error: 'E-post kunde inte skickas.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Din förfrågan har mottagits' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Ett fel uppstod. Försök igen senare.' }, { status: 500 })
  }
}
