import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import { Layout } from './components/layout/Layout'
import About from './pages/About'
import Admin from './pages/Admin'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'
import Home from './pages/Home'
import Services from './pages/Services'
import Shop from './pages/Shop'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="about" element={<About />} />
                  <Route path="services" element={<Services />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
