'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MAIN_NAV } from '@/lib/data/navigation'
import { EVENT } from '@/lib/data/event'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-ink/90 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-ink/40 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18">
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display font-extrabold tracking-tight text-cream text-[18px] sm:text-[20px]">
            {EVENT.name}
          </span>
          <span className="hidden sm:block text-[10px] text-brand-pink-light font-semibold tracking-[0.22em] uppercase mt-1">
            {EVENT.tagline}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {MAIN_NAV.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-md transition-colors text-sm ${
                  isActive
                    ? 'text-brand-pink-light bg-brand-pink/10 font-semibold'
                    : 'text-cream/80 hover:text-cream hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* CTA - Desktop */}
        <div className="hidden lg:block">
          <a
            href={EVENT.links.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-brand-pink text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-pink-dark transition-colors shadow-md shadow-brand-pink/20"
          >
            Köp biljetter
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-cream"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Stäng menyn' : 'Öppna menyn'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isOpen && <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </header>
  )
}
