/**
 * Biljettyperna som presenteras på /biljetter.
 * Själva köpet sker hos Billetto – knappen länkar dit (EVENT.links.tickets).
 *
 * 👉 Ändra pris/förmåner här. Sätt featured: true på den biljett som ska lyftas fram.
 *    Sätt limited till ett antal för att visa "begränsat antal"-etikett.
 *
 * ❓ Billetto-länken är ännu inte upplagd för september – biljettknapparna
 *    pekar tills vidare till Billettos startsida.
 */
export interface TicketType {
  name: string
  /** Pris i SEK (visas formaterat). Sätt null för "Se Billetto". */
  price: number | null
  /** Kort beskrivning av biljetten. */
  description: string
  /** Vad som ingår – visas som punktlista. */
  perks: string[]
  /** Markera den biljett som ska framhävas visuellt. */
  featured?: boolean
  /** Valfri etikett, t.ex. "Begränsat antal" eller "400 st". */
  badge?: string
  /** Vilken dag biljetten gäller – används för att gruppera korten. */
  group: 'Fredag' | 'Lördag' | '2-dagarspass'
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
    price: 1100,
    description: 'Det lilla extra – för dig som vill njuta av kvällen fullt ut.',
    perks: PREMIUM_PERKS,
    featured: true,
    group: 'Fredag',
  },
  // ── Lördag ──────────────────────────────────────────────────────────
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
    price: 1100,
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
    price: 2000,
    description: 'Hela VIP-upplevelsen båda kvällarna.',
    perks: PREMIUM_PERKS,
    featured: true,
    group: '2-dagarspass',
  },
]

/** Ordningen som biljettgrupperna visas i på sidan. */
export const TICKET_GROUPS: TicketType['group'][] = ['Fredag', 'Lördag', '2-dagarspass']

/** Informationsrad som visas under biljettkorten. */
export const TICKETS_NOTE =
  'Förköp – slipp köa! Vi säljer alltid biljetter i dörren också. Köp och betalning online hanteras tryggt av Billetto.'
