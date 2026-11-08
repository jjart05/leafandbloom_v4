import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--lb-border)] bg-[var(--lb-surface-2)]/50">
      <div className="container-lb grid gap-6 py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
        <div className="md:col-span-1">
          <p className="font-display text-xl text-[var(--lb-ink)]">
            Leaf &amp; Bloom
          </p>
          <p className="mt-2 max-w-xs text-sm leading-snug text-[var(--lb-earth)]">
            Botanical studio in Cebu for plants, florals, and event styling —
            priced in pesos.
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--lb-ink)]">
            Navigate
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="lb-link-muted">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="lb-link-muted">
                About
              </Link>
            </li>
            <li>
              <Link to="/shop" className="lb-link-muted">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/services" className="lb-link-muted">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="lb-link-muted">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="lb-link-muted">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="lb-link-muted">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--lb-ink)]">
            Collections
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/shop?category=tropical" className="lb-link-muted">
                Tropical Plants
              </Link>
            </li>
            <li>
              <Link to="/shop?category=orchid" className="lb-link-muted">
                Orchids
              </Link>
            </li>
            <li>
              <Link to="/shop?category=succulent" className="lb-link-muted">
                Succulents
              </Link>
            </li>
            <li>
              <Link to="/shop?category=rare" className="lb-link-muted">
                Rare Finds
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--lb-ink)]">Visit</p>
          <ul className="space-y-1 text-sm text-[var(--lb-earth)]">
            <li>Buhisan, Dulhugan, Cebu City</li>
            <li>
              <a href="tel:+639171234567" className="lb-link-muted">
                +63 917 123 4567
              </a>
            </li>
            <li>
              <a href="mailto:hello@leafandbloom.ph" className="lb-link-muted">
                hello@leafandbloom.ph
              </a>
            </li>
            <li>Mon–Sat, 9AM–6PM</li>
          </ul>
        </div>
      </div>
      <div className="container-lb flex flex-col gap-1 border-t border-[var(--lb-border)] py-3 text-xs text-[var(--lb-muted)] sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} Leaf &amp; Bloom. Portfolio storefront.
        </span>
        <Link to="/admin" className="lb-link-muted">
          Admin
        </Link>
      </div>
    </footer>
  )
}
