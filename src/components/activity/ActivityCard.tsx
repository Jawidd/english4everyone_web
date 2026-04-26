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
  return urlFor(img).width(800).height(500).fit('crop').auto('format').url()
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
      {/* Main image */}
      <div className="relative bg-gray-200 aspect-[4/3] overflow-hidden select-none">
        <div
          className="flex h-full w-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={mainUrl(img)}
              alt={`${title} — photo ${i + 1}`}
              className="w-full h-full object-cover flex-shrink-0 object-center"
              loading="lazy"
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Previous photo">
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Next photo">
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="absolute top-2 right-2 text-xs text-white bg-black/40 px-2 py-0.5 rounded-full">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip — only when more than 1 photo */}
      {images.length > 1 && (
        <div className="flex gap-1.5 px-4 pt-2 pb-1 overflow-x-auto">
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
              <img
                src={thumbUrl(img)}
                alt=""
                className="w-14 h-10 object-cover block"
                loading="lazy"
              />
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
    <article className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ backgroundColor: '#f3f4f6' }}>

      {/* Title + meta */}
      <div className="px-5 pt-4 pb-3">
        <h3 className="font-bold text-lg leading-snug mb-1.5" style={{ color: BRAND.navy }}>
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            {formattedDate}
          </span>
          {category && (
            <span
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
              style={{ color: BRAND.primary, backgroundColor: BRAND.softBg }}
            >
              <Tag className="w-3 h-3" aria-hidden="true" />
              {CATEGORY_LABELS[category] ?? category}
            </span>
          )}
        </div>
      </div>

      {/* Photos */}
      {images.length > 0 && <PhotoCarousel images={images} title={title} />}

      {/* Summary + tags */}
      <div className="px-5 pt-3 pb-5">
        <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
