/**
 * ActivityCard.tsx — Social-media-style feed post for a single activity.
 */
import { Calendar, Tag } from 'lucide-react'
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
  const { title, date, category, summary, thumbnail, tags } = activity

  const imgUrl = thumbnail
    ? urlFor(thumbnail).width(800).height(450).fit('crop').auto('format').url()
    : null

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Post header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: BRAND.primary }}>
          E4A
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: BRAND.navy }}>English4All Leeds</p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {formattedDate}
          </p>
        </div>
        {category && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full"
            style={{ color: BRAND.primary, backgroundColor: BRAND.softBg }}>
            <Tag className="w-3 h-3" aria-hidden="true" />
            {CATEGORY_LABELS[category] ?? category}
          </span>
        )}
      </div>

      {/* Image */}
      {imgUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img src={imgUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      {/* Body */}
      <div className="px-5 py-4">
        <h3 className="font-bold text-lg leading-snug mb-2" style={{ color: BRAND.navy }}>{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{summary}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
