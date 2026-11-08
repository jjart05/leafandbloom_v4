import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { revealTransition } from '../../motion/tokens'

/**
 * Scroll slide-up only (no opacity) so reveals never blank the page
 * or double-fade with PageTransition.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12, margin: '0px 0px -8% 0px' })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (inView) setVisible(true)
  }, [inView])

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 600 + delay * 1000)
    return () => window.clearTimeout(id)
  }, [delay])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 14 }}
      animate={visible ? { y: 0 } : { y: 14 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  )
}
