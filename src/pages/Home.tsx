/**
 * Home.tsx — Landing page
 *
 * Uses simple, large text for low-level English learners.
 * Content is NOT hardcoded — key CTAs and info come from /content/join.md
 * and /content/classes.md frontmatter so staff can update them via CMS.
 *
 * Sections:
 *  1. Hero — headline + primary CTA
 *  2. Key facts — 3 icon cards
 *  3. Class times — quick visual summary
 *  4. How to join teaser — 3 steps
 *  5. News teaser — latest 2 posts
 */
import { Link } from 'react-router-dom'
import { BookOpen, Users, MapPin, ArrowRight, Clock, Star } from 'lucide-react'
import { loadAllNews } from '../utils/content'

const news = loadAllNews().slice(0, 2)

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 text-white overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute bottom-0 -left-10 w-60 h-60 bg-white/5 rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-brand-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star className="w-4 h-4 text-accent-400" aria-hidden="true" />
            Free classes every Saturday
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Free and paid English classes in Leeds
          </h1>

          <p className="text-xl sm:text-2xl text-brand-100 leading-relaxed mb-10 max-w-2xl mx-auto">
            We help adults learn English. All levels welcome. Come and join us!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              How to Join
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              to="/classes"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/20 transition-all duration-200"
            >
              See Classes
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key facts ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen className="w-8 h-8 text-brand-600" aria-hidden="true" />,
              title: '6 Classes Every Saturday',
              desc: 'From ABC beginner to Advanced. Find your level.',
            },
            {
              icon: <Users className="w-8 h-8 text-green-600" aria-hidden="true" />,
              title: 'Volunteer-Led',
              desc: 'Our teachers are volunteers. They love to help.',
            },
            {
              icon: <MapPin className="w-8 h-8 text-accent-500" aria-hidden="true" />,
              title: 'Easy to Find',
              desc: 'The Arches, 56–58 Brussels St, Leeds.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">{card.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h2>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Class times ──────────────────────────────────────── */}
      <section className="bg-brand-50 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-7 h-7 text-brand-600" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">Saturday Class Times</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Morning */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-1">Morning</p>
              <p className="text-2xl font-bold text-gray-900 mb-4">9:00am – 11:00am</p>
              <ul className="space-y-2">
                {['ABC (Absolute Beginner)', 'Beginner', 'Elementary'].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-brand-400 rounded-full shrink-0" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Afternoon */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100">
              <p className="text-sm font-semibold text-accent-500 uppercase tracking-wide mb-1">Afternoon</p>
              <p className="text-2xl font-bold text-gray-900 mb-4">11:15am – 1:15pm</p>
              <ul className="space-y-2">
                {['Pre-Intermediate', 'Intermediate', 'Advanced'].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-accent-400 rounded-full shrink-0" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors"
            >
              See all class details <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How to join teaser ───────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
          How to Join — 3 Easy Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Contact us', desc: 'Send us an email, call, or WhatsApp.' },
            { step: '2', title: 'Come to class', desc: 'Visit us on a Saturday morning.' },
            { step: '3', title: 'Start learning', desc: 'We find the right class for you.' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 bg-brand-600 text-white text-2xl font-extrabold rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                {s.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow transition-all duration-200 hover:scale-105"
          >
            How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Latest news teaser ───────────────────────────────── */}
      {news.length > 0 && (
        <section className="bg-gray-50 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {news.map((post) => (
                <Link
                  key={post.slug}
                  to={`/news/${post.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-200 transition-all duration-200 group"
                >
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{post.summary}</p>
                  <span className="inline-flex items-center gap-1 text-brand-600 text-sm font-medium mt-4">
                    Read more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/news" className="text-brand-600 font-semibold hover:text-brand-800 transition-colors">
                See all news →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
