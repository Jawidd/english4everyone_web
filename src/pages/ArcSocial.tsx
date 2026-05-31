import { ExternalLink, Calendar, Loader2 } from 'lucide-react'
import { Section, Heading, Reveal } from '../components/ui'
import { BRAND, SITE } from '../config'
import { useArcEvents } from '../hooks/useArcEvents'
import { urlFor } from '../lib/sanity'

const { arcSocial } = SITE

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ArcSocial() {
  const { events, loading, error } = useArcEvents()

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: BRAND.navy }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row min-h-[480px]">

          {/* Photo — left column on desktop, top on mobile */}
          <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            <img
              src="/images/arches-cover.jpg"
              alt="The Arches Social community"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* Info — right column on desktop, below photo on mobile */}
          <div className="lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-16 text-white">
            <img
              src="/images/arches-logo.png"
              alt="The Arches Social logo"
              className="w-20 h-20 rounded-2xl shadow-lg object-contain bg-white p-1.5 mb-8"
            />
            <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">{arcSocial.tagline}</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">{arcSocial.heading}</h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {arcSocial.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <Section className="section-alt">
        <Reveal>
          <Heading label="What's on" title={arcSocial.upcomingEventsHeading} />
        </Reveal>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
          </div>
        )}

        {!loading && (error || events.length === 0) && (
          <Reveal>
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
              <Calendar className="w-10 h-10 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-400 font-medium">{arcSocial.noEventsMessage}</p>
            </div>
          </Reveal>
        )}

        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Reveal key={event._id}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border flex flex-col" style={{ borderColor: BRAND.softBorder }}>
                  {event.poster ? (
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={urlFor(event.poster).width(600).fit('max').url()}
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
                      {formatDate(event.date)}
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
