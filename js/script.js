/* ============================================================
   LEAF & BLOOM — Premium Frontend JS v2.0
   ============================================================ */

/* ── Early theme bootstrap (reduces flash before DOMContentLoaded) ── */
(function bootstrapTheme() {
  try {
    if (localStorage.getItem('lb_theme') === 'dark' && document.body) {
      document.body.classList.add('dark-mode');
    }
  } catch (_) { /* ignore */ }
})();

/* ── Procedural plaster noise (SVG code, no image file) ── */
(function randomizePlasterBg() {
  const root = document.documentElement;
  const rand = (min, max) => min + Math.random() * (max - min);
  const seed = () => Math.floor(rand(1, 9999));

  /** Fractal-noise SVG used as a CSS background — stitchTiles keeps it seamless. */
  function noiseUri(baseFrequency, octaves, opacity, strength) {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">` +
      `<filter id="p" x="0" y="0" width="100%" height="100%">` +
      `<feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${octaves}" seed="${seed()}" stitchTiles="stitch"/>` +
      `<feComponentTransfer>` +
      `<feFuncR type="linear" slope="${strength}" intercept="${(1 - strength) * 0.92}"/>` +
      `<feFuncG type="linear" slope="${strength}" intercept="${(1 - strength) * 0.92}"/>` +
      `<feFuncB type="linear" slope="${strength}" intercept="${(1 - strength) * 0.91}"/>` +
      `<feFuncA type="linear" slope="0" intercept="${opacity}"/>` +
      `</feComponentTransfer>` +
      `</filter>` +
      `<rect width="100%" height="100%" filter="url(#p)"/>` +
      `</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  /* Keep noise soft so page content stays readable */
  root.style.setProperty('--plaster-noise-fine', noiseUri('0.85', 4, 0.28, 0.14));
  root.style.setProperty('--plaster-noise-coarse', noiseUri('0.35', 3, 0.2, 0.1));
  root.style.setProperty('--plaster-fine', `${Math.round(rand(160, 240))}px`);
  root.style.setProperty('--plaster-coarse', `${Math.round(rand(380, 560))}px`);
  root.style.setProperty('--plaster-x', `${rand(0, 100).toFixed(1)}%`);
  root.style.setProperty('--plaster-y', `${rand(0, 100).toFixed(1)}%`);
})();

/* ── PRODUCT DATA ── */
const PRODUCTS = [
  { id: 1, name: 'Monstera Deliciosa', category: 'tropical', price: 1200, badge: 'Best Seller', badgeClass: 'gold', img: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=435&auto=format&fit=crop', desc: 'Iconic split-leaf philodendron. A statement piece for any interior.' },
  { id: 2, name: 'Fiddle Leaf Fig', category: 'tropical', price: 3500, badge: 'New', badgeClass: '', img: 'https://images.unsplash.com/photo-1545239705-1564e58b9e4a?q=80&w=687&auto=format&fit=crop', desc: 'Architectural silhouette with dramatic, glossy fiddle-shaped leaves.' },
  { id: 3, name: 'Bird of Paradise', category: 'tropical', price: 2800, badge: '', badgeClass: '', img: 'https://plus.unsplash.com/premium_photo-1676316337647-65c35c441c9d?q=80&w=687&auto=format&fit=crop', desc: 'Bold, tropical foliage that transforms any corner into a lush retreat.' },
  { id: 4, name: 'White Phalaenopsis', category: 'orchid', price: 2200, badge: 'Sale', badgeClass: 'sale', img: 'https://images.unsplash.com/photo-1710524784485-5c77ae822ecc?q=80&w=1170&auto=format&fit=crop', desc: 'White phalaenopsis with cascading blooms.', oldPrice: 2800 },
  { id: 5, name: 'Pink Anthurium', category: 'orchid', price: 1800, badge: 'Premium', badgeClass: 'gold', img: 'https://images.unsplash.com/photo-1632906379687-355e24798632?q=80&w=1073&auto=format&fit=crop', desc: 'Velvety heart-shaped blooms in soft blush pink.' },
  { id: 6, name: 'Purple Dendrobium', category: 'orchid', price: 1600, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1755027619393-65e8de9c1b31?q=80&w=720&auto=format&fit=crop', desc: 'Rich lavender clusters that bloom abundantly with minimal care.' },
  { id: 7, name: 'Curated Succulent Set', category: 'succulent', price: 980, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=705&auto=format&fit=crop', desc: 'A sculptural trio of rare succulents in hand-thrown ceramic pots.' },
  { id: 8, name: 'Geometric Terrarium', category: 'succulent', price: 2400, badge: 'New', badgeClass: '', img: 'https://images.unsplash.com/photo-1604591251652-80897be7c245?q=80&w=735&auto=format&fit=crop', desc: 'Gold-framed geometric terrarium with handpicked succulents.' },
  { id: 9, name: 'Boston Fern', category: 'fern', price: 750, badge: '', badgeClass: '', img: 'https://plus.unsplash.com/premium_photo-1770836554434-75c5c88914ad?q=80&w=880&auto=format&fit=crop', desc: 'Lush, arching fronds that bring soft, romantic texture.' },
  { id: 10, name: 'Golden Pothos', category: 'fern', price: 450, badge: 'Popular', badgeClass: 'gold', img: 'https://images.unsplash.com/photo-1763060819223-b92eb0ca6e4d?q=80&w=1173&auto=format&fit=crop', desc: 'Trailing golden-green pothos for shelves and hangers.' },
  { id: 11, name: 'The Signature Bouquet', category: 'arrangement', price: 3800, badge: 'Luxury', badgeClass: 'gold', img: 'https://plus.unsplash.com/premium_photo-1674581211991-bd10fa5137bf?q=80&w=880&auto=format&fit=crop', desc: 'Our flagship arrangement — lush, seasonal blooms, hand-tied.' },
  { id: 12, name: 'Wild Garden Vase', category: 'arrangement', price: 2600, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=500&auto=format&fit=crop', desc: 'Loose meadow blooms and branches in a vase.' },
  { id: 13, name: 'Variegated Monstera', category: 'rare', price: 18000, badge: 'Rare', badgeClass: 'rare', img: 'https://images.unsplash.com/photo-1684738054008-6fcab69c48b0?w=500&auto=format&fit=crop', desc: 'Crown jewel of plant collectors. Striking white-marbled foliage.' },
  { id: 14, name: 'Black Bat Flower', category: 'rare', price: 8500, badge: 'Rare', badgeClass: 'rare', img: 'https://images.unsplash.com/photo-1666071016865-9a2c93dd880c?w=500&auto=format&fit=crop', desc: 'Extraordinarily exotic — dramatic black blooms with tendrils.' },
  { id: 15, name: 'Snake Plant Laurentii', category: 'tropical', price: 890, badge: 'Popular', badgeClass: '', img: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'Upright yellow-edged leaves. Handles low light and infrequent watering.' },
  { id: 16, name: "Bird's Nest Snake Plant", category: 'tropical', price: 650, badge: '', badgeClass: '', img: 'https://images.pexels.com/photos/7349006/pexels-photo-7349006.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'Compact Sansevieria Hahnii — a desk-size plant for bright, filtered light.' },
  { id: 17, name: 'Peace Lily', category: 'tropical', price: 1250, badge: 'New', badgeClass: '', img: 'https://images.pexels.com/photos/7862172/pexels-photo-7862172.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'Glossy foliage with white spathes. Prefers shade and steady moisture.' },
  { id: 18, name: 'Calathea Orbifolia', category: 'tropical', price: 1650, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=1200&auto=format&fit=crop', desc: 'Broad silver-striped leaves. Best in humid rooms away from direct sun.' },
  { id: 19, name: 'Spider Plant', category: 'fern', price: 520, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=1200&auto=format&fit=crop', desc: 'Arching variegated leaves that send out plantlets. Easy shelf plant.' },
  { id: 20, name: 'Neon Pothos', category: 'fern', price: 550, badge: '', badgeClass: '', img: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'Bright chartreuse trailing vines for shelves, hangers, or cabinets.' },
  { id: 21, name: 'Lace Aloe', category: 'succulent', price: 480, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=1200&auto=format&fit=crop', desc: 'Speckled rosette succulent. Water sparingly; bright light preferred.' },
  { id: 22, name: 'Columnar Cactus', category: 'succulent', price: 690, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop', desc: 'Tall ribbed cactus for sunny windowsills. Minimal weekly care.' },
  { id: 23, name: 'Ficus Ginseng', category: 'rare', price: 3200, badge: 'Featured', badgeClass: '', img: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1200&auto=format&fit=crop', desc: 'Sculptural bonsai-form ficus with thick roots and dense canopy.' },
  { id: 24, name: 'Rubber Plant', category: 'tropical', price: 1450, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop', desc: 'Thick waxy leaves on a clean stem. Bright, indirect light indoors.' },
  { id: 25, name: 'Dracaena Marginata', category: 'tropical', price: 1350, badge: 'New', badgeClass: '', img: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Slender red-edged leaves on a tall cane. Good for bright corners.' },
  { id: 26, name: 'Areca Palm', category: 'tropical', price: 2100, badge: '', badgeClass: '', img: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Feathery fronds that soften living rooms. Prefers bright, filtered light.' },
  { id: 27, name: 'Chinese Money Plant', category: 'tropical', price: 780, badge: 'Popular', badgeClass: 'gold', img: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Round coin-like leaves on upright stems. Easy desk or shelf plant.' },
  { id: 28, name: 'String of Pearls', category: 'succulent', price: 620, badge: '', badgeClass: '', img: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Trailing bead-like foliage for hanging pots. Water sparingly.' },
  { id: 29, name: 'Haworthia Cluster', category: 'succulent', price: 540, badge: '', badgeClass: '', img: 'https://images.pexels.com/photos/1022922/pexels-photo-1022922.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Compact striped rosettes. Ideal for sunny windowsills.' },
  { id: 30, name: 'Soft Fern Basket', category: 'fern', price: 890, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1400&auto=format&fit=crop', desc: 'Full, feathery foliage in a clean pot. Likes humidity and shade.' },
  { id: 31, name: 'Staghorn Fern', category: 'fern', price: 1750, badge: 'Featured', badgeClass: '', img: 'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Lush layered fronds with rich texture. A sculptural greenery piece.' },
  { id: 32, name: 'Blush Orchid Spray', category: 'orchid', price: 1950, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1710524784485-5c77ae822ecc?q=80&w=1400&auto=format&fit=crop', desc: 'White orchid blooms on graceful stems. Gift-ready potting.' },
  { id: 33, name: 'Yellow Dancing Orchid', category: 'orchid', price: 1680, badge: 'New', badgeClass: '', img: 'https://images.pexels.com/photos/1084189/pexels-photo-1084189.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Bright oncidium sprays with lively yellow petals.' },
  { id: 34, name: 'Classic White Bouquet', category: 'arrangement', price: 2900, badge: '', badgeClass: '', img: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Clean white blooms hand-tied for tables, vows, and quiet rooms.' },
  { id: 35, name: 'Meadow Wildflower Vase', category: 'arrangement', price: 2450, badge: 'Popular', badgeClass: 'gold', img: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Loose seasonal wildflowers in a studio vase. Soft and informal.' },
  { id: 36, name: 'Eucalyptus Bloom Bundle', category: 'arrangement', price: 2200, badge: '', badgeClass: '', img: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Studio greenery set with lasting foliage — clean table arrangement.' },
  { id: 37, name: 'Alocasia Amazonica', category: 'rare', price: 2800, badge: 'Rare', badgeClass: 'rare', img: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=1400', desc: 'Dramatic sculptural leaves. Loves humidity and bright shade.' },
  { id: 38, name: 'Velvet Leaf Anthurium', category: 'rare', price: 4200, badge: 'Rare', badgeClass: 'rare', img: 'https://images.unsplash.com/photo-1632906379687-355e24798632?q=80&w=1400&auto=format&fit=crop', desc: 'Glossy heart-shaped spathes with bold foliage. Collector favorite.' },
  { id: 39, name: 'Sweetheart Hoya', category: 'tropical', price: 720, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1400&auto=format&fit=crop', desc: 'Compact leafy plant in a clean pot. Easy gift for shelves.' },
];

/* ── CART STATE ── */
let cart = JSON.parse(localStorage.getItem('lb_cart') || '[]');
function saveCart() { localStorage.setItem('lb_cart', JSON.stringify(cart)); }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

/* ── TOAST ── */
const toastContainer = document.getElementById('toast-container');
function showToast(msg, type = 'success', duration = 3200) {
  if (!toastContainer) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', info: 'i' };
  t.innerHTML = `<span class="toast-icon">${icons[type] || '✓'}</span><span class="toast-msg">${msg}</span>`;
  toastContainer.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add('show')); });
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, duration);
}

/* ── CART BADGE UPDATE ── */
function updateBadges() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.classList.toggle('hidden', count === 0);
  });
}

/* ── ADD TO CART ── */
function addToCart(id, qty = 1) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty += qty; }
  else { cart.push({ ...product, qty }); }
  saveCart();
  updateBadges();
  updateCartDrawer();
  showToast(`<strong>${product.name}</strong> added to cart`, 'success');
  animateCartBtn();
}

function animateCartBtn() {
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
  });
}

/* ── CART DRAWER ── */
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.querySelector('.cart-drawer-overlay');

function openCart() {
  if (cartDrawer) { cartDrawer.classList.add('open'); }
  if (cartOverlay) { cartOverlay.classList.add('show'); }
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (cartDrawer) { cartDrawer.classList.remove('open'); }
  if (cartOverlay) { cartOverlay.classList.remove('show'); }
  document.body.style.overflow = '';
}

function updateCartDrawer() {
  const itemsEl = document.querySelector('.cart-items');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon"><i class="fa-solid fa-basket-shopping" aria-hidden="true"></i></div>
        <div class="cart-empty-title">Your cart is empty</div>
        <div class="cart-empty-sub">Discover our botanical collection and find something you'll love.</div>
        <a href="products.html" class="btn btn-primary" style="margin-top:1.5rem" onclick="closeCart()">Browse Plants</a>
      </div>`;
    document.querySelectorAll('.cart-subtotal-val, .cart-total-val').forEach(el => el.textContent = '₱0');
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₱${item.price.toLocaleString()}</div>
        <div class="cart-qty-wrap">
          <button class="cart-qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove">✕</button>
    </div>`).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 2500 ? 0 : 150;
  const total = subtotal + shipping;

  document.querySelectorAll('.cart-subtotal-val').forEach(el => el.textContent = `₱${subtotal.toLocaleString()}`);
  document.querySelectorAll('.cart-shipping-val').forEach(el => el.textContent = shipping === 0 ? 'Free' : `₱${shipping}`);
  document.querySelectorAll('.cart-total-val').forEach(el => el.textContent = `₱${total.toLocaleString()}`);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { cart = cart.filter(i => i.id !== id); }
  saveCart();
  updateBadges();
  updateCartDrawer();
  updateCheckoutPage();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateBadges();
  updateCartDrawer();
  updateCheckoutPage();
  showToast('Item removed from cart', 'info');
}

function clearCart() {
  cart = [];
  saveCart();
  updateBadges();
  updateCartDrawer();
  updateCheckoutPage();
  showToast('Cart cleared', 'info');
}

/* ── PAGE TRANSITIONS (skip loader on internal navigation) ── */
const PAGE_NAV_KEY = 'lb_page_nav';
const PAGE_TRANSITION_MS = 550;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function markInternalNavigation() {
  try { sessionStorage.setItem(PAGE_NAV_KEY, '1'); }
  catch (_) { /* ignore */ }
}

function consumeInternalNavigation() {
  try {
    if (sessionStorage.getItem(PAGE_NAV_KEY) === '1') {
      sessionStorage.removeItem(PAGE_NAV_KEY);
      return true;
    }
  } catch (_) { /* ignore */ }
  return document.documentElement.classList.contains('lb-skip-loader');
}

function isInternalPageLink(anchor) {
  if (!anchor || !anchor.href) return false;
  if (anchor.target && anchor.target !== '_self') return false;
  if (anchor.hasAttribute('download')) return false;
  if (anchor.getAttribute('href')?.startsWith('#')) return false;

  let url;
  try { url = new URL(anchor.href, window.location.href); }
  catch (_) { return false; }

  if (url.origin !== window.location.origin) return false;
  if (!/\.html?$/i.test(url.pathname) && !url.pathname.endsWith('/')) return false;

  const current = window.location.pathname.replace(/\/$/, '') + window.location.search + window.location.hash;
  const next = url.pathname.replace(/\/$/, '') + url.search + url.hash;
  return current !== next;
}

let pageNavigating = false;

function navigateWithTransition(href) {
  if (!href || pageNavigating) return;
  pageNavigating = true;
  markInternalNavigation();

  if (prefersReducedMotion()) {
    window.location.href = href;
    return;
  }

  const veil = document.querySelector('.page-transition');
  if (!veil) {
    window.location.href = href;
    return;
  }

  veil.classList.add('is-leaving');
  window.setTimeout(() => {
    window.location.href = href;
  }, PAGE_TRANSITION_MS);
}

function initPageTransitions() {
  // Enter animation after an internal navigation
  if (document.documentElement.classList.contains('lb-skip-loader')) {
    const veil = document.querySelector('.page-transition');
    document.querySelector('.hero-bg')?.classList.add('loaded');
    document.getElementById('loader')?.remove();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!veil || prefersReducedMotion()) {
          document.documentElement.classList.remove('lb-skip-loader');
          veil?.remove();
          return;
        }
        veil.classList.add('is-entering');
        window.setTimeout(() => {
          document.documentElement.classList.remove('lb-skip-loader');
          veil.classList.remove('is-entering');
          veil.style.transform = '';
        }, PAGE_TRANSITION_MS);
      });
    });
  }

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href]');
    if (!anchor || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!isInternalPageLink(anchor)) return;

    e.preventDefault();
    navigateWithTransition(anchor.href);
  });
}

/* ── LOADER (removed on all loads, including refresh) ── */
function initLoader() {
  consumeInternalNavigation();
  document.getElementById('loader')?.remove();
  document.querySelector('.hero-bg')?.classList.add('loaded');
}

/* ── SCROLL PROGRESS ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100) + '%';
  }, { passive: true });
}

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.nav-overlay');
  const backTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open', open);
    overlay?.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  overlay?.addEventListener('click', closeMobileNav);

  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileNav);
  });

  function closeMobileNav() {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Cart button opens cart
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', openCart);
  });

  cartOverlay?.addEventListener('click', closeCart);
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);

  // Theme toggle — circular reveal + desktop/mobile sync
  const allThemeBtns = document.querySelectorAll('.theme-toggle');
  if (allThemeBtns.length) {
    const sunIcon  = '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
    const moonIcon = '<i class="fa-regular fa-moon" aria-hidden="true"></i>';
    const THEME_MS = 750;
    let themeBusy = false;

    const syncThemeControls = (dark) => {
      allThemeBtns.forEach(btn => {
        const hasLabel = !!btn.querySelector('.theme-toggle-label') || btn.classList.contains('theme-toggle-mobile');
        if (hasLabel && btn.classList.contains('theme-toggle-mobile')) {
          btn.innerHTML = (dark ? sunIcon : moonIcon) +
            ` <span class="theme-toggle-label">${dark ? 'Light Mode' : 'Dark Mode'}</span>`;
        } else {
          btn.innerHTML = dark ? sunIcon : moonIcon;
        }
        btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      });
    };

    const applyTheme = (dark) => {
      document.body.classList.toggle('dark-mode', dark);
      document.documentElement.classList.toggle('lb-dark-boot', dark);
      syncThemeControls(dark);
      try {
        localStorage.setItem('lb_theme', dark ? 'dark' : 'light');
      } catch (_) { /* ignore */ }
    };

    const revealOrigin = (btn) => {
      const rect = btn.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    const maxRevealRadius = (x, y) => Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const prefersReducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runCircularReveal = async (btn, nextDark) => {
      const { x, y } = revealOrigin(btn);
      const endRadius = maxRevealRadius(x, y);

      const transition = document.startViewTransition(() => {
        applyTheme(nextDark);
      });

      const safety = new Promise((resolve) => {
        window.setTimeout(resolve, THEME_MS + 250);
      });

      try {
        await transition.ready;
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: THEME_MS,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
        await Promise.race([transition.finished, safety]);
      } catch (_) {
        applyTheme(nextDark);
      }
    };

    const toggleTheme = (btn) => {
      if (themeBusy) return;
      const nextDark = !document.body.classList.contains('dark-mode');

      if (prefersReducedMotion() || typeof document.startViewTransition !== 'function') {
        applyTheme(nextDark);
        return;
      }

      themeBusy = true;
      runCircularReveal(btn, nextDark)
        .catch(() => { applyTheme(nextDark); })
        .finally(() => { themeBusy = false; });
    };

    const saved = (() => {
      try { return localStorage.getItem('lb_theme'); }
      catch (_) { return null; }
    })();
    applyTheme(saved === 'dark');

    allThemeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme(btn);
      });
    });
  }

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Cart drawer footer buttons
  document.querySelector('.btn-clear-cart')?.addEventListener('click', () => {
    if (confirm('Clear all items from cart?')) clearCart();
  });
  document.querySelector('.btn-to-checkout')?.addEventListener('click', () => {
    closeCart();
    navigateWithTransition('checkout.html');
  });
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline || window.matchMedia('(pointer: coarse)').matches) {
    if (dot) dot.style.display = 'none';
    if (outline) outline.style.display = 'none';
    document.body.style.cursor = 'auto';
    document.querySelectorAll('button, a, [role="button"]').forEach(el => el.style.cursor = 'auto');
    return;
  }
  let mx = 0, my = 0, ox = 0, oy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`; });
  function animateOutline() {
    ox += (mx - ox) * 0.12;
    oy += (my - oy) * 0.12;
    outline.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  document.querySelectorAll('a, button, [role="button"], .product-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => { outline.style.width = '56px'; outline.style.height = '56px'; outline.style.background = 'rgba(61,90,62,0.08)'; });
    el.addEventListener('mouseleave', () => { outline.style.width = '36px'; outline.style.height = '36px'; outline.style.background = 'transparent'; });
  });
}

