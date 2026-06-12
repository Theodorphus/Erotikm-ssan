import type { Metadata } from 'next'
import Image from 'next/image'
import { Flame, Sparkles, Star } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { EVENT } from '@/lib/data/event'

export const metadata: Metadata = {
  title: 'Om oss',
  description: 'Originalet sedan 1996 – historien bakom Sveriges första och största erotik- & tattoomässa, från Vasahallen i Stockholm tillbaka till Globen 2026.',
  alternates: { canonical: '/om-oss' },
  openGraph: {
    title: 'Om oss | Erotikmässan',
    description: 'Originalet sedan 1996 – historien bakom Sveriges första och största erotik- & tattoomässa, från Vasahallen i Stockholm tillbaka till Globen 2026.',
    url: '/om-oss',
  },
}

/**
 * Historiken är hämtad från nuvarande www.erotikmassan.com.
 * ❓ Be Johan om originalbilder från tidigare mässor (gamla sajten har galleri
 *    från Ekebo 2024, Ekebo 2018 och Stockholm 2017).
 *    Bilder läggs i /public/images/historia/.
 */
const PAST_GALLERY: { src: string; alt: string }[] = [
  // Format: liggande 4:3, visas med object-cover. Lägg till fler i /public/images/historia/.
  { src: '/images/historia/object-cover1.png', alt: 'Erotikmässan – tidigare år' },
  { src: '/images/historia/object-cover2.png', alt: 'Erotikmässan – tidigare år' },
  { src: '/images/historia/object-cover3.png', alt: 'Erotikmässan – tidigare år' },
]

/** Milstolpar som visas som tidslinje. 👉 Redigera fritt. */
const TIMELINE: { year: string; text: string }[] = [
  { year: '1996', text: 'Sveriges första erotikmässa arrangeras i Vasahallen på Djurgården i Stockholm – originalet är fött.' },
  { year: '2000-talet', text: 'Mässan växer och turnerar landet runt: Malmö, Karlstad, Göteborg, Luleå, Falun och Linköping.' },
  { year: '2009', text: 'Ekebo i Munka-Ljungby blir mässans hemmaplan under många år.' },
  { year: '2026', text: 'Erotikmässan intar Globen i Stockholm – tillbaka där det en gång började.' },
]

export default function OmOssPage() {
  return (
    <>
      <PageHero
        title="Om oss"
        subtitle="Historien bakom mässan – och en återblick på tidigare år."
      />

      {/* Historia */}
      <section className="bg-ink py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-cream mb-5">Vår historia</h2>
            <div className="space-y-4 text-cream/75 leading-relaxed">
              <p>
                Vi är pionjärerna som startade den första erotikmässan i Sverige. {EVENT.name} är{' '}
                <strong className="text-cream">originalet</strong> – och Sveriges största
                erotik- &amp; tattoomässa. Allt började 1996 i Vasahallen på Djurgården i
                Stockholm, och sedan dess har mässan turnerat genom hela landet. 2026 är vi
                tillbaka i Stockholm – i Globen.
              </p>
              <p>
                På mässan möts besökare, artister och utställare kring en sund och njutningsfull
                syn på sexualitet: scenshower, stripp, erotiska produkter, tatuering och piercing,
                skönhetsvård, stripptävlingar, speed-dating – och god mat och dryck. En trygg,
                öppen och välkomnande upplevelse för alla vuxna.
              </p>
            </div>

            {/* Tidslinje */}
            <ol className="mt-10 relative border-l border-brand-pink/30 pl-6 space-y-7">
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-pink shadow-[0_0_12px_rgba(225,29,116,0.8)]" />
                  <div className="font-display text-brand-pink-light font-bold text-sm uppercase tracking-wider mb-1">
                    {t.year}
                  </div>
                  <p className="text-cream/70 text-sm leading-relaxed">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Värdeord */}
          <div className="grid sm:grid-cols-3 gap-5 mt-12">
            {[
              { icon: <Flame size={24} />, title: 'Lust', text: 'Vi firar lusten som en naturlig del av livet.' },
              { icon: <Sparkles size={24} />, title: 'Spänning', text: 'Heta scenshower och upplevelser som kittlar nyfikenheten.' },
              { icon: <Star size={24} />, title: 'Livsnjutning', text: 'En öppen och välkomnande mötesplats för alla.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="rounded-2xl border border-white/10 bg-surface p-6 h-full">
                  <div className="h-11 w-11 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-cream mb-1.5">{v.title}</h3>
                  <p className="text-sm text-cream/60">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tidigare mässor */}
      <section className="bg-surface py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-cream mb-3 text-center">
              Från tidigare mässor
            </h2>
            <p className="text-cream/60 text-center max-w-xl mx-auto mb-10">
              En återblick på stämningen från tidigare år.
            </p>
          </Reveal>

          {PAST_GALLERY.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {PAST_GALLERY.map((img) => (
                <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-2">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width:640px) 50vw, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-ink/40 p-10 text-center text-cream/50">
              Bildgalleri från Ekebo 2024, Ekebo 2018 och Stockholm 2017 läggs upp här när
              materialet är på plats.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
