import { Mail, Phone, MessageCircle } from 'lucide-react'
import { BRAND } from '../config'

interface Props {
  email: string
  phone: string
  whatsapp?: string
}

export default function ContactCard({ email, phone, whatsapp }: Props) {
  const whatsappUrl = `https://wa.me/${(whatsapp || phone).replace(/\D/g, '')}`
  return (
    <div className="rounded-2xl p-6 space-y-4 border" style={{ backgroundColor: BRAND.softBg, borderColor: BRAND.softBorder }}>
      <a href={`mailto:${email}`} className="flex items-center gap-3 group" aria-label={`Email us at ${email}`}>
        <span className="p-3 rounded-xl" style={{ backgroundColor: BRAND.softBorder, color: BRAND.primaryDark }}>
          <Mail className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
          <p className="font-semibold group-hover:underline break-all" style={{ color: BRAND.primaryDark }}>{email}</p>
        </div>
      </a>
      <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 group" aria-label={`Call us at ${phone}`}>
        <span className="p-3 rounded-xl bg-green-100 text-green-700">
          <Phone className="w-5 h-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
          <p className="text-green-700 font-semibold group-hover:underline">{phone}</p>
        </div>
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" aria-label="Message us on WhatsApp">
        <span className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
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
