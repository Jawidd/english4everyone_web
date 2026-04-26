/**
 * src/components/ui/Reveal.tsx
 *
 * Scroll-triggered fade-up animation wrapper.
 * Uses the useInView hook (IntersectionObserver) — zero dependencies.
 * Wrap any section or card with <Reveal> to animate it in on scroll.
 *
 * delay prop accepts Tailwind delay utilities: 'delay-100' | 'delay-200' etc.
 */
import { useInView } from '../../hooks/useInView'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: string
}

export default function Reveal({ children, className = '', delay = '' }: Props) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={`fade-up ${inView ? 'in-view' : ''} ${delay} ${className}`}>
      {children}
    </div>
  )
}
