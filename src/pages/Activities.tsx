/**
 * Activities.tsx — Activity feed list page
 *
 * Fetches all activities from Sanity and renders them grouped by year.
 * Content is live — no rebuild needed when staff add/edit entries in Studio.
 */
import { Loader2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import { ActivityYearGroup } from '../components/activity'
import { useActivities } from '../hooks/useActivities'
import { BRAND } from '../config'

export default function Activities() {
  const { groups, loading, error } = useActivities()

  return (
    <>
      <PageHero
        title="Activities & Events"
        subtitle="Community gatherings, trips, social events, and more."
      />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
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

        {!loading && !error && groups.map((group) => (
          <ActivityYearGroup key={group.year} group={group} />
        ))}

        {/* CTA */}
        {!loading && !error && groups.length > 0 && (
          <div className="mt-8 p-6 rounded-2xl text-center" style={{ backgroundColor: BRAND.softBg }}>
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
