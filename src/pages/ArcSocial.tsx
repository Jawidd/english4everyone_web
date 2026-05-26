import { ExternalLink, Calendar } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'
import { BRAND, SITE } from '../config'

const { arcSocial } = SITE

const realEvents = arcSocial.events.filter((e) => e.enabled !== false)

export default function ArcSocial() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[340px] flex items-end overflow-hidden">
        <img
          src="/arc-cover.jpg"
          alt="The Arches Social"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)' }} />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-10 pt-24 flex items-end gap-6">
          <img
            src="/arc-logo.png"
            alt="The Arches Social logo"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-xl object-contain bg-white p-1 shrink-0"
          />
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">{arcSocial.tagline}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{arcSocial.heading}</h1>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <Section className="bg-white">
        <Reveal>
          <div className="max-w-2xl">
            <Heading label="About" title="Bringing Leeds together" />
            <p className="text-gray-600 leading-relaxed text-lg">{arcSocial.description}</p>
          </div>
        </Reveal>
      </Section>

      {/* ── UPCOMING EVENTS ── */}
      <Section className="section-alt">
        <Reveal>
          <Heading label="What's on" title={arcSocial.upcomingEventsHeading} />
        </Reveal>

        {realEvents.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
              <Calendar className="w-10 h-10 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-medium">{arcSocial.noEventsMessage}</p>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {realEvents.map((event, i) => (
              <Reveal key={i}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border flex flex-col" style={{ borderColor: BRAND.softBorder }}>
                  {event.poster ? (
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={event.poster}
                        alt={`${event.title} poster`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] flex items-center justify-center text-white text-xl font-bold px-6 text-center"
                      style={{ background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.primary} 100%)` }}>
                      {event.title}
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND.primary }}>
                      {event.date}
                    </p>
                    <h3 className="text-lg font-extrabold mb-2 leading-snug" style={{ color: BRAND.navy }}>
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{event.description}</p>
                    )}
                    {event.ticketUrl && (
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90 mt-auto"
                        style={{ backgroundColor: BRAND.primary }}
                      >
                        Get Tickets <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
