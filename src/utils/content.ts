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
// Vite glob import — loads all markdown files as raw strings at build time
const pageFiles = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true })
const newsFiles = import.meta.glob('/content/news/*.md', { query: '?raw', import: 'default', eager: true })

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

/**
 * Browser-safe frontmatter parser — replaces gray-matter.
 * gray-matter depends on Node.js Buffer which doesn't exist in the browser.
 * This parses the standard YAML frontmatter format (--- delimiters).
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    // Strip surrounding quotes from values
    const value = line.slice(colon + 1).trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')
    if (key) data[key] = value
  }

  return { data, content: match[2].trim() }
}

/** Load a single page content file by name (e.g. 'about', 'classes') */
export function loadPage(name: string): PageContent {
  const raw = pageFiles[`/content/${name}.md`] as string
  if (!raw) throw new Error(`Content file not found: /content/${name}.md`)
  const { data, content } = parseFrontmatter(raw)
  return { data, body: content }
}

/** Load and sort all news posts (newest first) */
export function loadAllNews(): NewsPost[] {
  return Object.entries(newsFiles)
    .map(([path, raw]) => {
      const slug = path.replace('/content/news/', '').replace('.md', '')
      const { data, content } = parseFrontmatter(raw as string)
      return {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
        summary: data.summary ?? '',
        image: data.image ?? '',
        body: content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Load a single news post by slug */
export function loadNewsPost(slug: string): NewsPost | undefined {
  return loadAllNews().find((p) => p.slug === slug)
}
