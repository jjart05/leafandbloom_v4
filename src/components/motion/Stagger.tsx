import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { staggerContainer, staggerItem } from '../../motion/tokens'

export function StaggerContainer({
  children,
  className = '',
  delayChildren = 0.06,
  stagger = 0.07,
  ...rest
}: {
  children: ReactNode
  className?: string
  delayChildren?: number
  stagger?: number
  as?: 'div' | 'ul'
  'aria-label'?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={{
        ...staggerContainer,
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      animate="show"
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}
