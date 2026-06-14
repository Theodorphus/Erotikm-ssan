import Link from 'next/link'
import { MAIN_NAV } from '@/lib/data/navigation'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-7xl font-bold text-brand-pink mb-4">404</p>
      <h1 className="text-3xl font-bold text-cream mb-3">Sidan hittades inte</h1>
      <p className="text-cream/60 max-w-md mb-10">
        Sidan du letar efter finns inte eller har flyttats. Prova en av länkarna nedan.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Link
          href="/"
          className="px-5 py-2.5 bg-brand-pink text-white rounded-lg font-semibold hover:bg-brand-pink-dark transition-colors"
        >
          Startsida
        </Link>
        <Link
          href="/biljetter"
          className="px-5 py-2.5 bg-white/5 text-cream border border-white/15 rounded-lg font-semibold hover:bg-white/10 transition-colors"
        >
          Köp biljetter
        </Link>
      </div>

      <div className="border-t border-white/10 pt-10 w-full max-w-lg">
        <p className="text-sm text-cream/40 mb-4 uppercase tracking-wide font-semibold">Sidor</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-cream/70 hover:text-brand-pink underline underline-offset-2 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
