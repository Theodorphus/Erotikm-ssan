/**
 * De tre biljettyperna som presenteras på /biljetter.
 * Själva köpet sker hos Billetto – knappen länkar dit (EVENT.links.tickets).
 *
 * ❓ Priser och förmåner är platshållare tills Johan bekräftar dem.
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
}

export const TICKET_TYPES: TicketType[] = [
  {
    name: 'Entrébiljett',
    price: 295,
    description: 'Tillträde till mässan en av dagarna.',
    perks: ['Entré en dag', 'Tillgång till alla utställare', 'Scenprogram'],
  },
  {
    name: 'Helgbiljett',
    price: 450,
    description: 'Tillträde båda mässdagarna.',
    perks: ['Entré båda dagarna', 'Tillgång till alla utställare', 'Scenprogram', 'Återinträde'],
    featured: true,
  },
  {
    name: 'VIP-biljett',
    price: 795,
    description: 'Det lilla extra – för dig som vill ha förtur och förmåner.',
    perks: ['Entré båda dagarna', 'Förtur till föreläsningar', 'VIP-lounge', 'Goodiebag'],
  },
]
