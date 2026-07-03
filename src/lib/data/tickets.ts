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
}

export const TICKET_TYPES: TicketType[] = [
  {
    name: 'Early Bird',
    price: 350,
    description: 'Förköpspriset för dig som är snabb – begränsat antal.',
    perks: ['Entré till mässan', 'Alla utställare', 'Scenshower & uppträdanden'],
    badge: 'Endast 200 st per dag',
  },
  {
    name: 'Standard',
    price: 450,
    description: 'Ordinarie entrébiljett till mässan.',
    perks: ['Entré till mässan', 'Alla utställare', 'Scenshower & uppträdanden'],
  },
  {
    name: 'Premium VIP',
    price: 1100,
    description: 'Det lilla extra – för dig som vill njuta av kvällen fullt ut.',
    perks: [
      'Allt i Standard',
      'Välkomstglas bubbel',
      'Goodiebag',
      'Tillgång till VIP-avdelningen',
      'Egen servitris',
      'Inhägnat område vid stora scenen',
    ],
    featured: true,
  },
]

/** Informationsrad som visas under biljettkorten. */
export const TICKETS_NOTE =
  'Förköp – slipp köa! Vi säljer alltid biljetter i dörren också. Köp och betalning online hanteras tryggt av Billetto.'
