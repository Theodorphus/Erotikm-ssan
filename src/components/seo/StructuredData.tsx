import { EVENT } from '@/lib/data/event'

export function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: EVENT.name,
    description: EVENT.motto,
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
        addressLocality: EVENT.city,
        addressCountry: 'SE',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: EVENT.name,
      url: EVENT.siteUrl,
      email: EVENT.email,
    },
    offers: {
      '@type': 'Offer',
      url: EVENT.links.tickets,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
