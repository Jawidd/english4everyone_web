import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { NEWS_POST_QUERY } from '../lib/queries'
import type { SanityNewsItem } from '../types'

interface UseNewsPostResult {
  item: SanityNewsItem | null
  loading: boolean
  error: Error | null
}

/** Fetch a single news post by its slug */
export function useNewsPost(slug: string): UseNewsPostResult {
  const [item, setItem] = useState<SanityNewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    sanityClient
      .fetch<SanityNewsItem | null>(NEWS_POST_QUERY, { slug })
      .then(setItem)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false))
  }, [slug])

  return { item, loading, error }
}
