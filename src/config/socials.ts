/**
 * src/config/socials.ts
 *
 * Social media platform definitions.
 * Used by SocialLinks component wherever it appears (hero, footer, section).
 * To add a new platform, add one entry here — no component changes needed.
 */
import type { SocialPlatform } from '../types'

export const SOCIALS: SocialPlatform[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/English4AllLeeds/',
    color: '#1877f2',
    bg: '#e7f0fd',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCFXjqe8_5wYpkB9JexyiLrA?view_as=subscriber',
    color: '#ff0000',
    bg: '#ffe5e5',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/e4a_online/',
    color: '#c13584',
    bg: '#fce4f3',
  },
]
