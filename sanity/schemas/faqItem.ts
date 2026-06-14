import { defineField, defineType } from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Vanlig fråga (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Fråga',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Svar',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
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
  preview: { select: { title: 'question' } },
})
