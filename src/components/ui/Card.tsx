import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}
