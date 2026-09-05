import type { Metadata } from 'next'
import Image from 'next/image'
import { CalendarCheck, ShieldCheck } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/SocialIcons'
import { Reveal } from '@/components/ui/Reveal'
import { EVENT } from '@/lib/data/event'

export const metadata: Metadata = {
  title: 'Boka artist',
  description:
    'Boka stripshow till svensexa och privata tillställningar via vår strippförmedling på WhatsApp.',
  alternates: { canonical: '/boka-artist' },
  openGraph: {
    title: 'Boka artist hos oss | Erotikmässan',
    description:
      'Boka stripshow till svensexa och privata tillställningar via vår strippförmedling på WhatsApp.',
    url: '/boka-artist',
  },
}

const BOOKING_STEPS = [
  {
    title: 'Kontakta oss via WhatsApp',
    text: 'Skicka din förfrågan till vårt bokningsnummer.',
  },
  {
    title: 'Välj artist',
    text: 'Via WhatsApp får du information om vilka artister som är tillgängliga den aktuella dagen. Det går även att göra en förfrågan om en specifik artist för ett framtida datum.',
  },
  {
    title: 'Vi bekräftar tillgänglighet och tid',
    text: 'När artisten är tillgänglig kommer vi överens om en tid för showen och informerar om arvodet.',
  },
  {
    title: 'Bekräfta bokningen',
    text: 'Du behöver bekräfta att du är 18 år eller äldre och lämna fullständigt namn, adress där showen ska äga rum, önskat datum och tid, samt övriga uppgifter som behövs för bokningen.',
  },
  {
    title: 'Betala bokningsavgiften',
    text: 'En bokningsavgift betalas via Swish. När betalningen är mottagen och bekräftad är bokningen bindande och skarpt bokad enligt våra bokningsvillkor.',
  },
]

const POLICY_POINTS = [
  'Showen är en underhållningsföreställning. Artisten bestämmer själv vilka delar av showen som ingår.',
  'Ingen sexuell tjänst kan köpas eller bokas genom oss.',
  'Kunden får inte erbjuda, efterfråga eller försöka köpa sexuella tjänster av artisten.',
  'Eventuella privata önskemål måste alltid hålla sig inom artistens och arrangörens regler.',
  'Artisten har alltid rätt att avbryta showen om kunden eller någon annan deltagare inte följer reglerna.',
  'Vid överträdelse av reglerna kan showen avbrytas utan återbetalning.',
  'Bokningsavgift och arvode avser show/underhållning – inte sexuella tjänster.',
]

export default function BokaArtistPage() {
  return (
    <>
      {/* Strippförmedling – separat bokningstjänst för privata tillställningar (svensexor m.m.) */}
      <section className="relative overflow-hidden bg-surface py-16 sm:py-20 px-4 sm:px-6 lg:px-8 sm:min-h-[720px] flex flex-col justify-center">
        {/* Bakgrundsfoto: eget fält i högra delen av sektionen (annars fyller
            object-cover hela bredden och hennes ansikte hamnar utanför bild).
            Tonas in mot mitten och fade:ar mot mörkret upptill/nedtill. */}
        <div className="absolute inset-y-0 right-0 w-[55%] hidden sm:block" aria-hidden="true">
          <Image
            src="/images/strippformedling-artist.webp"
            alt=""
            fill
            sizes="55vw"
            className="object-cover object-[center_5%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-12">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-cream mb-3">
              Boka artist hos oss
            </h1>
            <p className="text-cream/70 max-w-xl mx-auto mb-2">
              Vi förmedlar stripshow till privata tillställningar, svensexor och olika typer av
              event. Du väljer artist och tid – vi hjälper dig att boka en artist som är
              tillgänglig för ditt evenemang.
            </p>
            <p className="text-cream/70 max-w-xl mx-auto">
              För bokningsförfrågningar, maila till{' '}
              <a
                href={`mailto:${EVENT.email}`}
                className="text-brand-pink hover:text-brand-pink-light"
              >
                {EVENT.email}
              </a>
              . Eller för en akut bokning, ring vårt journummer nedan.
            </p>
          </Reveal>

          {/* Mobilbild: egen ruta ovanför kontaktkortet (bakgrundsvarianten är dold på mobil) */}
          <Reveal className="sm:hidden mb-8">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/strippformedling-artist.webp"
                alt="Stripartist tillgänglig för bokning genom Erotikmässans strippförmedling"
                fill
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          {/* WhatsApp-kontakt */}
          <Reveal>
            <div className="card-sheen rounded-2xl border border-white/10 bg-ink/70 backdrop-blur-sm p-8 sm:p-10 max-w-sm mx-auto mb-8 text-center flex flex-col items-center">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-pink/30 to-brand-pink/5 border border-brand-pink/30 text-brand-pink flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(225,29,116,0.25)]">
                <WhatsAppIcon size={28} />
              </div>
              <a
                href={EVENT.stripAgency.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-pink text-white font-semibold text-lg px-8 py-4 rounded-lg hover:bg-brand-pink-dark transition-colors shadow-lg shadow-brand-pink/25 w-fit"
              >
                <WhatsAppIcon size={22} /> {EVENT.stripAgency.whatsappNumber}
              </a>

              <div className="mt-8 flex items-start gap-3 text-left rounded-xl border border-white/10 bg-surface/60 px-5 py-4">
                <CalendarCheck size={20} className="text-brand-pink shrink-0 mt-0.5" />
                <div className="text-sm text-cream/75">
                  <p className="font-semibold text-cream mb-1">
                    Vi tar för närvarande emot bokningar:
                  </p>
                  <p>{EVENT.stripAgency.bookingHoursWeekday}</p>
                  <p>{EVENT.stripAgency.bookingHoursWeekend}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Så här bokar du */}
          <Reveal delay={80}>
            <div className="rounded-2xl border border-white/10 bg-ink/60 backdrop-blur-sm p-8 sm:p-10 mb-8 max-w-3xl mx-auto">
              <h3 className="font-display text-xl font-bold text-cream mb-6">Så här bokar du</h3>
              <ol className="space-y-6">
                {BOOKING_STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="shrink-0 h-8 w-8 rounded-full border border-brand-pink/40 text-brand-pink font-display font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-cream mb-1">{step.title}</p>
                      <p className="text-sm text-cream/65 leading-relaxed">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Policy – inga sexuella tjänster */}
          <Reveal delay={140}>
            <div className="rounded-2xl border border-brand-pink/25 bg-ink/60 backdrop-blur-sm p-8 sm:p-10 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={22} className="text-brand-pink shrink-0" />
                <h3 className="font-display text-xl font-bold text-cream">
                  Vår policy – inga sexuella tjänster
                </h3>
              </div>
              <p className="text-sm text-cream/70 mb-5">
                Strippförmedlingen förmedlar underhållning och stripshower. Tjänsten innebär inte
                försäljning eller förmedling av sexuella tjänster.
              </p>
              <ul className="space-y-2.5 mb-6">
                {POLICY_POINTS.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-cream/70">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-pink shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-cream/60 leading-relaxed">
                <span className="text-cream font-semibold">Nolltolerans.</span> Vi har nolltolerans
                mot köp, försäljning eller förmedling av sexuella tjänster inom ramen för våra
                bokningar. Vi accepterar inte heller att våra artister används som mellanhand för
                att komma i kontakt med personer för sexuella tjänster. Genom att boka en artist
                godkänner kunden att dessa regler gäller och förbinder sig att respektera artistens
                gränser samt våra bokningsvillkor.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
