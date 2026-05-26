import { defineField, defineType } from 'sanity'

export const arcEvent = defineType({
  name: 'arcEvent',
  title: 'Arc Social Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: '1–3 sentences about the event shown on the website',
    }),
    defineField({
      name: 'poster',
      title: 'Event Poster',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload the event poster — shown as the event card image',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket Link',
      type: 'url',
      description: 'Link to the ticket website (leave empty if free or no booking needed)',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      poster: 'poster',
    },
    prepare({ title, date, poster }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No date set',
        media: poster,
      }
    },
  },

  orderings: [
    {
      title: 'Date (soonest first)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
})
