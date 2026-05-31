import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'
import ContactCard from '../components/ContactCard'
import { Reveal } from '../components/ui'
import { CONTACT, BRAND } from '../config'

const { data, body } = loadPage('volunteering')

export default function Volunteering() {
  return (
    <>
      <PageHero title={data.title} subtitle={data.intro} />

      {/* Hero photos — three across the top */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 grid grid-cols-3 gap-4">
        <Reveal className="col-span-2">
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
            <img src="/images/volunteers1.png" alt="English4All volunteers"
              className="w-full h-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay="delay-100">
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
            <img src="/images/teacher1.png" alt="Volunteer teacher"
              className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 prose-content">
          <ReactMarkdown>{body}</ReactMarkdown>

          {/* Mid-page photos */}
          <div className="not-prose mt-8 grid grid-cols-2 gap-4">
            <Reveal>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src="/images/teacher-students1.png" alt="Teacher with students"
                  className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay="delay-100">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <img src="/images/teacher-students3.png" alt="Volunteer teaching"
                  className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>

          {/* Bottom wide photo */}
          <Reveal className="not-prose mt-4">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/7]">
              <img src="/images/classroom2.jpg" alt="Classroom at The Arches"
                className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <h2 className="text-xl font-bold mb-4" style={{ color: BRAND.navy }}>Ready to help?</h2>
          <ContactCard email={CONTACT.email} phone={CONTACT.phone} />
        </aside>
      </section>
    </>
  )
}
