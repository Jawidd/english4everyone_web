/**
 * News.tsx — News list page
 *
 * Loads all posts from /content/news/*.md via loadAllNews().
 * Each post card links to /news/:slug for the full post.
 * Staff add new posts by creating a new .md file in /content/news/
 * (or via the Decap CMS "News" collection).
 */
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import { loadAllNews } from '../utils/content'
import PageHero from '../components/PageHero'

const posts = loadAllNews()

export default function News() {
  return (
    <>
      <PageHero
        title="News"
        subtitle="Updates from English4All Leeds"
        gradient="from-purple-700 to-brand-900"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-40" aria-hidden="true" />
            <p className="text-lg">No news posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/news/${post.slug}`}
                className="block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date badge */}
                  <div className="shrink-0 bg-brand-50 text-brand-700 rounded-xl px-4 py-2 text-center min-w-[80px]">
                    <p className="text-2xl font-bold leading-none">
                      {new Date(post.date).getDate()}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-wide">
                      {new Date(post.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </p>
                    <p className="text-xs text-brand-400">
                      {new Date(post.date).getFullYear()}
                    </p>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{post.summary}</p>
                    <span className="inline-flex items-center gap-1 text-brand-600 text-sm font-medium mt-3">
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
