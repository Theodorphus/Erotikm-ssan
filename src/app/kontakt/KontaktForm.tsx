'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { EVENT } from '@/lib/data/event'

/**
 * Frågeformulär för mässan. Skickar via /api/contact (Resend) till EVENT.email.
 * Ärende-fältet täcker Johans två fall: ställa ut / jobba hos oss.
 */
export function KontaktForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch('/api/contact', {
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
      <div className="flex flex-col items-center text-center py-10">
        <div className="h-14 w-14 rounded-full bg-brand-pink/15 flex items-center justify-center mb-4">
          <CheckCircle className="text-brand-pink" size={30} />
        </div>
        <h3 className="text-xl font-bold text-cream mb-2">Tack för din förfrågan!</h3>
        <p className="text-cream/60 max-w-sm">
          Ditt meddelande har skickats. Vi återkommer till dig så snart vi kan.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot – osynligt för människor, fylls bara i av spambottar */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Namn" name="namn" placeholder="För- och efternamn" required maxLength={100} />
        <Field label="Företag" name="foretag" placeholder="Företag (om aktuellt)" maxLength={150} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="E-post" name="email" type="email" placeholder="namn@exempel.se" required maxLength={150} />
        <Field label="Telefon" name="telefon" type="tel" placeholder="070-123 45 67" maxLength={40} />
      </div>

      <div>
        <label htmlFor="amne" className="block text-sm font-semibold text-cream mb-1.5">
          Vad gäller det?
        </label>
        <select
          id="amne"
          name="amne"
          className="w-full px-4 py-3 rounded-lg border border-white/15 bg-ink text-cream outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 transition-colors"
        >
          <option>Jag vill ställa ut på mässan</option>
          <option>Jag vill jobba på mässan</option>
          <option>Annat</option>
        </select>
      </div>

      <div>
        <label htmlFor="meddelande" className="block text-sm font-semibold text-cream mb-1.5">
          Meddelande
        </label>
        <textarea
          id="meddelande"
          name="meddelande"
          rows={5}
          maxLength={3000}
          placeholder="Berätta kort om dig och vad din förfrågan gäller…"
          className="w-full px-4 py-3 rounded-lg border border-white/15 bg-ink text-cream outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">
          Något gick fel. Försök igen, eller mejla oss direkt på {EVENT.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-pink text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-brand-pink-dark transition-colors shadow-md shadow-brand-pink/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {status === 'sending' ? 'Skickar…' : 'Skicka förfrågan'}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  maxLength,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-cream mb-1.5">
        {label} {required && <span className="text-brand-pink">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-white/15 bg-ink text-cream outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 transition-colors"
      />
    </div>
  )
}
