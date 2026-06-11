import Link from 'next/link'
import { Mail, MapPin, CalendarDays, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/components/ui/SocialIcons'
import { FOOTER_LINKS } from '@/lib/data/navigation'
import { EVENT } from '@/lib/data/event'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink-deep text-cream/90 border-t border-white/10">
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
              <a href={EVENT.links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-cream/60 hover:text-brand-pink transition-colors">
                <YouTubeIcon size={20} />
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
                <MapPin size={16} className="text-brand-pink flex-shrink-0" />
                <span>{EVENT.venue}, {EVENT.city}</span>
              </div>
              <a href={`mailto:${EVENT.email}`} className="flex items-center gap-2.5 text-sm text-cream/70 hover:text-brand-pink transition-colors">
                <Mail size={16} className="text-brand-pink flex-shrink-0" />
                <span>{EVENT.email}</span>
              </a>
              <a href={EVENT.phoneHref} className="flex items-center gap-2.5 text-sm text-cream/70 hover:text-brand-pink transition-colors">
                <Phone size={16} className="text-brand-pink flex-shrink-0" />
                <span>{EVENT.phone}</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row gap-3 justify-between items-center text-sm text-cream/50">
          <p>&copy; {currentYear} {EVENT.name}. Alla rättigheter förbehållna.</p>
          <Link href="/integritetspolicy" className="hover:text-brand-pink transition-colors">Integritetspolicy</Link>
        </div>
      </div>
    </footer>
  )
}
