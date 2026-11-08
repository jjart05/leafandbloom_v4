import { Eye, EyeOff, LogOut, Search, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StaggerContainer, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useToast } from '../context/ToastContext'
import type { CartItem } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import { formatPHP } from '../lib/money'
import { readJSON, writeJSON } from '../lib/storage'
import type { StoredReview } from './Feedback'

interface StoredOrder {
  orderNum: string
  items: CartItem[]
  total: number
  date: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

type Tab = 'reviews' | 'orders' | 'products'

export default function Admin() {
  const { toast } = useToast()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [configured, setConfigured] = useState(true)
  const [busy, setBusy] = useState(false)
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [tab, setTab] = useState<Tab>('reviews')
  const [reviews, setReviews] = useState<StoredReview[]>([])
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const [productQuery, setProductQuery] = useState('')

  const refresh = useCallback(() => {
    setReviews(readJSON<StoredReview[]>('lb_reviews', []))
    setOrders(readJSON<StoredOrder[]>('lb_orders', []))
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/admin-session', { credentials: 'same-origin' })
        const data = (await res.json()) as { ok?: boolean; configured?: boolean }
        if (cancelled) return
        setConfigured(data.configured !== false)
        setAuthed(Boolean(data.ok))
        if (data.ok) refresh()
      } catch {
        if (!cancelled) {
          setConfigured(false)
          setAuthed(false)
        }
      } finally {
        if (!cancelled) setChecking(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [refresh])

  useEffect(() => {
    if (authed) refresh()
  }, [authed, refresh])

  const login = async () => {
    if (busy) return
    setBusy(true)
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.status === 503) {
        setConfigured(false)
        toast('Admin auth is not configured for this deployment.', 'error')
        return
      }
      if (!res.ok) {
        toast('Incorrect password.', 'error')
        setPassword('')
        return
      }
      setAuthed(true)
      setPassword('')
      toast('Admin session opened.')
      refresh()
    } catch {
      toast('Could not reach admin login service.', 'error')
    } finally {
      setBusy(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/admin-logout', {
        method: 'POST',
        credentials: 'same-origin',
      })
    } catch {
      /* still clear local UI */
    }
    setAuthed(false)
    toast('Logged out of admin.', 'info')
  }

  const deleteReview = (ts: number) => {
    const next = reviews.filter((r) => r.ts !== ts)
    writeJSON('lb_reviews', next)
    setReviews(next)
    toast('Review deleted.')
  }

