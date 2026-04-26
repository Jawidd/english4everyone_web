import { useState } from 'react'
import { Phone, MessageCircle, X } from 'lucide-react'
import { BRAND, CONTACT } from '../config'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <>
          <a href={`tel:${CONTACT.phoneTel}`}
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: BRAND.navy }} aria-label="Call us">
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" /> Call us
          </a>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 whitespace-nowrap"
            style={{ backgroundColor: BRAND.whatsapp }} aria-label="WhatsApp us">
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" /> WhatsApp
          </a>
        </>
      )}
      <button onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shrink-0"
        style={{ backgroundColor: open ? BRAND.navy : BRAND.whatsapp }}
        aria-label={open ? 'Close contact options' : 'Open contact options'}>
        {open ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageCircle className="w-6 h-6" aria-hidden="true" />}
      </button>
    </div>
  )
}
