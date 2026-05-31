import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { LATEST_ACTIVITY_QUERY } from '../lib/queries'
import type { Activity } from '../types'

interface UseLatestActivityResult {
  activity: Activity | null
  loading: boolean
  error: Error | null
}

/** Fetch the most recent activity that has at least one photo */
export function useLatestActivity(): UseLatestActivityResult {
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Activity | null>(LATEST_ACTIVITY_QUERY)
      .then(setActivity)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { activity, loading, error }
}
