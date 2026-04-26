/**
 * src/config/classes.ts
 *
 * Saturday class timetable data.
 * Used by the Home timetable section and the Classes page.
 * Updating times or levels = edit here only.
 */
import type { ClassSession } from '../types'

export const CLASS_SESSIONS: ClassSession[] = [
  {
    label: 'Morning',
    time: '9:00am – 11:00am',
    levels: [
      { level: 'ABC', tag: 'Absolute Beginner' },
      { level: 'Beginner', tag: 'Some English' },
      { level: 'Elementary', tag: 'Basic English' },
    ],
  },
  {
    label: 'Afternoon',
    time: '11:15am – 1:15pm',
    levels: [
      { level: 'Pre-Intermediate', tag: 'Getting better' },
      { level: 'Intermediate', tag: 'Good English' },
      { level: 'Advanced', tag: 'Very good English' },
    ],
  },
]

export const PAID_CLASS_FEATURES = [
  'Level assessment before you start',
  'Regular homework to practise at home',
  'End-of-course certificates',
] as const

export const ACTIVITIES = [
  { emoji: '☕', label: 'Coffee Gatherings' },
  { emoji: '🎬', label: 'Film Club' },
  { emoji: '📚', label: 'Book Club' },
  { emoji: '🚶', label: 'Country Walks' },
  { emoji: '⛺', label: 'Lake District Camping' },
  { emoji: '🎵', label: 'Songwriting Socials' },
  { emoji: '🍽️', label: 'End-of-Year Meals' },
  { emoji: '🎉', label: 'Birthday Celebrations' },
] as const
