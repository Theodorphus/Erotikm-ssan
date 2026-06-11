import Link from 'next/link'
import { Mail, MapPin, CalendarDays } from 'lucide-react'
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.991 22 12z" />
                </svg>
              </a>
              <a href={EVENT.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/60 hover:text-brand-pink transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href={EVENT.links.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-cream/60 hover:text-brand-pink transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.87.13V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.78a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.21z" />
                </svg>
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
