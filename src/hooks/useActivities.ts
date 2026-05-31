import { useEffect, useState, useCallback } from 'react'
import { sanityClient } from '../lib/sanity'
import { ALL_ACTIVITIES_QUERY } from '../lib/queries'
import type { Activity, ActivityYearGroup } from '../types'

function groupByYear(activities: Activity[]): ActivityYearGroup[] {
  const map = new Map<number, Activity[]>()
  for (const activity of activities) {
    const year = new Date(activity.date).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(activity)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, acts]) => ({ year, activities: acts }))
}

interface UseActivitiesResult {
  groups: ActivityYearGroup[]
  loading: boolean
  error: Error | null
  retry: () => void
}

export function useActivities(): UseActivitiesResult {
  const [groups, setGroups] = useState<ActivityYearGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [tick, setTick] = useState(0)

  const retry = useCallback(() => {
    setError(null)
    setLoading(true)
    setTick((t) => t + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    sanityClient
      .fetch<Activity[]>(ALL_ACTIVITIES_QUERY)
      .then((data) => { if (!cancelled) setGroups(groupByYear(data)) })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err : new Error(String(err))) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [tick])

  return { groups, loading, error, retry }
}
