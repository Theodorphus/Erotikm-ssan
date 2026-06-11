import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'
import { EVENT } from '@/lib/data/event'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
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
      console.error('Resend error:', sendError)
      return NextResponse.json({ error: 'E-post kunde inte skickas.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Din förfrågan har mottagits' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Ett fel uppstod. Försök igen senare.' }, { status: 500 })
  }
}
