/**
 * Biljettyperna som presenteras på /biljetter.
 * Själva köpet sker på mässans egen biljettsida – knappen länkar dit
 * (EVENT.links.tickets → tickets.erotikmassan.com).
 *
 * 👉 Ändra pris/förmåner här. Sätt featured: true på den biljett som ska lyftas fram.
 *    Sätt limited till ett antal för att visa "begränsat antal"-etikett.
 *
 * 👉 url: valfri direktlänk (checkout-URL) till just den biljetten, så besökaren
 *    hamnar direkt på rätt biljett i stället för på biljettsystemets startsida.
 *    Fylls normalt i via Sanity per biljett; saknas den faller knappen tillbaka
 *    på den generella biljettsidan. OBS: dessa fallback-värden används bara om
 *    Sanity är tomt – de riktiga länkarna ska ligga i Sanity.
 */
export interface TicketType {
  name: string
  /** Pris i SEK (visas formaterat). Sätt null för "Se pris online". */
  price: number | null
  /** Kort beskrivning av biljetten. */
  description: string
  /** Vad som ingår – visas som punktlista. */
  perks: string[]
  /** Markera den biljett som ska framhävas visuellt. */
  featured?: boolean
  /** Valfri etikett, t.ex. "Begränsat antal" eller "400 st". */
  badge?: string
  /**
   * Valfri direktlänk till just denna biljett (checkout-URL). Sätts i Sanity.
   * Finns den → knappen går rakt dit. Saknas den → fallback till den
   * generella biljettsidan (EVENT.links.tickets).
   */
  url?: string
  /** Vilken dag/event biljetten gäller – används för att gruppera korten. */
  group: 'Fredag' | 'Lördag Dax' | 'Lördag' | '2-dagarspass'
}

// Återanvändbara förmånslistor (samma upplägg per dag).
const STANDARD_PERKS = ['Entré till mässan', 'Alla utställare', 'Scenshower & uppträdanden']
const PREMIUM_PERKS = [
  'Allt i Standard',
  'Välkomstglas bubbel',
  'Goodiebag',
  'Tillgång till VIP-avdelningen',
  'Egen servitris',
  'Inhägnat område vid stora scenen',
]

export const TICKET_TYPES: TicketType[] = [
  // ── Fredag ──────────────────────────────────────────────────────────
  {
    name: 'Early Bird Fredag',
    price: 350,
    description: 'Förköpspriset för dig som är snabb – begränsat antal.',
    perks: STANDARD_PERKS,
    badge: 'Endast 200 st',
    group: 'Fredag',
  },
  {
    name: 'Standard Fredag',
    price: 450,
    description: 'Ordinarie entrébiljett för fredagen.',
    perks: STANDARD_PERKS,
    group: 'Fredag',
  },
  {
    name: 'Premium VIP Fredag',
    price: 1200,
    description: 'Det lilla extra – för dig som vill njuta av kvällen fullt ut.',
    perks: PREMIUM_PERKS,
    featured: true,
    url: 'https://tickets.erotikmassan.com/checkout?order=272781be-f61c-425e-92b6-59c0ee448e74',
    group: 'Fredag',
  },
  // ── Lördag Dax-event (dagtid 15–18) ────────────────────────────────
  {
    name: 'Lördag Dax-event',
    price: 180,
    description: 'Dagseventet lördag kl. 15–18. Stripp­shower och hela mässan – dock utan sångartister/huvudakter.',
    perks: ['Entré till mässan', 'Alla utställare', 'Strippshower'],
    badge: 'Kl. 15–18',
    group: 'Lördag Dax',
  },
  // ── Lördag (kväll 19–03) ────────────────────────────────────────────
  {
    name: 'Early Bird Lördag',
    price: 350,
    description: 'Förköpspriset för dig som är snabb – begränsat antal.',
    perks: STANDARD_PERKS,
    badge: 'Endast 200 st',
    group: 'Lördag',
  },
  {
    name: 'Standard Lördag',
    price: 450,
    description: 'Ordinarie entrébiljett för lördagen.',
    perks: STANDARD_PERKS,
    group: 'Lördag',
  },
  {
    name: 'Premium VIP Lördag',
    price: 1200,
    description: 'Det lilla extra – för dig som vill njuta av kvällen fullt ut.',
    perks: PREMIUM_PERKS,
    featured: true,
    group: 'Lördag',
  },
  // ── 2-dagarspass (fre + lör) ────────────────────────────────────────
  {
    name: 'Standard 2 dagar',
    price: 800,
    description: 'Entré både fredag och lördag – till rabatterat pris.',
    perks: STANDARD_PERKS,
    group: '2-dagarspass',
  },
  {
    name: 'Premium VIP 2 dagar',
    price: 2200,
    description: 'Hela VIP-upplevelsen båda kvällarna.',
    perks: PREMIUM_PERKS,
    featured: true,
    group: '2-dagarspass',
  },
]

/** Ordningen som biljettgrupperna visas i på sidan. */
export const TICKET_GROUPS: TicketType['group'][] = ['Fredag', 'Lördag Dax', 'Lördag', '2-dagarspass']

/** Informationsrad som visas under biljettkorten. */
export const TICKETS_NOTE =
  'Förköp – slipp köa! Vi säljer alltid biljetter i dörren också. Köp och betalning online sker tryggt och säkert.'
