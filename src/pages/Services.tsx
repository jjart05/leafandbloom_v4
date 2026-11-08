import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaggerContainer, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useToast } from '../context/ToastContext'
import { SERVICES, type ServiceItem } from '../data/services'

const FAQ = [
  {
    q: 'Are quotes binding?',
    a: 'No — service pricing here is narrative copy for the portfolio. Real quotes would happen after a consult.',
  },
  {
    q: 'Do you fulfil nationwide?',
    a: 'Coverage depends on destination and season — ask when you enquire and we will confirm logistics.',
  },
  {
    q: 'How do I book?',
    a: 'Use the inquiry form below. It toasts locally and can route you to Contact with context pre-filled.',
  },
]

export default function Services() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [modal, setModal] = useState<ServiceItem | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [serviceId, setServiceId] = useState(SERVICES[0]?.id ?? '')
  const [message, setMessage] = useState('')

  const submitInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Enter your name and a valid email.', 'error')
      return
    }
    toast('Inquiry received. Opening contact…')
    navigate('/contact', {
      state: {
        fromServices: true,
        name,
        email,
        serviceId,
        message,
      },
    })
  }

  return (
    <div className="pb-24">
      <header className="border-b border-ink/10 bg-cream py-14 dark:border-cream/10 dark:bg-[#141614]">
        <div className="container-lb">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">Services</p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl dark:text-cream">
              Studio offerings
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-earth dark:text-[#c9c4b8]">
              Florals, weddings, consultations, subscriptions, delivery, and corporate styling —
              framed for Philippine clients in pesos.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="py-16">
        <StaggerContainer className="container-lb grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <StaggerItem key={svc.id}>
              <article className="flex h-full flex-col rounded-xl border border-[var(--lb-border)] bg-[var(--lb-surface)] p-6 shadow-soft">
                <h2 className="font-display text-2xl text-[var(--lb-ink)]">{svc.title}</h2>
                <p className="mt-2 flex-1 text-sm text-[var(--lb-earth)]">{svc.summary}</p>
                <p className="mt-4 text-sm text-[var(--lb-muted)]">{svc.priceFrom}</p>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setModal(svc)}
                >
                  Details
                </Button>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="bg-cream py-14 dark:bg-[#141614]">
        <div className="container-lb max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl text-ink dark:text-cream">FAQ</h2>
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
                    <ArrowRight className={`size-4 shrink-0 transition ${open ? 'rotate-90' : ''}`} />
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

      <section className="py-16">
        <div className="container-lb grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl text-ink dark:text-cream">Service inquiry</h2>
            <p className="mt-2 text-sm text-muted">
              Tell us what you need — we will open Contact with your details ready.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <form onSubmit={submitInquiry} className="space-y-4 rounded-xl border border-ink/10 bg-cream p-6 dark:border-cream/10 dark:bg-[#1a1e1a]">
              <label className="block text-sm">
                <span className="text-muted">Name *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="lb-input mt-1"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">Email *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lb-input mt-1"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">Service</span>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="lb-input mt-1"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-muted">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="lb-input mt-1"
                />
              </label>
              <Button type="submit" className="w-full">
                Send inquiry
              </Button>
            </form>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {modal ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-ink/50"
              onClick={() => setModal(null)}
            />
            <motion.div
              role="dialog"
              aria-modal
              initial={reduce ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-6 shadow-lift dark:bg-[#1a1e1a]"
            >
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 rounded-full p-2 hover:bg-beige dark:hover:bg-[#242a24]"
              >
                <X className="size-4" />
              </button>
              <h2 className="pr-8 font-display text-3xl text-ink dark:text-cream">{modal.title}</h2>
              <p className="mt-2 text-sm text-muted">{modal.priceFrom}</p>
              <p className="mt-4 text-sm leading-relaxed text-earth dark:text-[#c9c4b8]">
                {modal.detail}
              </p>
              <Button className="mt-6 w-full" onClick={() => setModal(null)}>
                Close
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
