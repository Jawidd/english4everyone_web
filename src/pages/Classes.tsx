import { Link } from 'react-router-dom'
import { MapPin, Clock, Award, ArrowRight, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Section, Heading, Reveal } from '../components/ui'
import { BRAND, CONTACT, CLASS_SESSIONS, PAID_CLASS_FEATURES } from '../config'

export default function Classes() {
  return (
    <>
      <PageHero
        title="English Classes"
        subtitle="Free and paid English lessons every Saturday in Leeds. All levels welcome."
      />

      {/* Location bar */}
      <div className="text-white py-3 px-4 text-center" style={{ backgroundColor: BRAND.primary }}>
        <span className="inline-flex items-center gap-2 font-semibold">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          {CONTACT.address.full}
        </span>
      </div>

      {/* Timetable + paid classes */}
      <Section className="section-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <Heading label="Free ESOL classes" title="Saturday Timetable" />
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border" style={{ borderColor: BRAND.softBorder }}>
              {CLASS_SESSIONS.map((session, si) => (
                <div key={session.label} className={si < CLASS_SESSIONS.length - 1 ? 'border-b p-5' : 'p-5'} style={{ borderColor: BRAND.softBorderLight }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: BRAND.softBg }}>
                      <Clock className="w-4 h-4" style={{ color: BRAND.primary }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-extrabold" style={{ color: BRAND.navy }}>{session.label}</p>
                      <p className="text-sm text-gray-500">{session.time}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {session.levels.map((c) => (
                      <div key={c.level} className="flex items-center justify-between px-4 py-2.5 rounded-lg" style={{ backgroundColor: BRAND.softBg }}>
                        <span className="font-semibold text-sm" style={{ color: BRAND.navy }}>{c.level}</span>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-100">{c.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="px-5 py-4 border-t flex items-center gap-2 text-sm text-gray-500"
                style={{ borderColor: BRAND.softBorderLight, backgroundColor: '#fffaf9' }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: BRAND.primary }} aria-hidden="true" />
                {CONTACT.address.full}
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay="delay-100">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: BRAND.navy }}>
                    <Award className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: BRAND.navy }}>Paid Classes</p>
                    <p className="text-sm text-gray-500">Competitive rates</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  {PAID_CLASS_FEATURES.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: BRAND.primary }} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity"
                  style={{ color: BRAND.navy }}>
                  Ask about paid classes <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay="delay-200">
              <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.primary} 100%)` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">3 easy steps</p>
                <div className="space-y-3 mb-5">
                  {[
                    { n: '1', t: 'Contact us', d: 'Email, call, or WhatsApp' },
                    { n: '2', t: 'Come to class', d: `Saturday at ${CONTACT.address.line1}, Leeds` },
                    { n: '3', t: 'Start learning', d: 'We find the right level for you' },
                  ].map((s) => (
                    <div key={s.n} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>{s.n}</span>
                      <div>
                        <p className="font-semibold text-sm leading-none">{s.t}</p>
                        <p className="text-xs opacity-70 mt-0.5">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/join" className="inline-flex items-center gap-2 bg-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                  style={{ color: BRAND.primary }}>
                  How to Join <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Classroom photo strip */}
      <Section className="bg-white">
        <div className="grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
              <img src="/images/classroom1.jpg" alt="Saturday ESOL class at The Arches"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            <Reveal delay="delay-100" className="flex-1">
              <div className="rounded-2xl overflow-hidden shadow-md h-full min-h-[140px]">
                <img src="/images/classroom2.jpg" alt="Students working in class"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </Reveal>
            <Reveal delay="delay-200" className="flex-1">
              <div className="rounded-2xl overflow-hidden shadow-md h-full min-h-[140px]">
                <img src="/images/classroom3.jpg" alt="Classroom at The Arches"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Photo + info */}
      <Section className="section-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
              <img src="/images/students1.png" alt="Students at English4All Leeds"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
          <Reveal delay="delay-100">
            <Heading label="Everyone welcome" title="Free classes for all levels" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Our free Saturday ESOL classes are open to all adult speakers of other languages living in Leeds.
              Whether you are a complete beginner or already have good English, we have a class for you.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { value: '6', label: 'Classes every Saturday' },
                { value: 'All', label: 'Levels from ABC to Advanced' },
                { value: 'Free', label: 'No cost to join Saturday classes' },
                { value: '100%', label: 'Volunteer-led organisation' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4 border text-center" style={{ borderColor: BRAND.softBorder, backgroundColor: BRAND.softBg }}>
                  <p className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: BRAND.primary }}>
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp to join
            </a>
          </Reveal>
        </div>
      </Section>

      {/* Two more photos */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/2]">
              <img src="/images/students2.png" alt="Students enjoying class"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
          <Reveal delay="delay-100">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/2]">
              <img src="/images/teacher-students2.png" alt="Teacher working with students"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
