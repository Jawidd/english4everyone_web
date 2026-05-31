import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Loader2, WifiOff, RefreshCw } from 'lucide-react'
import { useNews } from '../hooks/useNews'
import PageHero from '../components/PageHero'
import { BRAND } from '../config'

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
  const { items, loading, error, retry } = useNews()

  return (
    <>
      <PageHero title="News" subtitle="Updates from English4All Leeds" />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
            <p className="text-sm">Loading news…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <WifiOff className="w-10 h-10 text-gray-300" aria-hidden="true" />
            <p className="font-semibold text-gray-600">Couldn't load news right now</p>
            <p className="text-sm text-gray-400 max-w-xs">Check your internet connection and try again.</p>
            <button onClick={retry}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all hover:opacity-80"
              style={{ borderColor: BRAND.softBorder, color: BRAND.primary }}>
              <RefreshCw className="w-4 h-4" aria-hidden="true" /> Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center text-gray-400">
            <Newspaper className="w-12 h-12 opacity-30" aria-hidden="true" />
            <p className="text-lg font-semibold">No news yet</p>
            <p className="text-sm">Check back soon — we'll post updates here.</p>
          </div>
        )}

        {/* News list */}
        {!loading && !error && items.length > 0 && (
          <div className="space-y-6">
            {items.map((post) => (
              <Link key={post._id} to={`/news/${post.slug}`}
                className="block bg-white border border-transparent rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-100 transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <DateChip dateStr={post.date} />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity"
                      style={{ color: BRAND.navy }}>{post.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{post.summary}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold mt-3"
                      style={{ color: BRAND.primary }}>
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
