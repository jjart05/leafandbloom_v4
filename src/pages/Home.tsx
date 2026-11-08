import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Mail,
  Sparkles,
} from 'lucide-react'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/product/ProductCard'
import { QuickView } from '../components/product/QuickView'
import { StaggerContainer, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useToast } from '../context/ToastContext'
import { CATEGORIES, PRODUCTS, type Product } from '../data/products'
import { SERVICES } from '../data/services'
import { FREE_SHIPPING_MIN, formatPHP } from '../lib/money'

const FEATURED = PRODUCTS.slice(0, 8)

const FAQ = [
  {
    q: 'Is Leaf & Bloom a live online store?',
    a: 'This site is a front-end portfolio piece. Catalog, cart, and checkout flows are real in the browser, but there is no production inventory or payment backend behind them.',
  },
  {
    q: 'Are payments processed on checkout?',
    a: 'No. Checkout records an order request locally on this device. No card is charged and no money changes hands through this build.',
  },
  {
    q: 'Can I trust the numbers on the homepage?',
    a: 'Counts and percentages in the studio notes section are decorative placeholders for layout — not verified business metrics.',
  },
]

const STUDIO_NOTES = [
  { label: 'Catalog SKUs', value: String(PRODUCTS.length) },
  { label: 'Service lines listed', value: String(SERVICES.length) },
  { label: 'Layout satisfaction (fictional)', value: '92%' },
]

