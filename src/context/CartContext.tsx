import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'
import { getProduct } from '../data/products'
import { calcShipping, calcTotal } from '../lib/money'
import { readJSON, writeJSON } from '../lib/storage'
import { useToast } from './ToastContext'

export interface CartItem extends Product {
  qty: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  shipping: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (id: number, qty?: number) => void
  removeItem: (id: number) => void
  setQty: (id: number, qty: number) => void
  clearCart: () => void
  undoRemove: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw = readJSON<CartItem[]>('lb_cart', [])
    return raw
      .map((item) => {
        const product = getProduct(item.id)
        if (!product) return null
        return { ...product, qty: Math.max(1, item.qty || 1) }
      })
      .filter(Boolean) as CartItem[]
  })
  const [isOpen, setIsOpen] = useState(false)
  const [lastRemoved, setLastRemoved] = useState<CartItem | null>(null)

  const persist = useCallback((next: CartItem[]) => {
    setItems(next)
    writeJSON('lb_cart', next)
  }, [])

  const addItem = useCallback(
    (id: number, qty = 1) => {
      const product = getProduct(id)
      if (!product) return
      setItems((prev) => {
        const existing = prev.find((i) => i.id === id)
        const next = existing
          ? prev.map((i) =>
              i.id === id ? { ...i, qty: i.qty + qty } : i,
            )
          : [...prev, { ...product, qty }]
        writeJSON('lb_cart', next)
        return next
      })
      toast(`${product.name} added to cart`)
      setIsOpen(true)
    },
    [toast],
  )

  const removeItem = useCallback(
    (id: number) => {
      setItems((prev) => {
        const removed = prev.find((i) => i.id === id) ?? null
        setLastRemoved(removed)
        const next = prev.filter((i) => i.id !== id)
        writeJSON('lb_cart', next)
        return next
      })
      toast('Item removed from cart', 'info')
    },
    [toast],
  )

  const undoRemove = useCallback(() => {
    if (!lastRemoved) return
    setItems((prev) => {
      const next = [...prev, lastRemoved]
      writeJSON('lb_cart', next)
      return next
    })
    setLastRemoved(null)
    toast('Item restored')
  }, [lastRemoved, toast])

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) => {
      const next =
        qty <= 0
          ? prev.filter((i) => i.id !== id)
          : prev.map((i) => (i.id === id ? { ...i, qty } : i))
      writeJSON('lb_cart', next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    persist([])
    toast('Cart cleared', 'info')
  }, [persist, toast])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  )
  const shipping = calcShipping(subtotal)
  const total = calcTotal(subtotal)
  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      shipping,
      total,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      setQty,
      clearCart,
      undoRemove,
    }),
    [
      items,
      count,
      subtotal,
      shipping,
      total,
      isOpen,
      addItem,
      removeItem,
      setQty,
      clearCart,
      undoRemove,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
