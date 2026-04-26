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

function buildUrl(img: SanityImage) {
  return urlFor(img).width(800).height(500).fit('crop').auto('format').url()
}

interface CarouselProps {
  images: SanityImage[]
  title: string
}

function PhotoCarousel({ images, title }: CarouselProps) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div className="relative bg-gray-100 aspect-[4/3] overflow-hidden select-none">
      {/* Images */}
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={buildUrl(img)}
            alt={`${title} — photo ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      {/* Arrows — only if more than 1 photo */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.45)' }}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="absolute top-3 right-3 text-xs text-white bg-black/40 px-2 py-0.5 rounded-full">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  )
}

interface Props {
  activity: Activity
}

export default function ActivityCard({ activity }: Props) {
  const { title, date, category, summary, thumbnail, photos, tags } = activity

  // Prefer photos array; fall back to thumbnail; fall back to nothing
  const images: SanityImage[] = photos && photos.length > 0
    ? photos
    : thumbnail ? [thumbnail] : []

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{formattedDate}</span>
        </div>
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

      {/* Photo carousel */}
      {images.length > 0 && <PhotoCarousel images={images} title={title} />}

      {/* Body */}
      <div className="px-5 pt-4 pb-5">
        <h3 className="font-bold text-lg leading-snug mb-2" style={{ color: BRAND.navy }}>
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{summary}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
