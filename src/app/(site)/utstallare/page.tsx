import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { getExhibitors } from '@/lib/content'

// ISR: hämta om från Sanity var 60:e sekund.
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Våra utställare',
  description: 'Upptäck utställarna som visar upp det senaste inom lust och livsnjutning på Erotikmässan.',
  alternates: { canonical: '/utstallare' },
  openGraph: {
    title: 'Våra utställare | Erotikmässan',
    description: 'Upptäck utställarna som visar upp det senaste inom lust och livsnjutning på Erotikmässan.',
    url: '/utstallare',
  },
}

export default async function UtstallarePage() {
  const exhibitors = await getExhibitors()
  return (
    <>
      <PageHero
        title="Våra utställare"
        subtitle="Upptäck utställarna som finns på plats under mässan."
      />

      <section className="bg-ink py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {exhibitors.map((ex, i) => (
            // Stagger-delayen loopar (i % 4) så kort långt ner i listan inte
            // får sekundlånga fördröjningar när de scrollas in.
            <Reveal key={ex.slug} delay={(i % 4) * 90}>
              <article
                id={ex.slug}
                className="card-lift grid sm:grid-cols-[180px_1fr] gap-6 sm:gap-8 items-center rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-2 flex items-center justify-center">
                  {ex.image ? (
                    <Image
                      src={ex.image}
                      alt={ex.name}
                      fill
                      sizes="180px"
                      className="object-contain p-4"
                    />
                  ) : (
                    <ImagePlaceholder name={ex.name} />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-3 break-words">
                    {ex.name}
                  </h2>
                  <p className="text-cream/70 leading-relaxed">{ex.description}</p>
                  {ex.website && (
                    <a
                      href={ex.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-brand-pink hover:text-brand-pink-light font-semibold"
                    >
                      Besök webbplats →
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
