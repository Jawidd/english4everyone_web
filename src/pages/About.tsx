import ReactMarkdown from 'react-markdown'
import { loadPage } from '../utils/content'
import PageHero from '../components/PageHero'

const { data, body } = loadPage('about')

export default function About() {
  return (
    <>
      <PageHero title={data.title} subtitle={data.hero} />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-content"><ReactMarkdown>{body}</ReactMarkdown></div>
      </section>
    </>
  )
}