/* ── REVEAL ON SCROLL (stagger as items enter — not all at once) ── */
function initReveal() {
  const els = [...document.querySelectorAll('.reveal, .reveal-left, .reveal-right')];
  if (!els.length) return;

  let batch = [];
  let batchTimer = null;

  const flushBatch = () => {
    const items = batch.splice(0);
    batchTimer = null;
    items.forEach((el, i) => {
      if (el.classList.contains('revealed')) return;
      /* Keep existing delay-* classes; only add stagger when none is set */
      if (!el.style.getPropertyValue('--reveal-delay') && ![...el.classList].some(c => /^delay-\d$/.test(c))) {
        el.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 70}ms`);
      }
      requestAnimationFrame(() => el.classList.add('revealed'));
    });
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      batch.push(e.target);
      if (batchTimer) clearTimeout(batchTimer);
      /* Group near-simultaneous entries, then stagger within the group */
      batchTimer = setTimeout(flushBatch, 40);
    });
  }, {
    threshold: 0.12,
    /* Reveal a bit before fully in view, but not the whole page ahead */
    rootMargin: '0px 0px -12% 0px'
  });

  els.forEach(el => {
    if (el.classList.contains('revealed')) return;
    obs.observe(el);
  });
}

/** Re-run scroll reveal for cards shown after a filter change. */
function observeReveal(els) {
  const list = [...els].filter(el => el && !el.classList.contains('revealed'));
  if (!list.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      e.target.classList.add('revealed');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  list.forEach((el, i) => {
    el.classList.remove('revealed');
    el.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 60}ms`);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.88 && r.bottom > 40) {
      requestAnimationFrame(() => el.classList.add('revealed'));
    } else {
      obs.observe(el);
    }
  });
}

