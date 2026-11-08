import { Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useToast } from '../context/ToastContext'
import { readJSON, writeJSON } from '../lib/storage'

const FEEDBACK_CATEGORIES = [
  'Design / UI',
  'Navigation',
  'Performance',
  'Features',
  'Content',
  'Mobile experience',
]

const MAX_COMMENT = 600

export interface StoredReview {
  name: string
  rating: number
  comment: string
  date: string
  ts: number
  categories?: string[]
}

function StarPicker({
  value,
  hover,
  onHover,
  onPick,
}: {
  value: number
  hover: number
  onHover: (n: number) => void
  onPick: (n: number) => void
}) {
  const active = hover || value
  return (
    <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Star rating from 1 to 5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onMouseEnter={() => onHover(n)}
          onMouseLeave={() => onHover(0)}
          onClick={() => onPick(n)}
          className="rounded p-1 transition"
        >
          <Star
            className={`size-7 ${
              n <= active ? 'fill-floral text-floral' : 'text-muted'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function StaticStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`size-4 ${n <= rating ? 'fill-floral text-floral' : 'text-muted'}`}
        />
      ))}
    </div>
  )
}

export default function Feedback() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [reviews, setReviews] = useState<StoredReview[]>([])

  useEffect(() => {
    setReviews(readJSON<StoredReview[]>('lb_reviews', []))
  }, [])

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  const canSubmit = useMemo(
    () => name.trim().length >= 2 && rating > 0 && comment.trim().length >= 10,
    [comment, name, rating],
  )

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) {
      toast('Add your name, a star rating, and at least 10 characters.', 'error')
      return
    }
    const entry: StoredReview = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      ts: Date.now(),
      categories,
    }
    const next = [entry, ...readJSON<StoredReview[]>('lb_reviews', [])].slice(0, 50)
    writeJSON('lb_reviews', next)
    setReviews(next)
    toast('Review saved locally — thank you.')
    setName('')
    setRating(0)
    setComment('')
    setCategories([])
  }

  return (
    <div className="pb-24">
      <header className="border-b border-ink/10 bg-cream py-14 dark:border-cream/10 dark:bg-[#141614]">
        <div className="container-lb">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-sage uppercase">Feedback</p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl dark:text-cream">
              Share your thoughts
            </h1>
            <p className="mt-4 max-w-xl text-sm text-earth dark:text-[#c9c4b8]">
              Rate this portfolio build — reviews persist in localStorage as lb_reviews.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-lb mt-12 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-ink/10 bg-cream p-6 dark:border-cream/10 dark:bg-[#1a1e1a]"
          >
            <label className="block text-sm">
              <span className="text-muted">Your name *</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="lb-input mt-1"
                required
              />
            </label>

            <div className="mt-6">
              <p className="text-xs text-muted">Overall rating *</p>
              <StarPicker
                value={rating}
                hover={hover}
                onHover={setHover}
                onPick={setRating}
              />
            </div>

            <fieldset className="mt-6">
              <legend className="text-xs text-muted">What could improve? (optional)</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {FEEDBACK_CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-ink/10 px-3 py-2 text-sm dark:border-cream/15"
                  >
                    <input
                      type="checkbox"
                      checked={categories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-6 block text-sm">
              <span className="text-muted">Review *</span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT))}
                rows={5}
                className="lb-input mt-1"
                required
              />
              <span className="mt-1 block text-xs text-muted tabular-nums">
                {comment.length} / {MAX_COMMENT}
              </span>
            </label>

            <Button type="submit" className="mt-6 w-full" disabled={!canSubmit}>
              Submit review
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-display text-2xl text-ink dark:text-cream">Recent reviews</h2>
          <p className="mt-1 text-sm text-muted">Loaded from localStorage on this device.</p>
          <ul className="mt-6 space-y-4">
            {reviews.length === 0 ? (
              <li className="rounded-lg border border-dashed border-ink/15 px-4 py-8 text-center text-sm text-muted dark:border-cream/15">
                No reviews yet — yours can be first.
              </li>
            ) : (
              reviews.map((r) => (
                <li
                  key={r.ts}
                  className="rounded-xl border border-ink/10 bg-cream p-4 dark:border-cream/10 dark:bg-[#1a1e1a]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-ink dark:text-cream">{r.name}</p>
                      <p className="text-xs text-muted">{r.date}</p>
                    </div>
                    <StaticStars rating={r.rating} />
                  </div>
                  {r.categories && r.categories.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded-md bg-beige px-2 py-0.5 text-xs text-earth dark:bg-[#242a24] dark:text-[#c9c4b8]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-3 text-sm text-earth dark:text-[#c9c4b8]">
                    &ldquo;{r.comment}&rdquo;
                  </p>
                </li>
              ))
            )}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}
