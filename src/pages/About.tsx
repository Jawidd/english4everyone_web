import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'

const { data, body } = loadPage('about')

export default function About() {
  return (
    <>
      <PageHero title={data.title} subtitle={data.hero} />

      {/* Corner photos */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 grid grid-cols-2 gap-4">
        <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
          <img
            src="/images/students2.png"
            alt="Students at English4All Leeds"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
          <img
            src="/images/classdoor.jpg"
            alt="The Arches entrance"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-content"><ReactMarkdown>{body}</ReactMarkdown></div>
      </section>
    </>
  )
}
