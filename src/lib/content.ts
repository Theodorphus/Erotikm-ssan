/**
 * Innehållslager: hämtar innehåll från Sanity om det är konfigurerat och har
 * data, annars faller tillbaka på datafilerna i src/lib/data/. Sidorna
 * importerar härifrån i stället för direkt från data-filerna eller Sanity.
 *
 * Detta gör övergången till CMS sömlös: innan Johans Sanity-projekt är
 * uppsatt/seedat fungerar sajten precis som förut.
 */
import type { SanityImageSource } from '@sanity/image-url'
import { sanityClient, urlForImage } from './sanity/client'
import { EVENT, POST_EVENT } from './data/event'
import { ARTISTS, type Artist } from './data/artists'
import { EXHIBITORS, type Exhibitor } from './data/exhibitors'
import { TICKET_TYPES, type TicketType } from './data/tickets'
import { FAQ_ITEMS, type FaqItem } from './data/faq'

/** Hämta från Sanity och svälj fel (t.ex. nät/konfig) → fallback istället. */
async function safeFetch<T>(query: string): Promise<T | null> {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch<T>(query)
  } catch (err) {
    console.error('Sanity fetch misslyckades, faller tillbaka på datafiler:', err)
    return null
  }
}

// ── Artister ──────────────────────────────────────────────────────────
type SanityArtist = {
  name: string
  slug: string
  role?: string
  bio?: string
  image?: SanityImageSource
  link?: string
}

export async function getArtists(): Promise<Artist[]> {
  const data = await safeFetch<SanityArtist[]>(
    `*[_type == "artist"]|order(order asc, name asc){ name, "slug": slug.current, role, bio, image, link }`
  )
  if (!data || data.length === 0) return ARTISTS
  return data.map((a) => ({
    slug: a.slug,
    name: a.name,
    role: a.role ?? '',
    bio: a.bio ?? '',
    image: urlForImage(a.image) ?? undefined,
    link: a.link,
  }))
}

// ── Utställare ────────────────────────────────────────────────────────
type SanityExhibitor = {
  name: string
  slug: string
  description?: string
  image?: SanityImageSource
  website?: string
}

export async function getExhibitors(): Promise<Exhibitor[]> {
  const data = await safeFetch<SanityExhibitor[]>(
    `*[_type == "exhibitor"]|order(order asc, name asc){ name, "slug": slug.current, description, image, website }`
  )
  if (!data || data.length === 0) return EXHIBITORS
  return data.map((e) => ({
    slug: e.slug,
    name: e.name,
    description: e.description ?? '',
    image: urlForImage(e.image) ?? undefined,
    website: e.website,
  }))
}

// ── Biljetter ─────────────────────────────────────────────────────────
type SanityTicket = {
  name: string
  price?: number | null
  description?: string
  perks?: string[]
  badge?: string
  featured?: boolean
  group?: TicketType['group']
}

export async function getTickets(): Promise<TicketType[]> {
  const data = await safeFetch<SanityTicket[]>(
    `*[_type == "ticket"]|order(order asc){ name, price, description, perks, badge, featured, group }`
  )
  if (!data || data.length === 0) return TICKET_TYPES
  return data.map((t) => ({
    name: t.name,
    price: t.price ?? null,
    description: t.description ?? '',
    perks: t.perks ?? [],
    badge: t.badge,
    featured: t.featured,
    group: t.group ?? 'Fredag',
  }))
}

// ── FAQ ───────────────────────────────────────────────────────────────

/**
 * Svar som blir felaktiga när mässan är genomförd, nycklade på ett ord som
 * identifierar frågan. Frågorna redigeras i Studion och kan vara omformulerade,
 * så matchningen sker löst (gemener, delsträng) i stället för på exakt text.
 *
 * Varför här och inte i datafilen: FAQ:n hämtas från Sanity, så texten i
 * src/lib/data/faq.ts används bara som fallback. Skrivs svaren om här gäller
 * de oavsett källa – och Johan slipper redigera dem för hand efter varje mässa.
 */
