import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StaggerContainer, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'

const TIMELINE = [
  {
    year: '2018',
    title: 'Balcony beginnings',
    body: 'Johnnel Artiaga starts potting and sharing plants with neighbours in Buhisan, Cebu City — the seed of Leaf & Bloom.',
  },
  {
    year: '2020',
    title: 'Florals join the shelf',
    body: 'Seasonal arrangements and small event work join the home-plant route as friends ask for tables and gifts.',
  },
  {
    year: '2023',
    title: 'Studio rhythm',
    body: 'Consultations, subscriptions, and workplace styling round out a fuller botanical studio story — still rooted in Cebu light.',
  },
  {
    year: 'Today',
    title: 'Portfolio storefront',
    body: 'The studio storefront presents plants, florals, and booking flows for Philippine homes — rooted in Cebu light and living spaces.',
  },
]

const VALUES = [
  {
    id: 'honesty',
    title: 'Portfolio honesty',
    body: 'We keep recommendations practical — matched to your room, light, and care habits.',
  },
  {
    id: 'light',
    title: 'Philippine light',
    body: 'Plants are chosen for rooms here — humidity, windows, and realistic care rhythms.',
  },
  {
    id: 'conversation',
    title: 'Start with the room',
    body: 'Arrangements and installs begin with how a space is used, not just how it photographs.',
  },
]

const TEAM = [
  {
    name: 'Johnnel Artiaga',
    role: 'Founder & Lead Botanist',
    img: '/images/me.jpg',
  },
  {
    name: 'Dave Del Rosario',
    role: 'Head Floral Designer',
    img: '/images/dave.jpg',
  },
  {
    name: 'R-Jyn Pantilag',
    role: 'Wedding Specialist',
    img: '/images/arj1.jpg',
  },
  {
    name: 'Christian Orique',
    role: 'Plant Care Expert',
    img: '/images/iyan.jpg',
  },
]

export default function About() {
  const reduce = useReducedMotion()
  const [openValue, setOpenValue] = useState<string | null>(VALUES[0]?.id ?? null)

  return (
    <div className="pb-24">
      <header className="border-b border-ink/10 bg-cream py-14 dark:border-cream/10 dark:bg-[#141614]">
        <div className="container-lb">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">About</p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl dark:text-cream">
              Leaf & Bloom
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-earth dark:text-[#c9c4b8]">
              In 2018, founder Johnnel Artiaga began delivering potted plants to neighbours in Cebu
              City. That small route became a studio for plants, florals, and event work — now
              presented as a luxury botanical portfolio experience.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container-lb">
          <Reveal>
            <h2 className="font-display text-3xl text-ink dark:text-cream">Timeline</h2>
            <p className="mt-2 text-sm text-muted">A narrative arc — not a audited company history.</p>
          </Reveal>
          <ol className="relative mt-10 space-y-0 border-l border-sage/30 pl-8">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06}>
                <li className="relative pb-10">
                  <span className="absolute -left-[2.35rem] top-1 flex size-7 items-center justify-center rounded-full bg-forest text-xs text-cream dark:bg-[#d5e0cf] dark:text-[#101310]">
                    {item.year.slice(2)}
                  </span>
                  <p className="text-xs tracking-wide text-sage">{item.year}</p>
                  <h3 className="mt-1 font-display text-xl text-ink dark:text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-earth dark:text-[#c9c4b8]">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-beige/40 py-16 dark:bg-[#1a1e1a]/60 md:py-20">
        <div className="container-lb max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl text-ink dark:text-cream">Values</h2>
          </Reveal>
          <ul className="mt-8 divide-y divide-ink/10 dark:divide-cream/10">
            {VALUES.map((v) => {
              const open = openValue === v.id
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={open}
                    onClick={() => setOpenValue(open ? null : v.id)}
                  >
                    <span className="font-display text-xl text-ink dark:text-cream">{v.title}</span>
                    <ChevronRight
                      className={`size-4 transition ${open ? 'rotate-90' : ''}`}
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
                        {v.body}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-lb">
          <Reveal className="text-center">
            <p className="text-xs tracking-[0.15em] text-sage uppercase">People</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl dark:text-cream">
              The team
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-earth dark:text-[#c9c4b8]">
              Names from the Leaf & Bloom product story — local photos where available.
            </p>
          </Reveal>
          <StaggerContainer className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <StaggerItem key={member.name} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="mx-auto size-48 rounded-full border-2 border-floral/40 object-cover"
                />
                <h3 className="mt-4 font-display text-xl text-[var(--lb-ink)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs tracking-[0.12em] text-sage uppercase">
                  {member.role}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="border-t border-ink/10 py-14 dark:border-cream/10">
        <div className="container-lb flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-display text-3xl text-ink dark:text-cream">Visit the catalog</h2>
            <p className="mt-2 text-sm text-muted">
              Browse the shop or enquire about studio services.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/shop">
                <Button>Shop plants</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Contact</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
