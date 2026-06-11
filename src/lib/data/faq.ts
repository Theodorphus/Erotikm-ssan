import { EVENT } from './event'

/**
 * Vanliga frågor – visas i en dragspels-sektion på startsidan och används
 * även som strukturerad data (FAQPage) för Google.
 *
 * 👉 Lägg till / ta bort frågor genom att redigera listan nedan. Håll svaren
 *    korta och konkreta. Svaren får inte innehålla HTML (ren text).
 *
 * ❓ Vissa svar är preliminära tills Johan bekräftar (åldersgräns, öppettider,
 *    tillgänglighet m.m.).
 */
export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'När och var äger Erotikmässan rum?',
    answer: `Erotikmässan hålls ${EVENT.dateText} på ${EVENT.venue} i ${EVENT.city}. Exakta öppettider publiceras närmare mässan.`,
  },
  {
    question: 'Var köper jag biljett?',
    answer:
      'Förköp din biljett online via Billetto och slipp köa – men vi säljer alltid biljetter i dörren också. Fredagsbiljett 250 kr, lördagsbiljett 300 kr.',
  },
  {
    question: 'Finns det en åldersgräns?',
    answer:
      'Ja, mässan är en vuxenmässa med 18-årsgräns. Ta med giltig legitimation – den kan kontrolleras i entrén.',
  },
  {
    question: 'Vad kan jag uppleva på mässan?',
    answer:
      'Scenshower och uppträdanden, ett trettiotal utställare med allt från erotiska produkter till mode, tatuering och piercing på plats, skönhetsvård, tävlingar och god mat och dryck.',
  },
  {
    question: 'Kan jag komma med husbil eller husvagn?',
    answer:
      'Ja! Det finns gott om parkering och plats för husbilar och husvagnar i anslutning till mässområdet.',
  },
  {
    question: 'Kan jag boka en av era artister till mitt eget event?',
    answer:
      'Ja. Via vår samarbetspartner Swedishstripp kan du boka uppträdande artister till privata evenemang – nämn att du kommer från oss så får du 10 % rabatt. Se sidan "Boka artist av oss".',
  },
  {
    question: 'Jag vill ställa ut eller jobba på mässan – hur gör jag?',
    answer: `Roligt att du är intresserad! Skicka en förfrågan via vårt kontaktformulär eller mejla ${EVENT.email}, så hör vi av oss med mer information om utställarplatser och samarbeten.`,
  },
]
