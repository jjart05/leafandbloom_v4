import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { formatPHP } from '../../lib/money'
import { lockBodyScroll } from '../../lib/scrollLock'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const unlock = lockBodyScroll()
    window.addEventListener('keydown', onKey)
    return () => {
      unlock()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PRODUCTS.slice(0, 6)
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[85] bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl bg-cream shadow-lift dark:bg-[#1a1e1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-3 dark:border-cream/10">
              <Search className="size-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search plants, orchids, arrangements…"
                className="w-full bg-transparent text-sm outline-none"
                aria-label="Search products"
              />
              <button type="button" aria-label="Close search" onClick={onClose}>
                <X className="size-4" />
              </button>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-8 text-center text-sm text-muted">
                  No matches for “{query}”
                </li>
              ) : (
                results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/shop"
                      state={{ focusProductId: p.id }}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-beige/70 dark:hover:bg-[#242a24]"
                    >
                      <img
                        src={p.img}
                        alt=""
                        className="size-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="text-xs text-muted capitalize">{p.category}</p>
                      </div>
                      <span className="text-sm text-forest dark:text-[#d5e0cf]">
                        {formatPHP(p.price)}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
