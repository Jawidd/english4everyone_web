/**
 * src/config/contact.ts
 *
 * All contact details in one place.
 * Used by ContactCard, FloatingContact, Footer, and Home sections.
 * Staff-facing details (phone, email, address) are updated here only.
 */
export const CONTACT = {
  phone: '+44 7535 867376',
  phoneDisplay: '07535 867376',
  phoneTel: '+447535867376',
  email: 'enquiries@english4allinleeds.com',
  whatsapp: '+447535867376',
  whatsappUrl: 'https://wa.me/447535867376',
  address: {
    line1: 'The Arches',
    line2: '56–58 Brussels St',
    city: 'Leeds',
    postcode: 'LS9 8AB',
    full: 'The Arches, 56–58 Brussels St, Leeds, LS9 8AB',
  },
  charity: {
    number: '1175775',
    vat: '460246413',
    principal: 'Nick Conibear',
    registeredName: 'English4All in Leeds',
  },
} as const
