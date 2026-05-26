/**
 * src/config/version.ts
 *
 * Application version and copyright information.
 */
export const VERSION = {
  major: 0,
  minor: 3,
  patch: 0,
  version: '0.3.0',
  get displayVersion() {
    return `v${this.version}`;
  },
} as const;

export const COPYRIGHT = {
  year: new Date().getFullYear(),
  organization: 'English4All in Leeds',
  registrationNumber: '1175775',
  jurisdiction: 'England & Wales',
  registeredOffice: 'The Arches, 56–58 Brussels St, Leeds, LS9 8AB',
} as const;
