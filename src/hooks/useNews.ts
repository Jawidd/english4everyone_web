import { useEffect, useState, useCallback } from 'react'
import { sanityClient } from '../lib/sanity'
import { ALL_NEWS_QUERY, LATEST_NEWS_QUERY } from '../lib/queries'
import type { SanityNewsItem } from '../types'

interface UseNewsResult {
  items: SanityNewsItem[]
  loading: boolean
  error: Error | null
  retry: () => void
}

/** Fetch all news items from Sanity, newest first */
export function useNews(): UseNewsResult {
  const [items, setItems] = useState<SanityNewsItem[]>([])
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
      .fetch<SanityNewsItem[]>(ALL_NEWS_QUERY)
      .then((data) => { if (!cancelled) setItems(data) })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err : new Error(String(err))) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [tick])

  return { items, loading, error, retry }
}

interface UseLatestNewsResult {
  items: SanityNewsItem[]
  loading: boolean
  error: Error | null
}

/** Fetch the latest 2 news items — used on the home page */
export function useLatestNews(): UseLatestNewsResult {
  const [items, setItems] = useState<SanityNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    sanityClient
      .fetch<SanityNewsItem[]>(LATEST_NEWS_QUERY)
      .then((data) => { if (!cancelled) setItems(data) })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err : new Error(String(err))) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { items, loading, error }
}
