import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProduct } from '../data/products'
import { readJSON, writeJSON } from '../lib/storage'
import { useToast } from './ToastContext'

interface WishlistContextValue {
  ids: number[]
  count: number
  has: (id: number) => boolean
  toggle: (id: number) => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()
  const [ids, setIds] = useState<number[]>(() => readJSON<number[]>('lb_wishlist', []))

  const toggle = useCallback(
    (id: number) => {
      const product = getProduct(id)
      setIds((prev) => {
        const exists = prev.includes(id)
        const next = exists ? prev.filter((x) => x !== id) : [...prev, id]
        writeJSON('lb_wishlist', next)
        return next
      })

      // Toast outside the updater — React Strict Mode double-invokes updaters.
      if (product) {
        const exists = ids.includes(id)
        toast(
          exists
            ? `${product.name} removed from wishlist`
            : `${product.name} saved to wishlist`,
          exists ? 'info' : 'success',
        )
      }
    },
    [ids, toast],
  )

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      has: (id: number) => ids.includes(id),
      toggle,
    }),
    [ids, toggle],
  )

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
