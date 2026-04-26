/**
 * src/config/brand.ts
 *
 * Brand colour tokens derived from the English4All Leeds logo.
 * All inline style={{ color: '...' }} values across the app reference
 * these constants so a colour change is a single edit here.
 */
export const BRAND = {
  primary: '#ec2904',    // Logo red-orange — CTAs, accents, headings
  primaryDark: '#b01c00',
  navy: '#2c2e4b',       // Deep navy — hero bg, footer, body headings
  navyDark: '#1e2038',   // Footer background
  coral: '#e55d44',
  softBg: '#fff4f2',     // Warm tint for cards and section backgrounds
  softBorder: '#ffc5bb',
  softBorderLight: '#ffeee9',
  whatsapp: '#25d366',
  sectionAlt: '#e8e9ed', // Darker gray for alternating sections (mobile separation)
} as const
