import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { Resend } from 'resend'
import { notifySchema } from '@/lib/validations/notify'
import { EVENT } from '@/lib/data/event'
import { apiVersion, dataset, projectId, sanityConfigured } from '../../../../sanity/env'

/**
 * Intresseanmälan: "hör av er när nästa mässa släpps".
 *
 * Adresserna sparas som dokument i Sanity (typ: subscriber) så att listan
 * finns kvar och går att exportera när det är dags att höra av sig. Ett
 * mejl går INTE ut per anmälan – vid en trafiktopp skulle det bli tusentals
 * mejl i Johans inkorg. Saknas skrivtoken faller vi tillbaka på ett mejl per
 * anmälan, så inget tappas bort medan tokenen är okonfigurerad.
 *
 * 👉 Kräver SANITY_WRITE_TOKEN i miljövariablerna (finns redan i .env.local
 *    för seed-skriptet – se till att den även är satt i Vercel).
 */

/** Skrivklient – bara om både projekt och token finns. */
function getWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN
  if (!sanityConfigured || !token) return null
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

// Rate limit per IP. Snävare än kontaktformuläret: en människa anmäler sig
// en gång, så fler än några försök i timmen är i praktiken alltid en bot.
const RATE_LIMIT = 3
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

/** Samma svar oavsett utfall – avslöjar inte om adressen redan finns. */
const OK = { success: true, message: 'Tack! Vi hör av oss när biljetterna släpps.' }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot – samma mönster som kontaktformuläret.
    if (typeof body?.website === 'string' && body.website.length > 0) {
      return NextResponse.json(OK, { status: 200 })
    }

    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: 'För många försök. Försök igen om en stund.' },
        { status: 429 }
      )
    }

    const result = notifySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: 'Ange en giltig e-postadress.' }, { status: 400 })
    }

    const email = result.data.email.trim().toLowerCase()

    const client = getWriteClient()
    if (client) {
      // Deterministiskt _id per adress → samma adress skapar inte dubbletter
      // hur många gånger den än anmäls. createIfNotExists är dessutom
      // idempotent, så en dubbelklickad knapp inte ger två dokument.
      const id = `subscriber.${Buffer.from(email).toString('base64url')}`
      await client.createIfNotExists({
        _id: id,
        _type: 'subscriber',
        email,
        createdAt: new Date().toISOString(),
        source: 'efter-massan-2026',
      })
      return NextResponse.json(OK, { status: 200 })
    }

    // Fallback: ingen skrivtoken → mejla anmälan så den inte tappas bort.
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: sendError } = await resend.emails.send({
        from: process.env.RESEND_FROM ?? 'onboarding@resend.dev',
        to: process.env.RESEND_TO_OVERRIDE ?? EVENT.email,
        subject: 'Ny intresseanmälan – nästa mässa',
        html: `<p>Ny intresseanmälan från sajten:</p><p><strong>${email.replace(/</g, '&lt;')}</strong></p>`,
      })
      if (sendError) {
        console.error('Resend error (notify):', sendError.message ?? sendError)
        return NextResponse.json({ error: 'Kunde inte spara anmälan.' }, { status: 500 })
      }
      return NextResponse.json(OK, { status: 200 })
    }

    // Varken Sanity-token eller Resend konfigurerat – anmälan går ingenstans.
    // Säg det rakt ut i stället för att låtsas att den togs emot.
    console.error('Notify: varken SANITY_WRITE_TOKEN eller RESEND_API_KEY är satt')
    return NextResponse.json({ error: 'Anmälan är tillfälligt ur funktion.' }, { status: 503 })
  } catch (error) {
    console.error('Notify error:', error)
    return NextResponse.json({ error: 'Ett fel uppstod. Försök igen senare.' }, { status: 500 })
  }
}
