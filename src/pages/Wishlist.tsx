import { Heart } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { StaggerContainer, StaggerItem } from '../components/motion/Stagger'
import { ProductCard } from '../components/product/ProductCard'
import { QuickView } from '../components/product/QuickView'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useWishlist } from '../context/WishlistContext'
import { PRODUCTS, type Product } from '../data/products'

export default function Wishlist() {
  const { ids } = useWishlist()
  const [quickProduct, setQuickProduct] = useState<Product | null>(null)

  const items = useMemo(
    () => PRODUCTS.filter((p) => ids.includes(p.id)),
    [ids],
  )

  return (
    <div className="pb-20">
      <header className="border-b border-[var(--lb-border)] bg-[var(--lb-surface)] py-12">
        <div className="container-lb">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">Wishlist</p>
            <h1 className="mt-2 font-display text-4xl text-[var(--lb-ink)] md:text-5xl">
              Saved plants
            </h1>
            <p className="mt-3 max-w-xl text-sm text-[var(--lb-earth)]">
              {items.length === 0
                ? 'Nothing saved yet — heart a plant from the shop to collect it here.'
                : `${items.length} ${items.length === 1 ? 'plant' : 'plants'} saved on this device.`}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-lb mt-10">
        {items.length === 0 ? (
          <Reveal className="rounded-xl border border-dashed border-[var(--lb-border)] bg-[var(--lb-surface)] px-6 py-16 text-center">
            <Heart className="mx-auto size-8 text-sage" aria-hidden />
            <p className="mt-4 font-display text-2xl text-[var(--lb-ink)]">
              Your wishlist is empty
            </p>
            <p className="mt-2 text-sm text-[var(--lb-muted)]">
              Browse the catalog and tap the heart on any plant.
            </p>
            <Link to="/shop" className="mt-6 inline-block">
              <Button>Browse shop</Button>
            </Link>
          </Reveal>
        ) : (
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} onQuickView={setQuickProduct} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />
    </div>
  )
}
