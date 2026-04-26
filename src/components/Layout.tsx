import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingContact from './FloatingContact'
import { ArrowUp } from 'lucide-react'

export default function Layout() {
  const { pathname } = useLocation()
  const [showTop, setShowTop] = useState(false)

  // Instant scroll on route change — 'smooth' can lag behind new page render
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />

      {/* Back to top — bottom-left, small, semi-transparent */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-4 z-30 w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-100"
          style={{ backgroundColor: 'rgba(44,46,75,0.45)', backdropFilter: 'blur(4px)' }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
