import { MapPin } from 'lucide-react'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'
import { Reveal } from '../components/ui'
import { BRAND, CONTACT, SITE } from '../config'

const { contactPage, photos } = SITE

const MAPS_URL = 'https://maps.google.com/maps?q=56-58+Brussels+Street,Leeds,LS9+8AB&output=embed&z=17'

export default function Contact() {
  return (
    <>
      <PageHero title={contactPage.title} subtitle={contactPage.subtitle} />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left: two stacked photos */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src={photos.contactTop} alt="The Arches building exterior"
                  className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay="delay-100">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src={photos.contactBottom} alt="Entrance to The Arches"
                  className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>

          {/* Right: How to Join + Find Us */}
          <div className="lg:col-span-2 space-y-10">

            {/* How to Join */}
            <Reveal>
              <h2 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>
                {contactPage.howToJoinHeading}
              </h2>
              <ol className="space-y-4 mb-8">
                {SITE.howToJoinSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm text-white"
                      style={{ backgroundColor: BRAND.primary }}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold" style={{ color: BRAND.navy }}>{step.title}</p>
                      <p className="text-sm text-gray-500">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ContactCard email={CONTACT.email} phone={CONTACT.phone} whatsapp={CONTACT.whatsapp} />
              <p className="text-sm text-gray-400 mt-3">{contactPage.replyNote}</p>
            </Reveal>

            {/* Find Us */}
            <Reveal delay="delay-100">
              <h2 className="text-2xl font-extrabold mb-2" style={{ color: BRAND.navy }}>
                {contactPage.findUsHeading}
              </h2>
              <p className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: BRAND.primary }} aria-hidden="true" />
                {CONTACT.address.full}
              </p>
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: '320px' }}>
                <iframe title="English4All Leeds location map" src={MAPS_URL}
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  )
}
