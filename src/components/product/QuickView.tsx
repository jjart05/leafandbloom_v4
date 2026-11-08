import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X, ZoomIn } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Product } from '../../data/products'
import { formatPHP } from '../../lib/money'
import { lockBodyScroll } from '../../lib/scrollLock'
import { useCart } from '../../context/CartContext'
import { Button } from '../ui/Button'

interface QuickViewProps {
  product: Product | null
  onClose: () => void
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    setQty(1)
    setZoomed(false)
  }, [product?.id])

  useEffect(() => {
    if (!product) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const unlock = lockBodyScroll()
    window.addEventListener('keydown', onKey)
    return () => {
      unlock()
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog backdrop"
            className="absolute inset-0 bg-ink/55"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Product quick view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-cream shadow-lift md:grid-cols-2 dark:bg-[#1a1e1a]"
          >
            <div className="relative bg-beige dark:bg-[#242a24]">
              <img
                src={product.img}
                alt={product.name}
                className={`size-full max-h-[40vh] object-cover md:max-h-none ${zoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'} transition duration-500`}
                onClick={() => setZoomed((z) => !z)}
              />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-cream/90 px-2 py-1 text-xs text-earth dark:bg-[#1a1e1a]/90">
                <ZoomIn className="size-3" /> Click image to zoom
              </span>
            </div>
            <div className="relative overflow-y-auto p-6">
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full p-2 hover:bg-beige dark:hover:bg-[#242a24]"
              >
                <X className="size-4" />
              </button>
              <p className="text-xs tracking-wide text-muted capitalize">
                {product.category}
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink dark:text-cream">
                {product.name}
              </h2>
              <p className="mt-2 font-display text-2xl text-forest dark:text-[#d5e0cf]">
                {formatPHP(product.price)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-earth dark:text-[#c9c4b8]">
                {product.desc}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-muted">Qty</span>
                <div className="inline-flex items-center overflow-hidden rounded-lg border border-ink/10 dark:border-cream/15">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="p-2"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-8 text-center tabular-nums">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="p-2"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    addItem(product.id, qty)
                    onClose()
                  }}
                >
                  Add to cart
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Continue browsing
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