/* ── COUNTER ANIMATION ── */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const suffixEl = el.querySelector('span');
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(target, current + step);
        el.childNodes[0].textContent = (target > 100 ? Math.round(current).toLocaleString() : Math.round(current));
        if (suffixEl) suffixEl.textContent = suffix;
        if (current >= target) clearInterval(timer);
      }, 20);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

/* ── TESTIMONIAL CAROUSEL ── */
function initCarousel() {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (!track) return;
  let current = 0;
  const cards = track.querySelectorAll('.testimonial-card');
  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    const card = cards[current];
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  // Auto-advance
  let interval = setInterval(() => goTo(current + 1), 5000);
  track.addEventListener('mouseenter', () => clearInterval(interval));
  track.addEventListener('mouseleave', () => { interval = setInterval(() => goTo(current + 1), 5000); });
}

/* ── PRODUCT FILTER TABS (active state only; products.html animates the grid) ── */
function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });
}

/* ── PRODUCT CARD INTERACTIONS ── */
function initProductCards() {
  document.querySelectorAll('.product-card').forEach(card => {
    const addBtns = card.querySelectorAll('.product-add');
    const quickViewBtns = card.querySelectorAll('.product-overlay-btn:first-child');
    const productId = parseInt(card.dataset.productId || 0);

    addBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (productId) {
          addToCart(productId);
        } else {
          const nameEl = card.querySelector('.product-name');
          const priceEl = card.querySelector('.product-price');
          const imgEl = card.querySelector('img');
          if (nameEl && priceEl) {
            // Fix: get only the first text node value to avoid including old-price text
            let priceText = '';
            priceEl.childNodes.forEach(node => {
              if (node.nodeType === Node.TEXT_NODE) {
                priceText += node.textContent;
              }
            });
            // Clean and parse only the first numeric value found
            const priceMatch = priceText.replace(/[₱,\s]/g, '').match(/^(\d+)/);
            const price = priceMatch ? parseInt(priceMatch[1]) : 1000;
            // Try to find matching product by name in PRODUCTS array
            const productName = nameEl.textContent.trim();
            const matchedProduct = PRODUCTS.find(p => p.name === productName);
            const finalPrice = matchedProduct ? matchedProduct.price : price;
            const mockProduct = {
              id: matchedProduct ? matchedProduct.id : (productName + '_' + finalPrice),
              name: productName,
              price: finalPrice,
              img: imgEl?.src || '',
              category: card.querySelector('.product-category')?.textContent || ''
            };
            const existing = cart.find(i => i.id === mockProduct.id || i.name === mockProduct.name);
            if (existing) { existing.qty++; } else { cart.push({ ...mockProduct, qty: 1 }); }
            saveCart();
            updateBadges(); 
            updateCartDrawer();
            showToast(`<strong>${mockProduct.name}</strong> added to cart`, 'success');
            animateCartBtn();
          }
        }
      });
    });

    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nameEl = card.querySelector('.product-name');
        const priceEl = card.querySelector('.product-price');
        const imgEl = card.querySelector('img');
        const catEl = card.querySelector('.product-category');
        const descEl = card.querySelector('.product-desc');
        openQuickView({
          name: nameEl?.textContent || '',
          price: priceEl?.textContent || '',
          img: imgEl?.src || '',
          category: catEl?.textContent || '',
          desc: descEl?.textContent || '',
          cardRef: card
        });
      });
    });
  });
}

