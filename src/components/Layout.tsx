/**
 * Layout.tsx — Shared page wrapper
 *
 * Renders the Navbar at the top and Footer at the bottom.
 * <Outlet /> is where React Router injects the current page component.
 * All pages automatically get the nav and footer by using this layout.
 */
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
