import { ReactNode } from 'react'

/**
 * Återanvänd hero-topp för undersidor – mörk rosa/svart mesh med rubrik.
 */
export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <section className="mesh-forest relative overflow-hidden text-cream py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg text-cream/85 font-light max-w-2xl mx-auto">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  )
}