/* ── QUICK VIEW MODAL ── */
let quickViewProduct = null;
let quickViewQty = 1;
let quickViewImgToken = 0;

/** Uncropped, larger source for Quick View (card thumbs still use fit=crop). */
function fullPlantImg(url) {
  if (!url) return url;
  try {
    const u = new URL(url, window.location.href);
    const host = u.hostname;
    if (host.includes('unsplash.com')) {
      u.searchParams.delete('crop');
      /* fit=max scales inside bounds without cropping */
      u.searchParams.set('fit', 'max');
      u.searchParams.set('w', '1400');
      u.searchParams.set('h', '1400');
      u.searchParams.set('q', '80');
      u.searchParams.set('auto', 'format');
      return u.toString();
    }
    if (host.includes('pexels.com')) {
      u.searchParams.set('w', '1400');
      return u.toString();
    }
  } catch (e) { /* keep original */ }
  return url;
}

function openQuickView(product) {
  quickViewProduct = product;
  quickViewQty = 1;
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const img = modal.querySelector('.modal-img');
  const token = ++quickViewImgToken;
  const thumbSrc = product.img || '';
  const fullSrc = fullPlantImg(product.img);

  /* Text first — never leave previous plant's copy visible */
  modal.querySelector('.modal-category').textContent = product.category;
  modal.querySelector('.modal-title').textContent = product.name;
  modal.querySelector('.modal-price').textContent = product.price;
  modal.querySelector('.modal-desc').textContent = product.desc;
  modal.querySelector('.modal-qty-num').textContent = quickViewQty;
  img.alt = product.name;

  /*
   * Show this plant's thumb immediately so the previous plant never flashes,
   * then swap to the uncropped full image when it finishes loading.
   */
  img.classList.add('is-loading');
  img.src = thumbSrc || fullSrc;

  if (fullSrc && fullSrc !== thumbSrc) {
    const preload = new Image();
    preload.onload = () => {
      if (token !== quickViewImgToken) return;
      img.src = fullSrc;
      img.classList.remove('is-loading');
    };
    preload.onerror = () => {
      if (token !== quickViewImgToken) return;
      img.classList.remove('is-loading');
    };
    preload.src = fullSrc;
  } else {
    img.classList.remove('is-loading');
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  quickViewImgToken += 1; /* cancel any in-flight full-image swap */
  const img = modal.querySelector('.modal-img');
  if (img) {
    img.removeAttribute('src');
    img.classList.remove('is-loading');
  }
}

function initQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;
  modal.querySelector('.modal-backdrop')?.addEventListener('click', closeQuickView);
  modal.querySelector('.modal-close')?.addEventListener('click', closeQuickView);
  modal.querySelector('.modal-qty-btn.minus')?.addEventListener('click', () => {
    if (quickViewQty > 1) { quickViewQty--; modal.querySelector('.modal-qty-num').textContent = quickViewQty; }
  });
  modal.querySelector('.modal-qty-btn.plus')?.addEventListener('click', () => {
    quickViewQty++;
    modal.querySelector('.modal-qty-num').textContent = quickViewQty;
  });
  modal.querySelector('.btn-modal-add')?.addEventListener('click', () => {
    if (!quickViewProduct) return;
    // Try to find product in PRODUCTS array by name for accurate price
    const matchedProduct = PRODUCTS.find(p => p.name === quickViewProduct.name);
    const priceNum = matchedProduct ? matchedProduct.price : (parseInt(String(quickViewProduct.price).replace(/[^0-9]/g, '')) || 1000);
    const productId = matchedProduct ? matchedProduct.id : (quickViewProduct.name + '_' + priceNum);
    const mockProduct = {
      id: productId,
      name: quickViewProduct.name,
      price: priceNum,
      img: quickViewProduct.img,
      category: quickViewProduct.category
    };
    const existing = cart.find(i => i.id === mockProduct.id || i.name === mockProduct.name);
    if (existing) { existing.qty += quickViewQty; } else { cart.push({ ...mockProduct, qty: quickViewQty }); }
    saveCart(); updateBadges(); updateCartDrawer();
    showToast(`<strong>${mockProduct.name}</strong> added to cart`, 'success');
    animateCartBtn();
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });
}

