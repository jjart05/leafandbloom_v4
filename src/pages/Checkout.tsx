import { motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StaggerContainer, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { type CartItem, useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { FREE_SHIPPING_MIN, formatPHP } from '../lib/money'
import { readJSON, writeJSON } from '../lib/storage'

type PaymentMethod = 'cod' | 'bank' | 'gcash'

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  zip: string
  notes: string
  payment: PaymentMethod
}

interface StoredOrder {
  orderNum: string
  items: CartItem[]
  total: number
  date: string
  customer: CustomerInfo
}

const STEPS = [
  'Customer',
  'Delivery',
  'Payment',
  'Review',
  'Confirmation',
] as const

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: 'Cash on delivery',
  bank: 'Bank transfer',
  gcash: 'GCash',
}

const emptyCustomer: CustomerInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  zip: '',
  notes: '',
  payment: 'cod',
}

function validateStep(step: number, c: CustomerInfo): string | null {
  if (step === 0) {
    if (!c.firstName.trim() || !c.lastName.trim()) return 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return 'Enter a valid email.'
    if (!/^[\d\s+()-]{10,}$/.test(c.phone.trim())) return 'Enter a valid phone number.'
  }
  if (step === 1) {
    if (!c.address.trim() || !c.city.trim() || !c.province.trim()) {
      return 'Complete your delivery address.'
    }
  }
  if (step === 2) {
    if (!c.payment) return 'Select a payment method.'
  }
  return null
}

