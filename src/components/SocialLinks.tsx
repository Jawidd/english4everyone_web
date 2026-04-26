import { Facebook, Youtube, Instagram, LucideIcon } from 'lucide-react'
import { SOCIALS } from '../config'

const ICONS: Record<string, LucideIcon> = { Facebook, YouTube: Youtube, Instagram }

interface Props {
  variant?: 'icon' | 'full'
  theme?: 'light' | 'dark'
}

export default function SocialLinks({ variant = 'icon', theme = 'light' }: Props) {
  return (
    <div className={`flex items-center gap-3 ${variant === 'full' ? 'flex-wrap justify-center' : ''}`}>
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.label]
        return (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            aria-label={`Follow us on ${s.label}`}
            className={`flex items-center gap-2 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-110 hover:shadow-md ${variant === 'full' ? 'px-4 py-2' : 'p-2.5'}`}
            style={theme === 'light' ? { backgroundColor: s.bg, color: s.color } : { backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff' }}
          >
            {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
            {variant === 'full' && <span>{s.label}</span>}
          </a>
        )
      })}
    </div>
  )
}
