import { ReactNode, forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
  /** Renderar en <Link> med knapp-utseende (giltig HTML – ingen knapp i länk). */
  href?: string
}

/**
 * Premium Button Component with 4 variants
 *
 * Variants:
 * - primary: Bold green CTA (use sparingly - only for main action)
 * - secondary: Subtle gray button (secondary actions)
 * - outline: Green border (alternative CTA)
 * - ghost: No background, text only (links inside CTA banners)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      fullWidth = false,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-navy text-white hover:bg-petrol active:bg-petrol/90 focus-visible:ring-navy shadow-md hover:shadow-lg hover:translate-y-[-1px] tracking-wide',

      secondary:
        'bg-white text-navy hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-navy shadow-lg hover:shadow-xl hover:translate-y-[-1px] border border-white/20',

      outline:
        'border-2 border-navy text-navy hover:bg-navy hover:text-white active:bg-petrol focus-visible:ring-navy transition-colors',

      ghost:
        'text-white hover:bg-white/15 active:bg-white/25 focus-visible:ring-white focus-visible:ring-offset-0',
    }

    const sizeStyles: Record<ButtonSize, string> = {
      xs: 'px-3 py-1.5 text-xs',
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
      xl: 'px-10 py-4 text-lg',
    }

    const widthClass = fullWidth ? 'w-full' : ''

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthClass,
      props.disabled && 'opacity-50 cursor-not-allowed hover:shadow-none hover:translate-y-0',
      className
    )

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
