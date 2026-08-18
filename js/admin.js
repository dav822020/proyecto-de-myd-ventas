/* ============================================================
   MYD MUEBLES — Admin Panel JS
   ============================================================ */

let adminProducts = [];
let editingProductId = null;

/* ---- Section Navigation ---------------------------------- */
function showSection(name) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  document.getElementById(`section-${name}`)?.classList.add('active');
  document.querySelector(`[data-section="${name}"]`)?.classList.add('active');
  window.scrollTo(0, 0);
}

/* ---- Products -------------------------------------------- */
function loadProducts(filter = '') {
  adminProducts = getAdminProducts();
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;
  const list = filter ? adminProducts.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : adminProducts;
  tbody.innerHTML = list.length ? list.map(p => `
    <tr>
      <td><span style="font-size:1.5rem">${p.icon||'🪑'}</span></td>
      <td><span class="name">${p.name}</span></td>
      <td>${CATEGORIES.find(c=>c.id===p.category)?.name||p.category}</td>
      <td style="color:var(--accent);font-weight:700">$${p.price.toLocaleString()}</td>
      <td>${p.badge ? `<span class="badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : '—'}</td>
      <td><span class="status-badge ${p.active===false?'status-pending':'status-attended'}">${p.active===false?'Inactivo':'Activo'}</span></td>
      <td style="display:flex;gap:.5rem">
        <button class="btn btn-sm btn-outline" onclick="editProduct(${p.id})">✏️ Editar</button>
        <button class="btn btn-sm" style="background:rgba(229,62,62,.15);color:#e53e3e;border:1px solid rgba(229,62,62,.3)" onclick="deleteProduct(${p.id})">🗑️</button>
      </td>
    </tr>`).join('') : `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No se encontraron productos</td></tr>`;
}

function editProduct(id) {
  editingProductId = id;
  const p = adminProducts.find(x => x.id === id);
  if (!p) return;
  document.getElementById('prodId').value = p.id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodPriceOld').value = p.priceOld || '';
  document.getElementById('prodMaterial').value = p.material || '';
  document.getElementById('prodColor').value = p.color || '';
  document.getElementById('prodDimH').value = p.dims?.h || '';
  document.getElementById('prodDimW').value = p.dims?.w || '';
  document.getElementById('prodDimD').value = p.dims?.d || '';
  document.getElementById('prodWarranty').value = p.warranty || '';
  document.getElementById('prodDesc').value = p.description || '';
  document.getElementById('prodBadge').value = p.badge || '';
  document.getElementById('prodFormTitle').textContent = `Editar: ${p.name}`;
  showSection('product-form');
}

function deleteProduct(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  adminProducts = adminProducts.filter(p => p.id !== id);
  saveAdminProducts(adminProducts);
  loadProducts();
  showToastAdmin('Producto eliminado', 'success');
}

function initProductForm() {
  const form = document.getElementById('productForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const id = parseInt(data.get('prodId')) || null;
    const prodData = {
      id: id || Date.now(),
      name: data.get('prodName'),
      category: data.get('prodCategory'),
      price: parseFloat(data.get('prodPrice')) || 0,
      priceOld: parseFloat(data.get('prodPriceOld')) || null,
      material: data.get('prodMaterial'),
      color: data.get('prodColor'),
      dims: { h: parseFloat(data.get('prodDimH'))||0, w: parseFloat(data.get('prodDimW'))||0, d: parseFloat(data.get('prodDimD'))||0 },
      warranty: data.get('prodWarranty'),
      description: data.get('prodDesc'),
      badge: data.get('prodBadge') || null,
      icon: CATEGORIES.find(c=>c.id===data.get('prodCategory'))?.icon || '🪑',
      active: true,
    };
    adminProducts = getAdminProducts();
    if (id) {
      const idx = adminProducts.findIndex(p => p.id === id);
      if (idx !== -1) { adminProducts[idx] = { ...adminProducts[idx], ...prodData }; }
    } else {
      adminProducts.unshift(prodData);
    }
    saveAdminProducts(adminProducts);
    showToastAdmin('Producto guardado correctamente ✅', 'success');
    form.reset();
    editingProductId = null;
    showSection('products');
    loadProducts();
  });
}

/* ---- Categories ------------------------------------------ */
function loadCategories() {
  const tbody = document.getElementById('categoriesTableBody');
  if (!tbody) return;
  const products = getAdminProducts();
  tbody.innerHTML = CATEGORIES.map((c, i) => `
    <tr>
      <td style="font-size:1.5rem">${c.icon}</td>
      <td><span class="name">${c.name}</span></td>
      <td>${products.filter(p=>p.category===c.id).length}</td>
      <td>${i+1}</td>
      <td><button class="btn btn-sm btn-outline" onclick="showToastAdmin('Función disponible en versión completa','')">✏️ Editar</button></td>
    </tr>`).join('');
}

/* ---- Orders ---------------------------------------------- */
function loadOrders(filter = '') {
  const orders = getOrders();
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  const list = filter ? orders.filter(o => o.status === filter) : orders;
  tbody.innerHTML = list.length ? list.map(o => `
    <tr>
      <td><span class="name">#${o.id}</span></td>
      <td>${o.name || o.type || '—'}</td>
      <td>${o.phone || o.email || '—'}</td>
      <td>${o.date}</td>
      <td><span class="status-badge ${o.status==='pending'?'status-pending':'status-attended'}">${o.status==='pending'?'Pendiente':'Atendido'}</span></td>
      <td>
        ${o.status==='pending' ? `<button class="btn btn-sm btn-primary" onclick="markOrderAttended(${o.id})">✓ Atender</button>` : '—'}
      </td>
    </tr>`).join('') : `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted)">No hay pedidos</td></tr>`;
}

