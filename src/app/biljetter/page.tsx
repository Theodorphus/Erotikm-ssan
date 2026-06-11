import type { Metadata } from 'next'
import { Ticket, Check } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { EVENT } from '@/lib/data/event'
import { TICKET_TYPES, TICKETS_NOTE } from '@/lib/data/tickets'

export const metadata: Metadata = {
  title: 'Köp biljetter',
  description: 'Biljetter till Erotikmässan – Early Bird 350 kr, Standard 450 kr och Premium VIP 850 kr. Förköp via Billetto och slipp köa, eller köp i dörren.',
  alternates: { canonical: '/biljetter' },
  openGraph: {
    title: 'Köp biljetter | Erotikmässan',
    description: 'Biljetter till Erotikmässan – Early Bird 350 kr, Standard 450 kr och Premium VIP 850 kr. Förköp via Billetto och slipp köa, eller köp i dörren.',
    url: '/biljetter',
  },
}

export default function BiljetterPage() {
  return (
    <>
      <PageHero
        title="Köp biljetter"
        subtitle={`${EVENT.dateText} · ${EVENT.venue}, ${EVENT.city}. Välj din biljett – köpet sker tryggt via Billetto.`}
      />

      <section className="bg-ink py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {TICKET_TYPES.map((ticket, i) => (
            <Reveal key={ticket.name} delay={i * 100} className="h-full">
              <div
                className={`relative h-full flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  ticket.featured
                    ? 'border-brand-pink bg-surface-pink shadow-xl shadow-brand-pink/10'
                    : 'border-white/10 bg-surface hover:border-brand-pink/40'
                }`}
              >
                {ticket.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-pink text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    Populärast
                  </span>
                )}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h2 className="font-display text-2xl font-bold text-cream">{ticket.name}</h2>
                  {ticket.badge && (
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-pink-light bg-brand-pink/10 border border-brand-pink/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {ticket.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-cream/60 mb-5">{ticket.description}</p>
                <div className="mb-6">
                  {ticket.price !== null ? (
                    <>
                      <span className="font-display text-4xl font-extrabold text-brand-pink">
                        {ticket.price}
                      </span>
                      <span className="text-cream/60 ml-1">kr</span>
                    </>
                  ) : (
                    <span className="font-display text-2xl font-bold text-brand-pink">Se Billetto</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {ticket.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm text-cream/75">
                      <Check size={18} className="text-brand-pink flex-shrink-0 mt-0.5" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={EVENT.links.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full font-semibold px-6 py-3.5 rounded-lg transition-colors ${
                    ticket.featured
                      ? 'bg-brand-pink text-white hover:bg-brand-pink-dark'
                      : 'bg-white/5 border border-white/15 text-cream hover:bg-white/10'
                  }`}
                >
                  <Ticket size={18} /> Köp via Billetto
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-cream/60 text-sm mt-10 max-w-xl mx-auto">
          {TICKETS_NOTE}
        </p>
      </section>
    </>
  )
}
