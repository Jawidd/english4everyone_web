import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { ALL_NEWS_QUERY, LATEST_NEWS_QUERY } from '../lib/queries'
import type { SanityNewsItem } from '../types'

interface UseNewsResult {
  items: SanityNewsItem[]
  loading: boolean
  error: Error | null
}

/** Fetch all news items from Sanity, newest first */
export function useNews(): UseNewsResult {
  const [items, setItems] = useState<SanityNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<SanityNewsItem[]>(ALL_NEWS_QUERY)
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { items, loading, error }
}

/** Fetch the latest 2 news items — used on the home page */
export function useLatestNews(): UseNewsResult {
  const [items, setItems] = useState<SanityNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<SanityNewsItem[]>(LATEST_NEWS_QUERY)
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [])

  return { items, loading, error }
}