function markOrderAttended(id) {
  updateOrderStatus(id, 'attended');
  loadOrders();
  showToastAdmin('Pedido marcado como atendido', 'success');
}

/* ---- Messages -------------------------------------------- */
function loadMessages() {
  const msgs = getMessages();
  const tbody = document.getElementById('messagesTableBody');
  if (!tbody) return;
  tbody.innerHTML = msgs.length ? msgs.map(m => `
    <tr>
      <td><span class="name">${m.name}</span></td>
      <td>${m.email}</td>
      <td>${m.phone || '—'}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${m.message}</td>
      <td>${m.date}</td>
      <td><span class="status-badge ${m.status==='new'?'status-new':'status-attended'}">${m.status==='new'?'Nuevo':'Leído'}</span></td>
      <td>
        ${m.status==='new' ? `<button class="btn btn-sm btn-outline" onclick="markMessageRead(${m.id})">✓ Marcar leído</button>` : '—'}
      </td>
    </tr>`).join('') : `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No hay mensajes</td></tr>`;
}

function markMessageRead(id) {
  updateMessageStatus(id, 'read');
  loadMessages();
  showToastAdmin('Mensaje marcado como leído', 'success');
}

/* ---- Settings -------------------------------------------- */
function loadSettings() {
  const s = getSettings();
  document.querySelectorAll('[data-setting]').forEach(input => {
    const key = input.dataset.setting;
    if (s[key] !== undefined) input.value = s[key];
  });
}

function initSettingsForm() {
  const form = document.getElementById('settingsForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const s = {};
    form.querySelectorAll('[data-setting]').forEach(input => { s[input.dataset.setting] = input.value; });
    saveSettings(s);
    showToastAdmin('Configuración guardada ✅', 'success');
  });
}

/* ---- Stats ----------------------------------------------- */
function loadStats() {
  const products = getAdminProducts();
  const orders = getOrders();
  const msgs = getMessages();
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setVal('statProducts', products.length);
  setVal('statOrders', orders.length);
  setVal('statPending', orders.filter(o=>o.status==='pending').length);
  setVal('statMessages', msgs.filter(m=>m.status==='new').length);
}

/* ---- Toast (admin) --------------------------------------- */
function showToastAdmin(message, type = 'success') {
  showToast(message, type);
}

/* ---- Image upload preview -------------------------------- */
function initImageUpload() {
  document.querySelectorAll('.img-upload-area').forEach(area => {
    const input = area.querySelector('input[type=file]');
    const preview = area.querySelector('.img-preview');
    area.addEventListener('click', () => input?.click());
    input?.addEventListener('change', () => {
      if (!preview) return;
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          const item = document.createElement('div');
          item.className = 'img-preview-item';
          item.innerHTML = `<img src="${e.target.result}" alt="preview"><button class="img-preview-remove" type="button">✕</button>`;
          item.querySelector('button').addEventListener('click', ev => { ev.stopPropagation(); item.remove(); });
          preview.appendChild(item);
        };
        reader.readAsDataURL(file);
      });
    });
  });
}

/* ---- Init ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadProducts();
  loadCategories();
  loadOrders();
  loadMessages();
  loadSettings();
  initProductForm();
  initSettingsForm();
  initImageUpload();

  // Nav items
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => showSection(item.dataset.section));
  });

  // Search products
  document.getElementById('productSearch')?.addEventListener('input', e => loadProducts(e.target.value));

  // Filter orders
  document.getElementById('ordersFilter')?.addEventListener('change', e => loadOrders(e.target.value));

  // New product button
  document.getElementById('newProductBtn')?.addEventListener('click', () => {
    editingProductId = null;
    document.getElementById('productForm')?.reset();
    document.getElementById('prodId').value = '';
    document.getElementById('prodFormTitle').textContent = 'Agregar Producto';
    showSection('product-form');
  });

  // Mobile admin sidebar toggle
  document.getElementById('adminMenuToggle')?.addEventListener('click', () => {
    document.querySelector('.admin-sidebar')?.classList.toggle('open-mobile');
  });
});
