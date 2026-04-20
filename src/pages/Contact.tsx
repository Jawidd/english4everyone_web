/**
 * Contact.tsx — Contact page
 * Contact details loaded from /content/contact.md frontmatter.
 * Map embed uses a static Google Maps link (no API key needed).
 */
import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'

const { data, body } = loadPage('contact')

export default function Contact() {
  const mapsUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.4!2d-1.52!3d53.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDQ3JzI0LjAiTiAxwrAzMScxMi4wIlc!5e0!3m2!1sen!2suk!4v1'

  return (
    <>
      <PageHero
        title={data.title}
        subtitle={data.intro}
        gradient="from-teal-700 to-brand-900"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: content + contact card */}
        <div>
          <div className="prose-content mb-8">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
          <ContactCard
            email={data.email}
            phone={data.phone}
            whatsapp={data.whatsapp}
          />
        </div>

        {/* Right: map */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 h-80 lg:h-auto">
          <iframe
            title="English4All Leeds location map"
            src={mapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '320px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}
