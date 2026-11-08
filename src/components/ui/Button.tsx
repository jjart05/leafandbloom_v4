import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'light'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  children: ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-[var(--lb-accent)] text-[var(--lb-accent-fg)] border-transparent hover:opacity-90',
  outline:
    'bg-transparent text-[var(--lb-ink)] border-[var(--lb-border)] hover:bg-[var(--lb-hover)]',
  ghost:
    'bg-transparent text-[var(--lb-ink)] border-transparent hover:bg-[var(--lb-hover)]',
  light: 'bg-transparent text-cream border-cream/35 hover:bg-cream/10',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
