import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { ARC_EVENTS_QUERY } from '../lib/queries'
import type { ArcEvent } from '../types'

interface UseArcEventsResult {
  events: ArcEvent[]
  loading: boolean
  error: Error | null
}

export function useArcEvents(): UseArcEventsResult {
  const [events, setEvents] = useState<ArcEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    sanityClient
      .fetch<ArcEvent[]>(ARC_EVENTS_QUERY, { today })
      .then(setEvents)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { events, loading, error }
}
