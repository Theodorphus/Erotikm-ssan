/**
 * Gemensamma uppgifter för Erotikmässan.
 * Importera härifrån i stället för att hårdkoda datum, länkar eller siffror.
 *
 * 👉 ALLT SOM JOHAN KAN BEHÖVA ÄNDRA LIGGER HÄR – datum, biljettlänk,
 *    kontaktuppgifter och sociala medier. Inga andra filer behöver röras.
 */
export const EVENT = {
  name: 'Erotikmässan',
  shortName: 'Erotikmässan',
  /** Varumärkesnamn. Ett enda namn används överallt: Erotikmässan. */
  brandName: 'Erotikmässan',
  tagline: 'Lust · Spänning · Livsnjutning',
  motto: 'Originalet – Sveriges första och största erotik- & tattoomässa, sedan 1996',

  /** Mässans datum (ISO). Nedräknaren räknar mot startdatumet (fre kl 19). */
  startDate: '2026-09-11T19:00:00+02:00',
  endDate: '2026-09-13T03:00:00+02:00',
  /** Människovänlig datumtext som visas i UI. */
  dateText: '11–12 september 2026',

  /** Öppettider. Fre + lör kväll 19–03, plus lördagens Dax-event 15–18. */
  openingHours: 'Fre 19–03 · Lör 15–18 & 19–03',

  /** Plats: A75 Eventlokal på Arenavägen 75, i Globenområdet (Johanneshov), Stockholm. */
  venue: 'A75 Eventlokal',
  venueStreet: 'Arenavägen 75',
  venuePostalCode: '121 77',
  city: 'Stockholm',

  /** Åldersgräns. Visas tydligt på sajten. */
  minAge: 18,

  /**
   * Årets gästartist – lyfts fram i en egen ruta på startsidan.
   * 👉 Byt namn/text här inför varje mässa. Sätt name till '' för att dölja rutan.
   * ❓ Fröken Snusk är preliminärt bokad.
   */
  guestArtist: {
    name: 'Fröken Snusk',
    text: 'Årets stora gästartist intar stora scenen. Håll utkik – mer släpps snart!',
  },

  /** När biljetterna börjar säljas (ISO) – används i strukturerad data. */
  ticketsAvailableFrom: '2026-06-01T00:00:00+02:00',

  /**
   * Kontakt – mejl som frågeformuläret skickas till.
   * OBS: Telefonnummer visas medvetet INTE (för många samtal) – all kontakt
   * styrs till e-post. info@erotikmassan.com är landningsadressen som Johan
   * vidarebefordrar till sina övriga adresser.
   */
  email: 'info@erotikmassan.com',
  siteUrl: 'https://www.erotikmassan.com',

  /**
   * Externa länkar (allt biljett-/bokningsflöde sker hos tredje part).
   * ❓ Billetto: september-eventet är inte upplagt än – byt URL när Johan skapat det.
   * ❓ bookArtist: Johan ska byta till en egen Instagram-sida för bokning.
   * ❓ Facebook: Johan har inte skickat URL än (bara bild) – uppdatera när den kommer.
   */
  links: {
    tickets: 'https://billetto.se/',
    bookArtist: 'https://www.instagram.com/fair.erotica',
    facebook: 'https://www.facebook.com/fairerotica',
    instagram: 'https://www.instagram.com/fair.erotica',
    tiktok: 'https://www.tiktok.com/@fair.erotica',
  },
} as const
