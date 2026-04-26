/**
 * src/hooks/useActivities.ts
 *
 * Fetches all activities from Sanity and groups them by year.
 * Handles loading and error states.
 *
 * Returns:
 *   groups  — ActivityYearGroup[] sorted newest year first
 *   loading — true while fetching
 *   error   — Error | null
 */
import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { ALL_ACTIVITIES_QUERY } from '../lib/queries'
import type { Activity, ActivityYearGroup } from '../types'

/** Group a flat list of activities into year buckets, newest year first */
function groupByYear(activities: Activity[]): ActivityYearGroup[] {
  const map = new Map<number, Activity[]>()
  for (const activity of activities) {
    const year = new Date(activity.date).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(activity)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b - a) // newest year first
    .map(([year, acts]) => ({ year, activities: acts }))
}

interface UseActivitiesResult {
  groups: ActivityYearGroup[]
  loading: boolean
  error: Error | null
}

export function useActivities(): UseActivitiesResult {
  const [groups, setGroups] = useState<ActivityYearGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Activity[]>(ALL_ACTIVITIES_QUERY)
      .then((data) => setGroups(groupByYear(data)))
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { groups, loading, error }
}
