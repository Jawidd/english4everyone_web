import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Loader2, ExternalLink, ArrowRight } from 'lucide-react'
import { loadNewsPost } from '../utils/content'
import { useNewsPost } from '../hooks/useNewsPost'
import { urlFor } from '../lib/sanity'
import { BRAND } from '../config'

function DateLine({ dateStr }: { dateStr: string }) {
  return (
    <p className="text-sm text-gray-400 mb-2">
      {new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
    </p>
  )
}

/** Sanity news article detail */
function SanityPost({ slug }: { slug: string }) {
  const { item, loading, error } = useNewsPost(slug)

  if (loading) {
    return (
      <div className="flex justify-center py-24 gap-3 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" /> Loading…
      </div>
    )
  }

  if (error || !item) return <Navigate to="/news" replace />

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <Link to="/news" className="inline-flex items-center gap-2 font-medium mb-8 hover:opacity-80 transition-opacity"
        style={{ color: BRAND.primary }}>
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to News
      </Link>

      <header className="mb-8">
        <DateLine dateStr={item.date} />
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: BRAND.navy }}>
          {item.title}
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">{item.summary}</p>
      </header>

      {item.photo && (
        <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9] mb-8">
          <img src={urlFor(item.photo).width(1200).fit('max').url()}
            alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}

      <hr className="border-gray-200 mb-8" />

      {item.body && (
        <div className="prose-content mb-8">
          <ReactMarkdown>{item.body}</ReactMarkdown>
        </div>
      )}

      {item.linkUrl && item.linkLabel && (
        <a href={item.linkUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold px-5 py-3 rounded-xl border transition-all hover:opacity-80"
          style={{ borderColor: BRAND.softBorder, backgroundColor: BRAND.softBg, color: BRAND.primary }}>
          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
          {item.linkLabel}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </article>
  )
}

export default function NewsPost() {
  const { slug } = useParams<{ slug: string }>()
  if (!slug) return <Navigate to="/news" replace />

  // Try markdown first — fast, synchronous
  const mdPost = loadNewsPost(slug)
  if (mdPost) {
    return (
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <Link to="/news" className="inline-flex items-center gap-2 font-medium mb-8 hover:opacity-80 transition-opacity"
          style={{ color: BRAND.primary }}>
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to News
        </Link>
        <header className="mb-8">
          <DateLine dateStr={mdPost.date} />
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: BRAND.navy }}>
            {mdPost.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">{mdPost.summary}</p>
        </header>
        <hr className="border-gray-200 mb-8" />
        <div className="prose-content"><ReactMarkdown>{mdPost.body}</ReactMarkdown></div>
      </article>
    )
  }

  // Not a markdown post — try Sanity
  return <SanityPost slug={slug} />
}
