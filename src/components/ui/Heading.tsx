/**
 * src/components/ui/Heading.tsx
 *
 * Consistent section label + title block used throughout the homepage.
 * label = small uppercase eyebrow text in brand red
 * title = main h2 heading in navy
 */
import { BRAND } from '../../config'

interface Props {
  label?: string
  title: string
  center?: boolean
}

export default function Heading({ label, title, center = false }: Props) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      {label && (
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BRAND.primary }}>
          {label}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: BRAND.navy }}>
        {title}
      </h2>
    </div>
  )
}
