import Link from 'next/link'
import Image from 'next/image'
import { Ticket, Mic2, Store, MapPin, CalendarDays, Clock, ArrowRight, Sparkles, Flame, Star, Brush, Music2, Eye, Heart, Disc3, ShoppingBag } from 'lucide-react'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/ui/SocialIcons'
import { Countdown } from '@/components/event/Countdown'
import { Faq } from '@/components/event/Faq'
import { AgeBadge } from '@/components/event/AgeBadge'
import { Reveal } from '@/components/ui/Reveal'
import { getEvent, getFaq } from '@/lib/content'

// Hämta om innehållet från Sanity var 60:e sekund (ISR), så Johans ändringar
// i Studion slår igenom live utan ny deploy.
export const revalidate = 60

export default async function HomePage() {
  const [EVENT, faqItems] = await Promise.all([getEvent(), getFaq()])
  return (
    <>
      {/* ── HERO med nedräknare + biljettknapp ─────────────────────── */}
      <section className="mesh-forest grain relative overflow-hidden text-cream">
        {/* Hero-bild: fade-in + slow zoom vid laddning, mjuk parallax vid scroll.
            Motivet (dansösen) ligger i bildens högra fjärdedel. Vi fokuserar
            därför åt höger på ALLA skärmar (object-right) så hon alltid syns
            stor och tydlig – inte "inkastad" mot en tom mittyta. Den centrerade
            texten balanserar mot den mörkare vänsterhalvan. */}
        <div className="hero-parallax absolute inset-x-0 -top-[18%] bottom-0" aria-hidden="true">
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-zoom object-cover object-[88%_center] sm:object-right"
          />
        </div>
        {/* Mörk gradient: tyngre i vänsterkant + botten så rubrik/knappar håller
            kontrast, medan dansösen i högerkanten lämnas ljusare och syns. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/85" aria-hidden="true" />

        {/* Fröken Snusk – dragplåstret på heroens mörka vänsterhalva (Johans
            önskemål). Endast neontext (bilden borttagen på önskemål),
            länkad till artistsidan.
            Breda skärmar: absolut i vänsterkanten. Mobil/surfplatta har en
            egen variant i textflödet längre ner (vänsterytan är text-yta). */}
        <Link
          href="/artister#froken-snusk"
          aria-label="Fröken Snusk – mässans gästartist, läs mer"
          className="hidden lg:flex absolute left-[3%] xl:left-[6%] top-1/2 -translate-y-1/2 z-10 flex-col items-center group"
        >
          <span className="neon-name font-display text-xl xl:text-2xl font-extrabold uppercase tracking-[0.18em] mb-1 transition-transform duration-500 group-hover:scale-[1.03]">
            Fröken Snusk
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-pink-light/90 mb-6">
            Gästartist · Live på scen
          </span>
        </Link>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          {/* Trust-badge: Sveriges första & största sedan 1996 – premiumsignal. */}
          <p
            className="reveal inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-cream/80 border border-white/15 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5"
            style={{ animationDelay: '0.1s' }}
          >
            <Sparkles size={13} className="text-brand-pink-light" /> Originalet · sedan 1996
          </p>
          <p
            className="reveal flex items-center justify-center gap-2 text-sm uppercase tracking-[0.22em] text-brand-pink-light mb-6"
            style={{ animationDelay: '0.15s' }}
          >
            <CalendarDays size={16} /> {EVENT.dateText}
          </p>
          <h1 className="wipe-in title-glow font-display text-5xl sm:text-7xl font-extrabold leading-[1.05] mb-5">
            {EVENT.name}
          </h1>
          <p
            className="reveal text-xl sm:text-2xl text-cream/85 font-light mb-3"
            style={{ animationDelay: '0.45s' }}
          >
            {EVENT.tagline}
          </p>
          <p className="reveal text-cream/60 max-w-2xl mx-auto mb-6" style={{ animationDelay: '0.55s' }}>
            {EVENT.motto}. {EVENT.venue}, {EVENT.city}.
          </p>

          {/* Fröken Snusk på mobil/surfplatta: neontext i flödet under mottot
              (bilden borttagen på önskemål). Den absoluta vänster-placeringen
              på desktop får bara plats på breda skärmar. */}
          <Link
            href="/artister#froken-snusk"
            aria-label="Fröken Snusk – mässans gästartist, läs mer"
            className="reveal lg:hidden inline-flex flex-col items-center group mb-8"
            style={{ animationDelay: '0.6s' }}
          >
            <span className="neon-name font-display text-lg font-extrabold uppercase tracking-[0.18em] mb-1">
              Fröken Snusk
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-pink-light/90">
              Gästartist · Live på scen
            </span>
          </Link>

          <div
            className="reveal flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cream/70 mb-10"
            style={{ animationDelay: '0.65s' }}
          >
            <span className="inline-flex items-center gap-2">
              <Clock size={16} className="text-brand-pink" /> {EVENT.openingHours}
            </span>
            <AgeBadge size="sm" />
          </div>

          <div className="reveal flex justify-center mb-10" style={{ animationDelay: '0.7s' }}>
            <Countdown target={EVENT.startDate} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={EVENT.links.tickets}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal cta-shine btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-9 py-4 rounded-full shadow-lg shadow-brand-pink/25"
              style={{ animationDelay: '0.85s' }}
            >
              <Ticket size={20} /> Köp biljetter
            </a>
            <Link
              href="/artister"
              className="reveal inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-cream font-semibold px-9 py-4 rounded-full hover:bg-white/10 hover:border-white/25 transition-colors"
              style={{ animationDelay: '0.89s' }}
            >
              Se artisterna <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Rosa neon-övergång från heron till innehållet */}
      <div className="glow-line" aria-hidden="true" />

      {/* ── VAD KAN DU FÖRVÄNTA DIG ────────────────────────────────── */}
      <section className="bg-ink border-b border-white/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-3">
                Vad väntar på mässan?
              </h2>
              <p className="text-cream/60 max-w-2xl mx-auto">
                Två kvällar fyllda av lust, spänning och livsnjutning – under ett och samma tak.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gästartisten lyfts först – Johan ville ha den före Lust-rutorna. */}
            {EVENT.guestArtist.name && (
              <Reveal className="h-full">
                <div className="card-sheen h-full rounded-2xl border border-brand-pink/50 bg-surface-pink p-7 text-center sm:text-left shadow-lg shadow-brand-pink/10">
                  <div className="h-12 w-12 rounded-xl bg-brand-pink text-white flex items-center justify-center mb-5 mx-auto sm:mx-0">
                    <Star size={26} />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brand-pink-light font-semibold mb-1">
                    Mässans gästartist
                  </p>
                  <h3 className="font-display text-xl font-bold text-cream mb-2">
                    {EVENT.guestArtist.name}
                  </h3>
                  <p className="text-sm text-cream/70 leading-relaxed">{EVENT.guestArtist.text}</p>
                </div>
              </Reveal>
            )}

            {[
              {
                icon: <Flame size={26} />,
                title: 'Lust',
                text: 'Upplev det senaste inom njutning och sensualitet, presenterat med värme och respekt.',
              },
              {
                icon: <Sparkles size={26} />,
                title: 'Spänning',
                text: 'Heta scenshower, uppträdanden och upplevelser som kittlar nyfikenheten.',
              },
              {
                icon: <Star size={26} />,
                title: 'Livsnjutning',
                text: 'En öppen och välkomnande mötesplats för alla vuxna – oavsett vem du är.',
              },
            ].map((h, i) => (
              <Reveal key={h.title} delay={(i + 1) * 120} className="h-full">
                <Highlight icon={h.icon} title={h.title} text={h.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMMET: konkreta programpunkter (från Johans mejl) ──── */}
      <section className="bg-surface border-b border-white/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-3">
                Det här väntar på mässan
              </h2>
              <p className="text-cream/60 max-w-2xl mx-auto">
                Ett fullspäckat schema från start till mål – allt under ett och samma tak.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Music2 size={24} />,
                title: 'Kända liveartister',
                text: 'Folkkära legendarer och nya, spännande artister sätter stämningen med sång i toppklass.',
              },
              {
                icon: <Sparkles size={24} />,
                title: 'Exklusiva scenshower',
                text: 'Professionell och spektakulär striptease i världsklass på stora scenen.',
              },
              {
                icon: <ShoppingBag size={24} />,
                title: 'Över 20 utställare',
                text: 'Det nyaste på marknaden inom vuxenleksaker och välbefinnande.',
              },
              {
                icon: <Disc3 size={24} />,
                title: 'Pulserande dansgolv',
                text: 'Kasta dig ut och festa loss till rytmen ända till sena timmen.',
              },
              {
                icon: <Eye size={24} />,
                title: 'Klassisk peep show',
                text: 'Spännande stunder i den klassiska peep show-traditionen.',
              },
              {
                icon: <Heart size={24} />,
                title: 'Privat lapdance',
                text: 'En avskild och lyxig miljö för en helt privat upplevelse.',
              },
              {
                icon: <Brush size={24} />,
                title: 'Skickliga tatuerare',
                text: 'På plats hela helgen för både drop-in och tidsbokning.',
              },
              {
                icon: <Star size={24} />,
                title: 'Professionella piercers',
                text: 'Förverkliga dina smyckesdrömmar med hjälp av proffs på plats.',
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 90} className="h-full">
                <Highlight icon={p.icon} title={p.title} text={p.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFO / SNABBLÄNKAR (punkt 5 på hem) ───────────────────── */}
      <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-3">
                Allt du behöver inför mässan
              </h2>
              <p className="text-cream/60 max-w-2xl mx-auto">
                Utforska artister och utställare, säkra din biljett och håll dig uppdaterad.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <LinkCard
              href="/biljetter"
              icon={<Ticket size={26} />}
              title="Köp biljetter"
              text="Förköp via Billetto och slipp köa – eller köp biljett i dörren."
            />
            <LinkCard
              href="/artister"
              icon={<Mic2 size={26} />}
              title="Våra artister"
              text="Möt artisterna och föreläsarna som finns på plats under mässan."
            />
            <LinkCard
              href="/utstallare"
              icon={<Store size={26} />}
              title="Våra utställare"
              text="Upptäck utställarna som visar upp det senaste inom lust och livsnjutning."
            />
            <LinkCard
              href="/boka-artist"
              icon={<Mic2 size={26} />}
              title="Boka artist av oss"
              text="Vill du boka en av våra artister till ditt eget event? Hör av dig via Instagram."
            />
            <LinkCard
              href="/utstallare"
              icon={<Brush size={26} />}
              title="Tatuering & piercing"
              text="Erotic & Tattoo – möt tatuerare och studios som tatuerar och piercar på plats hela helgen."
            />
            <LinkCard
              href="/kontakt"
              icon={<Store size={26} />}
              title="Ställ ut eller jobba hos oss"
              text="Vill du bli utställare eller jobba på mässan? Skicka en förfrågan."
            />
          </div>
        </div>
      </section>

      {/* ── PRAKTISK INFO + SOCIALA MEDIER (punkt 4) ──────────────── */}
      <section className="bg-ink py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <h3 className="font-display text-2xl font-bold text-cream mb-5">Praktiskt</h3>
              <ul className="space-y-4 text-cream/75">
                <li className="flex items-center gap-3">
                  <CalendarDays size={20} className="text-brand-pink flex-shrink-0" /> {EVENT.dateText}
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={20} className="text-brand-pink flex-shrink-0" /> {EVENT.openingHours}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={20} className="text-brand-pink flex-shrink-0" /> {EVENT.venue}, {EVENT.city}
                </li>
                <li className="flex items-center gap-3">
                  <Ticket size={20} className="text-brand-pink flex-shrink-0" />
                  <a href={EVENT.links.tickets} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink">
                    Biljetter via Billetto
                  </a>
                </li>
                <li className="pt-1">
                  <AgeBadge />
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h3 className="font-display text-2xl font-bold text-cream mb-5">Följ oss</h3>
              <p className="text-cream/60 mb-5">
                Håll dig uppdaterad om artister, utställare och nyheter inför mässan.
              </p>
              <div className="flex gap-3">
                <SocialButton href={EVENT.links.facebook} label="Facebook">
                  <FacebookIcon size={20} />
                </SocialButton>
                <SocialButton href={EVENT.links.instagram} label="Instagram">
                  <InstagramIcon size={20} />
                </SocialButton>
                <SocialButton href={EVENT.links.tiktok} label="TikTok">
                  <TikTokIcon size={20} />
                </SocialButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VANLIGA FRÅGOR ─────────────────────────────────────────── */}
      <section className="bg-surface py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-3">
                Vanliga frågor
              </h2>
              <p className="text-cream/60 max-w-xl mx-auto">
                Det vanligaste du undrar inför besöket. Hittar du inte svaret?{' '}
                <Link href="/kontakt" className="text-brand-pink hover:text-brand-pink-light font-semibold">
                  Hör av dig
                </Link>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Faq items={faqItems} />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Highlight({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    // Mild hover (endast border-glow, ingen lyft) – korten är inte klickbara
    // och ska inte konkurrera med LinkCards card-lift.
    <div className="relative overflow-hidden h-full rounded-2xl border border-white/10 bg-ink-mid p-7 text-center sm:text-left transition-colors duration-300 hover:border-brand-pink/35">
      {/* Vattenstämpel: samma ikon, stor och svag i hörnet – ger djup. */}
      <div
        className="absolute -bottom-3 -right-3 text-brand-pink opacity-[0.07] scale-[3.2] origin-bottom-right -rotate-12"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-brand-pink/30 to-brand-pink/5 border border-brand-pink/30 text-brand-pink flex items-center justify-center mb-5 mx-auto sm:mx-0 shadow-[0_0_16px_rgba(225,29,116,0.2)]">
        {icon}
      </div>
      <h3 className="relative font-display text-xl font-bold text-cream mb-2">{title}</h3>
      <p className="relative text-sm text-cream/60 leading-relaxed">{text}</p>
    </div>
  )
}

function LinkCard({
  href,
  icon,
  title,
  text,
  external,
}: {
  href: string
  icon: React.ReactNode
  title: string
  text: string
  external?: boolean
}) {
  const inner = (
    <div className="card-lift group relative overflow-hidden h-full rounded-2xl border border-white/10 bg-ink-mid p-7 hover:border-brand-pink/50 hover:bg-surface-2">
      {/* Vattenstämpel: samma ikon, stor och svag i hörnet – ger djup. */}
      <div
        className="absolute -bottom-3 -right-3 text-brand-pink opacity-[0.07] scale-[3.2] origin-bottom-right -rotate-12 transition-transform duration-500 group-hover:scale-[3.6] group-hover:-rotate-6"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="card-icon relative h-12 w-12 rounded-xl bg-gradient-to-br from-brand-pink/30 to-brand-pink/5 border border-brand-pink/30 text-brand-pink flex items-center justify-center mb-5 shadow-[0_0_16px_rgba(225,29,116,0.2)]">
        {icon}
      </div>
      <h3 className="relative font-display text-xl font-bold text-cream mb-2 flex items-center gap-2">
        {title}
        <ArrowRight size={16} className="text-brand-pink opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </h3>
      <p className="relative text-sm text-cream/60 leading-relaxed">{text}</p>
    </div>
  )

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link href={href}>{inner}</Link>
  )
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center min-w-12 h-12 px-4 rounded-xl border border-white/15 text-cream/80 hover:text-brand-pink hover:border-brand-pink/50 transition-colors"
    >
      {children}
    </a>
  )
}
