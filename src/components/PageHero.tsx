/**
 * PageHero.tsx — Reusable hero banner for inner pages
 */
interface Props {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: Props) {
  return (
    <section className="py-14 px-4 text-white" style={{ background: 'linear-gradient(135deg, #2c2e4b 0%, #ec2904 100%)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">{title}</h1>
        {subtitle && (
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
