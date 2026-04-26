/**
 * ActivityDetail.tsx — Single activity detail page
 *
 * Fetches one activity by slug from Sanity.
 * Renders Portable Text body (rich text from Sanity Studio).
 */
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react'
import { useActivity } from '../hooks/useActivity'
import { urlFor } from '../lib/sanity'
import { BRAND } from '../config'

const CATEGORY_LABELS: Record<string, string> = {
  coffee: 'Coffee & Conversation',
  social: 'Social Events',
  trips: 'Trips & Walks',
  film: 'Film Club',
  book: 'Book Club',
  classes: 'Classes',
  other: 'Other',
}

/** Render Portable Text blocks as plain HTML paragraphs.
 *  For full rich text (bold, links, lists) install @portabletext/react.
 *  This lightweight version handles the common case without an extra dependency.
 */
function PortableTextRenderer({ blocks }: { blocks: unknown[] }) {
  return (
    <div className="prose-content">
      {(blocks as Array<{ _type: string; children?: Array<{ text: string }>; style?: string }>).map((block, i) => {
        if (block._type !== 'block') return null
        const text = block.children?.map((c) => c.text).join('') ?? ''
        if (block.style === 'h2') return <h2 key={i}>{text}</h2>
        if (block.style === 'h3') return <h3 key={i}>{text}</h3>
        if (!text.trim()) return <br key={i} />
        return <p key={i}>{text}</p>
      })}
    </div>
  )
}

export default function ActivityDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { activity, loading, error } = useActivity(slug ?? '')

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 gap-3 text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
        <span>Loading…</span>
      </div>
    )
  }

  if (error || !activity) return <Navigate to="/activities" replace />

  const imgUrl = activity.thumbnail
    ? urlFor(activity.thumbnail).width(1200).height(600).fit('crop').auto('format').url()
    : null

  const formattedDate = new Date(activity.date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Back link */}
      <Link to="/activities"
        className="inline-flex items-center gap-2 font-medium mb-8 hover:opacity-80 transition-opacity"
        style={{ color: BRAND.primary }}>
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Activities
      </Link>

      {/* Hero image */}
      {imgUrl && (
        <div className="rounded-2xl overflow-hidden shadow-md aspect-[2/1] mb-8">
          <img src={imgUrl} alt={activity.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        {activity.category && (
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide mb-3"
            style={{ color: BRAND.primary }}>
            <Tag className="w-3 h-3" aria-hidden="true" />
            {CATEGORY_LABELS[activity.category] ?? activity.category}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3" style={{ color: BRAND.navy }}>
          {activity.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          {formattedDate}
        </div>
        <p className="text-xl text-gray-500 leading-relaxed">{activity.summary}</p>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activity.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <hr className="border-gray-200 mb-8" />

      {/* Body */}
      {activity.body && activity.body.length > 0 && (
        <PortableTextRenderer blocks={activity.body} />
      )}
    </article>
  )
}
