/**
 * NewsPost.tsx — Individual news post page
 *
 * Reads the :slug param from the URL (e.g. /news/my-post-slug).
 * Loads the matching post from /content/news/<slug>.md.
 * Renders the Markdown body using ReactMarkdown.
 */
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft } from 'lucide-react'
import { loadNewsPost } from '../utils/content'

export default function NewsPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = loadNewsPost(slug ?? '')

  // If slug doesn't match any post, redirect to news list
  if (!post) return <Navigate to="/news" replace />

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Back link */}
      <Link
        to="/news"
        className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-800 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to News
      </Link>

      {/* Post header */}
      <header className="mb-8">
        <p className="text-sm text-gray-400 mb-2">
          {new Date(post.date).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">{post.summary}</p>
      </header>

      <hr className="border-gray-200 mb-8" />

      {/* Post body — rendered from Markdown */}
      <div className="prose-content">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  )
}
