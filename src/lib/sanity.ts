/**
 * src/lib/sanity.ts
 *
 * Sanity client + image URL builder.
 * All data fetching goes through this single client instance.
 * projectId/dataset are public — safe to commit (read-only from browser).
 */
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: 'weiash2x',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_WEBSITE_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

/** Build an optimised image URL from a Sanity image asset reference.
 *  Usage: urlFor(image).width(400).height(300).fit('crop').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
