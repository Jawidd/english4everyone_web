import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../config'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-brand-500' : 'text-navy-700 hover:text-brand-500'}`

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${isActive ? 'bg-brand-50 text-brand-500' : 'text-navy-700 hover:bg-gray-50'}`

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/"><img src="/images/logo-large.jpg" alt="English4All Leeds" className="h-10 w-auto rounded-lg" /></NavLink>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>{l.label}</NavLink>
            ))}
            <NavLink to="/join" className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Join Now
            </NavLink>
          </div>
          <button className="md:hidden p-2 rounded-lg text-navy-700 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-1">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={mobileLinkClass} end={l.to === '/'} onClick={() => setOpen(false)}>
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