  const filteredProducts = useMemo(() => {
    const q = productQuery.trim().toLowerCase()
    if (!q) return PRODUCTS
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [productQuery])

  if (checking) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 text-sm text-muted">
        Checking admin session…
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Reveal className="w-full max-w-sm rounded-2xl border border-ink/10 bg-cream p-8 text-center shadow-soft dark:border-cream/10 dark:bg-[#1a1e1a]">
          <h1 className="font-display text-2xl text-ink dark:text-cream">Leaf & Bloom</h1>
          <p className="mt-1 text-xs tracking-[0.15em] text-muted uppercase">Admin</p>
          <p className="mt-4 text-sm text-earth dark:text-[#c9c4b8]">
            {configured
              ? 'Sign in to manage reviews and order requests on this device.'
              : 'Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the host environment.'}
          </p>
          {configured ? (
            <>
              <label className="mt-6 block text-left text-sm">
                <span className="text-muted">Password</span>
                <div className="relative mt-1">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') void login()
                    }}
                    className="lb-input w-full py-2.5 pr-10 pl-3"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1.5 text-muted"
                  >
                    {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </label>
              <Button className="mt-6 w-full" onClick={() => void login()} disabled={busy}>
                Enter dashboard
              </Button>
            </>
          ) : null}
        </Reveal>
      </div>
    )
  }

  return (
    <div className="pb-20">
      <header className="border-b border-ink/10 bg-cream dark:border-cream/10 dark:bg-[#141614]">
        <div className="container-lb flex flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <h1 className="font-display text-2xl text-ink dark:text-cream">Admin dashboard</h1>
            <p className="text-xs text-muted">
              Client-side session only — data from lb_reviews & lb_orders in localStorage.
            </p>
          </div>
          <Button variant="outline" onClick={() => void logout()} className="gap-2">
            <LogOut className="size-4" /> Log out
          </Button>
        </div>
      </header>

      <div className="container-lb mt-8">
        <StaggerContainer className="grid gap-4 sm:grid-cols-3">
          <StaggerItem>
            <StatCard label="Reviews" value={reviews.length} />
          </StaggerItem>
          <StaggerItem>
            <StatCard label="Orders" value={orders.length} />
          </StaggerItem>
          <StaggerItem>
            <StatCard label="Catalog (read-only)" value={PRODUCTS.length} />
          </StaggerItem>
        </StaggerContainer>

        <AdminTabs tab={tab} setTab={setTab} />

        {tab === 'reviews' && (
          <section className="mt-8 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-sm text-muted">No reviews in localStorage yet.</p>
            ) : (
              reviews.map((r) => (
                <article
                  key={r.ts}
                  className="flex flex-col gap-3 rounded-xl border border-ink/10 bg-cream p-4 sm:flex-row sm:items-start sm:justify-between dark:border-cream/10 dark:bg-[#1a1e1a]"
                >
                  <ReviewRowBody review={r} />
                  <button
                    type="button"
                    aria-label="Delete review"
                    onClick={() => deleteReview(r.ts)}
                    className="inline-flex items-center gap-1 self-start text-sm text-floral"
                  >
                    <Trash2 className="size-4" /> Delete
                  </button>
                </article>
              ))
            )}
          </section>
        )}

        {tab === 'orders' && (
          <section className="mt-8 space-y-4">
            {orders.length === 0 ? (
              <p className="text-sm text-muted">No orders in localStorage yet.</p>
            ) : (
              orders.map((o) => (
                <article
                  key={o.orderNum}
                  className="rounded-xl border border-ink/10 bg-cream p-4 dark:border-cream/10 dark:bg-[#1a1e1a]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-xl text-ink dark:text-cream">{o.orderNum}</h2>
                    <p className="text-sm text-muted">{new Date(o.date).toLocaleString()}</p>
                  </div>
                  <p className="mt-1 text-sm text-earth dark:text-[#c9c4b8]">
                    {o.customer.firstName} {o.customer.lastName} · {o.customer.email}
                  </p>
                  <p className="mt-2 text-sm font-medium text-forest dark:text-[#d5e0cf]">
                    {formatPHP(o.total)} · {o.items.length} line item
                    {o.items.length !== 1 ? 's' : ''}
                  </p>
                  <ul className="mt-3 text-xs text-muted">
                    {o.items.map((item) => (
                      <li key={item.id}>
                        {item.name} × {item.qty}
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </section>
        )}

        {tab === 'products' && (
          <section className="mt-8">
            <div className="relative max-w-md">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-lg border border-ink/10 bg-cream py-2.5 pr-3 pl-9 text-sm dark:border-cream/15 dark:bg-[#1a1e1a]"
              />
            </div>
            <p className="mt-2 text-xs text-muted">Read-only list from PRODUCTS data.</p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10 dark:border-cream/10">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-beige/60 text-xs text-muted uppercase dark:bg-[#242a24]">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-ink/10 dark:border-cream/10"
                    >
                      <td className="px-4 py-2 tabular-nums">{p.id}</td>
                      <td className="px-4 py-2 text-ink dark:text-cream">{p.name}</td>
                      <td className="px-4 py-2 capitalize text-muted">{p.category}</td>
                      <td className="px-4 py-2 text-forest dark:text-[#d5e0cf]">
                        {formatPHP(p.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-cream p-5 dark:border-cream/10 dark:bg-[#1a1e1a]">
      <p className="text-xs text-muted uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink dark:text-cream">{value}</p>
    </div>
  )
}

function AdminTabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'reviews', label: 'Reviews' },
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
  ]
  return (
    <div className="mt-8 flex flex-wrap gap-2 border-b border-ink/10 pb-2 dark:border-cream/10">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTab(t.id)}
          className={`rounded-lg px-4 py-2 text-sm ${
            tab === t.id
              ? 'bg-forest text-cream dark:bg-[#d5e0cf] dark:text-[#101310]'
              : 'text-muted hover:bg-beige/50 dark:hover:bg-[#242a24]'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function ReviewRowBody({ review }: { review: StoredReview }) {
  return (
    <div>
      <p className="font-medium text-ink dark:text-cream">{review.name}</p>
      <p className="text-xs text-muted">
        {review.date} · {review.rating}/5
      </p>
      <p className="mt-2 text-sm text-earth dark:text-[#c9c4b8]">{review.comment}</p>
    </div>
  )
}
