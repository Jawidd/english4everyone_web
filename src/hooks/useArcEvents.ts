import { useEffect, useState, useCallback } from 'react'
import { sanityClient } from '../lib/sanity'
import { ARC_EVENTS_QUERY } from '../lib/queries'
import type { ArcEvent } from '../types'

interface UseArcEventsResult {
  events: ArcEvent[]
  loading: boolean
  error: Error | null
  retry: () => void
}

export function useArcEvents(): UseArcEventsResult {
  const [events, setEvents] = useState<ArcEvent[]>([])
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
    const today = new Date().toISOString().slice(0, 10)
    sanityClient
      .fetch<ArcEvent[]>(ARC_EVENTS_QUERY, { today })
      .then((data) => { if (!cancelled) setEvents(data) })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err : new Error(String(err))) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [tick])

  return { events, loading, error, retry }
}
