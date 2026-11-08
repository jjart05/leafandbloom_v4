import { AnimatePresence, motion } from 'framer-motion'
import {
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import { lockBodyScroll } from '../../lib/scrollLock'
import { SearchOverlay } from '../search/SearchOverlay'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/shop', label: 'Shop' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/feedback', label: 'Feedback' },
]

export function Navbar() {
  const { count, openCart } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    return lockBodyScroll()
  }, [mobileOpen])

  return (
    <>
      <header
        style={{ paddingRight: 'var(--scroll-lock-pad, 0px)' }}
        className={`fixed inset-x-0 top-0 z-50 transition ${
          scrolled
            ? 'border-b border-ink/10 bg-cream/95 shadow-soft backdrop-blur dark:border-cream/10 dark:bg-[#0e100e]/95'
            : 'bg-transparent'
        }`}
      >
        <div className="container-lb flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl text-[var(--lb-ink)]"
          >
            <img src="/images/leaf.svg" alt="" className="size-6" />
            Leaf &amp; Bloom
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm transition ${
                    isActive
                      ? 'text-forest underline decoration-sage/70 underline-offset-8 dark:text-[var(--lb-accent)]'
                      : 'lb-link-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="lb-icon-btn"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                toggleTheme({
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                })
              }}
              className="lb-icon-btn"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              type="button"
              aria-label={`Open cart, ${count} items`}
              onClick={openCart}
              className="relative inline-flex items-center gap-2 rounded-lg bg-[var(--lb-accent)] px-3 py-2 text-sm text-[var(--lb-accent-fg)]"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 flex min-w-4 justify-center rounded-full bg-floral px-1 text-[10px] font-semibold text-[#3a2428]">
                  {count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="lb-icon-btn lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-[var(--lb-border)] bg-[var(--lb-surface)] px-4 py-4 text-[var(--lb-ink)] lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base hover:bg-[var(--lb-hover)]"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
