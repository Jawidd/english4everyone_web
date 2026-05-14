/**
 * src/lib/queries.ts
 *
 * All GROQ queries in one place.
 * GROQ is Sanity's query language — similar to GraphQL but simpler.
 * Centralising queries here means schema changes = one edit, not many.
 */

/** Fields projected for every activity — used in both list and detail views */
const ACTIVITY_FIELDS = `
  _id,
  title,
  date,
  category,
  summary,
  photos
`

/** All published activities, newest first */
export const ALL_ACTIVITIES_QUERY = `
  *[_type == "activity"] | order(date desc) {
    ${ACTIVITY_FIELDS}
  }
`

