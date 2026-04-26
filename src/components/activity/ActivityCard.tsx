/**
 * ActivityCard.tsx — Thumbnail card for a single activity entry.
 * Used in the year-grouped list view.
 */
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { urlFor } from '../../lib/sanity'
import { BRAND } from '../../config'
import type { Activity } from '../../types'

const CATEGORY_LABELS: Record<string, string> = {
  coffee: 'Coffee & Conversation',
  social: 'Social Events',
  trips: 'Trips & Walks',
  film: 'Film Club',
  book: 'Book Club',
  classes: 'Classes',
  other: 'Other',
}

interface Props {
  activity: Activity
}

export default function ActivityCard({ activity }: Props) {
  const { slug, title, date, category, summary, thumbnail, tags } = activity

  const imgUrl = thumbnail
    ? urlFor(thumbnail).width(480).height(320).fit('crop').auto('format').url()
    : null

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <Link
      to={`/activities/${slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="aspect-[3/2] overflow-hidden bg-gray-100">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl" style={{ backgroundColor: BRAND.softBg }}>
            📸
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        {category && (
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide mb-2"
            style={{ color: BRAND.primary }}>
            <Tag className="w-3 h-3" aria-hidden="true" />
            {CATEGORY_LABELS[category] ?? category}
          </span>
        )}

        <h3 className="font-bold text-lg leading-snug mb-2 group-hover:opacity-80 transition-opacity"
          style={{ color: BRAND.navy }}>
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-2">{summary}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: BRAND.primary }}>
            Read more <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}
