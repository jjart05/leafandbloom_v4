let lockCount = 0
let previousOverflow = ''
let previousPadding = ''

/** Lock body scroll without shifting layout when the scrollbar disappears. */
export function lockBodyScroll(): () => void {
  if (lockCount === 0) {
    const gutter = window.innerWidth - document.documentElement.clientWidth
    previousOverflow = document.body.style.overflow
    previousPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (gutter > 0) {
      document.body.style.paddingRight = `${gutter}px`
      document.documentElement.style.setProperty('--scroll-lock-pad', `${gutter}px`)
    }
  }
  lockCount += 1

  return () => {
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
      document.documentElement.style.removeProperty('--scroll-lock-pad')
    }
  }
}
