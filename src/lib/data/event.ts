/**
 * Gemensamma uppgifter för Erotikmässan.
 * Importera härifrån i stället för att hårdkoda datum, länkar eller siffror.
 *
 * 👉 ALLT SOM JOHAN KAN BEHÖVA ÄNDRA LIGGER HÄR – datum, biljettlänk,
 *    kontaktuppgifter och sociala medier. Inga andra filer behöver röras.
 *
 * Innehållet är hämtat från nuvarande www.erotikmassan.com (Fair Erotica).
 */
export const EVENT = {
  name: 'Erotikmässan',
  shortName: 'Erotikmässan',
  /** Varumärkesnamn som används internationellt/socialt. */
  brandName: 'Fair Erotica',
  tagline: 'Lust · Kunskap · Livsnjutning',
  motto: 'Originalet – Sveriges första och största erotikmässa, sedan 1996',

  /** Mässans datum (ISO). Nedräknaren räknar mot startdatumet. */
  startDate: '2026-09-11T10:00:00+02:00',
  endDate: '2026-09-12T23:59:00+02:00',
  /** Människovänlig datumtext som visas i UI. */
  dateText: '11–12 september 2026',

  /**
   * Plats. Mässan har hållits i Ekebo sedan 2009 (senast våren 2026).
   * ❓ Bekräfta att septembermässan också är i Ekebo + exakt adress.
   */
  venue: 'Ekebo Nöjescenter',
  venueStreet: 'Södra Ekebo 4083',
  venuePostalCode: '266 91',
  city: 'Munka-Ljungby',

  /** När biljetterna börjar säljas (ISO) – används i strukturerad data. */
  ticketsAvailableFrom: '2026-06-01T00:00:00+02:00',

  /**
   * Kontakt – mejl som frågeformuläret skickas till.
   * ❓ Gamla sajten använder Erotikmassan@gmail.com – vill Johan ha kvar den
   *    eller en adress på egna domänen (t.ex. info@erotikmassan.com)?
   */
  email: 'erotikmassan@gmail.com',
  phone: '+46 70 624 97 57',
  phoneHref: 'tel:+46706249757',
  siteUrl: 'https://www.erotikmassan.com',

  /**
   * Externa länkar (allt biljett-/bokningsflöde sker hos tredje part).
   * ❓ Billetto-länken nedan är till VÅRENS mässa – behöver bytas till
   *    september-eventets URL när Johan skapat det.
   */
  links: {
    tickets: 'https://billetto.se/e/erotic-event-ekebo-31-3-2023-biljetter-759068',
    /** Artistbokning sker via samarbetspartnern Swedishstripp (10 % rabatt vid omnämnande av Fair Erotica). */
    bookArtist: 'https://swedishstripp.com/',
    facebook: 'https://www.facebook.com/fairerotica',
    instagram: 'https://instagram.com/fair_erotic',
    youtube: 'https://www.youtube.com/channel/UCS3bTQSd3iYnnzvyGkp1law',
  },
} as const

/**
 * Samarbetspartners som visas på sajten.
 * 👉 Lägg till/ta bort rader här. Logotyper kan läggas i /public/images/partners/.
 */
export const PARTNERS: { name: string; url: string }[] = [
  { name: 'Swedish Stripp', url: 'https://swedishstripp.com/' },
  { name: 'Svenskstrippförmedling', url: 'https://www.svenskstripp.com/' },
  { name: 'Chat Noir', url: 'https://www.chatnoir.se/' },
  { name: 'Club Heartbeat', url: 'http://www.clubheartbeat.se/' },
]
