/**
 * Gemensamma uppgifter för Erotikmässan.
 * Importera härifrån i stället för att hårdkoda datum, länkar eller siffror.
 *
 * 👉 ALLT SOM JOHAN KAN BEHÖVA ÄNDRA LIGGER HÄR – datum, biljettlänk,
 *    sociala medier och besökarsiffran. Inga andra filer behöver röras.
 */
export const EVENT = {
  name: 'Erotikmässan',
  shortName: 'Erotikmässan',
  tagline: 'Lust · Kunskap · Livsnjutning',
  motto: 'Sveriges mässa för en sund och njutningsfull sexualitet',

  /** Mässans datum (ISO). Nedräknaren räknar mot startdatumet. */
  startDate: '2026-09-11T10:00:00+02:00',
  endDate: '2026-09-12T18:00:00+02:00',
  /** Människovänlig datumtext som visas i UI. */
  dateText: '11–12 september 2026',

  /** Plats. */
  venue: 'Globen, lokal 12',
  city: 'Stockholm',

  /**
   * Total besökarsiffra (marknadsföring).
   * OBS: Detta är en redigerbar totalsiffra – uppdatera efter varje mässa.
   * ❓ Inväntar Johans bekräftelse på exakt siffra och formulering.
   */
  visitorsTotal: 50000,
  visitorsLabel: 'besökare sedan starten',

  /** Kontakt – mejl som frågeformuläret skickas till. */
  email: 'info@erotikmassan.com',
  siteUrl: 'https://www.erotikmassan.com',

  /**
   * Externa länkar (allt biljett-/bokningsflöde sker hos tredje part).
   * ❓ Biljettolänken är en platshållare tills Johan delar rätt URL.
   */
  links: {
    tickets: 'https://billetto.se/',           // ❓ Johans Billetto-event-URL
    bookArtist: 'https://www.instagram.com/',  // ❓ Instagram-konto för artistbokning
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
  },
} as const
