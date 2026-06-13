import { Bus, Car, MapPin, Train } from 'lucide-react'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'
import { Reveal } from '../components/ui'
import { BRAND, CONTACT, SITE } from '../config'

const { contactPage, gettingHere, photos } = SITE

const MAPS_URL = 'https://maps.google.com/maps?q=56-58+Brussels+Street,Leeds,LS9+8AB&output=embed&z=17'
const JOURNEY_PLANNER_URL = 'https://www.wymetro.com/'

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

      {/* Getting Here */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <Reveal>
          <h2 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>
            {contactPage.gettingHereHeading}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* By Train */}
          <Reveal>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden h-full flex flex-col">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={photos.gettingHereTrain} alt="Train platform"
                  className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Train className="w-4 h-4 shrink-0" style={{ color: BRAND.primary }} aria-hidden="true" />
                  <h3 className="font-extrabold text-base" style={{ color: BRAND.navy }}>
                    {gettingHere.train.heading}
                  </h3>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {gettingHere.train.station}
                  <span className="font-normal text-gray-400 ml-2">
                    · {gettingHere.train.walkTime} ({gettingHere.train.walkDistance})
                  </span>
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {gettingHere.train.directions}
                </p>
              </div>
            </div>
          </Reveal>

          {/* By Bus */}
          <Reveal delay="delay-100">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden h-full flex flex-col">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={photos.gettingHereBus} alt="Bus"
                  className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Bus className="w-4 h-4 shrink-0" style={{ color: BRAND.primary }} aria-hidden="true" />
                  <h3 className="font-extrabold text-base" style={{ color: BRAND.navy }}>
                    {gettingHere.bus.heading}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  {gettingHere.bus.description}
                </p>
                <a href={JOURNEY_PLANNER_URL} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold underline underline-offset-2 mt-auto"
                  style={{ color: BRAND.primary }}>
                  {gettingHere.bus.plannerLabel}
                </a>
                <p className="text-xs text-gray-400 mt-2">{gettingHere.bus.note}</p>
              </div>
            </div>
          </Reveal>

          {/* By Car & Parking */}
          <Reveal delay="delay-200">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden h-full flex flex-col">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={photos.gettingHereParking} alt="Parking"
                  className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="w-4 h-4 shrink-0" style={{ color: BRAND.primary }} aria-hidden="true" />
                  <h3 className="font-extrabold text-base" style={{ color: BRAND.navy }}>
                    {gettingHere.parking.heading}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {gettingHere.parking.description}
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  )
}
