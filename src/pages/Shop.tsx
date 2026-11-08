import {
  Grid3x3,
  LayoutList,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/product/ProductCard'
import { QuickView } from '../components/product/QuickView'
import { StaggerContainer, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import {
  CATEGORIES,
  PRODUCTS,
  type Product,
  type ProductCategory,
} from '../data/products'
import { formatPHP } from '../lib/money'

const PAGE_SIZE = 12

type SortKey =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'price-asc', label: 'Price (low to high)' },
  { value: 'price-desc', label: 'Price (high to low)' },
]

function parseCategory(raw: string | null): ProductCategory | 'all' {
  if (!raw) return 'all'
  const ok = CATEGORIES.some((c) => c.id === raw)
  return ok ? (raw as ProductCategory | 'all') : 'all'
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlCategory = parseCategory(searchParams.get('category'))

  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.map((p) => p.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }, [])

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'all'>(urlCategory)
  const [priceMin, setPriceMin] = useState(priceBounds.min)
  const [priceMax, setPriceMax] = useState(priceBounds.max)
  const [sort, setSort] = useState<SortKey>('name-asc')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [quickProduct, setQuickProduct] = useState<Product | null>(null)

  useEffect(() => {
    setCategory(urlCategory)
    setVisibleCount(PAGE_SIZE)
  }, [urlCategory])

  const setCategoryParam = useCallback(
    (next: ProductCategory | 'all') => {
      setCategory(next)
      setVisibleCount(PAGE_SIZE)
      if (next === 'all') {
        searchParams.delete('category')
        setSearchParams(searchParams, { replace: true })
      } else {
        setSearchParams({ category: next }, { replace: true })
      }
    },
    [searchParams, setSearchParams],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (p.price < priceMin || p.price > priceMax) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    })

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default: {
          const _exhaustive: never = sort
          return _exhaustive
        }
      }
    })

    return list
  }, [category, priceMax, priceMin, query, sort])

  const displayed = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; clear: () => void }[] = []
    if (category !== 'all') {
      const label = CATEGORIES.find((c) => c.id === category)?.label ?? category
      chips.push({
        key: 'category',
        label: label,
        clear: () => setCategoryParam('all'),
      })
    }
    if (query.trim()) {
      chips.push({
        key: 'q',
        label: `Search: “${query.trim()}”`,
        clear: () => setQuery(''),
      })
    }
    if (priceMin > priceBounds.min || priceMax < priceBounds.max) {
      chips.push({
        key: 'price',
        label: `${formatPHP(priceMin)} – ${formatPHP(priceMax)}`,
        clear: () => {
          setPriceMin(priceBounds.min)
          setPriceMax(priceBounds.max)
        },
      })
    }
    return chips
  }, [
    category,
    priceBounds.max,
    priceBounds.min,
    priceMax,
    priceMin,
    query,
    setCategoryParam,
  ])

  const clearAllFilters = () => {
    setQuery('')
    setCategoryParam('all')
    setPriceMin(priceBounds.min)
    setPriceMax(priceBounds.max)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="pb-20">
      <header className="border-b border-ink/10 bg-cream py-12 dark:border-cream/10 dark:bg-[#141614]">
        <div className="container-lb">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">Shop</p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl dark:text-cream">
              Studio catalog
            </h1>
            <p className="mt-3 max-w-xl text-sm text-earth dark:text-[#c9c4b8]">
              {filtered.length} {filtered.length === 1 ? 'plant' : 'plants'} match your filters.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-lb mt-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <Reveal>
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-ink dark:text-cream">
                <SlidersHorizontal className="size-4" /> Filters
              </p>
              <label className="block text-xs text-muted" htmlFor="shop-search">
                Search
              </label>
              <div className="relative mt-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
                <input
                  id="shop-search"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setVisibleCount(PAGE_SIZE)
                  }}
                  placeholder="Name, category…"
                  className="w-full rounded-lg border border-ink/10 bg-cream py-2.5 pr-3 pl-9 text-sm dark:border-cream/15 dark:bg-[#1a1e1a]"
                />
              </div>

              <fieldset className="mt-6">
                <legend className="text-xs text-muted">Category</legend>
                <ul className="mt-2 space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => setCategoryParam(cat.id)}
                        className={`w-full rounded-md px-2 py-1.5 text-left text-sm capitalize transition ${
                          category === cat.id
                            ? 'bg-forest text-cream dark:bg-[#d5e0cf] dark:text-[#101310]'
                            : 'text-earth hover:bg-beige/60 dark:text-[#c9c4b8] dark:hover:bg-[#242a24]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </fieldset>

              <div className="mt-6">
                <p className="text-xs text-muted">Price range</p>
                <div className="mt-2 flex items-center justify-between text-xs text-earth dark:text-[#c9c4b8]">
                  <span>{formatPHP(priceMin)}</span>
                  <span>{formatPHP(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  step={50}
                  value={priceMin}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setPriceMin(Math.min(v, priceMax))
                    setVisibleCount(PAGE_SIZE)
                  }}
                  className="mt-2 w-full accent-forest"
                  aria-label="Minimum price"
                />
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  step={50}
                  value={priceMax}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setPriceMax(Math.max(v, priceMin))
                    setVisibleCount(PAGE_SIZE)
                  }}
                  className="mt-1 w-full accent-forest"
                  aria-label="Maximum price"
                />
              </div>
            </Reveal>
          </aside>

          <div className="min-w-0 flex-1">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Sort</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="rounded-lg border border-ink/10 bg-cream px-3 py-2 text-sm dark:border-cream/15 dark:bg-[#1a1e1a]"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex gap-1 rounded-lg border border-ink/10 p-1 dark:border-cream/15">
                  <button
                    type="button"
                    aria-label="Grid layout"
                    aria-pressed={layout === 'grid'}
                    onClick={() => setLayout('grid')}
                    className={`rounded-md p-2 ${layout === 'grid' ? 'bg-forest text-cream dark:bg-[#d5e0cf] dark:text-[#101310]' : ''}`}
                  >
                    <Grid3x3 className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="List layout"
                    aria-pressed={layout === 'list'}
                    onClick={() => setLayout('list')}
                    className={`rounded-md p-2 ${layout === 'list' ? 'bg-forest text-cream dark:bg-[#d5e0cf] dark:text-[#101310]' : ''}`}
                  >
                    <LayoutList className="size-4" />
                  </button>
                </div>
              </div>

              {activeChips.length > 0 ? (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {activeChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.clear}
                      className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-beige/50 px-3 py-1 text-xs text-earth dark:border-cream/15 dark:bg-[#242a24] dark:text-[#c9c4b8]"
                    >
                      {chip.label}
                      <X className="size-3" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs text-sage underline-offset-2 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              ) : null}
            </Reveal>

            {filtered.length === 0 ? (
              <Reveal className="mt-12 rounded-xl border border-dashed border-ink/15 bg-cream px-6 py-16 text-center dark:border-cream/15 dark:bg-[#1a1e1a]">
                <p className="font-display text-2xl text-ink dark:text-cream">
                  No plants match
                </p>
                <p className="mt-2 text-sm text-muted">
                  Try widening the price range or clearing a category filter.
                </p>
                <Button className="mt-6" onClick={clearAllFilters}>
                  Reset filters
                </Button>
              </Reveal>
            ) : (
              <StaggerContainer
                key={`${category}-${sort}-${layout}-${query}`}
                className={
                  layout === 'grid'
                    ? 'mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3'
                    : 'mt-8 flex flex-col gap-4'
                }
                stagger={0.05}
                delayChildren={0.04}
              >
                {displayed.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard
                      product={product}
                      layout={layout}
                      onQuickView={setQuickProduct}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {hasMore ? (
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                >
                  Load more ({filtered.length - visibleCount} remaining)
                </Button>
              </div>
            ) : null}

            {filtered.length > 0 && !hasMore ? (
              <p className="mt-8 text-center text-xs text-muted">
                Showing all {filtered.length} results.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />
    </div>
  )
}
