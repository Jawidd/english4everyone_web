/**
 * ContactCard.tsx — Reusable contact info block with brand colours
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
    <div className="rounded-2xl p-6 space-y-4 border" style={{ backgroundColor: '#fff4f2', borderColor: '#ffc5bb' }}>
      <a href={`mailto:${email}`} className="flex items-center gap-3 group" aria-label={`Email us at ${email}`}>
        <span className="p-3 rounded-xl transition-colors" style={{ backgroundColor: '#ffc5bb', color: '#b01c00' }}>
          <Mail className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
          <p className="font-semibold group-hover:underline break-all" style={{ color: '#b01c00' }}>{email}</p>
        </div>
      </a>

      <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 group" aria-label={`Call us at ${phone}`}>
        <span className="p-3 rounded-xl transition-colors bg-green-100 text-green-700">
          <Phone className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
          <p className="text-green-700 font-semibold group-hover:underline">{phone}</p>
        </div>
      </a>

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" aria-label="Message us on WhatsApp">
        <span className="p-3 rounded-xl transition-colors bg-emerald-100 text-emerald-700">
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">WhatsApp</p>
          <p className="text-emerald-700 font-semibold group-hover:underline">{whatsapp || phone}</p>
        </div>
      </a>
    </div>
  )
}
