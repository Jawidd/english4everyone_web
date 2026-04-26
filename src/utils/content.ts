/**
 * src/utils/content.ts
 *
 * Loads and parses Markdown content files at build time via Vite's glob import.
 * Types are defined in src/types/index.ts and re-exported here for convenience.
 *
 * Flow: CMS saves .md → Git commit → Vite rebuild → content bundled as strings
 */
import type { PageContent, NewsPost } from '../types'

export type { PageContent, NewsPost }

const pageFiles = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true })
const newsFiles = import.meta.glob('/content/news/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')
    if (key) data[key] = value
  }
  return { data, content: match[2].trim() }
}

export function loadPage(name: string): PageContent {
  const raw = pageFiles[`/content/${name}.md`] as string
  if (!raw) throw new Error(`Content file not found: /content/${name}.md`)
  const { data, content } = parseFrontmatter(raw)
  return { data, body: content }
}

export function loadAllNews(): NewsPost[] {
  return Object.entries(newsFiles)
    .map(([path, raw]) => {
      const slug = path.replace('/content/news/', '').replace('.md', '')
      const { data, content } = parseFrontmatter(raw as string)
      return { slug, title: data.title ?? '', date: data.date ?? '', summary: data.summary ?? '', image: data.image ?? '', body: content }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function loadNewsPost(slug: string): NewsPost | undefined {
  return loadAllNews().find((p) => p.slug === slug)
}
