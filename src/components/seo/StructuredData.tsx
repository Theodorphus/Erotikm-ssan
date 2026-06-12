import { EVENT } from '@/lib/data/event'
import { TICKET_TYPES } from '@/lib/data/tickets'
import { FAQ_ITEMS } from '@/lib/data/faq'

/**
 * JSON-LD strukturerad data för Google. Två scheman:
 *  • Event – så mässan kan visas som ett evenemang i sökresultaten (datum,
 *    plats, biljettpriser).
 *  • FAQPage – ger chans till "rich results" med utfällbara frågor.
 */
export function StructuredData() {
  const ticketOffers = TICKET_TYPES.filter((t) => t.price !== null).map((t) => ({
    '@type': 'Offer',
    name: t.name,
    price: t.price,
    priceCurrency: 'SEK',
    url: EVENT.links.tickets,
    availability: 'https://schema.org/InStock',
    validFrom: EVENT.ticketsAvailableFrom,
  }))

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: EVENT.name,
    description: EVENT.motto,
    inLanguage: 'sv-SE',
    startDate: EVENT.startDate,
    endDate: EVENT.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: `${EVENT.siteUrl}/images/og/erotikmassan-og.png`,
    url: EVENT.siteUrl,
    location: {
      '@type': 'Place',
      name: EVENT.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: EVENT.venueStreet,
        postalCode: EVENT.venuePostalCode,
        addressLocality: EVENT.city,
        addressCountry: 'SE',
      },
    },
    ...(EVENT.guestArtist.name && {
      performer: { '@type': 'PerformingGroup', name: EVENT.guestArtist.name },
    }),
    organizer: {
      '@type': 'Organization',
      name: EVENT.brandName,
      alternateName: EVENT.name,
      url: EVENT.siteUrl,
      email: EVENT.email,
    },
    offers:
      ticketOffers.length > 0
        ? ticketOffers
        : {
            '@type': 'Offer',
            url: EVENT.links.tickets,
            priceCurrency: 'SEK',
            availability: 'https://schema.org/InStock',
            validFrom: EVENT.ticketsAvailableFrom,
          },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
