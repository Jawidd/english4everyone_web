/**
 * Footer.tsx — Full footer with contact, links, charity info
 */
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16" style={{ backgroundColor: '#2c2e4b', color: '#fff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="lg:col-span-1">
          <img src="/images/logo-large.jpg" alt="English4All Leeds" className="h-10 w-auto rounded-lg mb-4" />
          <p className="text-sm leading-relaxed" style={{ color: '#c5c7d4' }}>
            Free and paid English classes in Leeds. Everyone is welcome.
          </p>
          <p className="text-xs mt-3" style={{ color: '#8b8fa8' }}>
            Registered Charity No. 1175775
          </p>
          <p className="text-xs" style={{ color: '#8b8fa8' }}>
            VAT No. 460246413
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: '#ec2904' }}>
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ['/', 'Home'],
              ['/classes', 'Classes'],
              ['/join', 'How to Join'],
              ['/volunteering', 'Volunteer'],
              ['/news', 'News'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-white" style={{ color: '#c5c7d4' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: '#ec2904' }}>
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2" style={{ color: '#c5c7d4' }}>
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <a href="tel:+447535867376" className="hover:text-white transition-colors">07535 867376</a>
            </li>
            <li className="flex items-center gap-2" style={{ color: '#c5c7d4' }}>
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <a href="https://wa.me/447535867376" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                WhatsApp us
              </a>
            </li>
            <li className="flex items-start gap-2" style={{ color: '#c5c7d4' }}>
              <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <a href="mailto:enquiries@english4allinleeds.com" className="hover:text-white transition-colors break-all">
                enquiries@english4allinleeds.com
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: '#ec2904' }}>
            Find Us
          </h3>
          <div className="flex items-start gap-2 text-sm" style={{ color: '#c5c7d4' }}>
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <address className="not-italic leading-relaxed">
              The Arches<br />
              56–58 Brussels St<br />
              Leeds, LS9 8AH
            </address>
          </div>
          <p className="text-xs mt-4" style={{ color: '#8b8fa8' }}>
            Main contact: Nick Conibear
          </p>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs" style={{ borderColor: '#3d3f5a', color: '#8b8fa8' }}>
        © {new Date().getFullYear()} English4All Leeds. Registered Charity No. 1175775.
      </div>
    </footer>
  )
}
