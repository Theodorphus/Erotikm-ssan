import type { Metadata } from 'next'
import { Mail, MapPin, CalendarDays, Store, Briefcase } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { KontaktForm } from './KontaktForm'
import { EVENT } from '@/lib/data/event'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Vill du ställa ut eller jobba på Erotikmässan? Skicka en förfrågan så återkommer vi.',
  alternates: { canonical: '/kontakt' },
}

export default function KontaktPage() {
  return (
    <>
      <PageHero
        title="Kontakta oss"
        subtitle="Vill du ställa ut hos oss eller jobba på mässan? Fyll i formuläret så hör vi av oss."
      />

      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-ink">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Kontaktinfo */}
          <div className="lg:col-span-1 space-y-5">
            <h2 className="text-2xl font-bold text-cream mb-2">Kontaktuppgifter</h2>

            <InfoCard icon={<Mail size={20} />} title="E-post">
              <a href={`mailto:${EVENT.email}`} className="text-brand-pink hover:text-brand-pink-light break-all">
                {EVENT.email}
              </a>
              <p className="text-cream/50 text-xs mt-1">All kontakt sker via e-post.</p>
            </InfoCard>

            <InfoCard icon={<CalendarDays size={20} />} title="När">
              <p className="text-cream/70">{EVENT.dateText}</p>
            </InfoCard>

            <InfoCard icon={<MapPin size={20} />} title="Var">
              <p className="text-cream/70">{EVENT.venue}, {EVENT.venueStreet}, {EVENT.city}</p>
            </InfoCard>

            <InfoCard icon={<Store size={20} />} title="Vill du ställa ut?">
              <p className="text-cream/70 text-sm">Välj ”Jag vill ställa ut på mässan” i formuläret.</p>
            </InfoCard>

            <InfoCard icon={<Briefcase size={20} />} title="Vill du jobba hos oss?">
              <p className="text-cream/70 text-sm">Välj ”Jag vill jobba på mässan” i formuläret.</p>
            </InfoCard>
          </div>

          {/* Formulär */}
          <div className="lg:col-span-2 bg-surface rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cream mb-1">Skicka en förfrågan</h2>
              <p className="text-cream/60 text-sm">Fyll i formuläret så återkommer vi inom kort.</p>
            </div>
            <KontaktForm />
          </div>
        </div>
      </div>
    </>
  )
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="p-5 bg-surface rounded-xl border border-white/10">
      <div className="flex items-center gap-2.5 mb-2 text-brand-pink">
        {icon}
        <h3 className="font-semibold text-cream">{title}</h3>
      </div>
      <div className="ml-[30px]">{children}</div>
    </div>
  )
}
