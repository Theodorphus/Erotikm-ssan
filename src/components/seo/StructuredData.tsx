import type { EventData } from '@/lib/content'
import type { TicketType } from '@/lib/data/tickets'
import type { FaqItem } from '@/lib/data/faq'

/**
 * JSON-LD strukturerad data för Google. Två scheman:
 *  • Event – så mässan kan visas som ett evenemang i sökresultaten (datum,
 *    plats, biljettpriser).
 *  • FAQPage – ger chans till "rich results" med utfällbara frågor.
 *
 * VIKTIGT: schemana matas med samma data som sidan faktiskt visar, dvs. det
 * som kommer ur src/lib/content.ts (Sanity med datafil-fallback). Läs aldrig
 * direkt från src/lib/data/ här – då börjar strukturdatan och den synliga
 * texten glida isär så fort någon redigerar innehållet i Studion, och Google
 * kräver att de stämmer överens.
 */
export function StructuredData({
  event,
  tickets,
}: {
  event: EventData
  tickets: TicketType[]
}) {
  const ticketOffers = tickets
    .filter((t) => t.price !== null)
    .map((t) => ({
      '@type': 'Offer',
      name: t.name,
      price: t.price,
      priceCurrency: 'SEK',
      url: event.links.tickets,
      availability: 'https://schema.org/InStock',
      validFrom: event.ticketsAvailableFrom,
    }))

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.motto,
    inLanguage: 'sv-SE',
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: `${event.siteUrl}/images/og/erotikmassan-og.png`,
    url: event.siteUrl,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venueStreet,
        postalCode: event.venuePostalCode,
        addressLocality: event.city,
        addressCountry: 'SE',
      },
    },
    ...(event.guestArtist.name && {
      performer: { '@type': 'PerformingGroup', name: event.guestArtist.name },
    }),
    organizer: {
      '@type': 'Organization',
      name: event.brandName,
      alternateName: event.name,
      url: event.siteUrl,
      email: event.email,
    },
    offers:
      ticketOffers.length > 0
        ? ticketOffers
        : {
            '@type': 'Offer',
            url: event.links.tickets,
            priceCurrency: 'SEK',
            availability: 'https://schema.org/InStock',
            validFrom: event.ticketsAvailableFrom,
          },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
    />
  )
}

/**
 * FAQPage-schemat. Renderas ENDAST på startsidan, där dragspelet med frågorna
 * faktiskt syns – Google kräver att FAQ-markup sitter på den sida som visar
 * frågorna, så den får inte flyttas till layouten.
 *
 * Ta emot `items` från sidans egen getFaq()-hämtning i stället för att hämta
 * på nytt, så kan schemat aldrig visa något annat än dragspelet.
 */
export function FaqStructuredData({ items }: { items: FaqItem[] }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}
