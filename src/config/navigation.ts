/**
 * src/config/navigation.ts
 *
 * Site navigation links used by Navbar.
 * Adding a new page = add one entry here + create the route in App.tsx.
 */
import type { NavLink } from '../types'

export const NAV_LINKS: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/activities', label: 'Activity Feed' },
  { to: '/about', label: 'About' },
  { to: '/classes', label: 'Classes' },
  { to: '/join', label: 'How to Join' },
  { to: '/news', label: 'News' },
  { to: '/volunteering', label: 'Volunteer' },
  { to: '/contact', label: 'Contact' },
]
