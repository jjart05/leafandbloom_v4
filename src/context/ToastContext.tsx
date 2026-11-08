import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, XCircle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++toastId
    setItems((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed top-24 right-4 z-[90] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
        <AnimatePresence>
          {items.map((item) => {
            const Icon =
              item.type === 'error'
                ? XCircle
                : item.type === 'info'
                  ? Info
                  : CheckCircle2
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className="pointer-events-auto flex items-start gap-3 rounded-xl border border-[var(--lb-border)] bg-[var(--lb-accent)] px-4 py-3 text-sm text-[var(--lb-accent-fg)] shadow-lift"
              >
                <Icon className="mt-0.5 size-4 shrink-0 opacity-90" />
                <p className="leading-snug">{item.message}</p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
