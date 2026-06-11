/**
 * Biljettyperna som presenteras på /biljetter.
 * Själva köpet sker hos Billetto – knappen länkar dit (EVENT.links.tickets).
 *
 * Priserna är hämtade från nuvarande www.erotikmassan.com (vårens mässa).
 * ❓ Bekräfta med Johan: gäller samma priser i september? Finns helg-/VIP-biljett?
 *
 * 👉 Ändra pris/förmåner här. Sätt featured: true på den biljett som ska lyftas fram.
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
    name: 'Fredagsbiljett',
    price: 250,
    description: 'Entré till mässan under fredagen.',
    perks: ['Entré fredag', 'Alla utställare', 'Scenshower & uppträdanden'],
  },
  {
    name: 'Lördagsbiljett',
    price: 300,
    description: 'Entré till mässan under lördagen – kvällens stora shower.',
    perks: ['Entré lördag', 'Alla utställare', 'Scenshower & uppträdanden', 'Huvudakt på stora scenen'],
    featured: true,
  },
]

/** Informationsrad som visas under biljettkorten. */
export const TICKETS_NOTE =
  'Förköp – slipp köa! Vi säljer alltid biljetter i dörren också. Köp och betalning online hanteras tryggt av Billetto.'
