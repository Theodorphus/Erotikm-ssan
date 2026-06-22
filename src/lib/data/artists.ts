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
 * Artisterna nedan är ett urval från nuvarande www.erotikmassan.com.
 * ❓ Listan justeras inför september – några byts ut och några tillkommer.
 *    Be om pressbilder på varje artist.
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
    slug: 'aline',
    name: 'Aline',
    role: 'Dansare',
    bio: 'Mässans äkta ginger! Med fart och fläkt sätter hon igång publiken med sin show. Aline uppträder till vardags på Chat Noir i Göteborg, Dreams Bar i Trondheim och via Svensk Stripp.',
    image: '/images/artists/aline.jpg',
    link: 'https://www.instagram.com/evolution.aline',
  },
  {
    slug: 'cassie',
    name: 'Cassie',
    role: 'Artist',
    bio: 'Erotikmässans nya tillskott och självklara stjärna. Med en skönhet som få och ett fängslande uttryck med rötter från Mellanöstern kliver hon fram som en kraft att räkna med. 3,5 år i branschen med uppträdanden på klubbar i Sverige, Köpenhamn och Prag.',
    image: '/images/artists/cassie.jpg',
    link: 'https://www.instagram.com/cassi_noir',
  },
  {
    slug: 'angela-jonasson',
    name: 'Angela Jonasson',
    role: 'Dansare',
    bio: 'Fräck. Sensuell. Oemotståndlig. Hon rör sig över scenen med en självklar grace och en energi som går rakt igenom publiken – och hon twerkar som ingen annan.',
    image: '/images/artists/angela-jonasson.jpg',
    link: 'https://www.instagram.com/angela_jonasson777',
  },
  {
    slug: 'dominic-black',
    name: 'Dominic Black',
    role: 'Dansare',
    bio: 'Internationell erotisk dansare med över 11 år av uppträdanden världen över – Lettland, Frankrike, Amsterdam, Spanien, Belgien, Finland, Norge, Rumänien med flera. Ursprungligen från Portugal, numera baserad i Storbritannien. Även modell och personlig tränare.',
    image: '/images/artists/dominic-black.png',
    link: 'https://www.instagram.com/dominicblackstripper',
  },
  {
    slug: 'seven',
    name: 'Seven',
    role: 'Dansare',
    bio: 'Vår egen Lucky Number Seven! Vår mörka skönhet som garanterat imponerar på alla. Med erfarenhet från USA bjuder hon på poledans och moves utöver det vanliga.',
    image: '/images/artists/seven.jpg',
    link: 'https://www.instagram.com/rebel4this',
  },
  {
    slug: 'melody',
    name: 'Melody',
    role: 'Artist',
    bio: 'Melody har arbetat som artist i över 4–5 år och uppträtt på klubbar runt om i Sverige samt internationellt. Hon förför med elegans och är magisk i sitt uttryck.',
    image: '/images/artists/melody.jpg',
    link: 'https://www.instagram.com/milfymelody',
  },
]
