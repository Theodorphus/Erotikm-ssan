/**
 * Utställare som presenteras på mässan – renderas "en efter en" på /utstallare.
 *
 * 👉 Lägg till, ta bort eller redigera utställare här. Logotyper/bilder läggs i
 *    /public/images/exhibitors/ och refereras med "/images/exhibitors/filnamn.png".
 *
 * ❓ Innehåll är platshållare tills Johan skickar utställarlista, logotyper och texter.
 */
export interface Exhibitor {
  slug: string
  name: string
  /** Kort beskrivning av utställaren. */
  description: string
  /** Logotyp/bild i /public, eller utelämna för platshållare. */
  image?: string
  /** Valfri webbplatslänk. */
  website?: string
}

export const EXHIBITORS: Exhibitor[] = [
  {
    slug: 'utstallare-1',
    name: 'Utställare kommer snart',
    description: 'Presentation av utställaren fylls i när underlaget kommit från arrangören.',
  },
  {
    slug: 'utstallare-2',
    name: 'Utställare kommer snart',
    description: 'Presentation av utställaren fylls i när underlaget kommit från arrangören.',
  },
  {
    slug: 'utstallare-3',
    name: 'Utställare kommer snart',
    description: 'Presentation av utställaren fylls i när underlaget kommit från arrangören.',
  },
]
