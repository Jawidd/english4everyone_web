/**
 * Accordion.tsx — Lightweight expand/collapse component
 * Pure CSS transition, no library needed.
 */
import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  title: string
  content: React.ReactNode
}

interface Props {
  items: AccordionItem[]
  /** Allow multiple open at once */
  multi?: boolean
}

export default function Accordion({ items, multi = false }: Props) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]))

  const toggle = (i: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(i)) { next.delete(i) }
      else { if (!multi) next.clear(); next.add(i) }
      return next
    })
  }

  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 overflow-hidden">
      {items.map((item, i) => {
        const open = openIndexes.has(i)
        return (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold transition-colors hover:bg-gray-50"
              style={{ color: '#2c2e4b' }}
              aria-expanded={open}
            >
              <span>{item.title}</span>
              <ChevronDown
                className="w-5 h-5 shrink-0 transition-transform duration-300"
                style={{ color: '#ec2904', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              />
            </button>
            {/* Height transition via max-height */}
            <div
              style={{
                maxHeight: open ? '600px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}
            >
              <div className="px-6 pb-5 pt-1 text-gray-600 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
