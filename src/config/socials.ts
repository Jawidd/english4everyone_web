import type { SocialPlatform } from '../types'
import site from '../../site.json'

const s = site.social

export const SOCIALS: SocialPlatform[] = [
  { label: 'Facebook',  href: s.facebook,  color: '#1877f2', bg: '#e7f0fd' },
  { label: 'YouTube',   href: s.youtube,   color: '#ff0000', bg: '#ffe5e5' },
  { label: 'Instagram', href: s.instagram, color: '#c13584', bg: '#fce4f3' },
]
