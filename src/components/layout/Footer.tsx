import Link from 'next/link'
import { Mail, MapPin, CalendarDays, Clock } from 'lucide-react'
import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/ui/SocialIcons'
import { AgeBadge } from '@/components/event/AgeBadge'
import { FOOTER_LINKS } from '@/lib/data/navigation'
import type { EventData } from '@/lib/content'

export function Footer({ event: EVENT }: { event: EventData }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink-deep text-cream/90">
      {/* Glödande accentlinje som avslut på sidan */}
      <div className="glow-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-10">

          {/* Mässinfo */}
          <div>
            <span className="font-display font-extrabold text-cream text-lg">
              {EVENT.name}
            </span>
            <p className="text-sm text-cream/60 leading-relaxed mt-3 mb-5 max-w-xs">
              {EVENT.motto}.
            </p>
            <div className="flex gap-3">
              <a href={EVENT.links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-cream/60 hover:text-brand-pink transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href={EVENT.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/60 hover:text-brand-pink transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href={EVENT.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-cream/60 hover:text-brand-pink transition-colors">
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>

          {/* Snabblänkar */}
          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">Snabblänkar</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 hover:text-brand-pink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt & praktiskt */}
          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">Mässan</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-cream/70">
                <CalendarDays size={16} className="text-brand-pink flex-shrink-0" />
                <span>{EVENT.dateText}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-cream/70">
                <Clock size={16} className="text-brand-pink flex-shrink-0" />
                <span>{EVENT.openingHours}</span>
              </div>
              <a
                href={EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-cream/70 hover:text-brand-pink transition-colors"
              >
                <MapPin size={16} className="text-brand-pink flex-shrink-0" />
                <span>{EVENT.venue}, {EVENT.venueStreet}, {EVENT.city}</span>
              </a>
              <a href={`mailto:${EVENT.email}`} className="flex items-center gap-2.5 text-sm text-cream/70 hover:text-brand-pink transition-colors">
                <Mail size={16} className="text-brand-pink flex-shrink-0" />
                <span>{EVENT.email}</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-cream/50">
          <p>&copy; {currentYear} {EVENT.name} · {EVENT.brandName}. Alla rättigheter förbehållna.</p>
          <div className="flex items-center gap-5">
            <AgeBadge size="sm" />
            <Link href="/integritetspolicy" className="hover:text-brand-pink transition-colors">Integritetspolicy</Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-cream/30">
          <a
            href="https://www.webbdev.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream/60 transition-colors"
          >
            Hemsida skapad av Webbdev
          </a>
        </div>
      </div>
    </footer>
  )
}
