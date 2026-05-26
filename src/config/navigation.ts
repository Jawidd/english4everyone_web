import type { NavLink } from '../types'
import site from '../../site.json'

export const NAV_LINKS: NavLink[] = site.navigation.items.filter((n) => n.enabled !== false)
