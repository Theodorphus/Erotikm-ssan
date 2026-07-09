import { defineField, defineType } from 'sanity'

/**
 * Singleton-dokument: själva mässans uppgifter som Johan ändrar inför varje år.
 * (Statiskt som namn, adress och varumärke ligger kvar i koden – EVENT i event.ts –
 *  och slås ihop med detta i lib/content.ts.)
 */
export const eventInfo = defineType({
  name: 'eventInfo',
  title: 'Mässans info',
  type: 'document',
  fields: [
    defineField({
      name: 'dateText',
      title: 'Datumtext (visas i UI)',
      type: 'string',
      description: 'T.ex. "11–12 september 2026".',
    }),
    defineField({
      name: 'startDate',
      title: 'Startdatum & tid',
      type: 'datetime',
      description: 'Nedräknaren räknar mot detta.',
    }),
    defineField({
      name: 'endDate',
      title: 'Slutdatum & tid',
      type: 'datetime',
    }),
    defineField({
      name: 'openingHours',
      title: 'Öppettider',
      type: 'string',
      description: 'T.ex. "Fre & lör kl. 18–02".',
    }),
    defineField({
      name: 'guestArtistName',
      title: 'Gästartist – namn',
      type: 'string',
      description: 'Lämna tomt för att dölja gästartist-rutan på startsidan.',
    }),
    defineField({
      name: 'guestArtistText',
      title: 'Gästartist – text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ticketsUrl',
      title: 'Biljettlänk (tickets.erotikmassan.com)',
      type: 'url',
    }),
    defineField({
      name: 'bookArtistUrl',
      title: 'Boka artist-länk (Instagram)',
      type: 'url',
    }),
    defineField({ name: 'facebookUrl', title: 'Facebook', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram', type: 'url' }),
    defineField({ name: 'tiktokUrl', title: 'TikTok', type: 'url' }),
  ],
  preview: {
    prepare: () => ({ title: 'Mässans info' }),
  },
})
