/* ============================================================
   MYD MUEBLES — Sample Product & Category Data
   ============================================================ */

const CATEGORIES = [
  { id: 'salas',      name: 'Salas',       icon: '🛋️',  count: 18 },
  { id: 'comedores',  name: 'Comedores',   icon: '🍽️',  count: 12 },
  { id: 'dormitorios',name: 'Dormitorios', icon: '🛏️',  count: 15 },
  { id: 'oficina',    name: 'Oficina',     icon: '🖥️',  count: 10 },
  { id: 'exteriores', name: 'Exteriores',  icon: '🌿',  count: 8  },
  { id: 'accesorios', name: 'Accesorios',  icon: '🪴',  count: 20 },
  { id: 'decoracion', name: 'Decoración',  icon: '🖼️',  count: 14 },
];

const PRODUCTS = [
  {
    id: 1, slug: 'sofa-modular-aurora',
    name: 'Sofá Modular Aurora',
    category: 'salas',
    price: 1890, priceOld: 2200,
    badge: 'sale',
    material: 'Tela premium importada',
    acabado: 'Liso antipelusa',
    color: 'Gris ceniza',
    weight: '48 kg',
    dims: { h: 86, w: 260, d: 95 },
    warranty: '3 años',
    care: 'Limpiar con paño húmedo. Evitar exposición directa al sol.',
    description: 'Sofá modular de diseño contemporáneo con tapizado premium. Estructura interna de madera maciza y espuma de alta densidad para máxima comodidad. Disponible en múltiples configuraciones.',
    colors: ['Gris ceniza','Azul marino','Beige natural','Café oscuro'],
    sizes: ['3 puestos','4 puestos','En L'],
    featured: true, isNew: false,
    icon: '🛋️',
  },
  {
    id: 2, slug: 'comedor-venecia-6',
    name: 'Comedor Venecia 6 Puestos',
    category: 'comedores',
    price: 2450, priceOld: null,
    badge: 'new',
    material: 'Madera de teca y MDF lacado',
    acabado: 'Lacado brillante',
    color: 'Blanco perla / Natural',
    weight: '72 kg',
    dims: { h: 76, w: 180, d: 90 },
    warranty: '5 años',
    care: 'Limpiar con paño seco. Usar posavasos para proteger la superficie.',
    description: 'Juego de comedor de diseño italiano fabricado con madera de teca seleccionada. Mesa extensible de 180 a 240 cm. Incluye 6 sillas tapizadas en tela premium.',
    colors: ['Blanco perla','Gris titanio','Negro piano'],
    sizes: ['6 puestos','8 puestos'],
    featured: true, isNew: true,
    icon: '🍽️',
  },
  {
    id: 3, slug: 'cama-luna-king',
    name: 'Cama Luna King Size',
    category: 'dormitorios',
    price: 1650, priceOld: null,
    badge: null,
    material: 'Madera maciza de cedro',
    acabado: 'Laqueado mate',
    color: 'Café oscuro',
    weight: '65 kg',
    dims: { h: 110, w: 200, d: 215 },
    warranty: '5 años',
    care: 'Limpiar con paño ligeramente húmedo. Aplicar cera de mantenimiento cada 6 meses.',
    description: 'Cama king size de madera maciza de cedro con cabecero tapizado de gran altura. Diseño minimalista que combina con cualquier decoración. Incluye patas niveladoras de acero inoxidable.',
    colors: ['Café oscuro','Blanco','Gris grafito'],
    sizes: ['King 200×200','Queen 160×200'],
    featured: true, isNew: false,
    icon: '🛏️',
  },
  {
    id: 4, slug: 'escritorio-orbital',
    name: 'Escritorio Orbital Pro',
    category: 'oficina',
    price: 890, priceOld: 1050,
    badge: 'sale',
    material: 'MDF lacado y acero',
    acabado: 'Lacado mate texturado',
    color: 'Negro / Gris acero',
    weight: '38 kg',
    dims: { h: 75, w: 160, d: 70 },
    warranty: '2 años',
    care: 'Limpiar con paño antiestático. Evitar líquidos sobre la superficie.',
    description: 'Escritorio ergonómico para trabajo desde casa con gestión de cables integrada, superficie amplia y diseño minimalista. Incluye estante lateral desmontable.',
    colors: ['Negro / Gris','Blanco / Dorado','Roble / Negro'],
    sizes: ['140 cm','160 cm','180 cm'],
    featured: true, isNew: false,
    icon: '🖥️',
  },
  {
    id: 5, slug: 'silla-zenith',
    name: 'Silla Zenith Ergonómica',
    category: 'oficina',
    price: 520, priceOld: null,
    badge: 'new',
    material: 'Malla técnica y aluminio',
    acabado: 'Fundición a presión',
    color: 'Negro / Cromado',
    weight: '14 kg',
    dims: { h: 120, w: 66, d: 66 },
    warranty: '3 años',
    care: 'Limpiar la malla con paño húmedo. Lubricar ruedas cada año.',
    description: 'Silla ergonómica de alta gama con soporte lumbar ajustable, reposabrazos 4D, y asiento con relleno de espuma memory foam. Certificación BIFMA para uso de 8 horas continuas.',
    colors: ['Negro','Gris','Azul noche'],
    sizes: ['Talla S','Talla M','Talla L'],
    featured: false, isNew: true,
    icon: '🪑',
  },
  {
    id: 6, slug: 'mesa-centro-nix',
    name: 'Mesa Centro Nix',
    category: 'salas',
    price: 480, priceOld: null,
    badge: null,
    material: 'Vidrio templado y acero inoxidable',
    acabado: 'Acero cepillado',
    color: 'Transparente / Plateado',
    weight: '22 kg',
    dims: { h: 42, w: 120, d: 60 },
    warranty: '2 años',
    care: 'Limpiar vidrio con limpiacristales. No apoyar objetos con bordes afilados.',
    description: 'Mesa de centro con tapa de vidrio templado de 10 mm y base de acero inoxidable de diseño geométrico. Elegancia contemporánea para cualquier sala.',
    colors: ['Transparente / Plateado','Transparente / Negro','Ámbar / Dorado'],
    sizes: ['100×50 cm','120×60 cm'],
    featured: false, isNew: false,
    icon: '🪟',
  },
  {
    id: 7, slug: 'armario-alto-miro',
    name: 'Armario Alto Miró',
    category: 'dormitorios',
    price: 2100, priceOld: null,
    badge: null,
    material: 'Madera MDF enchapada',
    acabado: 'Enchapado nogal',
    color: 'Nogal oscuro',
    weight: '95 kg',
    dims: { h: 220, w: 180, d: 58 },
    warranty: '5 años',
    care: 'Limpiar con paño suave seco. Lubricar rieles deslizantes cada 6 meses.',
    description: 'Armario alto de tres puertas corredizas con interior organizado: barras para colgar, cajones con cierre amortiguado y divisiones ajustables. Espejo interior incluido.',
    colors: ['Nogal oscuro','Blanco lino','Gris ceniza'],
    sizes: ['2 puertas 120 cm','3 puertas 180 cm','4 puertas 240 cm'],
    featured: false, isNew: false,
    icon: '🚪',
  },
  {
    id: 8, slug: 'jardinera-terra',
    name: 'Jardinera Terra Modular',
    category: 'exteriores',
    price: 320, priceOld: null,
    badge: 'new',
    material: 'Polipropileno reforzado UV',
    acabado: 'Textura piedra volcánica',
    color: 'Negro mate / Terracota',
    weight: '8 kg',
    dims: { h: 55, w: 80, d: 30 },
    warranty: '2 años',
    care: 'Limpiar con agua a presión. Resistente a la intemperie.',
    description: 'Jardinera modular de exterior fabricada con polipropileno resistente a rayos UV y cambios de temperatura extremos. Con sistema de drenaje integrado.',
    colors: ['Negro mate','Terracota','Gris piedra'],
    sizes: ['80 cm','120 cm','160 cm'],
    featured: false, isNew: true,
    icon: '🌿',
  },
  {
    id: 9, slug: 'sofa-esquinero-cosmos',
    name: 'Sofá Esquinero Cosmos',
    category: 'salas',
    price: 2690, priceOld: 3100,
    badge: 'sale',
    material: 'Cuero regenerado premium',
    acabado: 'Semi-mate suave al tacto',
    color: 'Negro / Gris antracita',
    weight: '110 kg',
    dims: { h: 88, w: 310, d: 210 },
    warranty: '3 años',
    care: 'Limpiar con crema de cuero. Evitar luz solar directa prolongada.',
    description: 'Sofá esquinero XXL de cuero regenerado con chaise longue integrada. Sistema de reclinable eléctrico en ambos extremos. Base de madera oculta con patas metálicas.',
    colors: ['Negro antracita','Café coñac','Gris perla'],
    sizes: ['Izquierda','Derecha'],
    featured: true, isNew: false,
    icon: '🛋️',
  },
  {
    id: 10, slug: 'lampara-helios',
    name: 'Lámpara Colgante Helios',
    category: 'decoracion',
    price: 245, priceOld: null,
    badge: null,
    material: 'Acero y vidrio soplado',
    acabado: 'Dorado mate',
    color: 'Dorado / Ámbar',
    weight: '3.5 kg',
    dims: { h: 40, w: 35, d: 35 },
    warranty: '1 año',
    care: 'Limpiar con paño seco. No usar productos abrasivos.',
    description: 'Lámpara colgante artesanal con pantalla de vidrio soplado en color ámbar y estructura metálica dorada. Compatible con bombillos LED E27.',
    colors: ['Dorado / Ámbar','Negro / Humo','Cobre / Transparente'],
    sizes: ['Ø35 cm','Ø50 cm'],
    featured: false, isNew: false,
    icon: '💡',
  },
  {
    id: 11, slug: 'comedor-minimal-4',
    name: 'Comedor Minimal 4 Puestos',
    category: 'comedores',
    price: 1280, priceOld: null,
    badge: null,
    material: 'Madera de pino maciza',
    acabado: 'Barnizado natural',
    color: 'Natural / Blanco',
    weight: '55 kg',
    dims: { h: 76, w: 120, d: 80 },
    warranty: '3 años',
    care: 'Barnizar nuevamente cada 2 años. Evitar humedad excesiva.',
    description: 'Comedor de diseño nórdico con mesa de madera maciza y 4 sillas tapizadas con patas de madera maciza. Ideal para espacios compactos con estilo.',
    colors: ['Natural / Blanco','Natural / Gris','Oscuro / Negro'],
    sizes: ['4 puestos','6 puestos'],
    featured: false, isNew: false,
    icon: '🍽️',
  },
  {
    id: 12, slug: 'estante-tower',
    name: 'Estante Tower Modular',
    category: 'accesorios',
    price: 390, priceOld: null,
    badge: 'new',
    material: 'Madera MDF y acero',
    acabado: 'Lacado mate',
    color: 'Blanco / Negro',
    weight: '28 kg',
    dims: { h: 180, w: 80, d: 30 },
    warranty: '2 años',
    care: 'Limpiar con paño seco. Carga máxima por repisa: 20 kg.',
    description: 'Estante modular de 5 niveles con combinación de madera y metal. Diseño industrial moderno, fácil montaje con instrucciones incluidas. Soporte de pared incluido.',
    colors: ['Blanco / Negro','Negro / Negro','Roble / Negro'],
    sizes: ['5 repisas 80 cm','7 repisas 80 cm'],
    featured: false, isNew: true,
    icon: '📚',
  },
];

