import type { Metadata } from 'next'
import { Ticket, Check } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { NotifyForm } from '@/components/event/NotifyForm'
import { Reveal } from '@/components/ui/Reveal'
import { TICKETS_NOTE, TICKET_GROUPS, type TicketType } from '@/lib/data/tickets'
import { getTickets, getEvent } from '@/lib/content'

// ISR: hämta om från Sanity var 60:e sekund.
export const revalidate = 60

// Obs: inga hårdkodade priser här – de styrs i Sanity och ändras över tid.
export const metadata: Metadata = {
  title: 'Köp biljetter',
  description: 'Biljetter till Erotikmässan – Early Bird, Standard och Premium VIP, per dag eller som 2-dagarspass. Förköp via Billetto och slipp köa, eller köp i dörren.',
  alternates: { canonical: '/biljetter' },
  openGraph: {
    title: 'Köp biljetter | Erotikmässan',
    description: 'Biljetter till Erotikmässan – Early Bird, Standard och Premium VIP, per dag eller som 2-dagarspass. Förköp via Billetto och slipp köa, eller köp i dörren.',
    url: '/biljetter',
  },
}

function TicketCard({ ticket, ticketsUrl, delay }: { ticket: TicketType; ticketsUrl: string; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`relative isolate h-full flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
          ticket.featured
            ? 'premium-glow border-brand-pink bg-surface-pink shadow-xl shadow-brand-pink/10'
            : 'border-white/10 bg-surface hover:border-brand-pink/40'
        }`}
      >
        {ticket.featured && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-pink text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            Populärast
          </span>
        )}
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-display text-2xl font-bold text-cream">{ticket.name}</h3>
          {ticket.badge && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-pink-light bg-brand-pink/10 border border-brand-pink/30 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              {/* Pulserande prick = "begränsat antal" – driver förköp */}
              <span className="pulse-dot" aria-hidden="true" />
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
          href={ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 w-full font-semibold px-6 py-3.5 rounded-full ${
            ticket.featured
              ? 'btn-gradient cta-shine text-white'
              : 'bg-white/5 border border-white/15 text-cream hover:bg-white/10 transition-colors'
          }`}
        >
          <Ticket size={18} /> Köp via Billetto
        </a>
      </div>
    </Reveal>
  )
}

export default async function BiljetterPage() {
  const [tickets, event] = await Promise.all([getTickets(), getEvent()])

  // Gruppera per dag. Visa bara grupper som faktiskt har biljetter,
  // i den ordning TICKET_GROUPS anger. Eventuella okända grupper hamnar sist.
  const knownGroups = TICKET_GROUPS.filter((g) => tickets.some((t) => t.group === g))
  const extraGroups = [...new Set(tickets.map((t) => t.group))].filter(
    (g) => !TICKET_GROUPS.includes(g),
  )
  const groups = [...knownGroups, ...extraGroups]

  return (
    <>
      <PageHero
        title="Köp biljetter"
        subtitle={`${event.dateText} · ${event.venue}, ${event.city}. Välj din biljett – köpet sker tryggt via Billetto.`}
      />

      <section className="bg-ink py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {groups.map((group) => {
            const groupTickets = tickets.filter((t) => t.group === group)
            return (
              <div key={group}>
                <Reveal>
                  <h2 className="font-display text-xl font-bold uppercase tracking-wider text-brand-pink-light mb-6">
                    {group}
                  </h2>
                </Reveal>
                <div className="grid md:grid-cols-3 gap-6">
                  {groupTickets.map((ticket, i) => (
                    <TicketCard
                      key={ticket.name}
                      ticket={ticket}
                      ticketsUrl={event.links.tickets}
                      delay={i * 100}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-cream/60 text-sm mt-12 max-w-xl mx-auto">
          {TICKETS_NOTE}
        </p>

        {/* E-postinsamling: fångar besökare tills Billetto-eventet är live. */}
        <Reveal delay={150}>
          <div className="mt-14 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-surface-2 p-8 sm:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-cream mb-2">
              Vill du ha besked när biljetterna släpps?
            </h2>
            <p className="text-cream/60 mb-6">
              Lämna din e-post så hör vi av oss så fort förköpet öppnar på Billetto.
            </p>
            <NotifyForm />
          </div>
        </Reveal>
      </section>
    </>
  )
}
