import { ArrowUpRight, Check, CodeXml } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const PERKS = ['En kontakt hela vägen', 'Snabb leverans', 'Du äger allt']

/**
 * Reklamruta för Webbdev Studio (byggde sajten). Ligger sist på startsidan,
 * efter mässinnehållet, så den aldrig konkurrerar med biljett-CTA:erna.
 * Avsändaren står tydligt i ögonbrynsraden – reklam ska gå att känna igen
 * som reklam (marknadsföringslagen).
 */
export function WebbdevPromo() {
  return (
    <section className="bg-ink py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-mid p-8 sm:p-12">
          {/* Mjuk rosa glöd uppe till höger + kodklammer-vattenstämpel. */}
          <div
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl"
            aria-hidden="true"
          />
          <CodeXml
            size={220}
            strokeWidth={1}
            className="absolute -bottom-10 -right-6 text-brand-pink opacity-[0.06] -rotate-12"
            aria-hidden="true"
          />

          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-cream/70 border border-white/15 bg-white/5 rounded-full px-4 py-1.5 mb-5">
                <CodeXml size={13} className="text-brand-pink-light" /> Skapad av Webbdev Studio
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-3">
                Gillar du sajten? Din kan bli nästa.
              </h2>
              <p className="text-cream/60 max-w-xl leading-relaxed mb-6">
                Genomtänkta hemsidor för företag som vill växa – från första skiss
                till lansering.
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
                {PERKS.map((perk) => (
                  <li key={perk} className="inline-flex items-center gap-2">
                    <Check size={16} className="text-brand-pink" /> {perk}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://www.webbdev.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 self-start md:self-auto bg-cream text-ink font-semibold px-8 py-4 rounded-full hover:bg-white hover:shadow-[0_10px_34px_-10px_rgba(242,92,162,0.6)] transition-all"
            >
              Besök webbdev.se
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
