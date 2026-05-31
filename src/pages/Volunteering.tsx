import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'
import { Reveal } from '../components/ui'
import { CONTACT, BRAND, SITE } from '../config'

const { data, body } = loadPage('volunteering')
const { photos } = SITE

export default function Volunteering() {
  return (
    <>
      <PageHero title={data.title} subtitle={data.intro} />

      {/* Top photos — fixed height so both columns match */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 grid grid-cols-3 gap-4 h-56 sm:h-64 md:h-72">
        <Reveal className="col-span-2 h-full">
          <div className="rounded-2xl overflow-hidden shadow-md h-full">
            <img src={photos.volunteerTopLeft} alt="English4All volunteers"
              className="w-full h-full object-cover object-top" />
          </div>
        </Reveal>
        <Reveal delay="delay-100" className="h-full">
          <div className="rounded-2xl overflow-hidden shadow-md h-full">
            <img src={photos.volunteerTopRight} alt="Volunteer teacher"
              className="w-full h-full object-cover object-top" />
          </div>
        </Reveal>
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 prose-content">
          <ReactMarkdown>{body}</ReactMarkdown>

          {/* Mid-page photos */}
          <div className="not-prose mt-8 grid grid-cols-3 gap-4">
            <Reveal>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src={photos.volunteerMid1} alt="Classroom at The Arches"
                  className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay="delay-100">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src={photos.volunteerMid2} alt="Teacher with students"
                  className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay="delay-200">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src={photos.volunteerMid3} alt="Volunteer teaching"
                  className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <h2 className="text-xl font-bold mb-4" style={{ color: BRAND.navy }}>Ready to help?</h2>
          <ContactCard email={CONTACT.email} phone={CONTACT.phone} />
        </aside>
      </section>
    </>
  )
}
