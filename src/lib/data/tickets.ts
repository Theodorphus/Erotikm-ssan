/**
 * Biljettyperna som presenteras på /biljetter.
 * Själva köpet sker på mässans egen biljettsida – knappen länkar dit
 * (EVENT.links.tickets → tickets.erotikmassan.com).
 *
 * 👉 Ändra pris/förmåner här. Sätt featured: true på den biljett som ska lyftas fram.
 *    Sätt limited till ett antal för att visa "begränsat antal"-etikett.
 *
 * Obs: biljettsystemet stödjer inte djuplänk till en förvald biljett – alla
 * köpknappar går till event-sidan (EVENT.links.tickets), där besökaren väljer
 * antal i systemets egen biljettmodal.
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
  'Förköp – slipp köa! Köp och betalning online sker tryggt och säkert.'

/**
 * Biljettförsäljning i entrén. Lyfts i en egen ruta på /biljetter – kunden
 * vill att det tydligt framgår att man kan köpa på plats, och hur man betalar.
 */
export const DOOR_SALES_NOTE =
  'Entrébiljetter går även att köpa på plats vid mässans entré. Betalning kan ske med kort eller kontant.'

/** Betalsätt som accepteras i entrén – visas som etiketter under rutan. */
export const DOOR_SALES_METHODS = ['Kort', 'Kontant'] as const
