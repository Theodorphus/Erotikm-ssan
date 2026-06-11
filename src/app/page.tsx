import Link from 'next/link'
import { Ticket, Mic2, Store, MapPin, CalendarDays, ArrowRight } from 'lucide-react'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/ui/SocialIcons'
import { EVENT } from '@/lib/data/event'
import { Countdown } from '@/components/event/Countdown'
import { VisitorCounter } from '@/components/event/VisitorCounter'
import { Reveal } from '@/components/ui/Reveal'

export default function HomePage() {
  return (
    <>
      {/* ── HERO med nedräknare + biljettknapp ─────────────────────── */}
      <section className="mesh-forest grain relative overflow-hidden text-cream">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-brand-pink-light mb-6">
            <CalendarDays size={16} /> {EVENT.dateText}
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-[1.05] mb-5">
            {EVENT.name}
          </h1>
          <p className="text-xl sm:text-2xl text-cream/85 font-light mb-3">{EVENT.tagline}</p>
          <p className="text-cream/60 max-w-2xl mx-auto mb-10">
            {EVENT.motto}. {EVENT.venue}, {EVENT.city}.
          </p>

          <div className="flex justify-center mb-10">
            <Countdown target={EVENT.startDate} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={EVENT.links.tickets}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-pink text-white font-semibold px-8 py-4 rounded-lg hover:bg-brand-pink-dark transition-colors shadow-lg shadow-brand-pink/25"
            >
              <Ticket size={20} /> Köp biljetter
            </a>
            <Link
              href="/artister"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-cream font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              Se artisterna <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BESÖKARRÄKNARE ─────────────────────────────────────────── */}
      <section className="bg-ink border-y border-white/10 py-14 px-4">
        <Reveal>
          <VisitorCounter total={EVENT.visitorsTotal} label={EVENT.visitorsLabel} />
        </Reveal>
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
              text="Tre biljettyper – välj den som passar dig. Köpet sker tryggt via Billetto."
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
              text="Vill du boka en av våra artister? Hör av dig via vårt Instagram-konto."
            />
            <LinkCard
              href={EVENT.links.instagram}
              external
              icon={<InstagramIcon size={26} />}
              title="Hjälp oss hitta lokal"
              text="Vill du se mässan i din stad? Tipsa oss om en lokal via sociala medier."
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
                  <CalendarDays size={20} className="text-brand-pink" /> {EVENT.dateText}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={20} className="text-brand-pink" /> {EVENT.venue}, {EVENT.city}
                </li>
                <li className="flex items-center gap-3">
                  <Ticket size={20} className="text-brand-pink" />
                  <a href={EVENT.links.tickets} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink">
                    Biljetter via Billetto
                  </a>
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
    </>
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
    <div className="group h-full rounded-2xl border border-white/10 bg-ink-mid p-7 hover:border-brand-pink/50 hover:bg-surface-2 transition-all duration-300">
      <div className="h-12 w-12 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
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
