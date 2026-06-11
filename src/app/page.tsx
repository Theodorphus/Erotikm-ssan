import Link from 'next/link'
import Image from 'next/image'
import { Ticket, Mic2, Store, MapPin, CalendarDays, Clock, ArrowRight, Sparkles, Flame, Star, Brush } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/components/ui/SocialIcons'
import { EVENT } from '@/lib/data/event'
import { Countdown } from '@/components/event/Countdown'
import { Faq } from '@/components/event/Faq'
import { AgeBadge } from '@/components/event/AgeBadge'
import { Reveal } from '@/components/ui/Reveal'

export default function HomePage() {
  return (
    <>
      {/* ── HERO med nedräknare + biljettknapp ─────────────────────── */}
      <section className="mesh-forest grain relative overflow-hidden text-cream">
        {/* Hero-bild: fade-in + slow zoom vid laddning, mjuk parallax vid scroll.
            Motivet (dansösen) ligger i bildens högra tredjedel, så på smala
            mobilskärmar fokuserar vi åt höger (object-[78%]); på sm+ centreras den. */}
        <div className="hero-parallax absolute inset-x-0 -top-[18%] bottom-0" aria-hidden="true">
          <Image
            src="/images/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-zoom object-cover object-[78%_center] sm:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p
            className="reveal inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-brand-pink-light mb-6"
            style={{ animationDelay: '0.15s' }}
          >
            <CalendarDays size={16} /> {EVENT.dateText}
          </p>
          <h1 className="wipe-in font-display text-5xl sm:text-7xl font-extrabold leading-[1.05] mb-5">
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

          <div
            className="reveal flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cream/70 mb-10"
            style={{ animationDelay: '0.6s' }}
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
              className="reveal inline-flex items-center justify-center gap-2 bg-brand-pink text-white font-semibold px-8 py-4 rounded-lg hover:bg-brand-pink-dark transition-colors shadow-lg shadow-brand-pink/25"
              style={{ animationDelay: '0.85s' }}
            >
              <Ticket size={20} /> Köp biljetter
            </a>
            <Link
              href="/artister"
              className="reveal inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-cream font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
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
              <Reveal key={h.title} delay={i * 120} className="h-full">
                <Highlight icon={h.icon} title={h.title} text={h.text} />
              </Reveal>
            ))}

            {EVENT.guestArtist.name && (
              <Reveal delay={360} className="h-full">
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

      <div className="glow-line" aria-hidden="true" />

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
                <SocialButton href={EVENT.links.youtube} label="YouTube">
                  <YouTubeIcon size={20} />
                </SocialButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="glow-line" aria-hidden="true" />

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
            <Faq />
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
    <div className="h-full rounded-2xl border border-white/10 bg-ink-mid p-7 text-center sm:text-left">
      <div className="h-12 w-12 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center mb-5 mx-auto sm:mx-0">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold text-cream mb-2">{title}</h3>
      <p className="text-sm text-cream/60 leading-relaxed">{text}</p>
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
    <div className="card-lift group h-full rounded-2xl border border-white/10 bg-ink-mid p-7 hover:border-brand-pink/50 hover:bg-surface-2">
      <div className="card-icon h-12 w-12 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold text-cream mb-2 flex items-center gap-2">
        {title}
        <ArrowRight size={16} className="text-brand-pink opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </h3>
      <p className="text-sm text-cream/60 leading-relaxed">{text}</p>
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
