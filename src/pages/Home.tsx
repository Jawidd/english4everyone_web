/**
 * Home.tsx — Homepage
 *
 * Layout order (UX-optimised):
 *  1. Hero — headline + student photo + CTAs
 *  2. Quick contact bar
 *  3. Who we are
 *  4. Classes (free + paid)
 *  5. Coffee & Conversation
 *  6. Testimonial
 *  7. Volunteering
 *  8. Activities
 *  9. Final CTA
 */
import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle, MapPin, ArrowRight, Clock, Award, Users, Coffee, Heart, Star } from 'lucide-react'
import { loadAllNews } from '../utils/content'

const news = loadAllNews().slice(0, 2)

// ── Reusable section wrapper ──────────────────────────────────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-16 px-4 sm:px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      {label && (
        <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#ec2904' }}>{label}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#2c2e4b' }}>{title}</h2>
      {subtitle && <p className="mt-2 text-gray-500 text-lg">{subtitle}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#2c2e4b' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(236,41,4,0.2)', color: '#ff9a8a' }}>
              <Star className="w-4 h-4" aria-hidden="true" />
              Free classes every Saturday
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
              Free and paid<br />
              <span style={{ color: '#ec2904' }}>English classes</span><br />
              in Leeds
            </h1>

            <p className="text-xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Learn English. Meet people. Build confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/join"
                className="inline-flex items-center justify-center gap-2 font-bold text-lg px-7 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 text-white"
                style={{ backgroundColor: '#ec2904' }}
              >
                How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/classes"
                className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-7 py-4 rounded-xl border-2 transition-all duration-200 text-white hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                View Classes
              </Link>
            </div>
          </div>

          {/* Student photo */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/students.png"
                alt="Students learning English together at English4All Leeds"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fff4f2' }}>
                <Users className="w-5 h-5" style={{ color: '#ec2904' }} aria-hidden="true" />
              </div>
              <div>
                <p className="font-extrabold text-lg leading-none" style={{ color: '#2c2e4b' }}>6 Classes</p>
                <p className="text-xs text-gray-500">Every Saturday</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. QUICK CONTACT BAR ─────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#ec2904' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white text-sm font-semibold">
          <a href="tel:+447535867376" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone className="w-4 h-4" aria-hidden="true" /> 07535 867376
          </a>
          <a href="mailto:enquiries@english4allinleeds.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Mail className="w-4 h-4" aria-hidden="true" /> enquiries@english4allinleeds.com
          </a>
          <a href="https://wa.me/447535867376" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp us
          </a>
        </div>
      </div>

      {/* ── 3. WHO WE ARE ────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading label="About us" title="English4All in Leeds" />
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              We are a registered charity. We offer free and paid English lessons for adults in Leeds.
              Our classes are for speakers of other languages — all levels, all backgrounds.
            </p>
            <ul className="space-y-3">
              {[
                'Volunteer-led by qualified ESOL teachers',
                'Welcoming and friendly environment',
                'All levels from ABC to Advanced',
                'Free Saturday classes every week',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#fff4f2' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ec2904' }} aria-hidden="true" />
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold mt-6 transition-colors hover:opacity-80" style={{ color: '#ec2904' }}>
              Learn more about us <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Clock className="w-6 h-6" style={{ color: '#ec2904' }} />, value: '6', label: 'Classes every Saturday' },
              { icon: <Users className="w-6 h-6" style={{ color: '#ec2904' }} />, value: 'All', label: 'Levels welcome' },
              { icon: <Award className="w-6 h-6" style={{ color: '#ec2904' }} />, value: 'Free', label: 'Saturday classes' },
              { icon: <Heart className="w-6 h-6" style={{ color: '#ec2904' }} />, value: '100%', label: 'Volunteer-led' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-6 border text-center" style={{ borderColor: '#ffc5bb', backgroundColor: '#fff4f2' }}>
                <div className="flex justify-center mb-2">{s.icon}</div>
                <p className="text-3xl font-extrabold" style={{ color: '#2c2e4b' }}>{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. CLASSES ───────────────────────────────────────────────────────── */}
      <Section className="bg-gray-50">
        <SectionHeading label="What we offer" title="English Classes" subtitle="Choose the class that is right for you." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Free classes */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: '#ffc5bb' }}>
            <div className="px-6 py-4 text-white" style={{ backgroundColor: '#ec2904' }}>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Every Saturday</p>
              <h3 className="text-xl font-extrabold">Free ESOL Classes</h3>
              <p className="text-sm opacity-90 mt-1">6 free 2-hour classes · Qualified ESOL teachers</p>
            </div>
            <div className="p-6 space-y-5">
              {/* Morning */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Morning · 9:00 – 11:00</span>
                </div>
                <div className="space-y-2">
                  {[
                    { level: 'ABC', desc: 'Absolute Beginner' },
                    { level: 'Beginner', desc: 'Some English' },
                    { level: 'Elementary', desc: 'Basic English' },
                  ].map((c) => (
                    <div key={c.level} className="flex items-center justify-between px-4 py-2 rounded-lg" style={{ backgroundColor: '#fff4f2' }}>
                      <span className="font-semibold" style={{ color: '#2c2e4b' }}>{c.level}</span>
                      <span className="text-sm text-gray-500">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Afternoon */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Afternoon · 11:15 – 13:15</span>
                </div>
                <div className="space-y-2">
                  {[
                    { level: 'Pre-Intermediate', desc: 'Getting better' },
                    { level: 'Intermediate', desc: 'Good English' },
                    { level: 'Advanced', desc: 'Very good English' },
                  ].map((c) => (
                    <div key={c.level} className="flex items-center justify-between px-4 py-2 rounded-lg" style={{ backgroundColor: '#fff4f2' }}>
                      <span className="font-semibold" style={{ color: '#2c2e4b' }}>{c.level}</span>
                      <span className="text-sm text-gray-500">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                The Arches, 56–58 Brussels St, Leeds
              </div>
            </div>
            <div className="px-6 pb-6">
              <Link to="/classes" className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80" style={{ color: '#ec2904' }}>
                Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Paid classes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 text-white" style={{ backgroundColor: '#2c2e4b' }}>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Weekdays</p>
              <h3 className="text-xl font-extrabold">Paid Classes</h3>
              <p className="text-sm opacity-80 mt-1">Competitive rates · Structured learning</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed mb-5">
                Our paid classes give you more structure and support. They are great if you want to improve quickly.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: <Award className="w-5 h-5" style={{ color: '#ec2904' }} />, text: 'Level assessment before you start' },
                  { icon: <Star className="w-5 h-5" style={{ color: '#ec2904' }} />, text: 'Homework to practise at home' },
                  { icon: <Heart className="w-5 h-5" style={{ color: '#ec2904' }} />, text: 'Certificates when you finish' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5">{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 pb-6">
              <Link to="/classes" className="inline-flex items-center gap-2 font-semibold transition-colors" style={{ color: '#2c2e4b' }}>
                Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5. COFFEE & CONVERSATION ─────────────────────────────────────────── */}
      <Section>
        <div className="rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" style={{ backgroundColor: '#fff4f2' }}>
          <div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: '#ffc5bb' }}>
              <Coffee className="w-7 h-7" style={{ color: '#ec2904' }} aria-hidden="true" />
            </div>
            <SectionHeading label="After class" title="Coffee & Conversation" />
            <p className="text-gray-600 leading-relaxed mb-4">
              After class, stay for a free cup of tea or coffee. Talk with other students and teachers.
              It is a great way to practise your English in a relaxed setting.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Free tea and coffee',
                'Friendly, relaxed atmosphere',
                'Practise speaking English',
                'Make new friends',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec2904' }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80" style={{ color: '#ec2904' }}>
              Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
            <img
              src="/images/students.png"
              alt="Students enjoying coffee and conversation after class"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ── 6. TESTIMONIAL ───────────────────────────────────────────────────── */}
      <Section className="bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#ec2904' }} aria-hidden="true" />
            ))}
          </div>
          <blockquote className="text-2xl sm:text-3xl font-semibold leading-relaxed mb-6" style={{ color: '#2c2e4b' }}>
            "I like English4All. I found new friends, I improved my English, I am happier."
          </blockquote>
          <p className="font-semibold text-gray-500">— Maria, Student</p>
        </div>
      </Section>

      {/* ── 7. VOLUNTEERING ──────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading label="Get involved" title="Volunteer With Us" subtitle="Share your skills. Help your community." />
            <p className="text-gray-600 leading-relaxed mb-6">
              We are always looking for volunteers. You do not need formal teaching experience — we will train you.
              Volunteering is a great way to give back and gain new skills.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { title: 'Teaching', desc: 'Teach or assist in Saturday classes' },
                { title: 'Admin', desc: 'Help with organisation and events' },
                { title: 'Marketing', desc: 'Social media and communications' },
                { title: 'Fundraising', desc: 'Help us raise money for the charity' },
              ].map((role) => (
                <div key={role.title} className="rounded-xl p-4 border" style={{ borderColor: '#ffc5bb', backgroundColor: '#fff4f2' }}>
                  <p className="font-bold mb-1" style={{ color: '#2c2e4b' }}>{role.title}</p>
                  <p className="text-sm text-gray-500">{role.desc}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl transition-all hover:opacity-90" style={{ backgroundColor: '#ec2904' }}>
              Contact us <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <Link to="/volunteering" className="block rounded-2xl overflow-hidden shadow-md aspect-[4/3] group">
              <img
                src="/images/students.png"
                alt="Volunteers teaching at English4All Leeds"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          </div>
        </div>
      </Section>

      {/* ── 8. ACTIVITIES ────────────────────────────────────────────────────── */}
      <Section className="bg-gray-50">
        <SectionHeading label="Community" title="Activities & Events" subtitle="We do more than just classes." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[
            { emoji: '☕', label: 'Coffee Gatherings' },
            { emoji: '🎬', label: 'Film Club' },
            { emoji: '📚', label: 'Book Club' },
            { emoji: '🚶', label: 'Walks & Trips' },
            { emoji: '🍽️', label: 'Social Meals' },
          ].map((a) => (
            <div key={a.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{a.emoji}</div>
              <p className="text-sm font-semibold" style={{ color: '#2c2e4b' }}>{a.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80" style={{ color: '#ec2904' }}>
            Contact us to find out more <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* ── Latest news (if any) ─────────────────────────────────────────────── */}
      {news.length > 0 && (
        <Section>
          <SectionHeading label="Latest" title="News" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {news.map((post) => (
              <Link
                key={post.slug}
                to={`/news/${post.slug}`}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-200 group"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-lg font-bold mb-2 group-hover:text-brand-500 transition-colors" style={{ color: '#2c2e4b' }}>
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{post.summary}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold mt-4" style={{ color: '#ec2904' }}>
                  Read more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/news" className="font-semibold transition-colors hover:opacity-80" style={{ color: '#ec2904' }}>
              See all news →
            </Link>
          </div>
        </Section>
      )}

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #2c2e4b 0%, #ec2904 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Join English4All today</h2>
          <p className="text-xl mb-10" style={{ color: 'rgba(255,255,255,0.8)' }}>
            It is free. It is friendly. Everyone is welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </section>
    </>
  )
}
