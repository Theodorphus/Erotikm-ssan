import type { Metadata } from 'next'
import { InstagramIcon } from '@/components/ui/SocialIcons'
import { PageHero } from '@/components/layout/PageHero'
import { getEvent } from '@/lib/content'

// ISR: hämta om från Sanity var 60:e sekund.
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Boka artist',
  description:
    'Vill du boka en av Erotikmässans artister till ditt eget event? Hör av dig via vårt Instagram-konto.',
  alternates: { canonical: '/boka-artist' },
  openGraph: {
    title: 'Boka artist av oss | Erotikmässan',
    description:
      'Vill du boka en av Erotikmässans artister till ditt eget event? Hör av dig via vårt Instagram-konto.',
    url: '/boka-artist',
  },
}

export default async function BokaArtistPage() {
  const event = await getEvent()
  return (
    <>
      <PageHero
        title="Boka artist av oss"
        subtitle="Vill du boka en av våra artister till ditt eget event? Kontakta oss enklast via Instagram."
      />

      <section className="relative overflow-hidden bg-ink py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Atmosfäriska neon-lager bakom kortet – scenljus i diset. */}
        <div className="aurora opacity-70" aria-hidden="true" />
        <div className="bokeh" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto text-center card-sheen rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-sm p-10 shadow-2xl shadow-brand-pink/10">
          <div className="h-16 w-16 rounded-2xl bg-brand-pink/15 text-brand-pink flex items-center justify-center mx-auto mb-6">
            <InstagramIcon size={32} />
          </div>
          <h2 className="font-display text-2xl font-bold text-cream mb-3">
            Skicka oss ett meddelande
          </h2>
          <p className="text-cream/70 mb-8 max-w-md mx-auto">
            Berätta vilken artist du är intresserad av och när ditt event är, så återkommer vi med
            tillgänglighet och pris.
          </p>
          <a
            href={event.links.bookArtist}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brand-pink text-white font-semibold px-8 py-4 rounded-lg hover:bg-brand-pink-dark transition-colors shadow-lg shadow-brand-pink/25"
          >
            <InstagramIcon size={20} /> Boka via Instagram
          </a>
        </div>
      </section>
    </>
  )
}
