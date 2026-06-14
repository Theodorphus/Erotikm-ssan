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
import { EVENT } from './data/event'
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
}

export async function getTickets(): Promise<TicketType[]> {
  const data = await safeFetch<SanityTicket[]>(
    `*[_type == "ticket"]|order(order asc){ name, price, description, perks, badge, featured }`
  )
  if (!data || data.length === 0) return TICKET_TYPES
  return data.map((t) => ({
    name: t.name,
    price: t.price ?? null,
    description: t.description ?? '',
    perks: t.perks ?? [],
    badge: t.badge,
    featured: t.featured,
  }))
}

// ── FAQ ───────────────────────────────────────────────────────────────
export async function getFaq(): Promise<FaqItem[]> {
  const data = await safeFetch<FaqItem[]>(
    `*[_type == "faqItem"]|order(order asc){ question, answer }`
  )
  if (!data || data.length === 0) return FAQ_ITEMS
  return data
}

// ── Mässans info (datum, tider, gästartist, länkar) ───────────────────
type SanityEventInfo = {
  dateText?: string
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
 */
export async function getEvent() {
  const info = await safeFetch<SanityEventInfo>(
    `*[_type == "eventInfo"][0]{ dateText, startDate, endDate, openingHours, guestArtistName, guestArtistText, ticketsUrl, bookArtistUrl, facebookUrl, instagramUrl, tiktokUrl }`
  )
  if (!info) return EVENT

  return {
    ...EVENT,
    dateText: info.dateText || EVENT.dateText,
    startDate: info.startDate || EVENT.startDate,
    endDate: info.endDate || EVENT.endDate,
    openingHours: info.openingHours || EVENT.openingHours,
    guestArtist: {
      name: info.guestArtistName ?? EVENT.guestArtist.name,
      text: info.guestArtistText || EVENT.guestArtist.text,
    },
    links: {
      ...EVENT.links,
      tickets: info.ticketsUrl || EVENT.links.tickets,
      bookArtist: info.bookArtistUrl || EVENT.links.bookArtist,
      facebook: info.facebookUrl || EVENT.links.facebook,
      instagram: info.instagramUrl || EVENT.links.instagram,
      tiktok: info.tiktokUrl || EVENT.links.tiktok,
    },
  }
}

export type EventData = Awaited<ReturnType<typeof getEvent>>
