import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

export interface ThemeToggleOrigin {
  x: number
  y: number
}

interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: ThemeToggleOrigin) => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const THEME_KEY = 'lb_theme'
const CIRCLE_MS = 750

function readStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(THEME_KEY)
    if (!raw) return null
    if (raw === 'dark' || raw === 'light') return raw
    const parsed = JSON.parse(raw) as unknown
    if (parsed === 'dark' || parsed === 'light') return parsed
  } catch {
    /* ignore */
  }
  return null
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? systemTheme()
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.dataset.theme = theme
}

function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function circleRadius(x: number, y: number): number {
  const { innerWidth: w, innerHeight: h } = window
  return Math.hypot(Math.max(x, w - x), Math.max(y, h - y))
}

async function runCircularTransition(
  next: Theme,
  origin: ThemeToggleOrigin,
  commit: (theme: Theme) => void,
): Promise<void> {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {
      ready: Promise<void>
      finished: Promise<void>
    }
  }

  if (typeof doc.startViewTransition !== 'function' || prefersReducedMotion()) {
    commit(next)
    return
  }

  const transition = doc.startViewTransition(() => {
    commit(next)
  })

  try {
    await transition.ready
  } catch {
    return
  }

  const radius = circleRadius(origin.x, origin.y)
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${origin.x}px ${origin.y}px)`,
        `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
      ],
    },
    {
      duration: CIRCLE_MS,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => resolveInitialTheme())

  useEffect(() => {
    applyTheme(theme)
    persistTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next)
    setThemeState(next)
    persistTheme(next)
  }, [])

  const toggleTheme = useCallback(
    (origin?: ThemeToggleOrigin) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const commit = (t: Theme): void => {
        applyTheme(t)
        setThemeState(t)
        persistTheme(t)
      }

      if (origin) {
        void runCircularTransition(next, origin, commit)
        return
      }

      commit(next)
    },
    [theme],
  )

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
