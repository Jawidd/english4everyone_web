import site from '../../site.json'

const c = site.contact
const o = site.org

export const CONTACT = {
  phone:        c.phone,
  phoneDisplay: c.phoneDisplay,
  phoneTel:     c.phoneTel,
  email:        c.email,
  whatsapp:     c.whatsapp,
  whatsappUrl:  `https://wa.me/${c.whatsapp.replace(/\D/g, '')}`,
  address: {
    line1:    c.address.line1,
    line2:    c.address.line2,
    city:     c.address.city,
    postcode: c.address.postcode,
    full:     `${c.address.line1}, ${c.address.line2}, ${c.address.city}, ${c.address.postcode}`,
  },
  charity: {
    number:         o.charityNumber,
    vat:            o.vat,
    principal:      o.principal,
    registeredName: o.name,
  },
} as const
