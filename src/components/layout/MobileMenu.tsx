'use client'

import Link from 'next/link'
import { MAIN_NAV } from '@/lib/data/navigation'
import { EVENT } from '@/lib/data/event'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="lg:hidden border-t border-white/10 bg-ink">
      <div className="px-4 py-4 space-y-1">
        {MAIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2.5 text-cream/80 hover:text-cream hover:bg-white/5 rounded-lg transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}

        <div className="pt-3">
          <a
            href={EVENT.links.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-brand-pink text-white font-semibold px-5 py-3 rounded-lg hover:bg-brand-pink-dark transition-colors"
            onClick={onClose}
          >
            Köp biljetter
          </a>
        </div>
      </div>
    </div>
  )
}
