/* ============================================================
   MYD MUEBLES — Main JS (cart, favorites, search, toasts)
   ============================================================ */

/* ---- Cart ------------------------------------------------- */
class Cart {
  constructor() { this.items = this._load(); }
  _load() { try { return JSON.parse(localStorage.getItem('myd_cart') || '[]'); } catch { return []; } }
  _save() { localStorage.setItem('myd_cart', JSON.stringify(this.items)); this._updateUI(); }
  add(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) { existing.qty += qty; } else { this.items.push({ ...product, qty }); }
    this._save(); showToast('✅ Producto agregado al carrito', 'success');
  }
  remove(id) { this.items = this.items.filter(i => i.id !== id); this._save(); }
  clear() { this.items = []; this._save(); }
  total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  count() { return this.items.reduce((s, i) => s + i.qty, 0); }
  _updateUI() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.count();
      el.style.display = this.count() > 0 ? 'flex' : 'none';
    });
    this._renderDrawer();
  }
  _renderDrawer() {
    const el = document.getElementById('cartItems');
    if (!el) return;
    if (this.items.length === 0) {
      el.innerHTML = `<div class="cart-empty"><div class="icon">🛒</div><p>Tu carrito está vacío</p></div>`;
    } else {
      el.innerHTML = this.items.map(i => `
        <div class="cart-item">
          <div class="cart-item-img img-placeholder" style="width:72px;height:72px;font-size:2rem;">${i.icon||'🪑'}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${i.name}</div>
            <div class="cart-item-price">$${(i.price * i.qty).toLocaleString()}</div>
            <small style="color:var(--muted)">Qty: ${i.qty}</small>
          </div>
          <button class="cart-item-remove" onclick="cart.remove(${i.id})">✕</button>
        </div>`).join('');
    }
    const total = document.getElementById('cartTotal');
    if (total) total.textContent = '$' + this.total().toLocaleString();
  }
}

/* ---- Favorites -------------------------------------------- */
class Favorites {
  constructor() { this.ids = this._load(); }
  _load() { try { return JSON.parse(localStorage.getItem('myd_favs') || '[]'); } catch { return []; } }
  _save() { localStorage.setItem('myd_favs', JSON.stringify(this.ids)); }
  toggle(id) {
    const idx = this.ids.indexOf(id);
    if (idx === -1) { this.ids.push(id); showToast('❤️ Añadido a favoritos', 'success'); }
    else { this.ids.splice(idx, 1); showToast('💔 Eliminado de favoritos', ''); }
    this._save(); this._updateButtons();
  }
  has(id) { return this.ids.includes(id); }
  _updateButtons() {
    document.querySelectorAll('[data-fav]').forEach(btn => {
      const id = parseInt(btn.dataset.fav);
      btn.classList.toggle('fav-active', this.has(id));
      btn.title = this.has(id) ? 'Quitar de favoritos' : 'Añadir a favoritos';
    });
    const count = document.querySelector('.fav-count');
    if (count) { count.textContent = this.ids.length; count.style.display = this.ids.length > 0 ? 'flex' : 'none'; }
  }
}

/* ---- Toast ----------------------------------------------- */
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span><span class="toast-text">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

/* ---- Search ---------------------------------------------- */
function initSearch(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const suggestionsEl = document.getElementById(suggestionsId);
  if (!input || !suggestionsEl) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { suggestionsEl.classList.remove('open'); return; }
      const products = typeof getAdminProducts === 'function' ? getAdminProducts() : PRODUCTS;
      const matches = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (CATEGORIES.find(c => c.id === p.category)?.name || '').toLowerCase().includes(q)
      ).slice(0, 6);
      if (!matches.length) { suggestionsEl.classList.remove('open'); return; }
      suggestionsEl.innerHTML = matches.map(p => `
        <a class="suggestion-item" href="product.html?id=${p.id}">
          <div class="img-placeholder" style="width:40px;height:40px;font-size:1.25rem;border-radius:6px;">${p.icon||'🪑'}</div>
          <div>
            <div class="suggestion-name">${p.name}</div>
            <div class="suggestion-price">$${p.price.toLocaleString()}</div>
          </div>
        </a>`).join('');
      suggestionsEl.classList.add('open');
    }, 200);
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !suggestionsEl.contains(e.target)) suggestionsEl.classList.remove('open');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = `catalog.html?q=${encodeURIComponent(input.value.trim())}`;
    }
  });
}

/* ---- Mobile Nav ------------------------------------------ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}

/* ---- Cart Drawer ----------------------------------------- */
function initCartDrawer() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  const closeBtn = document.getElementById('cartClose');
  const cartBtns = document.querySelectorAll('.open-cart');

  cartBtns.forEach(btn => btn.addEventListener('click', () => {
    overlay?.classList.add('open'); drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));
  [overlay, closeBtn].forEach(el => el?.addEventListener('click', closeCart));
}
function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- FAQ ------------------------------------------------- */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---- Modal ----------------------------------------------- */
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
function initModals() {
  document.querySelectorAll('[data-modal]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.modal)));
  document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', () => btn.closest('.modal-overlay')?.classList.remove('open')));
  document.querySelectorAll('.modal-overlay').forEach(overlay => overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); }));
}

/* ---- Contact Form ---------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    saveMessage({ name: data.name, email: data.email, phone: data.phone || '', message: data.message || data.subject || '' });
    showToast('✅ Mensaje enviado. Nos pondremos en contacto pronto.', 'success');
    form.reset();
  });
}

/* ---- Quote Form ------------------------------------------ */
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    saveOrder({ type: 'quote', ...data });
    showToast('✅ Cotización enviada. Te contactaremos pronto.', 'success');
    form.reset();
    closeModal('quoteModal');
  });
}

/* ---- Product Option Buttons ------------------------------ */
function initOptionButtons() {
  document.querySelectorAll('.option-buttons').forEach(group => {
    group.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

/* ---- Quantity Control ------------------------------------ */
function initQtyControl() {
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const val = ctrl.querySelector('.qty-val');
    ctrl.querySelector('.qty-minus')?.addEventListener('click', () => {
      const n = parseInt(val.textContent) || 1;
      if (n > 1) val.textContent = n - 1;
    });
    ctrl.querySelector('.qty-plus')?.addEventListener('click', () => {
      val.textContent = (parseInt(val.textContent) || 1) + 1;
    });
  });
}

/* ---- Active Nav Link ------------------------------------- */
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop();
    a.classList.toggle('active', href === path);
  });
}

/* ---- WhatsApp Button ------------------------------------- */
function initWhatsApp() {
  const btn = document.querySelector('.whatsapp-float');
  if (!btn) return;
  const settings = typeof getSettings === 'function' ? getSettings() : { whatsapp: '+593991234567' };
  btn.href = `https://wa.me/${settings.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent('Hola, me interesa conocer más sobre sus muebles.')}`;
}

/* ---- Scroll-in animations -------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .category-card, .collection-card').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });
}

/* ---- Init ------------------------------------------------ */
const cart = new Cart();
const favorites = new Favorites();

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCartDrawer();
  initFAQ();
  initModals();
  initContactForm();
  initQuoteForm();
  initOptionButtons();
  initQtyControl();
  setActiveNavLink();
  initWhatsApp();
  initScrollAnimations();
  cart._updateUI();
  favorites._updateButtons();
  initSearch('searchInput', 'searchSuggestions');
  initSearch('searchInputMobile', 'searchSuggestionsMobile');
});
