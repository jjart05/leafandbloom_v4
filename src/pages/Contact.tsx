import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useToast } from '../context/ToastContext'
import { SERVICES } from '../data/services'

interface ContactState {
  fromServices?: boolean
  name?: string
  email?: string
  serviceId?: string
  message?: string
}

type FieldErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

export default function Contact() {
  const { toast } = useToast()
  const location = useLocation()
  const state = (location.state as ContactState | null) ?? {}

  const [name, setName] = useState(state.name ?? '')
  const [email, setEmail] = useState(state.email ?? '')
  const [subject, setSubject] = useState(
    state.serviceId
      ? `Service: ${SERVICES.find((s) => s.id === state.serviceId)?.title ?? state.serviceId}`
      : '',
  )
  const [message, setMessage] = useState(state.message ?? '')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (state.fromServices) {
      toast('Service inquiry details loaded — finish your message here.', 'info')
    }
  }, [state.fromServices, toast])

  const errors = useMemo((): FieldErrors => {
    const e: FieldErrors = {}
    if (!name.trim()) e.name = 'Name is required.'
    else if (name.trim().length < 2) e.name = 'Name is too short.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email required.'
    if (!subject.trim()) e.subject = 'Subject is required.'
    if (!message.trim()) e.message = 'Message is required.'
    else if (message.length > 1200) e.message = 'Message must be under 1200 characters.'
    return e
  }, [email, message, name, subject])

  const showError = (key: keyof FieldErrors) => touched[key] && errors[key]

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errors).length > 0) {
      toast('Please fix the highlighted fields.', 'error')
      return
    }
    toast('Message received. Thank you.')
    setMessage('')
    setSubject('')
  }

  const cards: { icon: LucideIcon; label: string; content: ReactNode }[] = [
    {
      icon: MapPin,
      label: 'Studio address',
      content: 'Buhisan, Dulhugan, Cebu City, Philippines',
    },
    {
      icon: Phone,
      label: 'Phone / WhatsApp',
      content: (
        <a href="tel:+639171234567" className="hover:underline">
          +63 917 123 4567
        </a>
      ),
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp chat',
      content: (
        <a
          href="https://wa.me/639171234567"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Open WhatsApp
        </a>
      ),
    },
    {
      icon: Mail,
      label: 'Email',
      content: (
        <a href="mailto:hello@leafandbloom.ph" className="hover:underline">
          hello@leafandbloom.ph
        </a>
      ),
    },
    {
      icon: Clock,
      label: 'Hours',
      content: 'Monday – Saturday, 9AM – 6PM',
    },
  ]

  return (
    <div className="pb-24">
      <header className="border-b border-ink/10 bg-cream py-14 dark:border-cream/10 dark:bg-[#141614]">
        <div className="container-lb">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">Contact</p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl dark:text-cream">
              Let&apos;s connect
            </h1>
            <p className="mt-4 max-w-xl text-sm text-earth dark:text-[#c9c4b8]">
              Questions, quotes, or a simple hello — use the form or reach us directly. No embedded
              map in this portfolio build.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-lb mt-12 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-6">
            {cards.map((card) => (
              <ContactCard key={card.label} icon={card.icon} label={card.label}>
                <span className="text-sm text-ink dark:text-cream">{card.content}</span>
              </ContactCard>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-xl border border-ink/10 bg-cream p-6 shadow-soft dark:border-cream/10 dark:bg-[#1a1e1a]"
          >
            <h2 className="font-display text-2xl text-ink dark:text-cream">Send a message</h2>
            <div className="mt-6 space-y-4">
              <InputField
                id="contact-name"
                label="Name"
                value={name}
                onChange={setName}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                error={showError('name') ? errors.name : undefined}
                required
              />
              <InputField
                id="contact-email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={showError('email') ? errors.email : undefined}
                required
              />
              <InputField
                id="contact-subject"
                label="Subject"
                value={subject}
                onChange={setSubject}
                onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                error={showError('subject') ? errors.subject : undefined}
                required
              />
              <label className="block text-sm">
                <span className="text-muted">Message *</span>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  rows={5}
                  className={`lb-input mt-1 ${showError('message') ? 'border-floral' : ''}`}
                  required
                />
                {showError('message') ? (
                  <span className="mt-1 block text-xs text-floral">{errors.message}</span>
                ) : (
                  <span className="mt-1 block text-xs text-muted tabular-nums">
                    {message.length} / 1200
                  </span>
                )}
              </label>
            </div>
            <Button type="submit" className="mt-6 w-full">
              Send message
            </Button>
          </form>
        </Reveal>
      </div>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-ink/10 bg-cream p-4 dark:border-cream/10 dark:bg-[#1a1e1a]">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-beige text-forest dark:bg-[#242a24] dark:text-[#d5e0cf]">
        <Icon className="size-5" aria-hidden />
      </div>
      <div>
        <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  )
}

function InputField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error?: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="text-muted">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        className={`lb-input mt-1 ${error ? 'border-floral' : ''}`}
        required={required}
      />
      {error ? <span className="mt-1 block text-xs text-floral">{error}</span> : null}
    </label>
  )
}
