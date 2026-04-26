/**
 * src/hooks/useActivity.ts
 *
 * Fetches a single activity by slug from Sanity.
 * Used by the ActivityDetail page.
 */
import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { ACTIVITY_BY_SLUG_QUERY } from '../lib/queries'
import type { Activity } from '../types'

interface UseActivityResult {
  activity: Activity | null
  loading: boolean
  error: Error | null
}

export function useActivity(slug: string): UseActivityResult {
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) return
    sanityClient
      .fetch<Activity>(ACTIVITY_BY_SLUG_QUERY, { slug })
      .then((data) => setActivity(data ?? null))
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [slug])

  return { activity, loading, error }
}
