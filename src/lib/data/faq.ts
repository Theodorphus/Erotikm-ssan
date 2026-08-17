import { EVENT } from './event'

/**
 * Vanliga frågor – visas i en dragspels-sektion på startsidan och används
 * även som strukturerad data (FAQPage) för Google.
 *
 * 👉 Lägg till / ta bort frågor genom att redigera listan nedan. Håll svaren
 *    korta och konkreta. Svaren får inte innehålla HTML (ren text).
 */
export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'När och var äger Erotikmässan rum?',
    answer: `Erotikmässan hålls ${EVENT.dateText} på ${EVENT.venue} i ${EVENT.city}. Öppettider: ${EVENT.openingHours}.`,
  },
  {
    question: 'Var köper jag biljett?',
    answer:
      'Förköp din biljett online och slipp köa. Entrébiljetter går även att köpa på plats vid mässans entré – betalning kan ske med kort eller kontant. Du kan välja biljett för fredag, lördag eller ett 2-dagarspass, i nivåerna Standard och Premium VIP. Se alla priser på biljettsidan.',
  },
  {
    question: 'Finns det en åldersgräns?',
    answer: `Ja, mässan är en vuxenmässa med ${EVENT.minAge}-årsgräns. Ta med giltig legitimation – den kan kontrolleras i entrén.`,
  },
  {
    question: 'Vad ingår i VIP-biljetten?',
    answer:
      'Premium VIP ger dig allt i Standard plus välkomstglas bubbel, goodiebag, tillgång till VIP-avdelningen med egen servitris och ett inhägnat område intill stora scenen.',
  },
  {
    question: 'Vad kan jag uppleva på mässan?',
    answer:
      'Heta scenshower och uppträdanden, ett trettiotal utställare med allt från erotiska produkter till mode, samt tatuering och piercing på plats. Det här är en erotik- och tattoomässa – tatuerare och studios finns på plats hela helgen.',
  },
  {
    question: 'Kan jag boka en av era artister till mitt eget event?',
    answer:
      'Ja. Gå till sidan "Boka artist av oss" och hör av dig via vårt Instagram-konto, så återkommer vi med tillgänglighet och pris.',
  },
  {
    question: 'Jag vill ställa ut eller jobba på mässan – hur gör jag?',
    answer: `Roligt att du är intresserad! Skicka en förfrågan via vårt kontaktformulär eller mejla ${EVENT.email}, så hör vi av oss med mer information om utställarplatser och samarbeten.`,
  },
]
