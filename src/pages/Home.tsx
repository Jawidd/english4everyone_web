import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle, MapPin, ArrowRight, Clock, Award, Coffee, Handshake, Star, Loader2, ExternalLink, Calendar } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'
import Accordion from '../components/Accordion'
import SocialLinks from '../components/SocialLinks'
import { BRAND, CONTACT, CLASS_SESSIONS, PAID_CLASS_FEATURES, ACTIVITIES, SITE } from '../config'
import { useLatestNews } from '../hooks/useNews'
import { useArcEvents } from '../hooks/useArcEvents'
import { useLatestActivity } from '../hooks/useLatestActivity'
import { urlFor } from '../lib/sanity'

export default function Home() {
  const { items: latestNews, loading: newsLoading } = useLatestNews()
  const { events: arcEvents, loading: arcLoading } = useArcEvents()
  const { activity: latestActivity, loading: activityLoading } = useLatestActivity()
  const latestArcEvent = arcEvents[0] ?? null

  return (
<>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: BRAND.navy }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-6">
            <img src="/images/logo-large.png" alt="English4All Leeds" className="h-20 sm:h-24 w-auto rounded-xl shadow-lg" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(236,41,4,0.25)', color: '#ffaa90' }}>
                {SITE.hero.announcement}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                {SITE.hero.headingLine1}<br /><span style={{ color: BRAND.primary }}>{SITE.hero.headingLine2}</span>
              </h1>
              <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {SITE.hero.subheading}
              </p>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {SITE.hero.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link to="/join"
                  className="inline-flex items-center justify-center gap-2 font-bold text-lg px-7 py-4 rounded-xl text-white shadow-lg transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: BRAND.primary }}>
                  How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-7 py-4 rounded-xl text-white border-2 transition-all duration-200 hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                  <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp us
                </a>
              </div>
              <SocialLinks theme="dark" variant="icon" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={SITE.photos.homeHero} alt="Students learning English at English4All Leeds"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT BAR ── */}
      <div style={{ backgroundColor: BRAND.primary }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white text-sm font-semibold">
          <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Phone className="w-4 h-4" aria-hidden="true" /> {CONTACT.phoneDisplay}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Mail className="w-4 h-4" aria-hidden="true" /> {CONTACT.email}
          </a>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>

      {/* ── SATURDAY TIMETABLE ── */}
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
            <div className="mt-4">
              <Link to="/classes" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: BRAND.primary }}>
                Full class details <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
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
                <Link to="/classes" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: BRAND.navy }}>
                  Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay="delay-200">
              <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.primary} 100%)` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">3 easy steps</p>
                <div className="space-y-3 mb-5">
                  {SITE.howToJoinSteps.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>{i + 1}</span>
                      <div>
                        <p className="font-semibold text-sm leading-none">{s.title}</p>
                        <p className="text-xs opacity-70 mt-0.5">{s.detail}</p>
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

      {/* ── COFFEE & CONVERSATION ── */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
              <img src={SITE.photos.homeCoffee} alt="Coffee and conversation after class"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
          <Reveal delay="delay-100">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: BRAND.softBg }}>
              <Coffee className="w-6 h-6" style={{ color: BRAND.primary }} aria-hidden="true" />
            </div>
            <Heading label={SITE.coffeeSection.label} title={SITE.coffeeSection.title} />
            <p className="text-gray-600 leading-relaxed mb-4">
              {SITE.coffeeSection.description}
            </p>
            <ul className="space-y-2 mb-5">
              {SITE.coffeeSection.benefits.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: BRAND.primary }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <blockquote className="border-l-4 pl-4 italic text-gray-500 text-sm mb-5" style={{ borderColor: BRAND.primary }}>
              "{SITE.testimonials[0].quote}"
              <footer className="mt-1 not-italic font-semibold text-xs text-gray-400">— {SITE.testimonials[0].author}, {SITE.testimonials[0].source}</footer>
            </blockquote>
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: BRAND.primary }}>
              Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── ABOUT ── */}
      <Section className="section-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <Heading label={SITE.aboutSection.label} title={SITE.aboutSection.title} />
            <p className="text-gray-600 leading-relaxed mb-5">
              {SITE.aboutSection.description}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {SITE.stats.map((s) => (
                <div key={s.label} className="rounded-xl p-4 border text-center bg-white" style={{ borderColor: BRAND.softBorder }}>
                  <p className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: BRAND.primary }}>
              About us <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay="delay-100">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
              <img src={SITE.photos.homeAbout} alt="English4All Leeds community"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── TESTIMONIAL ── */}
      <Section className="bg-white">
        <Reveal>
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" style={{ color: BRAND.primary }} aria-hidden="true" />)}
            </div>
            <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-4" style={{ color: BRAND.navy }}>
              "{SITE.testimonials[0].quote}"
            </blockquote>
            <p className="text-sm font-semibold text-gray-400">— {SITE.testimonials[0].author}, {SITE.testimonials[0].source}, {SITE.testimonials[0].date}</p>
          </div>
        </Reveal>
      </Section>

      {/* ── VOLUNTEERING + ACTIVITIES ── */}
      <Section className="section-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <Heading label={SITE.volunteeringSection.label} title={SITE.volunteeringSection.title} />
            <p className="text-gray-600 leading-relaxed mb-4">
              {SITE.volunteeringSection.description}
            </p>
            <Accordion multi items={SITE.volunteeringSection.roles} />
            <Link to="/contact"
              className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl mt-6 transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: BRAND.primary }}>
              <Handshake className="w-4 h-4" aria-hidden="true" /> Contact us to volunteer
            </Link>
          </Reveal>

          <Reveal delay="delay-100">
            <Heading label={SITE.activitiesSection.label} title={SITE.activitiesSection.title} />
            <p className="text-gray-600 leading-relaxed mb-5">{SITE.activitiesSection.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {ACTIVITIES.map((a) => (
                <div key={a.label} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-xl">{a.emoji}</span>
                  <span className="text-sm font-semibold" style={{ color: BRAND.navy }}>{a.label}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-sm mt-5 hover:opacity-80 transition-opacity" style={{ color: BRAND.primary }}>
              Find out more <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── LATEST SOCIAL ── minimal single photo */}
      {!activityLoading && latestActivity && latestActivity.photos?.[0] && (
        <Section className="bg-white">
          <Reveal>
            <div className="flex items-center justify-between mb-4">
              <Heading label="From Socials" title="Latest activity" />
              <Link to="/activities" className="text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: BRAND.primary }}>
                See all <ArrowRight className="w-3 h-3 inline" aria-hidden="true" />
              </Link>
            </div>
            <Link to="/activities" className="block group">
              <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ height: '240px' }}>
                <img
                  src={urlFor(latestActivity.photos![0]).width(1200).height(480).fit('crop').url()}
                  alt={latestActivity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs opacity-70 mb-1">
                      {new Date(latestActivity.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h3 className="text-lg font-bold">{latestActivity.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </Section>
      )}

      {/* ── ARC SOCIAL + NEWS ── side by side */}
      {(!arcLoading || !newsLoading) && (latestArcEvent || latestNews.length > 0) && (
        <Section className="section-alt">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Latest Arc Social event */}
            <Reveal>
              <div className="flex items-center justify-between mb-6">
                <Heading label="Arches Social" title="Upcoming event" />
                <Link to="/arc-social" className="text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: BRAND.primary }}>
                  See all <ArrowRight className="w-3 h-3 inline" aria-hidden="true" />
                </Link>
              </div>
              {arcLoading && <div className="flex items-center gap-2 text-gray-400 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>}
              {!arcLoading && !latestArcEvent && (
                <p className="text-gray-400 text-sm">No upcoming events — check back soon.</p>
              )}
              {!arcLoading && latestArcEvent && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: BRAND.softBorder }}>
                  {latestArcEvent.poster && (
                    <div className="aspect-[2/1] overflow-hidden">
                      <img src={urlFor(latestArcEvent.poster).width(800).fit('crop').url()}
                        alt={latestArcEvent.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND.primary }}>
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {new Date(latestArcEvent.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    <h3 className="text-lg font-extrabold mb-2" style={{ color: BRAND.navy }}>{latestArcEvent.title}</h3>
                    {latestArcEvent.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{latestArcEvent.description}</p>
                    )}
                    <div className="flex items-center gap-3">
                      <Link to="/arc-social"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity"
                        style={{ color: BRAND.navy }}>
                        More details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                      {latestArcEvent.ticketUrl && (
                        <a href={latestArcEvent.ticketUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: BRAND.primary }}>
                          Tickets <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Reveal>

            {/* Latest 2 news items */}
            <Reveal delay="delay-100">
              <div className="flex items-center justify-between mb-6">
                <Heading label="Latest" title="News" />
                <Link to="/news" className="text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: BRAND.primary }}>
                  See all <ArrowRight className="w-3 h-3 inline" aria-hidden="true" />
                </Link>
              </div>
              {newsLoading && <div className="flex items-center gap-2 text-gray-400 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>}
              {!newsLoading && latestNews.length === 0 && (
                <p className="text-gray-400 text-sm">No news yet — check back soon.</p>
              )}
              {!newsLoading && latestNews.length > 0 && (
                <div className="space-y-4">
                  {latestNews.map((post) => (
                    <Link key={post._id} to={`/news/${post.slug}`}
                      className="block bg-white rounded-2xl p-5 border shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
                      style={{ borderColor: BRAND.softBorder }}>
                      <p className="text-xs text-gray-400 mb-1">
                        {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <h3 className="font-bold mb-1 leading-snug group-hover:opacity-70 transition-opacity" style={{ color: BRAND.navy }}>
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.summary}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold mt-2" style={{ color: BRAND.primary }}>
                        Read more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </Reveal>

          </div>
        </Section>
      )}

      {/* ── SOCIAL MEDIA ── */}
      <Section className="section-alt">
        <Reveal>
          <div className="text-center">
            <Heading label="Follow us" title="Stay connected" center />
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Follow us on social media for news, updates, and community stories.</p>
            <SocialLinks variant="full" theme="light" />
          </div>
        </Reveal>
      </Section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-4 text-white text-center" style={{ background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.primary} 100%)` }}>
        <Reveal>
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Join English4All today</h2>
            <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Free. Friendly. Everyone is welcome.</p>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {SITE.hero.announcement}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/join"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold text-lg px-8 py-4 rounded-xl shadow transition-all hover:scale-105"
                style={{ color: BRAND.primary }}>
                How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all">
                <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp us
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
