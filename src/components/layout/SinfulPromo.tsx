const AFFILIATE_URL = 'https://rkn3.net/c/?si=14325&li=1743043&wi=435161&ws='
const BANNER_URL = 'https://animated.dt71.net/14325/1743043/?wi=435161&ws='

export function SinfulPromo() {
  return (
    <aside aria-label="Annons för Sinful" className="bg-ink px-4 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-ink-mid p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.16em] text-cream/70">
            Annons för Sinful
          </p>
          <p className="text-xs text-cream/60">Vi kan få provision när du handlar via länken.</p>
        </div>
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="sponsored noopener"
          className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink-light"
        >
          {/* Load the supplied animated affiliate creative directly to preserve tracking. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BANNER_URL}
            width={930}
            height={180}
            alt="Sinful – En onsdag ni aldrig kommer att glömma. Köp nu."
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-[930px] rounded-lg border-0"
          />
          <span className="mt-4 flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-cream group-hover:text-brand-pink-light">
            Besök Sinful <span aria-hidden="true">↗</span>
            <span className="sr-only">(öppnas i ny flik)</span>
          </span>
        </a>
      </div>
    </aside>
  )
}