/* ── NEWSLETTER FORM ── */
function initNewsletterForm() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input?.value || !input.value.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return;
      }
      showToast('You are on the studio list.', 'success', 4000);
      input.value = '';
    });
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group?.classList.add('has-error');
        valid = false;
      } else {
        group?.classList.remove('has-error');
      }
    });

    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value && !emailField.value.includes('@')) {
      emailField.closest('.form-group')?.classList.add('has-error');
      valid = false;
    }

    if (!valid) { showToast('Please fill all required fields correctly', 'error'); return; }

    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    await new Promise(r => setTimeout(r, 1800));

    btn.textContent = origText;
    btn.disabled = false;
    form.reset();
    showToast('Message sent. We usually reply within a day.', 'success', 5000);
  });

  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => { if (field.value.trim()) field.closest('.form-group')?.classList.remove('has-error'); });
  });
}

/* ── FEEDBACK FORM ── */
function initFeedbackForm() {
  // Star rating buttons (new-style)
  const starBtns = document.querySelectorAll('.star-btn');
  let selectedRating = 0;
  if (starBtns.length) {
    const hints = ['', '1 star — Poor', '2 stars — Fair', '3 stars — Good', '4 stars — Great', '5 stars — Excellent'];
    const hintEl = document.getElementById('star-hint-text') || document.querySelector('.star-hint');
    const paintStars = (count) => {
      starBtns.forEach((b, j) => b.classList.toggle('active', j < count));
    };
    const ratingWrap = starBtns[0]?.closest('.star-rating') || starBtns[0]?.parentElement;
    starBtns.forEach((btn, i) => {
      // Preview fill only — never rewrite hint text on hover (that shifted layout)
      btn.addEventListener('pointerenter', () => paintStars(i + 1));
      btn.addEventListener('click', () => {
        selectedRating = i + 1;
        const ratingInput = document.getElementById('rating-val');
        if (ratingInput) ratingInput.value = selectedRating;
        paintStars(selectedRating);
        if (hintEl) hintEl.textContent = hints[selectedRating] || '';
        showToast(`Rated ${selectedRating} star${selectedRating !== 1 ? 's' : ''}.`, 'info');
      });
    });
    if (ratingWrap) {
      ratingWrap.addEventListener('pointerleave', () => paintStars(selectedRating));
    }
  }

  // Old Netlify-style star rating (reverse RTL CSS approach)
  const oldStars = document.querySelectorAll('.star-rating input[type="radio"]');
  const hintEl = document.querySelector('.star-hint');
  const hints = { 1: '1 Star — Poor', 2: '2 Stars — Fair', 3: '3 Stars — Good', 4: '4 Stars — Great', 5: '5 Stars — Excellent' };
  oldStars.forEach(star => {
    star.addEventListener('change', () => { if (hintEl) hintEl.textContent = hints[star.value] || ''; });
  });

  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async e => {
      e.preventDefault();

      // Validation
      if (selectedRating < 1) { showToast('Please select a star rating', 'error'); return; }
      const nameField    = feedbackForm.querySelector('#feedback-name, [name="name"]');
      const commentField = feedbackForm.querySelector('#feedback-comment, [name="comment"], textarea');
      if (nameField && !nameField.value.trim()) { showToast('Please enter your name', 'error'); return; }
      if (commentField && !commentField.value.trim()) { showToast('Please share your thoughts', 'error'); return; }

      const btn  = feedbackForm.querySelector('button[type="submit"]');
      const orig = btn?.innerHTML;
      if (btn) { btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting…'; btn.disabled = true; }

      // Sync hidden rating input with selected star value
      const ratingInput = document.getElementById('rating-val');
      if (ratingInput) ratingInput.value = selectedRating;

      // Build FormData for Netlify
      const formData = new FormData(feedbackForm);

      let netlifyOk = false;
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
        netlifyOk = res.ok;
      } catch (err) {
        console.warn('Netlify submit error:', err);
      }

      // Always save to shared storage (cross-device sync) + localStorage fallback
      const nameVal    = nameField?.value.trim() || 'Anonymous';
      const commentVal = commentField?.value.trim() || '';
      const newReview = {
        name:    nameVal,
        rating:  selectedRating,
        comment: commentVal,
        date:    new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
        ts:      Date.now()
      };

      // Save to shared storage for cross-device sync
      try {
        let existing = [];
        try {
          const stored = await window.storage.get('lb_reviews', true);
          if (stored && stored.value) existing = JSON.parse(stored.value);
        } catch (e) { /* key doesn't exist yet */ }
        existing.unshift(newReview);
        await window.storage.set('lb_reviews', JSON.stringify(existing.slice(0, 50)), true);
      } catch (storageErr) {
        // Fallback to localStorage if storage API unavailable
        const fallback = JSON.parse(localStorage.getItem('lb_reviews') || '[]');
        fallback.unshift(newReview);
        localStorage.setItem('lb_reviews', JSON.stringify(fallback.slice(0, 20)));
      }

      // Reset form
      if (btn) { btn.innerHTML = orig; btn.disabled = false; }
      feedbackForm.reset();
      selectedRating = 0;
      starBtns.forEach(b => b.classList.remove('active'));
      const hintEl2 = document.getElementById('star-hint-text');
      if (hintEl2) hintEl2.textContent = '';

      showToast(
        netlifyOk
          ? 'Thank you — feedback submitted.'
          : 'Feedback saved on this device.',
        'success', 4000
      );
      renderReviews();
    });
  }

  renderReviews();
}

