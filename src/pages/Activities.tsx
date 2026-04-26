/**
 * Activities.tsx — Activity feed with year navigation
 *
 * - Shows a sticky year pill nav at the top
 * - Defaults to the most recent year on load
 * - Clicking a year switches to that year's feed
 * - Feed is social-media style (single column, full-width posts)
 */
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import ActivityCard from '../components/activity/ActivityCard'
import { useActivities } from '../hooks/useActivities'
import { BRAND } from '../config'

export default function Activities() {
  const { groups, loading, error } = useActivities()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  // Default to the latest year once data loads
  const activeYear = selectedYear ?? groups[0]?.year ?? null
  const activeGroup = groups.find((g) => g.year === activeYear)

  return (
    <>
      <PageHero
        title="Activities & Events"
        subtitle="Community gatherings, trips, social events, and more."
      />

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Year nav */}
        {!loading && !error && groups.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {groups.map(({ year }) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
                style={
                  year === activeYear
                    ? { backgroundColor: BRAND.primary, color: '#fff', borderColor: BRAND.primary }
                    : { backgroundColor: '#fff', color: BRAND.navy, borderColor: '#e5e7eb' }
                }
              >
              {year}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
            <span>Loading activities…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-24">
            <p className="text-gray-500 mb-2">Could not load activities.</p>
            <p className="text-sm text-gray-400">{error.message}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && groups.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">No activities yet. Check back soon!</p>
          </div>
        )}

        {/* Feed for selected year */}
        {!loading && !error && activeGroup && (
          <div className="flex flex-col gap-6">
            {activeGroup.activities.map((activity) => (
              <ActivityCard key={activity._id} activity={activity} />
            ))}
          </div>
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
    </>
  )
}