// Helper functions
const getProductById = (id) => PRODUCTS.find(p => p.id === id);
const getProductBySlug = (slug) => PRODUCTS.find(p => p.slug === slug);
const getFeaturedProducts = () => PRODUCTS.filter(p => p.featured);
const getNewProducts = () => PRODUCTS.filter(p => p.isNew);
const getProductsByCategory = (cat) => PRODUCTS.filter(p => p.category === cat);

// Admin: load / save from localStorage
function getAdminProducts() {
  try {
    const stored = localStorage.getItem('myd_products');
    return stored ? JSON.parse(stored) : [...PRODUCTS];
  } catch { return [...PRODUCTS]; }
}
function saveAdminProducts(products) {
  localStorage.setItem('myd_products', JSON.stringify(products));
}

// Orders / quotes
function getOrders() {
  try { return JSON.parse(localStorage.getItem('myd_orders') || '[]'); } catch { return []; }
}
function saveOrder(order) {
  const orders = getOrders();
  orders.unshift({ ...order, id: Date.now(), status: 'pending', date: new Date().toLocaleDateString('es-EC') });
  localStorage.setItem('myd_orders', JSON.stringify(orders));
}
function updateOrderStatus(id, status) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx !== -1) { orders[idx].status = status; localStorage.setItem('myd_orders', JSON.stringify(orders)); }
}

