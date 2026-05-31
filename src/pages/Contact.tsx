import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'
import { BRAND } from '../config'

const contactData = loadPage('contact')
const joinData = loadPage('join')

const MAPS_URL = 'https://maps.google.com/maps?q=56-58+Brussels+Street,Leeds,LS9+8AB&output=embed&z=17'

export default function Contact() {
  return (
    <>
      <PageHero title="Contact Us / Join Us" subtitle="Get in touch to join our classes or ask any questions" />
      
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left column: photos + contact details */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
            <img src="/images/01-outsideview.jpg" alt="The Arches building exterior"
              className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
            <img src="/images/arches-cover.jpg" alt="The Arches Social venue"
              className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right two columns: content + map */}
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            {/* How to Join section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND.navy }}>How to Join</h2>
              <div className="prose-content mb-6">
                <ReactMarkdown>{joinData.body}</ReactMarkdown>
              </div>
            </div>

            {/* Contact section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND.navy }}>Contact Details</h2>
              <div className="prose-content mb-6">
                <ReactMarkdown>{contactData.body}</ReactMarkdown>
              </div>
            </div>

            <ContactCard 
              email={contactData.data.email} 
              phone={contactData.data.phone} 
              whatsapp={contactData.data.whatsapp} 
            />
            <p className="text-sm text-gray-500 mt-3 text-center">We reply quickly. Don't worry!</p>
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
