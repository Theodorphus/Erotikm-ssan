import type { Metadata } from 'next'
import Image from 'next/image'
import { Mic2 } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { getArtists } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Våra artister',
  description: 'Möt artisterna och föreläsarna som finns på plats under Erotikmässan.',
  alternates: { canonical: '/artister' },
  openGraph: {
    title: 'Våra artister | Erotikmässan',
    description: 'Möt artisterna och föreläsarna som finns på plats under Erotikmässan.',
    url: '/artister',
  },
}

export default async function ArtisterPage() {
  const artists = await getArtists()
  return (
    <>
      <PageHero
        title="Våra artister"
        subtitle="Möt artisterna och föreläsarna som finns på plats under mässan."
      />

      <section className="bg-ink py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {artists.map((artist, i) => (
            // Stagger-delayen loopar (i % 4) så kort långt ner i listan inte
            // får sekundlånga fördröjningar när de scrollas in.
            <Reveal key={artist.slug} delay={(i % 4) * 90}>
              <article
                id={artist.slug}
                className="grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-8 items-center rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-2 flex items-center justify-center">
                  {artist.image ? (
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  ) : (
                    <Mic2 size={48} className="text-brand-pink/40" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="inline-block text-xs uppercase tracking-[0.18em] text-brand-pink font-semibold mb-2">
                    {artist.role}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-3 break-words">
                    {artist.name}
                  </h2>
                  <p className="text-cream/70 leading-relaxed">{artist.bio}</p>
                  {artist.link && (
                    <a
                      href={artist.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-brand-pink hover:text-brand-pink-light font-semibold"
                    >
                      Läs mer →
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
