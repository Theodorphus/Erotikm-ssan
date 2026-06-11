import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface IconProps {
  icon: LucideIcon
  size?: number
  className?: string
  color?: 'brand' | 'white' | 'gray' | 'inherit'
}

/**
 * Premiumikon-wrapper för lucide-react
 *
 * Använd: <Icon icon={Star} size={24} color="brand" />
 *
 * Färger:
 * - brand: #55A85B (grön, standard)
 * - white: vit
 * - gray: grå
 * - inherit: ärvd från parent
 */
export function Icon({ icon: Comp, size = 24, className, color = 'brand' }: IconProps) {
  const colorClass = {
    brand: 'text-brand-pink',
    white: 'text-white',
    gray: 'text-gray-600',
    inherit: 'text-current',
  }[color]

  return <Comp size={size} className={cn(colorClass, className)} strokeWidth={2} />
}
