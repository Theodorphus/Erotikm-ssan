'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function diff(target: number): TimeLeft {
  const total = Math.max(0, target - Date.now())
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

/**
 * Nedräknare till mässans startdatum.
 * Datumet styrs av EVENT.startDate – ändra där, inte här.
 */
export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime()
  // Starta tomt på servern → undvik hydration-mismatch; fyll i på klienten.
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(diff(targetMs))
    const id = setInterval(() => setTime(diff(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  const units: { label: string; value: number }[] = [
    { label: 'Dagar', value: time?.days ?? 0 },
    { label: 'Timmar', value: time?.hours ?? 0 },
    { label: 'Minuter', value: time?.minutes ?? 0 },
    { label: 'Sekunder', value: time?.seconds ?? 0 },
  ]

  return (
    <div className="flex gap-3 sm:gap-5" role="timer" aria-label="Nedräkning till mässan">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-brand-pink/30 px-4 py-3 sm:px-6 sm:py-4 min-w-[68px] sm:min-w-[88px]"
        >
          <span className="font-display text-3xl sm:text-5xl font-extrabold text-white tabular-nums leading-none">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-brand-pink-light">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
