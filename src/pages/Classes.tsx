import ReactMarkdown from 'react-markdown'
import { MapPin } from 'lucide-react'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'

const { data, body } = loadPage('classes')

export default function Classes() {
  return (
    <>
      <PageHero title={data.title} subtitle={data.intro} />

      <div className="text-white py-3 px-4 text-center" style={{ backgroundColor: '#ec2904' }}>
        <span className="inline-flex items-center gap-2 font-semibold">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          {data.location}
        </span>
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </section>
    </>
  )
}
