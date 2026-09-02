/* ============================================================
   LEAF & BLOOM — Premium Frontend JS v2.0
   ============================================================ */

/* ── PRODUCT DATA ── */
const PRODUCTS = [
  { id: 1, name: 'Monstera Deliciosa', category: 'tropical', price: 1200, badge: 'Best Seller', badgeClass: 'gold', img: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=435&auto=format&fit=crop', desc: 'Iconic split-leaf philodendron. A statement piece for any interior.' },
  { id: 2, name: 'Fiddle Leaf Fig', category: 'tropical', price: 3500, badge: 'New', badgeClass: '', img: 'https://images.unsplash.com/photo-1545239705-1564e58b9e4a?q=80&w=687&auto=format&fit=crop', desc: 'Architectural silhouette with dramatic, glossy fiddle-shaped leaves.' },
  { id: 3, name: 'Bird of Paradise', category: 'tropical', price: 2800, badge: '', badgeClass: '', img: 'https://plus.unsplash.com/premium_photo-1676316337647-65c35c441c9d?q=80&w=687&auto=format&fit=crop', desc: 'Bold, tropical foliage that transforms any corner into a lush retreat.' },
  { id: 4, name: 'White Phalaenopsis', category: 'orchid', price: 2200, badge: 'Sale', badgeClass: 'sale', img: 'https://images.unsplash.com/photo-1710524784485-5c77ae822ecc?q=80&w=1170&auto=format&fit=crop', desc: 'Pure cascading blooms — the definition of timeless elegance.', oldPrice: 2800 },
  { id: 5, name: 'Pink Anthurium', category: 'orchid', price: 1800, badge: 'Premium', badgeClass: 'gold', img: 'https://images.unsplash.com/photo-1632906379687-355e24798632?q=80&w=1073&auto=format&fit=crop', desc: 'Velvety heart-shaped blooms in soft blush pink.' },
  { id: 6, name: 'Purple Dendrobium', category: 'orchid', price: 1600, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1755027619393-65e8de9c1b31?q=80&w=720&auto=format&fit=crop', desc: 'Rich lavender clusters that bloom abundantly with minimal care.' },
  { id: 7, name: 'Curated Succulent Set', category: 'succulent', price: 980, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=705&auto=format&fit=crop', desc: 'A sculptural trio of rare succulents in hand-thrown ceramic pots.' },
  { id: 8, name: 'Geometric Terrarium', category: 'succulent', price: 2400, badge: 'New', badgeClass: '', img: 'https://images.unsplash.com/photo-1604591251652-80897be7c245?q=80&w=735&auto=format&fit=crop', desc: 'Gold-framed geometric terrarium with handpicked succulents.' },
  { id: 9, name: 'Boston Fern', category: 'fern', price: 750, badge: '', badgeClass: '', img: 'https://plus.unsplash.com/premium_photo-1770836554434-75c5c88914ad?q=80&w=880&auto=format&fit=crop', desc: 'Lush, arching fronds that bring soft, romantic texture.' },
  { id: 10, name: 'Golden Pothos', category: 'fern', price: 450, badge: 'Popular', badgeClass: 'gold', img: 'https://images.unsplash.com/photo-1763060819223-b92eb0ca6e4d?q=80&w=1173&auto=format&fit=crop', desc: 'Trailing golden-green vines — effortlessly beautiful.' },
  { id: 11, name: 'The Signature Bouquet', category: 'arrangement', price: 3800, badge: 'Luxury', badgeClass: 'gold', img: 'https://plus.unsplash.com/premium_photo-1674581211991-bd10fa5137bf?q=80&w=880&auto=format&fit=crop', desc: 'Our flagship arrangement — lush, seasonal blooms, hand-tied.' },
  { id: 12, name: 'Wild Garden Vase', category: 'arrangement', price: 2600, badge: '', badgeClass: '', img: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=500&auto=format&fit=crop', desc: 'An effortlessly wild arrangement — meadow blooms and botanical branches.' },
  { id: 13, name: 'Variegated Monstera', category: 'rare', price: 18000, badge: 'Rare', badgeClass: 'rare', img: 'https://images.unsplash.com/photo-1684738054008-6fcab69c48b0?w=500&auto=format&fit=crop', desc: 'Crown jewel of plant collectors. Striking white-marbled foliage.' },
  { id: 14, name: 'Black Bat Flower', category: 'rare', price: 8500, badge: 'Rare', badgeClass: 'rare', img: 'https://images.unsplash.com/photo-1666071016865-9a2c93dd880c?w=500&auto=format&fit=crop', desc: 'Extraordinarily exotic — dramatic black blooms with tendrils.' },
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
  const icons = { success: '✓', error: '✕', info: '🌿' };
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
        <div class="cart-empty-icon">🛒</div>
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

/* ── LOADER ── */
function initLoader() {
  const loader = document.getElementById('loader');
  const pct = loader ? loader.querySelector('.loader-pct') : null;
  if (!loader) return;
  let progress = 0;
  const interval = setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 18);
    if (pct) pct.textContent = Math.round(progress) + '%';
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 900);
        document.querySelector('.hero-bg')?.classList.add('loaded');
      }, 300);
    }
  }, 80);
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

  // Theme toggle — desktop + mobile in sync
  const allThemeBtns = document.querySelectorAll('.theme-toggle');
  if (allThemeBtns.length) {
    const sunIcon  = '<i class="fa-solid fa-sun"></i>';
    const moonIcon = '<i class="fa-regular fa-moon"></i>';
    const applyTheme = (dark) => {
      document.body.classList.toggle('dark-mode', dark);
      allThemeBtns.forEach(btn => {
        const labelEl = btn.querySelector('.theme-toggle-label');
        btn.querySelector('i') && (btn.querySelector('i').outerHTML = dark ? sunIcon : moonIcon);
        // replace entire innerHTML for proper icon swap
        if (labelEl) {
          btn.innerHTML = (dark ? sunIcon : moonIcon) + ` <span class="theme-toggle-label">${dark ? 'Light Mode' : 'Dark Mode'}</span>`;
        } else {
          btn.innerHTML = dark ? sunIcon : moonIcon;
        }
        btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      });
      localStorage.setItem('lb_theme', dark ? 'dark' : 'light');
    };
    const saved = localStorage.getItem('lb_theme');
    applyTheme(saved === 'dark');
    allThemeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        applyTheme(!document.body.classList.contains('dark-mode'));
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
    window.location.href = 'checkout.html';
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

/* ── REVEAL ON SCROLL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => obs.observe(el));
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

/* ── PRODUCT FILTER TABS ── */
function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const grid = document.getElementById('products-grid');
  if (!tabs.length || !grid) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      grid.querySelectorAll('.product-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) { card.classList.remove('revealed'); requestAnimationFrame(() => card.classList.add('revealed')); }
      });
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

