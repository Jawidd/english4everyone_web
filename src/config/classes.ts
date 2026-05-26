import type { ClassSession } from '../types'
import site from '../../site.json'

export const CLASS_SESSIONS: ClassSession[] = site.classes.sessions

export const PAID_CLASS_FEATURES: readonly string[] = site.classes.paidFeatures

export const ACTIVITIES = site.activitiesSection.items
