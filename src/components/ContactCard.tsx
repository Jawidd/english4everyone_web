/**
 * ContactCard.tsx — Reusable contact info block
 * Used on Join, Contact, and Volunteering pages.
 * Shows email, phone, and WhatsApp with icons and tap-to-action links.
 */
import { Mail, Phone, MessageCircle } from 'lucide-react'

interface Props {
  email: string
  phone: string
  whatsapp?: string
}

export default function ContactCard({ email, phone, whatsapp }: Props) {
  const whatsappUrl = `https://wa.me/${(whatsapp || phone).replace(/\D/g, '')}`

  return (
    <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-4">
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-3 group"
        aria-label={`Email us at ${email}`}
      >
        <span className="bg-brand-100 text-brand-700 p-3 rounded-xl group-hover:bg-brand-200 transition-colors">
          <Mail className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
          <p className="text-brand-700 font-semibold group-hover:underline break-all">{email}</p>
        </div>
      </a>

      <a
        href={`tel:${phone.replace(/\s/g, '')}`}
        className="flex items-center gap-3 group"
        aria-label={`Call us at ${phone}`}
      >
        <span className="bg-green-100 text-green-700 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
          <Phone className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
          <p className="text-green-700 font-semibold group-hover:underline">{phone}</p>
        </div>
      </a>

      {(whatsapp || phone) && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
          aria-label="Message us on WhatsApp"
        >
          <span className="bg-emerald-100 text-emerald-700 p-3 rounded-xl group-hover:bg-emerald-200 transition-colors">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">WhatsApp</p>
            <p className="text-emerald-700 font-semibold group-hover:underline">{whatsapp || phone}</p>
          </div>
        </a>
      )}
    </div>
  )
}
