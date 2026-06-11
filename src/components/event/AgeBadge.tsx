import { EVENT } from '@/lib/data/event'

/**
 * Tydlig åldersgräns-symbol (röd cirkel/stoppskylt med "18").
 * Visas i hero, praktisk info och footer. Texten kommer från EVENT.minAge.
 */
export function AgeBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-7 w-7 text-[13px]' : 'h-9 w-9 text-base'
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`${dim} inline-flex items-center justify-center rounded-full bg-red-600 font-extrabold text-white ring-2 ring-white/90 leading-none`}
        aria-hidden="true"
      >
        {EVENT.minAge}
      </span>
      <span className={size === 'sm' ? 'text-cream/70' : 'text-cream/80 font-medium'}>
        {EVENT.minAge}-årsgräns
      </span>
    </span>
  )
}