const PAST_FAQ_OVERRIDES: { match: (q: string) => boolean; answer: string }[] = [
  {
    match: (q) => q.includes('när och var'),
    answer:
      'Årets mässa är avslutad. Datum för nästa mässa släpps längre fram – lämna din '
      + 'e-post på startsidan så hör vi av oss så fort det är spikat.',
  },
  {
    match: (q) => q.includes('köper jag biljett') || q.includes('var köper'),
    answer:
      'Biljettförsäljningen för årets mässa är stängd. Nästa års biljetter släpps längre '
      + 'fram – lämna din e-post på startsidan så hör vi av oss vid släppet.',
  },
]

/** Skriv om tidskänsliga svar när mässan är genomförd. */
function applyPastFaq(items: FaqItem[]): FaqItem[] {
  return items.map((item) => {
    const q = item.question.toLowerCase()
    const override = PAST_FAQ_OVERRIDES.find((o) => o.match(q))
    return override ? { ...item, answer: override.answer } : item
  })
}

export async function getFaq(): Promise<FaqItem[]> {
  const data = await safeFetch<FaqItem[]>(
    `*[_type == "faqItem"]|order(order asc){ question, answer }`
  )
  const items = !data || data.length === 0 ? FAQ_ITEMS : data

  // Samma härledning som i getEvent – mässan är avslutad när endDate passerat.
  const event = await getEvent()
  return event.isPast ? applyPastFaq(items) : items
}

// ── Mässans info (datum, tider, gästartist, länkar) ───────────────────
type SanityEventInfo = {
  dateText?: string
  eventOver?: boolean
  startDate?: string
  endDate?: string
  openingHours?: string
  guestArtistName?: string
  guestArtistText?: string
  ticketsUrl?: string
  bookArtistUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  tiktokUrl?: string
}

/**
 * Slår ihop statiskt EVENT (namn, adress, varumärke) med de fält Johan kan
 * ändra i Sanity. Saknas Sanity-värde används EVENT som default.
 *
 * isPast styr sajtens "efter mässan"-läge (nedräknare → tack-ruta, nedtonade
 * biljettknappar, korrekt strukturerad data). Det härleds ur slutdatumet så
 * att övergången sker av sig själv – ingen behöver komma ihåg att klicka i
 * något dagen efter mässan. Kryssrutan i Sanity ("eventOver") kan tvinga
 * läget i förväg, t.ex. om mässan blir inställd eller slutsåld.
 *
 * Nästa år: när Johan sätter nya datum i Studion slår sajten automatiskt
 * tillbaka till försäljningsläge (så länge eventOver inte är ikryssad).
 */
export async function getEvent() {
  const info = await safeFetch<SanityEventInfo>(
    `*[_type == "eventInfo"][0]{ dateText, eventOver, startDate, endDate, openingHours, guestArtistName, guestArtistText, ticketsUrl, bookArtistUrl, facebookUrl, instagramUrl, tiktokUrl }`
  )

  const endDate = info?.endDate || EVENT.endDate
  // Mässan räknas som avslutad när slutdatumet passerat. Ogiltigt datum →
  // NaN → jämförelsen blir false, dvs. sajten stannar i försäljningsläge
  // hellre än att felaktigt visa "tack för i år".
  const ended = Date.parse(endDate) < Date.now()

  return {
    ...EVENT,
    dateText: info?.dateText || EVENT.dateText,
    startDate: info?.startDate || EVENT.startDate,
    endDate,
    openingHours: info?.openingHours || EVENT.openingHours,
    /** true = mässan är genomförd; sajten visar efter-mässan-läget. */
    isPast: info?.eventOver === true || ended,
    /** Texterna som visas i efter-mässan-läget. */
    postEvent: POST_EVENT,
    guestArtist: {
      name: info?.guestArtistName ?? EVENT.guestArtist.name,
      text: info?.guestArtistText || EVENT.guestArtist.text,
    },
    links: {
      ...EVENT.links,
      tickets: info?.ticketsUrl || EVENT.links.tickets,
      bookArtist: info?.bookArtistUrl || EVENT.links.bookArtist,
      facebook: info?.facebookUrl || EVENT.links.facebook,
      instagram: info?.instagramUrl || EVENT.links.instagram,
      tiktok: info?.tiktokUrl || EVENT.links.tiktok,
    },
  }
}

export type EventData = Awaited<ReturnType<typeof getEvent>>
