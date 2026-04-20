/**
 * content.ts — Content loading utility
 *
 * HOW CONTENT FLOWS THROUGH THE SYSTEM:
 * 1. Staff edit Markdown files in /content/ via Decap CMS (or directly in Git)
 * 2. Vite's import.meta.glob() reads all .md files at build time
 * 3. gray-matter parses frontmatter (metadata) from the Markdown body
 * 4. Page components call these helpers to get typed content
 *
 * This means: NO backend, NO API — content is bundled at build time.
 * When staff save a change in the CMS, it commits to Git → triggers a rebuild.
 */
import matter from 'gray-matter'

// Vite glob import — loads all markdown files as raw strings at build time
// The `as: 'raw'` option returns file content as a string (not a module)
const pageFiles = import.meta.glob('/content/*.md', { as: 'raw', eager: true })
const newsFiles = import.meta.glob('/content/news/*.md', { as: 'raw', eager: true })

export interface PageContent {
  /** Frontmatter fields (title, intro, email, etc.) */
  data: Record<string, string>
  /** Markdown body text (rendered by ReactMarkdown in components) */
  body: string
}

export interface NewsPost {
  slug: string
  title: string
  date: string
  summary: string
  image: string
  body: string
}

/** Load a single page content file by name (e.g. 'about', 'classes') */
export function loadPage(name: string): PageContent {
  const raw = pageFiles[`/content/${name}.md`] as string
  if (!raw) throw new Error(`Content file not found: /content/${name}.md`)
  const { data, content } = matter(raw)
  return { data: data as Record<string, string>, body: content }
}

/** Load and sort all news posts (newest first) */
export function loadAllNews(): NewsPost[] {
  return Object.entries(newsFiles)
    .map(([path, raw]) => {
      const slug = path.replace('/content/news/', '').replace('.md', '')
      const { data, content } = matter(raw as string)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        summary: data.summary as string,
        image: (data.image as string) || '',
        body: content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Load a single news post by slug */
export function loadNewsPost(slug: string): NewsPost | undefined {
  return loadAllNews().find((p) => p.slug === slug)
}
