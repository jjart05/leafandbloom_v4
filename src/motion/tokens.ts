export const easePremium = [0.22, 1, 0.36, 1] as const
export const easeSoft = [0.4, 0, 0.2, 1] as const

export const pageTransition = {
  duration: 0.28,
  ease: easeSoft,
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

/** Slide only — no opacity, so it never stacks into a double fade / blank page. */
export const staggerItem = {
  hidden: { y: 12 },
  show: {
    y: 0,
    transition: { duration: 0.35, ease: easePremium },
  },
}

export const revealTransition = {
  duration: 0.4,
  ease: easePremium,
}
