import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: ReactNode
  variant?: 'success' | 'info' | 'warning'
  className?: string
}

export function Badge({ children, variant = 'info', className }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-amber-100 text-amber-800',
  }

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
