'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Visar en total besökarsiffra (marknadsföring) med en mjuk upp-räkning
 * när den scrollas in. Siffran kommer från EVENT.visitorsTotal – en
 * redigerbar totalsiffra, inte live-data.
 */
export function VisitorCounter({
  total,
  label,
}: {
  total: number
  label: string
}) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(total)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasRun.current) return
        hasRun.current = true

        const duration = 1800
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          // easeOutCubic
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(total * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [total])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl sm:text-6xl font-extrabold text-brand-pink tabular-nums leading-none">
        {value.toLocaleString('sv-SE')}+
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">{label}</div>
    </div>
  )
}
