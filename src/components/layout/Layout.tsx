import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CartDrawer } from '../cart/CartDrawer'
import { PageTransition } from '../motion/PageTransition'
import { BackToTop } from './BackToTop'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[var(--lb-page)] text-[var(--lb-ink)]">
      <Navbar />
      <CartDrawer />
      <BackToTop />
      <a
        href="https://wa.me/639171234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift"
      >
        <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
          <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.4-1.4A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3a9 9 0 1 1 7.4 4.1zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.5 4 15 15 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z" />
        </svg>
      </a>
      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>
      <Footer />
    </div>
  )
}