// Messages
function getMessages() {
  try { return JSON.parse(localStorage.getItem('myd_messages') || '[]'); } catch { return []; }
}
function saveMessage(msg) {
  const msgs = getMessages();
  msgs.unshift({ ...msg, id: Date.now(), status: 'new', date: new Date().toLocaleDateString('es-EC') });
  localStorage.setItem('myd_messages', JSON.stringify(msgs));
}
function updateMessageStatus(id, status) {
  const msgs = getMessages();
  const idx = msgs.findIndex(m => m.id === id);
  if (idx !== -1) { msgs[idx].status = status; localStorage.setItem('myd_messages', JSON.stringify(msgs)); }
}

// Settings
const DEFAULT_SETTINGS = {
  phone: '+593 99 123 4567',
  whatsapp: '+593991234567',
  email: 'ventas@mydmuebles.ec',
  address: 'Av. Principal 123, Quito, Ecuador',
  schedule: 'Lun–Vie 8h–18h, Sáb 9h–14h',
  instagram: 'https://instagram.com/mydmuebles',
  facebook: 'https://facebook.com/mydmuebles',
  heroTitle: 'Muebles que Transforman tu Espacio',
  heroSub: 'Fabricación propia. Diseño exclusivo. Calidad garantizada.',
};
function getSettings() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem('myd_settings') || '{}') }; } catch { return DEFAULT_SETTINGS; }
}
function saveSettings(s) {
  localStorage.setItem('myd_settings', JSON.stringify(s));
}
