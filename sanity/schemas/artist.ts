import { defineField, defineType } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artist',
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
      name: 'role',
      title: 'Roll',
      type: 'string',
      description: 'T.ex. Dansare, Artist, Poledansare.',
    }),
    defineField({
      name: 'bio',
      title: 'Presentationstext',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Länk (t.ex. Instagram)',
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
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
})
