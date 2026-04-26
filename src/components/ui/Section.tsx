/**
 * src/components/ui/Section.tsx
 *
 * Consistent page section wrapper with max-width and padding.
 * className prop allows bg colour overrides (bg-white, section-alt, etc.)
 */
interface Props {
  children: React.ReactNode
  className?: string
}

export default function Section({ children, className = '' }: Props) {
  return (
    <section className={`py-14 px-4 sm:px-6 ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}
