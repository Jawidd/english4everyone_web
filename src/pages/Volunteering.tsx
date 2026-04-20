/**
 * Volunteering.tsx — Volunteer page
 * Content loaded from /content/volunteering.md.
 */
import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'

const { data, body } = loadPage('volunteering')

// Contact details reused from contact.md frontmatter
const CONTACT_EMAIL = 'enquiries@english4allinleeds.com'
const CONTACT_PHONE = '+44 7535 867376'

export default function Volunteering() {
  return (
    <>
      <PageHero
        title={data.title}
        subtitle={data.intro}
        gradient="from-rose-700 to-brand-900"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 prose-content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ready to help?</h2>
          <ContactCard email={CONTACT_EMAIL} phone={CONTACT_PHONE} />
        </aside>
      </section>
    </>
  )
}
