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

      {/* Hero photos section - separate container */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="grid grid-cols-3 gap-4 h-64 md:h-80">
          <Reveal className="col-span-2 h-full">
            <div className="rounded-2xl overflow-hidden shadow-md h-full">
              <img src="/images/09-volunteers.png" alt="English4All volunteers"
                className="w-full h-full object-cover object-top" />
            </div>
          </Reveal>
          <Reveal delay="delay-100" className="h-full">
            <div className="rounded-2xl overflow-hidden shadow-md h-full">
              <img src="/images/08-teacher.png" alt="Volunteer teacher"
                className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content section - completely separate */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 prose-content">
            <ReactMarkdown>{body}</ReactMarkdown>

            {/* Mid-page photos */}
            <div className="not-prose mt-8 grid grid-cols-3 gap-4">
              <Reveal>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                  <img src="/images/03-classroom.jpg" alt="Classroom at The Arches"
                    className="w-full h-full object-cover" />
                </div>
              </Reveal>
              <Reveal delay="delay-100">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                  <img src="/images/10-teacher-students.png" alt="Teacher with students"
                    className="w-full h-full object-cover" />
                </div>
              </Reveal>
              <Reveal delay="delay-200">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                  <img src="/images/11-teacher-students.png" alt="Volunteer teaching"
                    className="w-full h-full object-cover" />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Ready to help section - now properly positioned */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-xl font-bold mb-4" style={{ color: BRAND.navy }}>Ready to help?</h2>
            <ContactCard email={CONTACT.email} phone={CONTACT.phone} />
          </aside>
        </div>
      </section>
    </>
  )
}
