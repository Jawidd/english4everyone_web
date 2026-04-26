/**
 * src/types/index.ts
 *
 * All shared TypeScript interfaces for the application.
 * Centralising types here means pages and utils import from one place,
 * making future changes (e.g. adding a field to NewsPost) a single edit.
 */

/** Parsed content from a /content/*.md page file */
export interface PageContent {
  /** Frontmatter key/value pairs (title, intro, email, etc.) */
  data: Record<string, string>
  /** Markdown body text, rendered by ReactMarkdown in page components */
  body: string
}

/** A single news/blog post loaded from /content/news/*.md */
export interface NewsPost {
  slug: string
  title: string
  date: string
  summary: string
  image: string
  body: string
}

/** A navigation link used in Navbar */
export interface NavLink {
  to: string
  label: string
}

/** A social media platform entry used in SocialLinks */
export interface SocialPlatform {
  label: string
  href: string
  color: string
  bg: string
}

/** A class level entry used in the timetable */
export interface ClassLevel {
  level: string
  tag: string
}

/** A timetable session (morning or afternoon) */
export interface ClassSession {
  label: string
  time: string
  levels: ClassLevel[]
}

// ── Sanity Activity Feed ──────────────────────────────────────────────────────

/** Raw Sanity image reference (passed to urlFor()) */
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

/** A single activity entry fetched from Sanity */
export interface Activity {
  _id: string
  title: string
  date: string
  category: string
  summary: string
  photos?: SanityImage[]
  tags?: string[]
}

/** Activities grouped by calendar year, newest year first */
export interface ActivityYearGroup {
  year: number
  activities: Activity[]
}
