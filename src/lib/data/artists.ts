/**
 * Artister som presenteras på mässan – renderas "en efter en" på /artister.
 *
 * 👉 Lägg till, ta bort eller redigera artister här. Bilder läggs i
 *    /public/images/artists/ och refereras med "/images/artists/filnamn.jpg".
 *
 * ❓ Innehåll är platshållare tills Johan skickar artistlista, bilder och texter.
 */
export interface Artist {
  /** Unikt id (kebab-case), används som anchor/nyckel. */
  slug: string
  name: string
  /** Kort etikett, t.ex. "Föreläsare", "Artist", "Expert". */
  role: string
  /** Presentationstext. */
  bio: string
  /** Sökväg till bild i /public, eller utelämna för platshållare. */
  image?: string
  /** Valfri länk (t.ex. artistens Instagram). */
  link?: string
}

export const ARTISTS: Artist[] = [
  {
    slug: 'artist-1',
    name: 'Artist kommer snart',
    role: 'Artist',
    bio: 'Presentation av artisten fylls i när underlaget kommit från arrangören. Här beskrivs vem artisten är och vad besökaren kan förvänta sig på mässan.',
  },
  {
    slug: 'artist-2',
    name: 'Artist kommer snart',
    role: 'Föreläsare',
    bio: 'Presentation av artisten fylls i när underlaget kommit från arrangören. Här beskrivs vem artisten är och vad besökaren kan förvänta sig på mässan.',
  },
  {
    slug: 'artist-3',
    name: 'Artist kommer snart',
    role: 'Expert',
    bio: 'Presentation av artisten fylls i när underlaget kommit från arrangören. Här beskrivs vem artisten är och vad besökaren kan förvänta sig på mässan.',
  },
]
