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
  "slug": slug.current,
  date,
  category,
  summary,
  thumbnail,
  photos,
  tags,
  body
`

/** All published activities, newest first */
export const ALL_ACTIVITIES_QUERY = `
  *[_type == "activity"] | order(date desc) {
    ${ACTIVITY_FIELDS}
  }
`

/** Single activity by slug */
export const ACTIVITY_BY_SLUG_QUERY = `
  *[_type == "activity" && slug.current == $slug][0] {
    ${ACTIVITY_FIELDS}
  }
`

/** Activities filtered by category */
export const ACTIVITIES_BY_CATEGORY_QUERY = `
  *[_type == "activity" && category == $category] | order(date desc) {
    ${ACTIVITY_FIELDS}
  }
`
