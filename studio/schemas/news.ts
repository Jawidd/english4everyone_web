import { defineField, defineType } from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      description: 'Auto-generated from the title — used in the web address. Click "Generate".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 2,
      description: '1–2 sentences shown on news cards and the home page.',
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'text',
      rows: 12,
      description: 'Main article text. You can use **bold**, *italic*, and - bullet lists (basic markdown).',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'One optional photo shown at the top of the article.',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link text',
      type: 'string',
      description: 'Optional — the clickable text for a link (e.g. "Read the full report").',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Optional — the URL the link points to. Leave both link fields empty if not needed.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      photo: 'photo',
    },
    prepare({ title, date, photo }) {
      const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      return {
        title,
        subtitle: date ? fmt(date) : 'No date',
        media: photo,
      }
    },
  },

  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
