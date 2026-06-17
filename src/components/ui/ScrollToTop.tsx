'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * "Till toppen"-knapp som tonar in när man scrollat ner en bit. Hjälper på de
 * långa sidorna (artister, utställare, om oss). Respekterar reduced-motion via
 * scroll-behavior i globals.css.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Till toppen"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink text-white shadow-lg shadow-brand-pink/30 transition-all duration-300 hover:bg-brand-pink-dark focus-visible:opacity-100 ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
      }`}
    >
      <ArrowUp size={22} />
    </button>
  )
}
