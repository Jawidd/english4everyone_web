/**
 * Footer.tsx — Full footer with contact, links, charity info, social links
 */
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="mt-16" style={{ backgroundColor: '#1e2038', color: '#fff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand + social */}
        <div className="lg:col-span-1">
          <img src="/images/logo-large.jpg" alt="English4All Leeds" className="h-10 w-auto rounded-lg mb-4" />
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#a8aac0' }}>
            Free and paid English classes in Leeds for adult speakers of other languages.
          </p>
          {/* Social links */}
          <SocialLinks theme="dark" />
          <div className="mt-4 space-y-1 text-xs" style={{ color: '#6b6e8a' }}>
            <p>Registered Charity No. 1175775</p>
            <p>VAT No. 460246413</p>
            <p>Main contact: Nick Conibear (Principal)</p>
          </div>
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
                <Link to={to} className="transition-colors hover:text-white" style={{ color: '#a8aac0' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: '#ec2904' }}>
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+447535867376" className="flex items-center gap-2 hover:text-white transition-colors" style={{ color: '#a8aac0' }}>
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" /> 07535 867376
              </a>
            </li>
            <li>
              <a href="https://wa.me/447535867376" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors" style={{ color: '#a8aac0' }}>
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" /> WhatsApp us
              </a>
            </li>
            <li>
              <a href="mailto:enquiries@english4allinleeds.com"
                className="flex items-start gap-2 hover:text-white transition-colors break-all" style={{ color: '#a8aac0' }}>
                <Mail className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
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
          <div className="flex items-start gap-2 text-sm mb-4" style={{ color: '#a8aac0' }}>
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <address className="not-italic leading-relaxed">
              The Arches<br />
              56–58 Brussels St<br />
              Leeds, LS9 8AB
            </address>
          </div>
          {/* WhatsApp join CTA */}
          <a
            href="https://wa.me/447535867376"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#25d366', color: '#fff' }}
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Join free — WhatsApp us
          </a>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs" style={{ borderColor: '#2d3050', color: '#6b6e8a' }}>
        © {new Date().getFullYear()} English4All in Leeds. Registered Charity No. 1175775 (England & Wales).
        Registered office: The Arches, 56–58 Brussels St, Leeds, LS9 8AB.
      </div>
    </footer>
  )
}
