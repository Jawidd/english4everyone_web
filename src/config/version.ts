import site from '../../site.json'

export const VERSION = {
  major: 0,
  minor: 3,
  patch: 0,
  version: '0.4.0',
  get displayVersion() {
    return `v${this.version}`;
  },
} as const;

export const COPYRIGHT = {
  year: new Date().getFullYear(),
  organization:       site.org.name,
  registrationNumber: site.org.charityNumber,
  jurisdiction:       site.org.jurisdiction,
  registeredOffice:   `${site.contact.address.line1}, ${site.contact.address.line2}, ${site.contact.address.city}, ${site.contact.address.postcode}`,
} as const;
