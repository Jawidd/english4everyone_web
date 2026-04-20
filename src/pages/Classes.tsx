/**
 * Classes.tsx — Classes page
 *
 * Content loaded from /content/classes.md.
 * The visual class schedule cards are driven by the Markdown body,
 * but the location and intro come from frontmatter so they're easy to update.
 */
import ReactMarkdown from 'react-markdown'
import { MapPin } from 'lucide-react'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'

const { data, body } = loadPage('classes')

export default function Classes() {
  return (
    <>
      <PageHero
        title={data.title}
        subtitle={data.intro}
        gradient="from-green-700 to-brand-900"
      />

      {/* Location banner */}
      <div className="bg-accent-500 text-white py-3 px-4 text-center">
        <span className="inline-flex items-center gap-2 font-semibold">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          {data.location}
        </span>
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </section>
    </>
  )
}
