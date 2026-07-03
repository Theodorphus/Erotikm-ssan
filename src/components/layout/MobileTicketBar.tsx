'use client'

import { useEffect, useState } from 'react'
import { Ticket } from 'lucide-react'

/**
 * Sticky köpknapp i botten på mobil. Dyker upp först när besökaren scrollat
 * förbi heron (där knappen redan finns) så den inte dubblerar – och följer
 * sedan med hela vägen. Största enskilda konverteringsytan på mobil.
 * Döljs på desktop (lg:hidden) där headerns CTA alltid är synlig.
 */
export function MobileTicketBar({ ticketsUrl }: { ticketsUrl: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 bg-gradient-to-t from-ink via-ink/90 to-transparent transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      aria-hidden={!visible}
    >
      <a
        href={ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="btn-gradient cta-shine flex items-center justify-center gap-2 w-full text-white font-semibold px-6 py-3.5 rounded-full shadow-lg shadow-brand-pink/30"
      >
        <Ticket size={18} /> Köp biljetter
      </a>
    </div>
  )
}
