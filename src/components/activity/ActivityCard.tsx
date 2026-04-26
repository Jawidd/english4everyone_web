import { useState } from 'react'
import { Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '../../lib/sanity'
import { BRAND } from '../../config'
import type { Activity, SanityImage } from '../../types'

const CATEGORY_LABELS: Record<string, string> = {
  coffee: 'Coffee & Conversation',
  social: 'Social Events',
  trips: 'Trips & Walks',
  film: 'Film Club',
  book: 'Book Club',
  classes: 'Classes',
  other: 'Other',
}

function mainUrl(img: SanityImage) {
  // No height constraint — deliver at natural aspect ratio, max 900px wide
  return urlFor(img).width(900).auto('format').url()
}
function blurUrl(img: SanityImage) {
  return urlFor(img).width(40).auto('format').url()
}

function thumbUrl(img: SanityImage) {
  return urlFor(img).width(120).height(80).fit('crop').auto('format').url()
}

interface CarouselProps { images: SanityImage[]; title: string }

function PhotoCarousel({ images, title }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div>
      {/* Main frame */}
      <div className="relative overflow-hidden select-none" style={{ aspectRatio: '4/3' }}>

        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
          >
            {/* Blurred background — same photo, blurred + brightened to fill frame */}
            <img
              src={blurUrl(img)}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'blur(20px) brightness(0.6)', transform: 'scale(1.15)' }}
            />
            {/* Main photo — object-contain so nothing is cropped */}
            <img
              src={mainUrl(img)}
              alt={i === 0 ? title : `${title} — photo ${i + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Previous photo">
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Next photo">
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="absolute top-2 right-2 z-20 text-xs text-white bg-black/40 px-2 py-0.5 rounded-full">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-1.5 px-4 pt-2 pb-1 overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="flex-shrink-0 rounded overflow-hidden transition-all"
              style={{
                outline: i === index ? `2px solid ${BRAND.primary}` : '2px solid transparent',
                outlineOffset: '1px',
              }}
              aria-label={`View photo ${i + 1}`}
            >
              <img src={thumbUrl(img)} alt="" className="w-14 h-10 object-cover block" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface Props { activity: Activity }

export default function ActivityCard({ activity }: Props) {
  const { title, date, category, summary, photos, tags } = activity
  const images: SanityImage[] = photos ?? []

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <article className="rounded-2xl overflow-hidden border border-gray-300 shadow-sm" style={{ backgroundColor: '#e2e4e9' }}>
      <div className="px-5 pt-4 pb-3">
        <h3 className="font-bold text-lg leading-snug mb-1.5" style={{ color: BRAND.navy }}>{title}</h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            {formattedDate}
          </span>
          {category && (
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
              style={{ color: BRAND.primary, backgroundColor: BRAND.softBg }}>
              <Tag className="w-3 h-3" aria-hidden="true" />
              {CATEGORY_LABELS[category] ?? category}
            </span>
          )}
        </div>
      </div>

      {images.length > 0 && <PhotoCarousel images={images} title={title} />}

      <div className="px-5 pt-3 pb-5">
        <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
