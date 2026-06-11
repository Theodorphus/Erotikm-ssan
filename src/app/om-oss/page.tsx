import type { Metadata } from 'next'
import Image from 'next/image'
import { Heart, Sparkles, Users } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { EVENT } from '@/lib/data/event'

export const metadata: Metadata = {
  title: 'Om oss',
  description: 'Historien bakom Erotikmässan och material från tidigare mässor.',
}

/**
 * ❓ Historik-texten är platshållare tills Johan skickar sitt eget material.
 *    Bilder från tidigare mässor läggs i /public/images/historia/.
 */
const PAST_GALLERY: { src: string; alt: string }[] = [
  // { src: '/images/historia/2024-1.jpg', alt: 'Erotikmässan 2024' },
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
                {EVENT.name} har under många år samlat besökare, artister och utställare kring en
                sund och njutningsfull syn på sexualitet. Med nya ägare tar mässan nu ett nytt steg –
                samma värme och nyfikenhet, men med ett friskt uttryck för en ny tid.
              </p>
              <p>
                {/* ❓ Ersätt med Johans egen text om mässans bakgrund och vision. */}
                Vår vision är att skapa en trygg och inspirerande mötesplats där lust, kunskap och
                livsnjutning står i centrum. Här möts experter, varumärken och besökare för
                upplevelser, samtal och nya upptäckter.
              </p>
            </div>
          </Reveal>

          {/* Värdeord */}
          <div className="grid sm:grid-cols-3 gap-5 mt-12">
            {[
              { icon: <Heart size={24} />, title: 'Lust', text: 'Vi firar lusten som en naturlig del av livet.' },
              { icon: <Sparkles size={24} />, title: 'Kunskap', text: 'Föreläsningar och experter som inspirerar och informerar.' },
              { icon: <Users size={24} />, title: 'Livsnjutning', text: 'En öppen och välkomnande mötesplats för alla.' },
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
              Bildgalleri från tidigare mässor läggs upp här när materialet är klart.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
