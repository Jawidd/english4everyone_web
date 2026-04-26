import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import SocialLinks from './SocialLinks'
import { BRAND, CONTACT, NAV_LINKS, VERSION, COPYRIGHT } from '../config'

export default function Footer() {
  return (
    <footer className="mt-16" style={{ backgroundColor: BRAND.navyDark, color: '#fff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="lg:col-span-1">
          <img src="/images/logo-large.jpg" alt="English4All Leeds" className="h-10 w-auto rounded-lg mb-4" />
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#a8aac0' }}>
            Free and paid English classes in Leeds for adult speakers of other languages.
          </p>
          <SocialLinks theme="dark" />
          <div className="mt-4 space-y-1 text-xs" style={{ color: '#6b6e8a' }}>
            <p>Registered Charity No. {CONTACT.charity.number}</p>
            <p>VAT No. {CONTACT.charity.vat}</p>
            <p>Main contact: {CONTACT.charity.principal} (Principal)</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: BRAND.primary }}>Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-white" style={{ color: '#a8aac0' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: BRAND.primary }}>Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-2 hover:text-white transition-colors" style={{ color: '#a8aac0' }}>
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors" style={{ color: '#a8aac0' }}>
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" /> WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2 hover:text-white transition-colors break-all" style={{ color: '#a8aac0' }}>
                <Mail className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" /> {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: BRAND.primary }}>Find Us</h3>
          <div className="flex items-start gap-2 text-sm mb-4" style={{ color: '#a8aac0' }}>
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <address className="not-italic leading-relaxed">
              {CONTACT.address.line1}<br />
              {CONTACT.address.line2}<br />
              {CONTACT.address.city}, {CONTACT.address.postcode}
            </address>
          </div>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: BRAND.whatsapp, color: '#fff' }}>
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" /> Join free — WhatsApp us
          </a>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs" style={{ borderColor: '#2d3050', color: '#6b6e8a' }}>
        <p>
          © {COPYRIGHT.year} {COPYRIGHT.organization}. Registered Charity No. {COPYRIGHT.registrationNumber} ({COPYRIGHT.jurisdiction}). Registered office: {COPYRIGHT.registeredOffice}. <span style={{ color: '#4a4d66' }}>{VERSION.displayVersion}</span>
        </p>
      </div>
    </footer>
  )
}
