import { defineField, defineType } from 'sanity'

export const ticket = defineType({
  name: 'ticket',
  title: 'Biljettyp',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Namn',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Pris (SEK)',
      type: 'number',
      description: 'Lämna tomt för att visa "Se Billetto".',
    }),
    defineField({
      name: 'description',
      title: 'Kort beskrivning',
      type: 'string',
    }),
    defineField({
      name: 'perks',
      title: 'Vad ingår (punktlista)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'badge',
      title: 'Etikett',
      type: 'string',
      description: 'T.ex. "Endast 400 st" eller "Begränsat antal".',
    }),
    defineField({
      name: 'featured',
      title: 'Framhäv denna biljett',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sorteringsordning',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Ordning', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle != null ? `${subtitle} kr` : 'Se Billetto',
    }),
  },
})