export default function Checkout() {
  const reduce = useReducedMotion()
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer)
  const [orderNum, setOrderNum] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const update = (patch: Partial<CustomerInfo>) => {
    setCustomer((prev) => ({ ...prev, ...patch }))
    setError(null)
  }

  const goNext = () => {
    const err = validateStep(step, customer)
    if (err) {
      setError(err)
      toast(err, 'error')
      return
    }
    if (step === 3) {
      placeOrder()
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setError(null)
    setStep((s) => Math.max(0, s - 1))
  }

  const placeOrder = () => {
    if (items.length === 0) {
      toast('Your cart is empty.', 'error')
      return
    }
    const num = `LB-${Date.now().toString().slice(-6)}`
    const record: StoredOrder = {
      orderNum: num,
      items: [...items],
      total,
      date: new Date().toISOString(),
      customer: { ...customer },
    }
    const orders = readJSON<StoredOrder[]>('lb_orders', [])
    writeJSON('lb_orders', [record, ...orders].slice(0, 50))
    clearCart()
    setOrderNum(num)
    setStep(4)
    toast('Order request recorded. Thank you.')
  }

  if (items.length === 0 && step < 4) {
    return (
      <div className="container-lb py-20 text-center">
        <Reveal>
          <h1 className="font-display text-4xl text-ink dark:text-cream">Your cart is empty</h1>
          <p className="mt-3 text-sm text-muted">Add plants from the shop to try checkout.</p>
          <Link to="/shop" className="mt-8 inline-block">
            <Button>Browse shop</Button>
          </Link>
        </Reveal>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <header className="border-b border-[var(--lb-border)] bg-[var(--lb-surface)] py-10">
        <div className="container-lb">
          <Reveal>
            <h1 className="font-display text-4xl text-[var(--lb-ink)]">Checkout</h1>
            <p className="mt-2 text-sm text-[var(--lb-muted)]">
              Complete your order request in a few steps.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-lb mt-10">
        <StaggerContainer
          className="flex flex-wrap gap-2"
          stagger={0.05}
          delayChildren={0.08}
          aria-label="Checkout progress"
        >
          {STEPS.map((label, i) => {
            const done = i < step
            const active = i === step
            return (
              <StaggerItem key={label}>
                <span
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                    active
                      ? 'border-[var(--lb-accent)] bg-[var(--lb-accent)] text-[var(--lb-accent-fg)]'
                      : done
                        ? 'border-sage/40 text-sage'
                        : 'border-[var(--lb-border)] text-[var(--lb-muted)]'
                  }`}
                >
                  {done ? (
                    <Check className="size-3.5" />
                  ) : (
                    <span className="tabular-nums">{i + 1}</span>
                  )}
                  {label}
                </span>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl border border-ink/10 bg-cream p-6 dark:border-cream/10 dark:bg-[#1a1e1a]"
          >
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink dark:text-cream">Customer info</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="First name"
                    value={customer.firstName}
                    onChange={(v) => update({ firstName: v })}
                    required
                  />
                  <Field
                    label="Last name"
                    value={customer.lastName}
                    onChange={(v) => update({ lastName: v })}
                    required
                  />
                </div>
                <Field
                  label="Email"
                  type="email"
                  value={customer.email}
                  onChange={(v) => update({ email: v })}
                  required
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(v) => update({ phone: v })}
                  required
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink dark:text-cream">Delivery</h2>
                <Field
                  label="Street address"
                  value={customer.address}
                  onChange={(v) => update({ address: v })}
                  required
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City" value={customer.city} onChange={(v) => update({ city: v })} required />
                  <Field
                    label="Province"
                    value={customer.province}
                    onChange={(v) => update({ province: v })}
                    required
                  />
                  <Field label="ZIP" value={customer.zip} onChange={(v) => update({ zip: v })} />
                </div>
                <label className="block text-sm">
                  <span className="text-muted">Delivery notes</span>
                  <textarea
                    value={customer.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    rows={3}
                    className="lb-input mt-1"
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink dark:text-cream">Payment method</h2>
                <p className="text-sm text-earth dark:text-[#c9c4b8]">
                  Choose how you prefer to settle payment when the studio confirms your order.
                </p>
                <fieldset className="space-y-2">
                  {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map((key) => (
                    <label
                      key={key}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
                        customer.payment === key
                          ? 'border-forest bg-beige/40 dark:border-[#d5e0cf] dark:bg-[#242a24]'
                          : 'border-ink/10 dark:border-cream/15'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={customer.payment === key}
                        onChange={() => update({ payment: key })}
                      />
                      {PAYMENT_LABELS[key]}
                    </label>
                  ))}
                </fieldset>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink dark:text-cream">Review order</h2>
                <p className="text-sm text-muted">
                  Confirm details, then submit your order request.
                </p>
                <dl className="space-y-2 text-sm">
                  <Row k="Name" v={`${customer.firstName} ${customer.lastName}`} />
                  <Row k="Email" v={customer.email} />
                  <Row k="Phone" v={customer.phone} />
                  <Row
                    k="Address"
                    v={`${customer.address}, ${customer.city}, ${customer.province} ${customer.zip}`}
                  />
                  <Row k="Payment request" v={PAYMENT_LABELS[customer.payment]} />
                </dl>
                <ul className="mt-4 divide-y divide-ink/10 dark:divide-cream/10">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 py-3">
                      <img src={item.img} alt="" className="size-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-ink dark:text-cream">{item.name}</p>
                        <p className="text-xs text-muted">Qty {item.qty}</p>
                      </div>
                      <p className="text-sm text-forest dark:text-[#d5e0cf]">
                        {formatPHP(item.price * item.qty)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step === 4 && orderNum && (
              <div className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-sage/20 text-sage">
                  <Check className="size-7" />
                </div>
                <h2 className="mt-4 font-display text-3xl text-ink dark:text-cream">
                  Order request recorded
                </h2>
                <p className="mt-2 text-sm text-earth dark:text-[#c9c4b8]">
                  We saved your order request. The studio will follow up shortly.
                </p>
                <p className="mt-4 font-display text-xl text-forest dark:text-[#d5e0cf]">
                  Reference {orderNum}
                </p>
                <Link to="/shop" className="mt-8 inline-block">
                  <Button>Continue shopping</Button>
                </Link>
              </div>
            )}

            {error ? (
              <p className="mt-4 text-sm text-floral" role="alert">
                {error}
              </p>
            ) : null}

            {step < 4 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {step > 0 ? (
                  <Button variant="outline" onClick={goBack}>
                    Back
                  </Button>
                ) : null}
                <Button onClick={goNext} className="gap-2">
                  {step === 3 ? 'Place order request' : 'Continue'}
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </motion.div>

          <aside className="h-fit rounded-xl border border-ink/10 bg-cream p-6 dark:border-cream/10 dark:bg-[#1a1e1a] lg:sticky lg:top-24">
            <h2 className="font-display text-xl text-ink dark:text-cream">Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>{formatPHP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatPHP(shipping)}</span>
              </div>
              {subtotal > 0 && subtotal < FREE_SHIPPING_MIN ? (
                <p className="text-xs text-sage">
                  Add {formatPHP(FREE_SHIPPING_MIN - subtotal)} for free shipping.
                </p>
              ) : null}
              <div className="flex justify-between border-t border-ink/10 pt-3 font-display text-lg text-forest dark:border-cream/10 dark:text-[#d5e0cf]">
                <span>Total</span>
                <span>{formatPHP(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="lb-input mt-1"
      />
    </label>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-32 shrink-0 text-muted">{k}</dt>
      <dd className="text-ink dark:text-cream">{v}</dd>
    </div>
  )
}
