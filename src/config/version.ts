/**
 * src/config/version.ts
 *
 * Application version and copyright information.
 */
export const VERSION = {
  major: 0,
  minor: 1,
  patch: 0,
  version: '0.1',
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
