import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft } from 'lucide-react'
import { loadNewsPost } from '../utils/content'

export default function NewsPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = loadNewsPost(slug ?? '')

  if (!post) return <Navigate to="/news" replace />

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <Link
        to="/news"
        className="inline-flex items-center gap-2 font-medium mb-8 transition-colors hover:opacity-80"
        style={{ color: '#ec2904' }}
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to News
      </Link>

      <header className="mb-8">
        <p className="text-sm text-gray-400 mb-2">
          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: '#2c2e4b' }}>
          {post.title}
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">{post.summary}</p>
      </header>

      <hr className="border-gray-200 mb-8" />

      <div className="prose-content">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  )
}