async function renderReviews() {
  const list = document.querySelector('.reviews-list');
  if (!list) return;

  // Try shared storage first (cross-device), fallback to localStorage
  let reviews = [];
  try {
    const stored = await window.storage.get('lb_reviews', true);
    if (stored && stored.value) reviews = JSON.parse(stored.value);
  } catch (e) {
    reviews = JSON.parse(localStorage.getItem('lb_reviews') || '[]');
  }
  const defaultReviews = [
    // Demo-only sample rows for the feedback UI — not real customer reviews
    { name: 'Sample note',  rating: 5, comment: 'Portfolio demo entry. Replace with real feedback when you collect it.', date: 'May 15, 2025' },
    { name: 'Sample note', rating: 4, comment: 'Another demo row so the feedback list is not empty in this static build.', date: 'April 28, 2025' },
    { name: 'Sample note',      rating: 5, comment: 'Use the form above to leave a real note for the studio.', date: 'March 10, 2025' },
  ];
  const all = [...reviews, ...defaultReviews].slice(0, 10);

  const ratingLabel = { 1:'Poor', 2:'Fair', 3:'Good', 4:'Great', 5:'Excellent' };

  list.innerHTML = all.map(r => {
    const initials = r.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const filled   = '★'.repeat(r.rating);
    const empty    = '☆'.repeat(5 - r.rating);
    const label    = ratingLabel[r.rating] || '';
    return `
    <div class="review-card reveal">
      <div class="review-card-header">
        <div class="review-avatar">${initials}</div>
        <div style="flex:1;min-width:0;">
          <div class="review-author-name">${escapeHtml(r.name)}</div>
          <div class="review-date">${r.date}</div>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <div class="review-stars">${filled}${empty}</div>
          <div style="font-size:0.7rem;color:var(--clr-accent);letter-spacing:0.08em;margin-top:0.15rem;">${label}</div>
        </div>
      </div>
      <p class="review-text">"${escapeHtml(r.comment)}"</p>
    </div>`;
  }).join('');
  initReveal();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/* ── CHECKOUT PAGE ── */
function updateCheckoutPage() {
  const checkoutItems = document.querySelector('.checkout-items');
  if (!checkoutItems) return;

  if (cart.length === 0) {
    const mainEl = document.querySelector('.checkout-main');
    if (mainEl) {
      mainEl.innerHTML = `
        <div class="checkout-empty">
          <div class="checkout-empty-icon"><i class="fa-solid fa-basket-shopping" aria-hidden="true"></i></div>
          <div class="checkout-empty-title">Your cart is empty</div>
          <div class="checkout-empty-sub">Add plants or florals from the shop to continue.</div>
          <a href="products.html" class="btn btn-primary" style="margin-top:1rem">Browse shop</a>
        </div>`;
    }
    return;
  }

  checkoutItems.innerHTML = cart.map(item => `
    <div class="checkout-item" data-id="${item.id}">
      <img class="checkout-item-img" src="${item.img}" alt="${item.name}" />
      <div>
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-cat">${item.category || ''}</div>
        <div class="cart-qty-wrap">
          <button class="cart-qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div style="text-align:right">
        <div class="checkout-item-subtotal">₱${(item.price * item.qty).toLocaleString()}</div>
        <div class="checkout-item-price" style="font-size:0.78rem;color:var(--clr-text-lt);margin-top:0.2rem">₱${item.price.toLocaleString()} each</div>
        <button class="checkout-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
      </div>
    </div>`).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 2500 ? 0 : 150;
  const total = subtotal + shipping;
  document.querySelectorAll('.checkout-subtotal-val').forEach(el => el.textContent = `₱${subtotal.toLocaleString()}`);
  document.querySelectorAll('.checkout-shipping-val').forEach(el => el.textContent = shipping === 0 ? 'FREE' : `₱${shipping}`);
  document.querySelectorAll('.checkout-total-val').forEach(el => el.textContent = `₱${total.toLocaleString()}`);
  document.querySelectorAll('.checkout-item-count').forEach(el => el.textContent = getCartCount());
}

/* ── ORDER CONFIRMATION ── */
function initOrderModal() {
  const proceedBtn = document.querySelector('.btn-proceed-checkout');
  const modal = document.getElementById('order-modal');
  if (!proceedBtn || !modal) return;

  proceedBtn.addEventListener('click', async () => {
    if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Show loading state
    modal.querySelector('.order-loading').style.display = 'flex';
    modal.querySelector('.order-success').style.display = 'none';

    await new Promise(r => setTimeout(r, 2500));

    // Generate order number
    const orderNum = 'LB-' + Date.now().toString().slice(-6);

    // Save to order history
    const orders = JSON.parse(localStorage.getItem('lb_orders') || '[]');
    orders.unshift({ orderNum, items: [...cart], total: getCartTotal(), date: new Date().toISOString() });
    localStorage.setItem('lb_orders', JSON.stringify(orders.slice(0, 20)));

    // Show success
    modal.querySelector('.order-loading').style.display = 'none';
    modal.querySelector('.order-success').style.display = 'block';
    modal.querySelector('.order-num').textContent = `Order #${orderNum}`;

    // Clear cart
    cart = [];
    saveCart();
    updateBadges();
    updateCartDrawer();
  });

  modal.querySelector('.btn-close-order')?.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    navigateWithTransition('index.html');
  });

  modal.querySelector('.order-modal-backdrop')?.addEventListener('click', () => {
    if (modal.querySelector('.order-success').style.display !== 'none') {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ── ABOUT: PURPOSE SWITCHER + VALUES ACCORDION ── */
const PURPOSE_COPY = {
  mission: {
    kicker: 'What we do',
    heading: 'Mission',
    copy: 'Bring well-chosen plants and florals into Philippine homes, workplaces, and celebrations — with clear care and honest pricing in pesos.',
  },
  vision: {
    kicker: 'Where we aim',
    heading: 'Vision',
    copy: 'Be a trusted Cebu botanical studio known for living work that fits the room, not just the photograph.',
  },
};

function initPurposeSwitcher() {
  const root = document.querySelector('[data-purpose-switcher]');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panel = root.querySelector('#purpose-panel');
  const body = root.querySelector('.purpose-panel-body');
  const kickerEl = root.querySelector('[data-purpose-kicker]');
  const headingEl = root.querySelector('[data-purpose-heading]');
  const copyEl = root.querySelector('[data-purpose-copy]');
  if (!tabs.length || !panel || !body) return;

  let activeKey = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.purpose || 'mission';
  let busy = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FADE_MS = reduceMotion ? 0 : 220;

  const writeCopy = (data, tab) => {
    if (kickerEl) kickerEl.textContent = data.kicker;
    if (headingEl) headingEl.textContent = data.heading;
    if (copyEl) copyEl.textContent = data.copy;
    panel.setAttribute('aria-labelledby', tab.id);
  };

  const activate = (tab, { focus = false } = {}) => {
    const key = tab.dataset.purpose;
    const data = PURPOSE_COPY[key];
    if (!data || key === activeKey || busy) return;

    busy = true;
    activeKey = key;

    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', selected ? 'true' : 'false');
      item.tabIndex = selected ? 0 : -1;
    });

    panel.classList.add('is-fading');

    window.setTimeout(() => {
      writeCopy(data, tab);
      requestAnimationFrame(() => {
        panel.classList.remove('is-fading');
        busy = false;
      });
    }, FADE_MS);

    if (focus) tab.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      const current = tabs.indexOf(tab);
      let next = -1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next < 0) return;
      event.preventDefault();
      activate(tabs[next], { focus: true });
    });
  });
}

