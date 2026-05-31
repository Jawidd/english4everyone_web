import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'

const { data, body } = loadPage('contact')

const MAPS_URL = 'https://maps.google.com/maps?q=56-58+Brussels+Street,Leeds,LS9+8AB&output=embed&z=17'

export default function Contact() {
  return (
    <>
      <PageHero title={data.title} subtitle={data.intro} />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left column: photos + contact details */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
            <img src="/images/outsideview.jpg" alt="The Arches building exterior"
              className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
            <img src="/images/classroom1.jpg" alt="English class at The Arches"
              className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right two columns: text + map */}
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="prose-content mb-8"><ReactMarkdown>{body}</ReactMarkdown></div>
            <ContactCard email={data.email} phone={data.phone} whatsapp={data.whatsapp} />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 h-80 lg:h-auto">
            <iframe title="English4All Leeds location map" src={MAPS_URL}
              width="100%" height="100%" style={{ border: 0, minHeight: '320px' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

      </section>
    </>
  )
}
