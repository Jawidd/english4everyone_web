import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Loader2 } from 'lucide-react'
import { loadAllNews } from '../utils/content'
import { useNews } from '../hooks/useNews'
import PageHero from '../components/PageHero'
import { BRAND } from '../config'

const mdPosts = loadAllNews()

function DateChip({ dateStr }: { dateStr: string }) {
  const d = new Date(dateStr)
  return (
    <div className="shrink-0 rounded-xl px-4 py-2 text-center min-w-[80px]"
      style={{ backgroundColor: BRAND.softBg, color: BRAND.primaryDark }}>
      <p className="text-2xl font-bold leading-none">{d.getDate()}</p>
      <p className="text-xs font-medium uppercase tracking-wide">
        {d.toLocaleDateString('en-GB', { month: 'short' })}
      </p>
      <p className="text-xs" style={{ color: BRAND.coral }}>{d.getFullYear()}</p>
    </div>
  )
}

export default function News() {
  const { items: sanityPosts, loading } = useNews()

  // Merge Sanity + markdown, sorted newest first
  const sanityRows = sanityPosts.map((p) => ({
    key: `sanity-${p._id}`,
    slug: p.slug,
    title: p.title,
    date: p.date,
    summary: p.summary,
    source: 'sanity' as const,
  }))
  const mdRows = mdPosts.map((p) => ({
    key: `md-${p.slug}`,
    slug: p.slug,
    title: p.title,
    date: p.date,
    summary: p.summary,
    source: 'md' as const,
  }))
  const allPosts = [...sanityRows, ...mdRows].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHero title="News" subtitle="Updates from English4All Leeds" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">

        {loading && (
          <div className="flex justify-center py-16 gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" /> Loading news…
          </div>
        )}

        {!loading && allPosts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-40" aria-hidden="true" />
            <p className="text-lg">No news posts yet. Check back soon!</p>
          </div>
        )}

        {!loading && allPosts.length > 0 && (
          <div className="space-y-6">
            {allPosts.map((post) => (
              <Link key={post.key} to={`/news/${post.slug}`}
                className="block bg-white border border-transparent rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-100 transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <DateChip dateStr={post.date} />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2" style={{ color: BRAND.navy }}>{post.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{post.summary}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold mt-3" style={{ color: BRAND.primary }}>
                      Read more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </section>
    </>
  )
}
