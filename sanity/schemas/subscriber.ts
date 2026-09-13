import { defineField, defineType } from 'sanity'

/**
 * Intresseanmälan till nästa mässa – en rad per e-postadress.
 *
 * Skapas automatiskt av /api/notify när någon fyller i formuläret på sajten.
 * Dokumenten är alltså inte tänkta att skapas för hand här i Studion; listan
 * finns här för att kunna läsas av och exporteras inför biljettsläppet.
 *
 * 👉 Exportera hela listan med Sanity CLI:
 *    npx sanity documents query '*[_type == "subscriber"].email'
 */
export const subscriber = defineType({
  name: 'subscriber',
  title: 'Intresseanmälningar',
  type: 'document',
  // Adresserna kommer från publiken – ingen ska redigera dem för hand.
  readOnly: true,
  fields: [
    defineField({ name: 'email', title: 'E-post', type: 'string' }),
    defineField({ name: 'createdAt', title: 'Anmäld', type: 'datetime' }),
    defineField({
      name: 'source',
      title: 'Källa',
      type: 'string',
      description: 'Vilken kampanj/sidversion anmälan kom från.',
    }),
  ],
  orderings: [
    {
      title: 'Senaste först',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'email', subtitle: 'createdAt' },
  },
})
