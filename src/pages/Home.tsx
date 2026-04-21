/**
 * Home.tsx — Homepage (redesigned for clarity)
 *
 * Design principles applied:
 *  - First screen answers: who, what, where, how to join — in 5 seconds
 *  - Large logo shown correctly (solid red bg — displayed as-is, no filter)
 *  - "How to Join" CTA visible without scrolling
 *  - Class timetable as a simple scannable card
 *  - Contact info in contact bar AND footer
 *  - Scroll-triggered fade-up animations (no library)
 *  - Accordion for class levels to avoid overwhelming beginners
 */
import { Link } from 'react-router-dom'
import {
  Phone, Mail, MessageCircle, MapPin, ArrowRight,
  Clock, Award, Users, Heart, Star, BookOpen, Handshake
} from 'lucide-react'
import { loadAllNews } from '../utils/content'
import { useInView } from '../hooks/useInView'
import Accordion from '../components/Accordion'

const news = loadAllNews().slice(0, 3)

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function Reveal({ children, className = '', delay = '' }: {
  children: React.ReactNode; className?: string; delay?: string
}) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''} ${delay} ${className}`}>
      {children}
    </div>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-14 px-4 sm:px-6 ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}

// ── Section label + heading ───────────────────────────────────────────────────
function Heading({ label, title, center = false }: { label?: string; title: string; center?: boolean }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      {label && (
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#ec2904' }}>{label}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: '#2c2e4b' }}>{title}</h2>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          1. HERO — answers WHO / WHAT / WHERE / WHAT TO DO in one screen
          Logo displayed as-is (solid red background, white text inside)
          ════════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#2c2e4b' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

          {/* Logo — shown as a natural image, no filter, rounded for polish */}
          <div className="mb-8">
            <img
              src="/images/logo-large.jpg"
              alt="English4All Leeds"
              className="h-20 sm:h-24 w-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: headline + CTAs */}
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Free English<br />
                classes in Leeds
              </h1>
              <p className="text-lg sm:text-xl mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
                For adults who want to learn English.
              </p>
              <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                All levels welcome · Every Saturday · Free to join
              </p>

              {/* Primary CTAs — both visible without scrolling */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center gap-2 font-bold text-lg px-7 py-4 rounded-xl text-white shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: '#ec2904' }}
                >
                  How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/classes"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-7 py-4 rounded-xl text-white border-2 transition-all duration-200 hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  View Classes
                </Link>
              </div>
            </div>

            {/* Right: student photo */}
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/students.png"
                alt="Students learning English at English4All Leeds"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          2. CONTACT BAR — always visible, repeated in footer too
          ════════════════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: '#ec2904' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white text-sm font-semibold">
          <a href="tel:+447535867376" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone className="w-4 h-4" aria-hidden="true" /> 07535 867376
          </a>
          <a href="mailto:enquiries@english4allinleeds.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Mail className="w-4 h-4" aria-hidden="true" /> enquiries@english4allinleeds.com
          </a>
          <a href="https://wa.me/447535867376" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          3. WHAT WE OFFER — 3 clear pillars, scannable in seconds
          ════════════════════════════════════════════════════════════════════════ */}
      <Section>
        <Reveal>
          <Heading label="What we offer" title="English classes for everyone in Leeds" />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: <BookOpen className="w-7 h-7" style={{ color: '#ec2904' }} />,
              title: 'Free Saturday Classes',
              desc: '6 classes every Saturday. All levels. Qualified ESOL teachers. No cost.',
              delay: '',
            },
            {
              icon: <Award className="w-7 h-7" style={{ color: '#ec2904' }} />,
              title: 'Paid Classes',
              desc: 'Structured weekday classes with assessment, homework, and certificates.',
              delay: 'delay-100',
            },
            {
              icon: <Users className="w-7 h-7" style={{ color: '#ec2904' }} />,
              title: 'Community Activities',
              desc: 'Coffee mornings, film club, book club, walks, and social events.',
              delay: 'delay-200',
            },
          ].map((card) => (
            <Reveal key={card.title} delay={card.delay}>
              <div className="bg-white rounded-2xl p-6 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: '#ffc5bb' }}>
                <div className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#fff4f2' }}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#2c2e4b' }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════════════════
          4. SATURDAY TIMETABLE — the most important info, shown as a clear card
             Class levels in an accordion so beginners aren't overwhelmed
          ════════════════════════════════════════════════════════════════════════ */}
      <Section className="bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Timetable card */}
          <Reveal>
            <Heading label="Free classes" title="Saturday Timetable" />
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border" style={{ borderColor: '#ffc5bb' }}>

              {/* Morning */}
              <div className="p-5 border-b" style={{ borderColor: '#ffeee9' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fff4f2' }}>
                    <Clock className="w-4 h-4" style={{ color: '#ec2904' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: '#2c2e4b' }}>Morning</p>
                    <p className="text-sm text-gray-500">9:00am – 11:00am</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { level: 'ABC', tag: 'Absolute Beginner' },
                    { level: 'Beginner', tag: 'Some English' },
                    { level: 'Elementary', tag: 'Basic English' },
                  ].map((c) => (
                    <div key={c.level} className="flex items-center justify-between px-4 py-2.5 rounded-lg" style={{ backgroundColor: '#fff4f2' }}>
                      <span className="font-semibold text-sm" style={{ color: '#2c2e4b' }}>{c.level}</span>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-100">{c.tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Afternoon */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fff4f2' }}>
                    <Clock className="w-4 h-4" style={{ color: '#ec2904' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: '#2c2e4b' }}>Afternoon</p>
                    <p className="text-sm text-gray-500">11:15am – 1:15pm</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { level: 'Pre-Intermediate', tag: 'Getting better' },
                    { level: 'Intermediate', tag: 'Good English' },
                    { level: 'Advanced', tag: 'Very good English' },
                  ].map((c) => (
                    <div key={c.level} className="flex items-center justify-between px-4 py-2.5 rounded-lg" style={{ backgroundColor: '#fff4f2' }}>
                      <span className="font-semibold text-sm" style={{ color: '#2c2e4b' }}>{c.level}</span>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-100">{c.tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="px-5 py-4 border-t flex items-center gap-2 text-sm text-gray-500" style={{ borderColor: '#ffeee9', backgroundColor: '#fffaf9' }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: '#ec2904' }} aria-hidden="true" />
                <span>The Arches, 56–58 Brussels St, Leeds</span>
              </div>
            </div>

            <div className="mt-4">
              <Link to="/classes" className="inline-flex items-center gap-2 font-semibold text-sm transition-opacity hover:opacity-80" style={{ color: '#ec2904' }}>
                Full class details <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* Paid classes + How to join */}
          <div className="space-y-5">
            <Reveal delay="delay-100">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#2c2e4b' }}>
                    <Award className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: '#2c2e4b' }}>Paid Classes</p>
                    <p className="text-sm text-gray-500">Competitive rates</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  {['Level assessment before you start', 'Homework to practise at home', 'Certificates when you finish'].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec2904' }} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link to="/classes" className="inline-flex items-center gap-2 font-semibold text-sm mt-4 transition-opacity hover:opacity-80" style={{ color: '#2c2e4b' }}>
                  Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            {/* How to join — 3 steps, very simple */}
            <Reveal delay="delay-200">
              <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #2c2e4b 0%, #ec2904 100%)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">3 easy steps</p>
                <div className="space-y-3 mb-5">
                  {[
                    { n: '1', t: 'Contact us', d: 'Email, call, or WhatsApp' },
                    { n: '2', t: 'Come to class', d: 'Saturday at The Arches' },
                    { n: '3', t: 'Start learning', d: 'We find the right level for you' },
                  ].map((s) => (
                    <div key={s.n} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        {s.n}
                      </span>
                      <div>
                        <p className="font-semibold text-sm leading-none">{s.t}</p>
                        <p className="text-xs opacity-70 mt-0.5">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 bg-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                  style={{ color: '#ec2904' }}
                >
                  How to Join <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════════════════
          5. ABOUT — short, friendly, trustworthy
          ════════════════════════════════════════════════════════════════════════ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <Heading label="About us" title="A friendly charity in Leeds" />
            <p className="text-gray-600 leading-relaxed mb-5 text-lg">
              English4All Leeds is a registered charity. We help adults learn English.
              Our teachers are volunteers. Our Saturday classes are free.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { value: '6', label: 'Free classes every Saturday' },
                { value: 'All', label: 'Levels from ABC to Advanced' },
                { value: 'Free', label: 'No cost to join' },
                { value: '100%', label: 'Volunteer-led' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4 border text-center" style={{ borderColor: '#ffc5bb', backgroundColor: '#fff4f2' }}>
                  <p className="text-2xl font-extrabold" style={{ color: '#2c2e4b' }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-sm transition-opacity hover:opacity-80" style={{ color: '#ec2904' }}>
              About us <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay="delay-100">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
              <img
                src="/images/students.png"
                alt="Students at English4All Leeds"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════════════════
          6. TESTIMONIAL
          ════════════════════════════════════════════════════════════════════════ */}
      <Section className="bg-gray-50">
        <Reveal>
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#ec2904' }} aria-hidden="true" />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-4" style={{ color: '#2c2e4b' }}>
              "I like English4All. I found new friends, I improved my English, I am happier."
            </blockquote>
            <p className="text-sm font-semibold text-gray-400">— Maria, Student</p>
          </div>
        </Reveal>
      </Section>

      {/* ════════════════════════════════════════════════════════════════════════
          7. VOLUNTEER — clear callout, accordion for roles
          ════════════════════════════════════════════════════════════════════════ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <Heading label="Get involved" title="Volunteer with us" />
            <p className="text-gray-600 leading-relaxed mb-6">
              We always need volunteers. You do not need teaching experience — we will train you.
            </p>
            <Accordion multi items={[
              { title: '📖 Teaching', content: 'Teach or assist in Saturday classes. We will train you. You need 2 hours on a Saturday.' },
              { title: '📋 Admin & Events', content: 'Help organise classes, welcome students, and run events.' },
              { title: '📣 Marketing', content: 'Help with social media and communications.' },
              { title: '💰 Fundraising', content: 'Help us raise money to keep classes free.' },
            ]} />
            <Link to="/contact"
              className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl mt-6 transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: '#ec2904' }}>
              <Handshake className="w-4 h-4" aria-hidden="true" /> Contact us
            </Link>
          </Reveal>

          {/* Activities */}
          <Reveal delay="delay-100">
            <Heading label="Community" title="Activities & events" />
            <p className="text-gray-600 leading-relaxed mb-5">We do more than just classes.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '☕', label: 'Coffee Gatherings' },
                { emoji: '🎬', label: 'Film Club' },
                { emoji: '📚', label: 'Book Club' },
                { emoji: '🚶', label: 'Walks & Trips' },
                { emoji: '🍽️', label: 'Social Meals' },
                { emoji: '🤝', label: 'Social Events' },
              ].map((a) => (
                <div key={a.label}
                  className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-2xl">{a.emoji}</span>
                  <span className="text-sm font-semibold" style={{ color: '#2c2e4b' }}>{a.label}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-sm mt-5 transition-opacity hover:opacity-80" style={{ color: '#ec2904' }}>
              Find out more <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════════════════
          8. NEWS — clean card list, easy for staff to update via CMS
          ════════════════════════════════════════════════════════════════════════ */}
      {news.length > 0 && (
        <Section className="bg-gray-50">
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <Heading label="Latest" title="News" />
              <Link to="/news" className="text-sm font-semibold transition-opacity hover:opacity-80 mb-8" style={{ color: '#ec2904' }}>
                See all →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {news.map((post, i) => (
              <Reveal key={post.slug} delay={i === 0 ? '' : i === 1 ? 'delay-100' : 'delay-200'}>
                <Link
                  to={`/news/${post.slug}`}
                  className="block bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group h-full"
                >
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold mb-2 leading-snug transition-opacity group-hover:opacity-70" style={{ color: '#2c2e4b' }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.summary}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold mt-3" style={{ color: '#ec2904' }}>
                    Read more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          9. FINAL CTA
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #2c2e4b 0%, #ec2904 100%)' }}>
        <Reveal>
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Join English4All today</h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Free. Friendly. Everyone is welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/join"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold text-lg px-8 py-4 rounded-xl shadow transition-all hover:scale-105"
                style={{ color: '#ec2904' }}
              >
                How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
