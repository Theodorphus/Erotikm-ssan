/**
 * Elegant platshållare när en artist/utställare ännu saknar bild.
 * Visar initialen i en mjuk rosa gradient i stället för en ensam grå ikon,
 * så sidorna ser färdiga ut redan innan Johans riktiga pressbilder är på plats.
 *
 * 👉 När en riktig bild läggs in (artist.image / exhibitor.image) används den
 *    automatiskt i stället – den här komponenten visas bara som fallback.
 */
export function ImagePlaceholder({ name }: { name: string }) {
  // Första bokstaven (versal), faller tillbaka till en neutral symbol.
  const initial = name?.trim()?.[0]?.toUpperCase() ?? '★'
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-pink via-surface-2 to-ink"
      aria-hidden="true"
    >
      {/* Mjuk glöd bakom initialen */}
      <span className="absolute h-24 w-24 rounded-full bg-brand-pink/25 blur-2xl" />
      <span className="relative font-display text-5xl font-extrabold text-brand-pink-light/90 select-none">
        {initial}
      </span>
    </div>
  )
}
