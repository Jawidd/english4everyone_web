import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'

const { data, body } = loadPage('join')

export default function Join() {
  return (
    <>
      <PageHero title={data.title} subtitle={data.intro} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 prose-content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#2c2e4b' }}>Contact Us</h2>
          <ContactCard email={data.email} phone={data.phone} whatsapp={data.whatsapp} />
          <p className="text-sm text-gray-500 mt-3 text-center">We reply quickly. Don't worry!</p>
        </aside>
      </section>
    </>
  )
}
