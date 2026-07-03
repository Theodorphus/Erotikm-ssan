'use client'

import { useState } from 'react'
import { Bell, CheckCircle, Loader2 } from 'lucide-react'

/**
 * "Få besked när biljetterna släpps" – fångar besökare innan Billetto-eventet
 * är live. Skickar via /api/notify (Resend) till mässans inkorg.
 */
export function NotifyForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex items-center justify-center gap-2.5 text-cream/80">
        <CheckCircle size={20} className="text-brand-pink flex-shrink-0" />
        <p>Tack! Vi hör av oss så fort biljetterna släpps.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {/* Honeypot – osynligt för människor, fylls bara i av spambottar */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="notify-email" className="sr-only">
          E-postadress
        </label>
        <input
          id="notify-email"
          type="email"
          name="email"
          required
          maxLength={150}
          placeholder="din@mejl.se"
          autoComplete="email"
          className="flex-1 px-5 py-3 rounded-full border border-white/15 bg-white/5 text-cream placeholder:text-cream/40 outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full disabled:opacity-60"
        >
          {status === 'sending' ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Bell size={17} />
          )}
          Meddela mig
        </button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-400 mt-2.5 text-center">
          Något gick fel – försök igen om en stund.
        </p>
      )}
    </form>
  )
}