function initValuesAccordion() {
  const root = document.querySelector('[data-values-accordion]');
  if (!root) return;

  root.querySelectorAll('.value-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.value-item');
      if (!item) return;
      const willOpen = !item.classList.contains('is-open');

      root.querySelectorAll('.value-item').forEach((other) => {
        const otherBtn = other.querySelector('.value-trigger');
        other.classList.remove('is-open');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── SERVICES EXPLORER ── */
function initServiceCarousel() {
  const root = document.querySelector('[data-service-carousel]');
  if (!root) return;

  const track = root.querySelector('[data-svc-track]');
  const slides = Array.from(root.querySelectorAll('[data-svc-slide]'));
  const prevBtn = root.querySelector('[data-svc-prev]');
  const nextBtn = root.querySelector('[data-svc-next]');
  const dotsWrap = root.querySelector('[data-svc-dots]');
  if (!track || slides.length < 2) return;

  let index = 0;
  let pointerId = null;
  let startX = 0;
  let deltaX = 0;
  let dragging = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'service-carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to service ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap?.appendChild(dot);
    return dot;
  });

  const apply = () => {
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const goTo = (next) => {
    index = ((next % slides.length) + slides.length) % slides.length;
    if (reduceMotion) track.style.transition = 'none';
    else track.style.transition = '';
    apply();
  };

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  });

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    deltaX = 0;
    dragging = true;
    track.style.transition = 'none';
    track.setPointerCapture?.(pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragging || event.pointerId !== pointerId) return;
    deltaX = event.clientX - startX;
    const width = track.clientWidth || 1;
    const offset = (-index * 100) + (deltaX / width) * 100;
    track.style.transform = `translate3d(${offset}%, 0, 0)`;
  };

  const onPointerUp = (event) => {
    if (!dragging || event.pointerId !== pointerId) return;
    dragging = false;
    track.style.transition = reduceMotion ? 'none' : '';
    const threshold = Math.min(80, (track.clientWidth || 300) * 0.18);
    if (deltaX > threshold) goTo(index - 1);
    else if (deltaX < -threshold) goTo(index + 1);
    else apply();
    pointerId = null;
    deltaX = 0;
  };

  track.addEventListener('pointerdown', onPointerDown);
  track.addEventListener('pointermove', onPointerMove);
  track.addEventListener('pointerup', onPointerUp);
  track.addEventListener('pointercancel', onPointerUp);

  apply();
}

