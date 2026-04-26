import { useState, useEffect, useCallback } from 'react'
import { Loader2, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react'
import PageHero from '../components/PageHero'
import ActivityCard from '../components/activity/ActivityCard'
import { useActivities } from '../hooks/useActivities'
import { BRAND } from '../config'

export default function Activities() {
  const { groups, loading, error } = useActivities()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // groups is newest-first; display newest left → oldest right
  const years = groups.map((g) => g.year) // newest first = left to right
  const activeYear = selectedYear ?? groups[0]?.year ?? null
  const activeGroup = groups.find((g) => g.year === activeYear)

  // newerYear = left (← ), olderYear = right (→)
  const idx = years.indexOf(activeYear!)
  const newerYear = idx > 0 ? years[idx - 1] : null          // left arrow
  const olderYear = idx < years.length - 1 ? years[idx + 1] : null // right arrow

  const switchYear = useCallback((year: number) => {
    setSelectedYear(year)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <PageHero
        title="Activities & Events"
        subtitle="Community gatherings, trips, social events, and more."
      />

      {/* Sticky year nav — newest left, oldest right */}
      {!loading && !error && groups.length > 0 && (
        <div className="sticky top-16 z-20 border-b border-gray-200 shadow-sm" style={{ backgroundColor: '#f0f1f5' }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-2 justify-center">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => switchYear(year)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
                style={
                  year === activeYear
                    ? { backgroundColor: BRAND.primary, color: '#fff', borderColor: BRAND.primary }
                    : { backgroundColor: '#fff', color: BRAND.navy, borderColor: '#d1d5db' }
                }
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {loading && (
          <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
            <span>Loading activities…</span>
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <p className="text-gray-500 mb-2">Could not load activities.</p>
            <p className="text-sm text-gray-400">{error.message}</p>
          </div>
        )}

        {!loading && !error && groups.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">No activities yet. Check back soon!</p>
          </div>
        )}

        {!loading && !error && activeGroup && (
          <>
            {/* Year heading */}
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>
                {activeYear}
              </h2>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">
                {activeGroup.activities.length}{' '}
                {activeGroup.activities.length === 1 ? 'activity' : 'activities'}
              </span>
            </div>

            {/* Feed */}
            <div className="flex flex-col gap-6">
              {activeGroup.activities.map((activity) => (
                <ActivityCard key={activity._id} activity={activity} />
              ))}
            </div>

            {/* Prev (newer ←) / Next (older →) */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
              <div>
                {newerYear && (
                  <button
                    onClick={() => switchYear(newerYear)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: BRAND.navy }}
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    {newerYear}
                  </button>
                )}
              </div>
              <div>
                {olderYear && (
                  <button
                    onClick={() => switchYear(olderYear)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: BRAND.navy }}
                  >
                    {olderYear}
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        {!loading && !error && groups.length > 0 && (
          <div className="mt-10 p-6 rounded-2xl text-center" style={{ backgroundColor: BRAND.softBg }}>
            <p className="font-semibold mb-1" style={{ color: BRAND.navy }}>
              Want to join our next activity?
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Contact us to find out what's coming up.
            </p>
            <a
              href="https://wa.me/447535867376"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: BRAND.primary }}
            >
              WhatsApp us
            </a>
          </div>
        )}
      </section>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: BRAND.navy }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </>
  )
}