function openQuickView(product) {
  quickViewProduct = product;
  quickViewQty = 1;
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;
  modal.querySelector('.modal-img').src = product.img;
  modal.querySelector('.modal-img').alt = product.name;
  modal.querySelector('.modal-category').textContent = product.category;
  modal.querySelector('.modal-title').textContent = product.name;
  modal.querySelector('.modal-price').textContent = product.price;
  modal.querySelector('.modal-desc').textContent = product.desc;
  modal.querySelector('.modal-qty-num').textContent = quickViewQty;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function initQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;
  modal.querySelector('.modal-backdrop')?.addEventListener('click', () => { modal.classList.remove('open'); document.body.style.overflow = ''; });
  modal.querySelector('.modal-close')?.addEventListener('click', () => { modal.classList.remove('open'); document.body.style.overflow = ''; });
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
      showToast('Welcome to the Leaf & Bloom community! 🌿', 'success', 4000);
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
    showToast('Message sent! We\'ll get back to you within 24 hours. 🌿', 'success', 5000);
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
    const hints = ['', '1 Star — Poor', '2 Stars — Fair', '3 Stars — Good', '4 Stars — Great', '5 Stars — Excellent! 🌟'];
    const hintEl = document.getElementById('star-hint-text') || document.querySelector('.star-hint');
    starBtns.forEach((btn, i) => {
      btn.addEventListener('mouseover', () => {
        starBtns.forEach((b, j) => b.classList.toggle('active', j <= i));
        if (hintEl) hintEl.textContent = hints[i + 1] || '';
      });
      btn.addEventListener('mouseleave', () => {
        starBtns.forEach((b, j) => b.classList.toggle('active', j < selectedRating));
        if (hintEl) hintEl.textContent = selectedRating ? hints[selectedRating] : '';
      });
      btn.addEventListener('click', () => {
        selectedRating = i + 1;
        const ratingInput = document.getElementById('rating-val');
        if (ratingInput) ratingInput.value = selectedRating;
        starBtns.forEach((b, j) => b.classList.toggle('active', j < selectedRating));
        if (hintEl) hintEl.textContent = hints[selectedRating] || '';
        showToast(`You rated us ${selectedRating} star${selectedRating !== 1 ? 's' : ''}! ⭐`, 'info');
      });
    });
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
          ? 'Thank you! Your feedback was submitted. 🌿'
          : 'Feedback saved locally! 🌿',
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
    { name: 'Sofia Reyes',  rating: 5, comment: 'Leaf & Bloom completely transformed our wedding venue. The floral installations were beyond anything we imagined — pure magic!', date: 'May 15, 2025' },
    { name: 'Marco Torres', rating: 5, comment: 'The monthly plant subscription is the highlight of my month. Each delivery feels like receiving a luxury gift. My apartment has never looked so beautiful.', date: 'April 28, 2025' },
    { name: 'Ana Lim',      rating: 5, comment: 'Their plant consultation service saved me from so many mistakes. The team is incredibly knowledgeable and passionate. Worth every peso.', date: 'March 10, 2025' },
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
          <div class="review-date">📅 ${r.date}</div>
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
          <div class="checkout-empty-icon">🛒</div>
          <div class="checkout-empty-title">Your cart is empty</div>
          <div class="checkout-empty-sub">Add some beautiful botanicals to get started.</div>
          <a href="products.html" class="btn btn-primary" style="margin-top:1rem">Browse Collection</a>
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
    window.location.href = 'index.html';
  });

  modal.querySelector('.order-modal-backdrop')?.addEventListener('click', () => {
    if (modal.querySelector('.order-success').style.display !== 'none') {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ── SERVICES BOOKING ── */
function initServiceBooking() {
  document.querySelectorAll('.btn-book-service').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.dataset.service || 'Service';
      showToast(`Booking inquiry for <strong>${service}</strong>. Redirecting to contact...`, 'info', 3000);
      setTimeout(() => { window.location.href = 'contact.html'; }, 1800);
    });
  });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
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
  initServiceBooking();
  updateBadges();
  updateCartDrawer();

  // Keyboard ESC closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('cart-drawer')?.classList.remove('open');
      document.querySelector('.cart-drawer-overlay')?.classList.remove('show');
      document.getElementById('quick-view-modal')?.classList.remove('open');
      document.getElementById('order-modal')?.classList.remove('open');
      document.querySelector('.mobile-nav')?.classList.remove('open');
      document.querySelector('.nav-overlay')?.classList.remove('show');
      document.querySelector('.hamburger')?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
