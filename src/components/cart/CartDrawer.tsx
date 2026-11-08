import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPHP } from '../../lib/money'
import { Button } from '../ui/Button'

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    subtotal,
    shipping,
    total,
    setQty,
    removeItem,
    clearCart,
    undoRemove,
  } = useCart()

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart overlay"
            className="fixed inset-0 z-[70] bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[75] flex w-full max-w-md flex-col bg-cream shadow-lift dark:bg-[#121512]"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 dark:border-cream/10">
              <h2 className="font-display text-2xl">Your cart</h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                className="rounded-full p-2 hover:bg-beige dark:hover:bg-[#242a24]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-3 size-10 text-muted" />
                  <p className="font-display text-xl">Your cart is empty</p>
                  <p className="mt-2 max-w-xs text-sm text-muted">
                    Browse the collection and add plants you want to take home.
                  </p>
                  <Link to="/shop" onClick={closeCart} className="mt-6">
                    <Button>Browse plants</Button>
                  </Link>
                  <button
                    type="button"
                    onClick={undoRemove}
                    className="mt-3 text-sm text-sage underline-offset-2 hover:underline"
                  >
                    Undo last removal
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <img
                        src={item.img}
                        alt=""
                        className="size-20 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-lg">{item.name}</p>
                        <p className="text-sm text-forest dark:text-[#d5e0cf]">
                          {formatPHP(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="inline-flex items-center rounded-md border border-ink/10 dark:border-cream/15">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="p-1.5"
                              onClick={() => setQty(item.id, item.qty - 1)}
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-7 text-center text-sm tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="p-1.5"
                              onClick={() => setQty(item.id, item.qty + 1)}
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeItem(item.id)}
                            className="rounded-md p-1.5 text-muted hover:text-ink dark:hover:text-cream"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-ink/10 px-5 py-4 dark:border-cream/10">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span>{formatPHP(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPHP(shipping)}</span>
                  </div>
                  <div className="flex justify-between border-t border-ink/10 pt-2 text-base dark:border-cream/10">
                    <span>Total</span>
                    <span className="font-display text-xl">{formatPHP(total)}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Link to="/checkout" onClick={closeCart}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={clearCart}>
                    Clear cart
                  </Button>
                  <button
                    type="button"
                    onClick={undoRemove}
                    className="text-sm text-sage underline-offset-2 hover:underline"
                  >
                    Undo last removal
                  </button>
                </div>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