export default function Home() {
  const { toast } = useToast()
  const reduce = useReducedMotion()
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [quickProduct, setQuickProduct] = useState<Product | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const [perView, setPerView] = useState(1)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setPerView(mq.matches ? 3 : 1)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const maxIndex = Math.max(0, FEATURED.length - perView)

  const slidePrev = useCallback(() => {
    setCarouselIndex((i) => Math.max(0, i - 1))
  }, [])

  const slideNext = useCallback(() => {
    setCarouselIndex((i) => Math.min(maxIndex, i + 1))
  }, [maxIndex])

  const onNewsletter = (e: FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      toast('Enter a valid email to subscribe.', 'error')
      return
    }
    toast('Thanks — you’re on the studio list.')
    setNewsletterEmail('')
  }

  const previewServices = SERVICES.slice(0, 3)

  return (
    <div>
      <section className="relative overflow-hidden bg-[#2a332c]">
        <img
          src="/images/herlight.png"
          alt=""
          className="absolute inset-0 size-full object-cover object-[22%_42%] dark:hidden sm:object-[28%_center]"
        />
        <img
          src="/images/herdark.png"
          alt=""
          className="absolute inset-0 hidden size-full object-cover object-[22%_42%] dark:block sm:object-[28%_center]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20 sm:bg-ink/45 sm:bg-none"
          aria-hidden
        />
        <div className="absolute inset-0 hidden bg-ink/45 sm:block" aria-hidden />
        <div className="container-lb relative z-10 flex min-h-[min(72vh,560px)] flex-col justify-end pb-10 pt-20 sm:min-h-[min(88vh,720px)] sm:justify-center sm:py-20">
          <StaggerContainer className="max-w-2xl" delayChildren={0.12} stagger={0.1}>
            <StaggerItem>
              <p className="text-sm tracking-[0.2em] text-cream/80 uppercase">
                Buhisan, Cebu · Est. 2018
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
                Plants and florals for Philippine homes
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 max-w-xl text-base text-cream/90 sm:text-lg">
                Rare indoor plants, seasonal arrangements, and studio styling — priced
                in pesos, chosen for local light.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button className="gap-2">
                    Shop plants
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="light">View services</Button>
                </Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 text-xs text-cream/70">
                Free shipping on orders over {formatPHP(FREE_SHIPPING_MIN)}.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-cream py-8 dark:border-cream/10 dark:bg-[#141614]">
        <div className="container-lb">
          <p className="text-center text-xs tracking-wide text-muted uppercase">
            Studio notes
          </p>
          <StaggerContainer className="mt-4 grid gap-6 sm:grid-cols-3">
            {STUDIO_NOTES.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <p className="font-display text-3xl text-forest dark:text-[#d5e0cf]">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-earth dark:text-[#c9c4b8]">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-lb">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.15em] text-sage uppercase">Shop</p>
                <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl dark:text-cream">
                  Plants in the studio now
                </h2>
                <p className="mt-2 max-w-lg text-sm text-earth dark:text-[#c9c4b8]">
                  Eight picks from the catalog — use the arrows to browse.
                </p>
              </div>
              <Link to="/shop" className="text-sm text-forest underline-offset-4 hover:underline dark:text-[#d5e0cf]">
                View full shop
              </Link>
            </div>
          </Reveal>

          <div className="relative mt-10">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: reduce
                    ? 0
                    : `calc(-${carouselIndex} * ((100% - ${(perView - 1) * 1}rem) / ${perView} + 1rem))`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              >
                {FEATURED.map((product) => (
                  <div
                    key={product.id}
                    className="shrink-0"
                    style={{
                      width: `calc((100% - ${(perView - 1) * 1}rem) / ${perView})`,
                    }}
                  >
                    <ProductCard product={product} onQuickView={setQuickProduct} />
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous products"
                onClick={slidePrev}
                disabled={carouselIndex === 0}
                className="rounded-full border border-ink/10 p-2 disabled:opacity-40 dark:border-cream/15"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="text-sm tabular-nums text-muted">
                {carouselIndex + 1}–{Math.min(carouselIndex + perView, FEATURED.length)} of{' '}
                {FEATURED.length}
              </span>
              <button
                type="button"
                aria-label="Next products"
                onClick={slideNext}
                disabled={carouselIndex >= maxIndex}
                className="rounded-full border border-ink/10 p-2 disabled:opacity-40 dark:border-cream/15"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-beige/50 py-16 dark:bg-[#1a1e1a]/50 md:py-24">
        <div className="container-lb grid items-center gap-10 md:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/me.jpg"
              alt="Johnnel Artiaga in the studio"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-cream/95 px-4 py-2 dark:bg-[#1a1e1a]/95">
              <p className="font-display text-lg text-ink dark:text-cream">Johnnel</p>
              <p className="text-xs text-muted">Founder, Cebu</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">About the studio</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl dark:text-cream">
              Grown from a balcony garden in Cebu
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-earth dark:text-[#c9c4b8]">
              Leaf & Bloom began in 2018 when Johnnel Artiaga started sharing
              carefully potted plants with neighbours in Buhisan. The studio now
              works across home collections, wedding florals, and workplace planting.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-earth dark:text-[#c9c4b8]">
              We select for Philippine light and living spaces — not catalog glitter.
              Every arrangement starts with a conversation about the room, the event,
              and the care it will need.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about">
                <Button>Read our story</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Contact the studio</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-lb">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">Services</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl dark:text-cream">
              Studio work beyond the shelf
            </h2>
          </Reveal>
          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
            {previewServices.map((svc) => (
              <StaggerItem key={svc.id}>
                <article className="rounded-xl border border-[var(--lb-border)] bg-[var(--lb-surface)] p-6 shadow-soft">
                  <Sparkles className="size-5 text-sage" aria-hidden />
                  <h3 className="mt-3 font-display text-xl text-[var(--lb-ink)]">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--lb-earth)]">{svc.summary}</p>
                  <p className="mt-3 text-sm text-[var(--lb-muted)]">{svc.priceFrom}</p>
                  <Link
                    to="/services"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-forest hover:underline dark:text-[var(--lb-accent)]"
                  >
                    Learn more <ArrowRight className="size-3.5" />
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-cream py-16 dark:bg-[#141614] md:py-20">
        <div className="container-lb max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl text-ink dark:text-cream">Common questions</h2>
            <p className="mt-2 text-sm text-muted">Honest answers for portfolio reviewers.</p>
          </Reveal>
          <ul className="mt-8 divide-y divide-ink/10 dark:divide-cream/10">
            {FAQ.map((item, idx) => {
              const open = openFaq === idx
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : idx)}
                  >
                    <span className="font-medium text-ink dark:text-cream">{item.q}</span>
                    <ChevronRight
                      className={`size-4 shrink-0 transition ${open ? 'rotate-90' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.p
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-4 text-sm text-earth dark:text-[#c9c4b8]"
                      >
                        {item.a}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-lb grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl text-ink dark:text-cream">Browse by mood</h2>
            <p className="mt-2 text-sm text-earth dark:text-[#c9c4b8]">
              Category cards link into the shop with filters applied.
            </p>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <StaggerItem key={cat.id}>
                <Link
                  to={`/shop?category=${cat.id}`}
                  className="group flex flex-col items-center rounded-xl border border-[var(--lb-border)] bg-[var(--lb-surface)] px-4 py-6 text-center transition hover:border-sage/40 hover:shadow-soft"
                >
                  <Leaf className="size-5 text-sage transition group-hover:scale-110" />
                  <span className="mt-2 text-sm font-medium text-[var(--lb-ink)]">
                    {cat.label}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-forest py-14 text-cream dark:border-cream/10">
        <div className="container-lb flex flex-col items-center text-center">
          <Mail className="size-6 text-beige" aria-hidden />
          <h2 className="mt-4 font-display text-3xl">Studio dispatch</h2>
          <p className="mt-2 max-w-md text-sm text-cream/80">
            Occasional notes when the collection changes — no daily noise.
          </p>
          <form onSubmit={onNewsletter} className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-cream/25 bg-cream/10 px-4 py-2.5 text-sm text-cream placeholder:text-cream/50"
              autoComplete="email"
            />
            <Button type="submit" variant="light" className="shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />
    </div>
  )
}
