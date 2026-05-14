import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../config'

// Links shown inline on mobile — most important ones
const MOBILE_QUICK = ['/', '/activities', '/classes']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const desktopClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-brand-500' : 'text-navy-700 hover:text-brand-500'}`

  const drawerClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${isActive ? 'bg-brand-50 text-brand-500' : 'text-navy-700 hover:bg-gray-50'}`

  const quickLinks = NAV_LINKS.filter((l) => MOBILE_QUICK.includes(l.to))
  const moreLinks = NAV_LINKS.filter((l) => !MOBILE_QUICK.includes(l.to))

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Main row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop links grouped on the left */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" onClick={() => setOpen(false)}>
              <img src="/images/logo-large.jpg" alt="English4All Leeds" className="h-10 w-auto rounded-lg" />
            </NavLink>
            <div className="flex items-center gap-5">
              {NAV_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} className={desktopClass} end={l.to === '/'}>{l.label}</NavLink>
              ))}
                    {/* Join Now button on the right */}
          <NavLink to="/join"
            className="hidden md:block bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            Join Now
          </NavLink>
            </div>
          </div>
==
    

          {/* Mobile: quick links flush left + More flush right */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              {quickLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isActive ? 'text-brand-500 bg-brand-50' : 'text-navy-700 hover:bg-gray-100'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-navy-700 hover:bg-gray-100 transition-colors"
              aria-label={open ? 'Close menu' : 'More pages'}
              aria-expanded={open}
            >
              {open ? 'Close' : 'More'}
            </button>
          </div>
        </div>

        {/* Mobile drawer — remaining links */}
        {open && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-1">
            {moreLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={drawerClass} end={l.to === '/'} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <div className="px-4 pt-2">
              <NavLink to="/join" onClick={() => setOpen(false)}
                className="block text-center bg-brand-500 hover:bg-brand-600 text-white font-bold px-4 py-3 rounded-lg transition-colors">
                Join Now
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
