import { Heart, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '../../data/products'
import { formatPHP } from '../../lib/money'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
  layout?: 'grid' | 'list'
}

export function ProductCard({
  product,
  onQuickView,
  layout = 'grid',
}: ProductCardProps) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const wished = has(product.id)

  if (layout === 'list') {
    return (
      <article className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-cream p-3 sm:flex-row dark:border-cream/10 dark:bg-[#1a1e1a]">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-36 sm:w-44"
        >
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition duration-500 hover:scale-105"
          />
        </button>
        <div className="flex flex-1 flex-col justify-between py-1">
          <div>
            <p className="text-xs text-muted capitalize">{product.category}</p>
            <h3 className="font-display text-xl text-ink dark:text-cream">
              {product.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-earth dark:text-[#c9c4b8]">
              {product.desc}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="font-display text-xl text-forest dark:text-[#d5e0cf]">
              {formatPHP(product.price)}
              {product.oldPrice ? (
                <span className="ml-2 text-sm text-muted line-through">
                  {formatPHP(product.oldPrice)}
                </span>
              ) : null}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={() => toggle(product.id)}
                className="rounded-full border border-ink/10 p-2 dark:border-cream/15"
              >
                <Heart
                  className={`size-4 ${wished ? 'fill-floral text-floral' : 'text-[var(--lb-ink)]'}`}
                />
              </button>
              <button
                type="button"
                onClick={() => addItem(product.id)}
                className="rounded-lg bg-forest px-3 py-2 text-sm text-cream dark:bg-[#d5e0cf] dark:text-[#101310]"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <motion.article
      layout
      className="group overflow-hidden rounded-xl border border-ink/10 bg-cream shadow-soft transition hover:-translate-y-1 hover:shadow-lift dark:border-cream/10 dark:bg-[#1a1e1a]"
    >
      <div className="relative h-64 overflow-hidden bg-beige dark:bg-[#242a24]">
        {product.badge ? (
          <span className="absolute top-3 left-3 z-10 rounded-md border border-ink/10 bg-cream px-2 py-1 text-xs text-earth dark:border-cream/15 dark:bg-[#1a1e1a] dark:text-[#c9c4b8]">
            {product.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggle(product.id)}
          className="absolute top-3 right-3 z-10 rounded-full bg-cream/90 p-2 dark:bg-[#1a1e1a]/90"
        >
          <Heart
            className={`size-4 ${wished ? 'fill-floral text-floral' : 'text-[var(--lb-ink)]'}`}
          />
        </button>
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/50 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="rounded-lg bg-cream px-3 py-2 text-sm font-medium text-forest shadow-soft"
          >
            Quick view
          </button>
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="rounded-lg bg-[var(--lb-accent)] px-3 py-2 text-sm font-medium text-[var(--lb-accent-fg)] shadow-soft"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted capitalize">{product.category}</p>
        <h3 className="mt-1 font-display text-xl text-ink dark:text-cream">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-earth dark:text-[#c9c4b8]">
          {product.desc}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-display text-xl text-forest dark:text-[#d5e0cf]">
            {formatPHP(product.price)}
            {product.oldPrice ? (
              <span className="ml-2 text-sm text-muted line-through">
                {formatPHP(product.oldPrice)}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addItem(product.id)}
            className="flex size-10 items-center justify-center rounded-full border border-[var(--lb-border)] bg-[var(--lb-page)] text-[var(--lb-accent)] transition hover:bg-[var(--lb-accent)] hover:text-[var(--lb-accent-fg)]"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
