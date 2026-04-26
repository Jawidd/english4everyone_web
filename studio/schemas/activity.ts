/**
 * activity.ts — Sanity schema for Activity Feed entries
 *
 * Each activity is a community event, social gathering, trip, or class event.
 * Staff create/edit these in Sanity Studio at localhost:3333 or sanity.studio.
 * The React app fetches them via GROQ query — no rebuild needed on content change.
 */
import { defineField, defineType } from 'sanity'
import { CompressedImageInput } from '../components/CompressedImageInput'

export const activity = defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Coffee & Conversation', value: 'coffee' },
          { title: 'Social Events', value: 'social' },
          { title: 'Trips & Walks', value: 'trips' },
          { title: 'Film Club', value: 'film' },
          { title: 'Book Club', value: 'book' },
          { title: 'Classes', value: 'classes' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 2,
      description: '1–2 sentences shown on the activity feed',
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'photos',
      title: 'Photos (up to 6)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        components: { input: CompressedImageInput },
      }],
      validation: (r) => r.max(6),
      description: 'Up to 6 photos — auto-compressed to max 1600px before upload',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Optional tags e.g. outdoor, food, learning',
    }),
  ],

  // Preview in Studio list view — uses first photo as thumbnail
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      photo0: 'photos.0',
    },
    prepare({ title, date, category, photo0 }) {
      return {
        title,
        subtitle: `${date ?? ''} · ${category ?? ''}`,
        media: photo0,
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
