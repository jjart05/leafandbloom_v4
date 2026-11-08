import { motion, useReducedMotion } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'
import { pageTransition } from '../../motion/tokens'

/**
 * Enter-only route animation. No exit fade — that caused blank gaps
 * and stacked with Reveal/Stagger into a double fade.
 */
export const PageTransition = forwardRef<
  HTMLDivElement,
  { children: ReactNode }
>(function PageTransition({ children }, ref) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div ref={ref} className="pt-16">
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="pt-16"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
})
