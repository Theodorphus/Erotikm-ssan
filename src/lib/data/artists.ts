/**
 * Artister som presenteras på mässan – renderas "en efter en" på /artister.
 *
 * 👉 SÅ HÄR LÄGGER DU TILL / TAR BORT EN ARTIST:
 *    • Lägg till: kopiera ett block { ... } och ändra slug + uppgifter.
 *    • Ta bort: radera hela blocket { ... } (inklusive kommatecknet efter).
 *    • slug måste vara unik och i kebab-case (små bokstäver, bindestreck).
 *    • Bilder läggs i /public/images/artists/ och refereras med
 *      image: '/images/artists/filnamn.jpg'. Utelämna image för platshållare.
 *
 * Artisterna nedan är hämtade från nuvarande www.erotikmassan.com.
 * ❓ Bekräfta med Johan att samma uppställning gäller för september-mässan,
 *    och be om pressbilder på varje artist.
 */
export interface Artist {
  /** Unikt id (kebab-case), används som anchor/nyckel. */
  slug: string
  name: string
  /** Kort etikett, t.ex. "Dansare", "Artist", "Poledansare". */
  role: string
  /** Presentationstext. */
  bio: string
  /** Sökväg till bild i /public, eller utelämna för platshållare. */
  image?: string
  /** Valfri länk (t.ex. artistens Instagram). */
  link?: string
}

export const ARTISTS: Artist[] = [
  {
    slug: 'nenne-frisk',
    name: 'Nenne Frisk',
    role: 'Musikartist',
    bio: 'Influencern som gick från on the rise till on fire – nu aktuell som musikartist med låtar som "Jag är fucking Nenne" och "Unga ikväll". Full karisma, full kontroll. Gästuppträdande på fredagen och full show på lördagen, på stora scenen.',
    link: 'https://www.instagram.com/nennefriisk',
  },
  {
    slug: 'ella-x',
    name: 'Ella X',
    role: 'Dansare',
    bio: 'Ella X är tillbaka på hemmaplan – redo att ta scenen med storm! Direkt från hjärtat av Skåne kliver Ella X upp på scenen med sitt unika uttryck och heta energi.',
    link: 'https://www.instagram.com/star.ellax',
  },
  {
    slug: 'aline',
    name: 'Aline',
    role: 'Dansare',
    bio: 'Mässans äkta ginger! Med fart och fläkt sätter hon igång publiken med sin show. Aline uppträder till vardags på Chat Noir i Göteborg, Dreams Bar i Trondheim och via Svensk Stripp.',
    link: 'https://www.instagram.com/evolution.aline',
  },
  {
    slug: 'nat-cosmic',
    name: 'Nat Cosmic',
    role: 'Poledansare',
    bio: 'Med fem år i branschen och tävlingar runt om i världen är Nat Cosmic allt annat än ny på stolpen. Hennes stil: rå sensualitet möter total kontroll. Mjuk, graciös och fullständigt självklar i varje rörelse.',
    link: 'https://www.instagram.com/cosmicp0le',
  },
  {
    slug: 'cassie',
    name: 'Cassie',
    role: 'Artist',
    bio: 'Erotikmässans nya tillskott och självklara stjärna. Med en skönhet som få och ett fängslande uttryck med rötter från Mellanöstern kliver hon fram som en kraft att räkna med. 3,5 år i branschen med uppträdanden på klubbar i Sverige, Köpenhamn och Prag.',
    link: 'https://www.instagram.com/cassi_noir',
  },
  {
    slug: 'angela-jonasson',
    name: 'Angela Jonasson',
    role: 'Dansare',
    bio: 'Fräck. Sensuell. Oemotståndlig. Hon rör sig över scenen med en självklar grace och en energi som går rakt igenom publiken – och hon twerkar som ingen annan.',
    link: 'https://www.instagram.com/angela_jonasson777',
  },
  {
    slug: 'elektra-neon',
    name: 'Elektra Neon',
    role: 'Burlesque & poledans',
    bio: 'Från Norge kommer Elektra Neon med många års erfarenhet av striptease, burlesque och modellande – kombinerat med ett helt liv av dans. Stolsakrobatik, pole tricks, förförisk floorwork och fängslande teatralik är hennes specialiteter.',
  },
  {
    slug: 'dominic-black',
    name: 'Dominic Black',
    role: 'Dansare',
    bio: 'Internationell erotisk dansare med över 11 år av uppträdanden världen över – Lettland, Frankrike, Amsterdam, Spanien, Belgien, Finland, Norge, Rumänien med flera. Ursprungligen från Portugal, numera baserad i Storbritannien. Även modell och personlig tränare.',
    link: 'https://www.instagram.com/dominicblackstripper',
  },
  {
    slug: 'seven',
    name: 'Seven',
    role: 'Dansare',
    bio: 'Vår egen Lucky Number Seven! Vår mörka skönhet som garanterat imponerar på alla. Med erfarenhet från USA bjuder hon på poledans och moves utöver det vanliga.',
    link: 'https://www.instagram.com/rebel4this',
  },
  {
    slug: 'moa',
    name: 'Moa',
    role: 'Poledansare',
    bio: 'Helt ny på Erotikmässan – men redan självklar på scen. Moa lever och andas pole dance. Med styrka, smidighet och total kontroll tar hon kommandot över stolpen. Har tävlat i poledance i både Sverige och Italien.',
    link: 'https://www.instagram.com/_moamjau',
  },
  {
    slug: 'melody',
    name: 'Melody',
    role: 'Artist',
    bio: 'Melody har arbetat som artist i över 4–5 år och uppträtt på klubbar runt om i Sverige samt internationellt. Hon förför med elegans och är magisk i sitt uttryck.',
    link: 'https://www.instagram.com/milfymelody',
  },
]
