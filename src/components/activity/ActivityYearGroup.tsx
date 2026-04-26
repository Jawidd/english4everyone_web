/**
 * ActivityYearGroup.tsx — Year section wrapper for the activity feed.
 * Renders a year heading followed by a responsive card grid.
 */
import { BRAND } from '../../config'
import ActivityCard from './ActivityCard'
import type { ActivityYearGroup as ActivityYearGroupType } from '../../types'

interface Props {
  group: ActivityYearGroupType
}

export default function ActivityYearGroup({ group }: Props) {
  return (
    <div className="mb-14">
      {/* Year divider */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-3xl font-extrabold" style={{ color: BRAND.navy }}>
          {group.year}
        </span>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400 font-medium">
          {group.activities.length} {group.activities.length === 1 ? 'activity' : 'activities'}
        </span>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {group.activities.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
      </div>
    </div>
  )
}
