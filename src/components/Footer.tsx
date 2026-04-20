/**
 * Footer.tsx — Site footer
 * Shows key contact info and navigation links on every page.
 */
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-brand-100" aria-hidden="true" />
            <span className="font-bold text-lg">English4All Leeds</span>
          </div>
          <p className="text-brand-100 text-sm leading-relaxed">
            Free and paid English classes in Leeds. Everyone is welcome.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-semibold text-brand-100 mb-3 uppercase text-xs tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ['/', 'Home'],
              ['/classes', 'Classes'],
              ['/join', 'How to Join'],
              ['/volunteering', 'Volunteer'],
              ['/news', 'News'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-brand-200 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-brand-100 mb-3 uppercase text-xs tracking-wider">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2 text-brand-200">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <a href="mailto:enquiries@english4allinleeds.com" className="hover:text-white transition-colors break-all">
                enquiries@english4allinleeds.com
              </a>
            </li>
            <li className="flex items-center gap-2 text-brand-200">
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <a href="tel:+447535867376" className="hover:text-white transition-colors">
                +44 7535 867376
              </a>
            </li>
            <li className="flex items-start gap-2 text-brand-200">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>The Arches, 56–58 Brussels St, Leeds</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 text-center py-4 text-xs text-brand-300">
        © {new Date().getFullYear()} English4All Leeds. Registered charity.
      </div>
    </footer>
  )
}
