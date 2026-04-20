/**
 * FloatingContact.tsx — Sticky floating WhatsApp + call button
 * Visible on all pages, bottom-right corner.
 * Expands on click to show both options.
 */
import { useState } from 'react'
import { Phone, MessageCircle, X } from 'lucide-react'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Expanded options */}
      {open && (
        <>
          <a
            href="tel:+447535867376"
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#2c2e4b' }}
            aria-label="Call us"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call us
          </a>
          <a
            href="https://wa.me/447535867376"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#25d366' }}
            aria-label="WhatsApp us"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp
          </a>
        </>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: open ? '#2c2e4b' : '#25d366' }}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
      >
        {open
          ? <X className="w-6 h-6" aria-hidden="true" />
          : <MessageCircle className="w-6 h-6" aria-hidden="true" />
        }
      </button>
    </div>
  )
}
