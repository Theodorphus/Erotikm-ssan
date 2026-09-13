'use client'

import { useState } from 'react'
import { Bell, CheckCircle, Loader2 } from 'lucide-react'

/**
 * Intresseanmälan inför nästa mässa. Skickar e-postadressen till
 * /api/notify, som sparar den i Sanity (typ: subscriber).
 *
 * Medvetet bara ett fält: varje extra fält kostar konverteringar, och det
 * enda som behövs är en adress att höra av sig till vid biljettsläppet.
 */
export function NotifyForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('sent')
        return
      }
      // Visa serverns egen text när den finns (t.ex. ogiltig adress,
      // för många försök) – annars ett generellt fel.
      const body = await res.json().catch(() => null)
      setError(body?.error ?? 'Något gick fel. Försök igen.')
      setStatus('error')
    } catch {
      setError('Något gick fel. Försök igen.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="flex items-center justify-center gap-3 text-center py-4"
        role="status"
      >
        <CheckCircle className="text-brand-pink flex-shrink-0" size={22} />
        <p className="text-cream/85">
          Tack! Vi hör av oss så fort datum och biljetter är klara.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      {/* Honeypot – osynligt för människor, fylls bara i av spambottar */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="notify-email" className="sr-only">
          Din e-postadress
        </label>
        <input
          id="notify-email"
          type="email"
          name="email"
          required
          maxLength={150}
          autoComplete="email"
          placeholder="namn@exempel.se"
          aria-describedby={status === 'error' ? 'notify-error' : undefined}
          className="flex-1 px-4 py-3 rounded-full border border-white/15 bg-ink/60 text-cream placeholder:text-cream/40 outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-gradient cta-shine inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-brand-pink/25 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Skickar…
            </>
          ) : (
            <>
              <Bell size={18} /> Håll mig uppdaterad
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <p id="notify-error" role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </form>
  )
}
