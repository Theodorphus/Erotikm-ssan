import { MapPin } from 'lucide-react'
import { EVENT } from '@/lib/data/event'

/**
 * Inbäddad Google Maps-karta som visar var mässan hålls.
 * Kräver ingen API-nyckel – använder Googles publika embed-läge (EVENT.mapsEmbedUrl).
 * Adressen under kartan är klickbar och öppnar vägbeskrivning i Google Maps.
 */
export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-surface ${className}`}>
      <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
        <iframe
          src={EVENT.mapsEmbedUrl}
          title={`Karta – ${EVENT.venue}, ${EVENT.venueStreet}, ${EVENT.city}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={EVENT.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-5 py-4 text-sm text-cream/80 transition-colors hover:bg-white/5 hover:text-brand-pink"
      >
        <MapPin size={18} className="flex-shrink-0 text-brand-pink" />
        <span>
          <strong className="text-cream">{EVENT.venue}</strong>, {EVENT.venueStreet}, {EVENT.city}
          <span className="mt-0.5 block text-xs text-cream/50">Öppna vägbeskrivning i Google Maps →</span>
        </span>
      </a>
    </div>
  )
}
