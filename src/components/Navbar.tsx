/**
 * Navbar.tsx — Site navigation
 *
 * Mobile-first: shows a hamburger menu on small screens,
 * horizontal links on medium+ screens.
 * Uses React Router's NavLink for active-state highlighting.
 */
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, BookOpen } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/classes', label: 'Classes' },
  { to: '/join', label: 'How to Join' },
  { to: '/news', label: 'News' },
  { to: '/volunteering', label: 'Volunteer' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-base font-medium transition-colors duration-200 ${
      isActive
        ? 'text-brand-600 border-b-2 border-brand-600'
        : 'text-gray-700 hover:text-brand-600'
    }`

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-50'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <NavLink to="/" className="flex items-center gap-2 text-brand-700 font-bold text-lg">
            <BookOpen className="w-6 h-6 text-brand-600" aria-hidden="true" />
            <span>English4All Leeds</span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={mobileLinkClass}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
