import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle, MapPin, ArrowRight, Clock, Award, Users, Heart, Star, BookOpen, Coffee, Handshake } from 'lucide-react'
import { loadAllNews } from '../utils/content'
import { useInView } from '../hooks/useInView'
import Accordion from '../components/Accordion'
import SocialLinks from '../components/SocialLinks'

const news = loadAllNews().slice(0, 3)

function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, inView } = useInView()
  return <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''} ${delay} ${className}`}>{children}</div>
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-14 px-4 sm:px-6 ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}

function Heading({ label, title, center = false }: { label?: string; title: string; center?: boolean }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      {label && <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#ec2904' }}>{label}</p>}
      <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: '#2c2e4b' }}>{title}</h2>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#2c2e4b' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-6">
            <img src="/images/logo-large.jpg" alt="English4All Leeds" className="h-20 sm:h-24 w-auto rounded-xl shadow-lg" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(236,41,4,0.25)', color: '#ffaa90' }}>
                New students &amp; volunteers — join free, message WhatsApp
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Free English<br /><span style={{ color: '#ec2904' }}>classes in Leeds</span>
              </h1>
              <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Free and paid English lessons for adult speakers of other languages.
              </p>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                All levels welcome · Every Saturday · Free to join
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link to="/join"
                  className="inline-flex items-center justify-center gap-2 font-bold text-lg px-7 py-4 rounded-xl text-white shadow-lg transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#ec2904' }}>
                  How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <a href="https://wa.me/447535867376" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-7 py-4 rounded-xl text-white border-2 transition-all duration-200 hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                  <MessageCircle className="w-5 h-5" aria-hidden="true" /> WhatsApp us
                </a>
              </div>
              <SocialLinks theme="dark" variant="icon" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src="/images/allstudents.png" alt="Students learning English at English4All Leeds"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT BAR ── */}
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

      {/* ── WHAT WE OFFER ── */}
      <Section className="bg-white">
        <Reveal><Heading label="What we offer" title="English classes for everyone in Leeds" /></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: <BookOpen className="w-7 h-7" style={{ color: '#ec2904' }} />, title: 'Free Saturday Classes', desc: '6 free 2-hour classes every Saturday. All levels. Qualified ESOL teachers.' },
            { icon: <Award className="w-7 h-7" style={{ color: '#ec2904' }} />, title: 'Paid Classes', desc: 'Structured classes with assessment, homework, and end-of-course certificates.' },
            { icon: <Users className="w-7 h-7" style={{ color: '#ec2904' }} />, title: 'Community Activities', desc: 'Coffee mornings, film club, book club, walks, meals, and social events.' },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''}>
              <div className="bg-white rounded-2xl p-6 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style={{ borderColor: '#ffc5bb' }}>
                <div className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#fff4f2' }}>{card.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#2c2e4b' }}>{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── SATURDAY TIMETABLE ── */}
      <Section className="section-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Reveal>
            <Heading label="Free ESOL classes" title="Saturday Timetable" />
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border" style={{ borderColor: '#ffc5bb' }}>
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
                  {[{ level: 'ABC', tag: 'Absolute Beginner' }, { level: 'Beginner', tag: 'Some English' }, { level: 'Elementary', tag: 'Basic English' }].map((c) => (
                    <div key={c.level} className="flex items-center justify-between px-4 py-2.5 rounded-lg" style={{ backgroundColor: '#fff4f2' }}>
                      <span className="font-semibold text-sm" style={{ color: '#2c2e4b' }}>{c.level}</span>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-100">{c.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
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
                  {[{ level: 'Pre-Intermediate', tag: 'Getting better' }, { level: 'Intermediate', tag: 'Good English' }, { level: 'Advanced', tag: 'Very good English' }].map((c) => (
                    <div key={c.level} className="flex items-center justify-between px-4 py-2.5 rounded-lg" style={{ backgroundColor: '#fff4f2' }}>
                      <span className="font-semibold text-sm" style={{ color: '#2c2e4b' }}>{c.level}</span>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-100">{c.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 py-4 border-t flex items-center gap-2 text-sm text-gray-500" style={{ borderColor: '#ffeee9', backgroundColor: '#fffaf9' }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: '#ec2904' }} aria-hidden="true" />
                The Arches, 56–58 Brussels St, Leeds, LS9 8AB
              </div>
            </div>
            <div className="mt-4">
              <Link to="/classes" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: '#ec2904' }}>
                Full class details <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

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
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  {['Level assessment before you start', 'Regular homework to practise at home', 'End-of-course certificates'].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec2904' }} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link to="/classes" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: '#2c2e4b' }}>
                  Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay="delay-200">
              <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #2c2e4b 0%, #ec2904 100%)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">3 easy steps</p>
                <div className="space-y-3 mb-5">
                  {[
                    { n: '1', t: 'Contact us', d: 'Email, call, or WhatsApp' },
                    { n: '2', t: 'Come to class', d: 'Saturday at The Arches, Leeds' },
                    { n: '3', t: 'Start learning', d: 'We find the right level for you' },
                  ].map((s) => (
                    <div key={s.n} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>{s.n}</span>
                      <div>
                        <p className="font-semibold text-sm leading-none">{s.t}</p>
                        <p className="text-xs opacity-70 mt-0.5">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/join" className="inline-flex items-center gap-2 bg-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105" style={{ color: '#ec2904' }}>
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
              <img src="/images/coffee1.jpg" alt="Coffee and conversation after class at English4All Leeds"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </Reveal>
          <Reveal delay="delay-100">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: '#fff4f2' }}>
              <Coffee className="w-6 h-6" style={{ color: '#ec2904' }} aria-hidden="true" />
            </div>
            <Heading label="Every Saturday after class" title="Coffee & Conversation" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Every week after class we serve hot and cold drinks. Bring your own drinks for a small table charge.
              Improve your English, improve your confidence — you might even make some new friends!
            </p>
            <ul className="space-y-2 mb-5">
              {['Free hot and cold drinks after class', 'Relaxed, friendly atmosphere', 'Practise speaking English naturally', 'Build confidence and friendships'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec2904' }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <blockquote className="border-l-4 pl-4 italic text-gray-500 text-sm mb-5" style={{ borderColor: '#ec2904' }}>
              "I like English4All. I found new friends, I improved my English, I am happier."
              <footer className="mt-1 not-italic font-semibold text-xs text-gray-400">— Maria, Student Feedback Survey</footer>
            </blockquote>
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: '#ec2904' }}>
              Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── ABOUT + STATS ── */}
      <Section className="section-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <Heading label="About us" title="A friendly charity in Leeds" />
            <p className="text-gray-600 leading-relaxed mb-5">
              English4All in Leeds is a registered charity offering free and paid English lessons for adult speakers of other languages.
              Our volunteer teachers are qualified ESOL professionals who give their time to help people learn English and build confidence.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { value: '6', label: 'Free classes every Saturday' },
                { value: 'All', label: 'Levels from ABC to Advanced' },
                { value: 'Free', label: 'No cost to join Saturday classes' },
                { value: '100%', label: 'Volunteer-led organisation' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4 border text-center bg-white" style={{ borderColor: '#ffc5bb' }}>
                  <p className="text-2xl font-extrabold" style={{ color: '#2c2e4b' }}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: '#ec2904' }}>
              About us <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay="delay-100">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
              <img src="/images/coffee2.jpg" alt="English4All Leeds community"
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
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#ec2904' }} aria-hidden="true" />)}
            </div>
            <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed mb-4" style={{ color: '#2c2e4b' }}>
              "I like English4All. I found new friends, I improved my English, I am happier."
            </blockquote>
            <p className="text-sm font-semibold text-gray-400">— Maria, Student Feedback Survey, March 2018</p>
          </div>
        </Reveal>
      </Section>

      {/* ── VOLUNTEERING ── */}
      <Section className="section-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <Heading label="Get involved" title="Volunteering opportunities" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Do you have a TEFL qualification or ESOL teaching experience? Would you like to teach or be a classroom assistant?
              Do you have professional skills in management, accounting, fundraising, marketing, HR, administration, or photography?
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              We welcome anyone who wants to contribute to social cohesion, gain charity experience, or simply do something rewarding.
            </p>
            <Accordion multi items={[
              { title: '📖 Teaching & Classroom Assistant', content: 'Teach or assist in our Saturday ESOL classes. TEFL/ESOL experience welcome but not essential — we will support you. Just 2 hours on a Saturday morning or afternoon.' },
              { title: '📋 Admin, HR & Governance', content: 'Help with organising classes, managing volunteers, charitable governance, and general administration.' },
              { title: '📣 Marketing, Photography & Web', content: 'Help with social media, communications, photography, and website updates.' },
              { title: '💰 Fundraising & Finance', content: 'Help us raise funds and manage accounts so we can keep Saturday classes free for everyone.' },
            ]} />
            <Link to="/contact"
              className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl mt-6 transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: '#ec2904' }}>
              <Handshake className="w-4 h-4" aria-hidden="true" /> Contact us to volunteer
            </Link>
          </Reveal>

          {/* Activities */}
          <Reveal delay="delay-100">
            <Heading label="Community" title="Weekly & monthly activities" />
            <p className="text-gray-600 leading-relaxed mb-5">We do much more than just classes. Join us for:</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '☕', label: 'Coffee Gatherings' },
                { emoji: '🎬', label: 'Film Club' },
                { emoji: '📚', label: 'Book Club' },
                { emoji: '🚶', label: 'Country Walks' },
                { emoji: '⛺', label: 'Lake District Camping' },
                { emoji: '🎵', label: 'Songwriting Socials' },
                { emoji: '🍽️', label: 'End-of-Year Meals' },
                { emoji: '🎉', label: 'Birthday Celebrations' },
              ].map((a) => (
                <div key={a.label} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-xl">{a.emoji}</span>
                  <span className="text-sm font-semibold" style={{ color: '#2c2e4b' }}>{a.label}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-sm mt-5 hover:opacity-80 transition-opacity" style={{ color: '#ec2904' }}>
              Find out more <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── NEWS ── */}
      {news.length > 0 && (
        <Section className="bg-white">
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <Heading label="Latest" title="News" />
              <Link to="/news" className="text-sm font-semibold hover:opacity-80 transition-opacity mb-8" style={{ color: '#ec2904' }}>See all →</Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {news.map((post, i) => (
              <Reveal key={post.slug} delay={i === 0 ? '' : i === 1 ? 'delay-100' : 'delay-200'}>
                <Link to={`/news/${post.slug}`}
                  className="block bg-white rounded-2xl p-5 border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group h-full">
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="font-bold mb-2 leading-snug group-hover:opacity-70 transition-opacity" style={{ color: '#2c2e4b' }}>{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.summary}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold mt-3" style={{ color: '#ec2904' }}>
                    Read more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
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
      <section className="py-16 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #2c2e4b 0%, #ec2904 100%)' }}>
        <Reveal>
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Join English4All today</h2>
            <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Free. Friendly. Everyone is welcome.</p>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              New students &amp; volunteers — message WhatsApp +44 7535 867376
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/join"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold text-lg px-8 py-4 rounded-xl shadow transition-all hover:scale-105"
                style={{ color: '#ec2904' }}>
                How to Join <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <a href="https://wa.me/447535867376" target="_blank" rel="noopener noreferrer"
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
