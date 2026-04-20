/**
 * PageHero.tsx — Reusable hero/banner section for inner pages
 * Provides consistent heading style across all non-home pages.
 */
interface Props {
  title: string
  subtitle?: string
  /** Optional Tailwind gradient class override */
  gradient?: string
}

export default function PageHero({ title, subtitle, gradient = 'from-brand-700 to-brand-900' }: Props) {
  return (
    <section className={`bg-gradient-to-br ${gradient} text-white py-14 px-4`}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">{title}</h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-brand-100 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
