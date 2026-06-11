import type { Metadata } from 'next'
import { ExternalLink, BadgePercent } from 'lucide-react'
import { InstagramIcon } from '@/components/ui/SocialIcons'
import { PageHero } from '@/components/layout/PageHero'
import { EVENT } from '@/lib/data/event'

export const metadata: Metadata = {
  title: 'Boka artist',
  description:
    'Boka uppträdande artister till ditt eget event via vår samarbetspartner Swedishstripp – 10 % rabatt när du nämner oss.',
  alternates: { canonical: '/boka-artist' },
  openGraph: {
    title: 'Boka artist av oss | Erotikmässan',
    description:
      'Boka uppträdande artister till ditt eget event via vår samarbetspartner Swedishstripp – 10 % rabatt när du nämner oss.',
    url: '/boka-artist',
  },
}

export default function BokaArtistPage() {
  return (
    <>
      <PageHero
        title="Boka artist av oss"
        subtitle="Vill du boka en av våra artister till ditt eget event? Vi samarbetar med Swedishstripp för bokning av uppträdande och artister."
      />

      <section className="bg-ink py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Primärt: Swedishstripp */}
          <div className="text-center rounded-2xl border border-brand-pink/40 bg-surface-pink p-10 shadow-xl shadow-brand-pink/10">
            <div className="h-16 w-16 rounded-2xl bg-brand-pink/15 text-brand-pink flex items-center justify-center mx-auto mb-6">
              <BadgePercent size={32} />
            </div>
            <h2 className="font-display text-2xl font-bold text-cream mb-3">
              Boka via Swedishstripp
            </h2>
            <p className="text-cream/70 mb-4 max-w-md mx-auto">
              Genom vårt samarbete med Swedishstripp kan du boka uppträdande och artister till
              privata evenemang – fest, möhippa, svensexa eller företagsevent.
            </p>
            <p className="text-brand-pink-light font-semibold mb-8">
              Nämn att du kommer från {EVENT.brandName} så får du 10&nbsp;% rabatt!
            </p>
            <a
              href={EVENT.links.bookArtist}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-pink text-white font-semibold px-8 py-4 rounded-lg hover:bg-brand-pink-dark transition-colors shadow-lg shadow-brand-pink/25"
            >
              <ExternalLink size={20} /> Till Swedishstripp
            </a>
          </div>

          {/* Sekundärt: Instagram */}
          <div className="text-center rounded-2xl border border-white/10 bg-surface p-8">
            <h3 className="font-display text-lg font-bold text-cream mb-2">
              Hellre via Instagram?
            </h3>
            <p className="text-cream/60 text-sm mb-6 max-w-md mx-auto">
              Du kan också skicka oss ett meddelande direkt – berätta vilken artist du är
              intresserad av och när ditt event är, så hjälper vi dig vidare.
            </p>
            <a
              href={EVENT.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-cream font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <InstagramIcon size={18} /> Skriv till oss på Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
