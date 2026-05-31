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

/** Arc Social events — soonest first, hidden after expiryDate (defaults to event date) */
export const ARC_EVENTS_QUERY = `
  *[_type == "arcEvent" && (expiryDate >= $today || (!defined(expiryDate) && date >= $today))] | order(date asc) {
    _id,
    title,
    date,
    expiryDate,
    description,
    poster,
    ticketUrl
  }
`

/** Shared news fields projection */
const NEWS_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  date,
  summary,
  body,
  photo,
  linkLabel,
  linkUrl
`

/** All news items, newest first */
export const ALL_NEWS_QUERY = `
  *[_type == "news"] | order(date desc) {
    ${NEWS_FIELDS}
  }
`

/** Latest N news items for the home page */
export const LATEST_NEWS_QUERY = `
  *[_type == "news"] | order(date desc) [0...2] {
    ${NEWS_FIELDS}
  }
`

/** Single news item by slug — for the article detail page */
export const NEWS_POST_QUERY = `
  *[_type == "news" && slug.current == $slug][0] {
    ${NEWS_FIELDS}
  }
`

/** Latest 1 activity with at least one photo — for the home page social teaser */
export const LATEST_ACTIVITY_QUERY = `
  *[_type == "activity" && defined(photos) && count(photos) > 0] | order(date desc) [0] {
    _id,
    title,
    date,
    summary,
    photos
  }
`