/* ── SERVICES BOOKING ── */
function initServiceBooking() {
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-book-service');
    if (!btn) return;
    event.preventDefault();
    const service = btn.dataset.service || 'Service';
    showToast(`Booking inquiry for <strong>${service}</strong>. Redirecting to contact...`, 'info', 3000);
    setTimeout(() => { navigateWithTransition('contact.html'); }, 1800);
  });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initLoader();
  initScrollProgress();
  initNavbar();
  initCursor();
  initReveal(); 
  initCounters();
  initCarousel();
  initFilters();
  initProductCards();
  initQuickView();
  initNewsletterForm();
  initContactForm();
  initFeedbackForm();
  updateCheckoutPage();
  initOrderModal();
  initPurposeSwitcher();
  initValuesAccordion();
  initServiceCarousel();
  initServiceBooking();
  updateBadges();
  updateCartDrawer();

  // Keyboard ESC closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('cart-drawer')?.classList.remove('open');
      document.querySelector('.cart-drawer-overlay')?.classList.remove('show');
      closeQuickView();
      document.getElementById('order-modal')?.classList.remove('open');
      document.querySelector('.mobile-nav')?.classList.remove('open');
      document.querySelector('.nav-overlay')?.classList.remove('show');
      document.querySelector('.hamburger')?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
