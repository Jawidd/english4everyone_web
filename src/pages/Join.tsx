/**
 * Join.tsx — How to Join page (CRITICAL)
 *
 * This is the most important page for new learners.
 * Uses very large text, clear steps, and prominent contact options.
 * Contact details come from /content/join.md frontmatter — CMS editable.
 */
import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'

const { data, body } = loadPage('join')

export default function Join() {
  return (
    <>
      <PageHero
        title={data.title}
        subtitle={data.intro}
        gradient="from-accent-500 to-brand-800"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content — the 3 steps */}
        <div className="lg:col-span-2 prose-content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>

        {/* Sticky contact card — always visible alongside the steps */}
        <aside className="lg:sticky lg:top-24 self-start">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <ContactCard
            email={data.email}
            phone={data.phone}
            whatsapp={data.whatsapp}
          />
          <p className="text-sm text-gray-500 mt-3 text-center">
            We reply quickly. Don't worry!
          </p>
        </aside>
      </section>
    </>
  )
}
