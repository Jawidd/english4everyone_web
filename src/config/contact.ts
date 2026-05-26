import site from '../../site.json'

const c = site.contact
const o = site.org

// Derive formatted variants from each phone field in site.json
function phoneVariants(intl: string) {
  const digits = intl.replace(/\D/g, '')                    // "447535867376"
  const national = '0' + digits.slice(2)                    // "07535867376"
  const display = `${national.slice(0, 5)} ${national.slice(5)}` // "07535 867376"
  return { display, tel: `+${digits}`, digits }
}

const general   = phoneVariants(c.phoneGeneral)
const principal = phoneVariants(c.phonePrincipal)

export const CONTACT = {
  phone:              c.phoneGeneral,
  phoneDisplay:       general.display,
  phoneTel:           general.tel,
  email:              c.email,
  whatsapp:           general.tel,
  whatsappUrl:        `https://wa.me/${general.digits}`,
  phonePrincipal:     c.phonePrincipal,
  phonePrincipalTel:  principal.tel,
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
