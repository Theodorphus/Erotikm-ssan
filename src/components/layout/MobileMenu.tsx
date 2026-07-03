'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Ticket } from 'lucide-react'
import { MAIN_NAV } from '@/lib/data/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  ticketsUrl: string
}

export function MobileMenu({ isOpen, onClose, ticketsUrl }: MobileMenuProps) {
  const pathname = usePathname()

  // Stäng på Escape + lås bakgrundsscroll medan menyn är öppen.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div id="mobile-menu" className="lg:hidden border-t border-white/10 bg-ink">
      <nav className="px-4 py-4 space-y-1" aria-label="Mobilmeny">
        {MAIN_NAV.map((item) => {
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`block px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'text-brand-pink-light bg-brand-pink/10 font-semibold'
                  : 'text-cream/80 hover:text-cream hover:bg-white/5'
              }`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          )
        })}

        <div className="pt-3">
          <a
            href={ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient flex items-center justify-center gap-2 text-center text-white font-semibold px-5 py-3 rounded-full"
            onClick={onClose}
          >
            <Ticket size={18} /> Köp biljetter
          </a>
        </div>
      </nav>
    </div>
  )
}
