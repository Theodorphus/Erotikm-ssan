/**
 * Utställare som presenteras på mässan – renderas "en efter en" på /utstallare.
 *
 * 👉 SÅ HÄR LÄGGER DU TILL / TAR BORT EN UTSTÄLLARE:
 *    • Lägg till: kopiera ett block { ... } och ändra slug + uppgifter.
 *    • Ta bort: radera hela blocket { ... } (inklusive kommatecknet efter).
 *    • slug måste vara unik och i kebab-case (små bokstäver, bindestreck).
 *    • Logotyper/bilder läggs i /public/images/exhibitors/ och refereras med
 *      image: '/images/exhibitors/filnamn.png'. Utelämna image för platshållare.
 *
 * Utställarna nedan är hämtade från nuvarande www.erotikmassan.com.
 * ❓ Bekräfta med Johan att listan gäller september-mässan, och be om logotyper.
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
    slug: 'vampire-of-sweden',
    name: 'Vampire Of Sweden',
    description:
      'Professionell dominatrix som erbjuder strukturerade och genomtänkta dominaupplevelser som bygger på samtycke, säkerhet, tydliga ramar och hög professionell integritet.',
    website: 'https://vampireofsweden.com',
  },
  {
    slug: 'roman-kartashov',
    name: 'Roman Kartashov',
    description:
      'Bildkonstnär från Sverige som arbetar med erotisk realism och visuell satir – med fokus på kött, fetisch, absurditet och humor.',
    website: 'https://kartashov.se',
  },
  {
    slug: 'bdsmkastellet',
    name: 'BDSMkastellet',
    description:
      'Södra Sveriges största mötesplats för BDSM-utövare och likasinnade. Avslappnad klubbmiljö med lekrum, bar och matförsäljning.',
    website: 'https://bdsmkastellet.com',
  },
  {
    slug: 'froken-fredrika',
    name: 'Fröken Fredrika',
    description:
      'Webbutik med stort urval av porriga kläder och sexleksaker – allt till bästa pris och kvalitet.',
    website: 'https://frokenfredrika.se',
  },
  {
    slug: 'the-isle',
    name: 'The Isle – Leather and Things',
    description:
      'Tillverkare av BDSM- och fetischprodukter i läder, trä och gummi sedan 1980-talet. Fokus på hållbarhet och funktion, kombinerat med egen design.',
    website: 'https://theisle.shop',
  },
  {
    slug: 'studio-artcore-tattoo',
    name: 'Jonas – Studio Artcore Tattoo',
    description:
      'Prisvinnande tatuerare med många år i branschen som behärskar de flesta stilar. Medlem i SRT och innehar gesällbrev.',
    website: 'https://www.instagram.com/jonas_studioartcoretattoo',
  },
  {
    slug: 'hooked-on-a-feeling',
    name: 'Hooked on a Feeling',
    description: 'Specialister inom body suspension – upplev konstformen på plats under mässan.',
    website: 'https://hooked.se',
  },
  {
    slug: 'big-city-tattoo',
    name: 'Big City Tattoo',
    description: 'Tattoo, body piercing och body modification under samma tak.',
    website: 'https://bigcitytattoo.se',
  },
  {
    slug: 'erotic-master',
    name: 'Erotic Master',
    description:
      'Presenterar märket Master of Desire – skandinavisk design med produkter för män, kvinnor och par.',
    website: 'https://eroticmaster.dk',
  },
  {
    slug: 'skofeber',
    name: 'Skofeber',
    description: 'Skor, stövlar och högklackat i alla modeller och storlekar.',
    website: 'https://skofeber.se',
  },
  {
    slug: 'kink-and-play',
    name: 'Kink and Play',
    description:
      'Webbutik med stort sortiment av produkter för lek, njutning och utforskande – för både nybörjare och erfarna.',
    website: 'https://kinkandplay.se',
  },
  {
    slug: 'anonymous-ink',
    name: 'Anonymous Ink',
    description:
      'Drop-in-tatueringar, unika designs och internationella artister – redo att tatuera dig på plats under mässan.',
    website: 'https://anonymousink.base44.app',
  },
  {
    slug: 'island-of-pirates',
    name: 'Island of Pirates',
    description:
      'Internationell tatueringskedja grundad 2004 med erfarna och professionella tatuerare inom alla stilar. Studios i Laholm, Hässleholm, Växjö och Helsingborg.',
    website: 'https://www.instagram.com/pirateislandtattoohelsingborg',
  },
  {
    slug: 'tattoobentzer',
    name: 'Tattoobentzer',
    description: 'Tatuerare med 17 års erfarenhet som driver egen studio sedan 2008.',
    website: 'https://www.instagram.com/tattoobentzer',
  },
  {
    slug: 'evil-anders',
    name: 'Evil Anders',
    description: 'Piercare med 30 års erfarenhet. Studios i Halmstad, Varberg och Värnamo.',
  },
  {
    slug: 'passionerat',
    name: 'Passionerat',
    description:
      'Sexbutik i Halmstad med 20 år i branschen och mer än 2000 produkter i lager.',
    website: 'https://passionerat.se',
  },
  {
    slug: 'kinkystuff',
    name: 'Kinkystuff',
    description:
      'Estetiska BDSM-paddlar i resin, mini-paddelnyckelringar och BDSM-smycken.',
    website: 'https://kinkystuff.se',
  },
  {
    slug: 'pauls-limo',
    name: 'Pauls Limo',
    description:
      'Limousinservice som tar alla sorters sällskap till fest, bal, student eller bröllop – bilen tar 8 passagerare.',
  },
  {
    slug: 'swedish-stripp',
    name: 'Swedish Stripp',
    description:
      'Stripp, showdans och underhållning i en miljö som du själv väljer. Mässans partner för artistbokning.',
    website: 'https://swedishstripp.com',
  },
  {
    slug: 'svenskstrippformedling',
    name: 'Svenskstrippförmedling',
    description: 'Hos oss hyr du strippan till festen.',
    website: 'https://www.svenskstripp.com',
  },
  {
    slug: 'club-heartbeat',
    name: 'Club Heartbeat',
    description:
      'En förtrollad värld av skönhet och lyx – förstklassiga shower och njutbart sällskap.',
    website: 'http://www.clubheartbeat.se',
  },
]
