import { defineField, defineType } from 'sanity'

export const exhibitor = defineType({
  name: 'exhibitor',
  title: 'Utställare',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Namn',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (unik id)',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivning',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Logotyp / bild',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'website',
      title: 'Webbplats',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Sorteringsordning',
      type: 'number',
      description: 'Lägre nummer visas först.',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Ordning', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'website', media: 'image' },
  },
})
