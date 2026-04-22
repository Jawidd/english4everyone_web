/**
 * SocialLinks.tsx — Facebook, YouTube, Instagram icon links
 * Used in Footer and optionally inline sections.
 */
import { Facebook, Youtube, Instagram } from 'lucide-react'

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/English4AllLeeds/',
    icon: <Facebook className="w-5 h-5" aria-hidden="true" />,
    color: '#1877f2',
    bg: '#e7f0fd',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCFXjqe8_5wYpkB9JexyiLrA?view_as=subscriber',
    icon: <Youtube className="w-5 h-5" aria-hidden="true" />,
    color: '#ff0000',
    bg: '#ffe5e5',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/e4a_online/',
    icon: <Instagram className="w-5 h-5" aria-hidden="true" />,
    color: '#c13584',
    bg: '#fce4f3',
  },
]

interface Props {
  /** 'icon' = icon buttons only, 'full' = icon + label pill */
  variant?: 'icon' | 'full'
  /** Light = coloured icons on white bg, dark = white icons on dark bg */
  theme?: 'light' | 'dark'
}

export default function SocialLinks({ variant = 'icon', theme = 'light' }: Props) {
  return (
    // On mobile with variant='full', wrap to new lines and centre
    // justify-center keeps items centred when used in the hero or section
    <div className={`flex items-center gap-3 ${variant === 'full' ? 'flex-wrap justify-center' : ''}`}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${s.label}`}
          className={`
            flex items-center gap-2 rounded-xl font-semibold text-sm
            transition-all duration-200 hover:scale-110 hover:shadow-md
            ${variant === 'full' ? 'px-4 py-2' : 'p-2.5'}
          `}
          style={
            theme === 'light'
              ? { backgroundColor: s.bg, color: s.color }
              : { backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff' }
          }
        >
          {s.icon}
          {variant === 'full' && <span>{s.label}</span>}
        </a>
      ))}
    </div>
  )
}
