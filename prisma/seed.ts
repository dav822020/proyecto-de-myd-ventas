import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const dbPath = path.resolve(__dirname, "dev.db");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter: new PrismaLibSql({ url: `file:${dbPath}` }) } as any);

const categories = [
  { name: "Salas", slug: "salas", icon: "🛋️", order: 1 },
  { name: "Comedores", slug: "comedores", icon: "🍽️", order: 2 },
  { name: "Dormitorios", slug: "dormitorios", icon: "🛏️", order: 3 },
  { name: "Oficina", slug: "oficina", icon: "💼", order: 4 },
  { name: "Exteriores", slug: "exteriores", icon: "🌿", order: 5 },
  { name: "Accesorios", slug: "accesorios", icon: "🪴", order: 6 },
  { name: "Decoración", slug: "decoracion", icon: "🎨", order: 7 },
];

const siteConfig = [
  { key: "phone", value: "+593 99 123 4567" },
  { key: "whatsapp", value: "+593991234567" },
  { key: "email", value: "info@mydmuebles.com" },
  { key: "address", value: "Av. Principal 123, Quito, Ecuador" },
  { key: "schedule", value: "Lun–Vie: 9:00–18:00 | Sáb: 9:00–14:00" },
  { key: "facebook", value: "https://facebook.com/mydmuebles" },
  { key: "instagram", value: "https://instagram.com/mydmuebles" },
  { key: "tiktok", value: "https://tiktok.com/@mydmuebles" },
  { key: "hero_title", value: "Muebles que transforman espacios" },
  {
    key: "hero_subtitle",
    value:
      "Fabricación propia de alta calidad. Diseño exclusivo para tu hogar u oficina.",
  },
  { key: "company_name", value: "MYD Muebles" },
  {
    key: "company_description",
    value:
      "Somos una empresa ecuatoriana con más de 10 años de experiencia en fabricación y venta de muebles de alta calidad. Cada pieza es diseñada y construida con materiales premium.",
  },
  {
    key: "maps_embed",
    value:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.794388!2d-78.5!3d-0.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTMnMjAuMCJTIDc4wrAzMCcwMC4wIlc!5e0!3m2!1ses!2sec!4v1234567890",
  },
];

const products = [
  {
    name: "Sofá Milano 3 Plazas",
    slug: "sofa-milano-3-plazas",
    description:
      "Sofá elegante de 3 plazas con estructura de madera maciza y tapizado en tela premium. Diseño moderno que combina confort y estética.",
    price: 850,
    comparePrice: 1100,
    categorySlug: "salas",
    images: JSON.stringify([
      "/images/products/sofa-1.jpg",
      "/images/products/sofa-2.jpg",
    ]),
    material: "Madera de eucalipto + tela poliéster premium",
    finish: "Natural lacado",
    color: "Gris antracita",
    width: 220,
    height: 85,
    depth: 90,
    weight: 45,
    warranty: "2 años en estructura",
    careInstructions:
      "Limpiar con paño húmedo. Evitar exposición directa al sol.",
    tags: JSON.stringify(["destacado", "nuevo", "sala"]),
    featured: true,
    stock: 5,
  },
  {
    name: "Comedor Recto 6 Personas",
    slug: "comedor-recto-6-personas",
    description:
      "Juego de comedor completo para 6 personas. Mesa de madera sólida con 6 sillas tapizadas. Elegante y funcional.",
    price: 1250,
    comparePrice: 1600,
    categorySlug: "comedores",
    images: JSON.stringify([
      "/images/products/comedor-1.jpg",
      "/images/products/comedor-2.jpg",
    ]),
    material: "Madera de laurel maciza",
    finish: "Barniz brillante nogal",
    color: "Nogal oscuro",
    width: 180,
    height: 78,
    depth: 90,
    weight: 80,
    warranty: "3 años en estructura",
    careInstructions: "Limpiar con cera de muebles. Evitar líquidos.",
    tags: JSON.stringify(["destacado", "comedor", "familiar"]),
    featured: true,
    stock: 3,
  },
  {
    name: "Cama King Size Platform",
    slug: "cama-king-size-platform",
    description:
      "Cama king size con cabecero tapizado, base de plataforma y cajones de almacenamiento. Máximo confort y organización.",
    price: 980,
    comparePrice: 1300,
    categorySlug: "dormitorios",
    images: JSON.stringify([
      "/images/products/cama-1.jpg",
      "/images/products/cama-2.jpg",
    ]),
    material: "MDF enchapado + tapizado en cuero ecológico",
    finish: "Negro mate",
    color: "Negro / Gris",
    width: 200,
    height: 120,
    depth: 210,
    weight: 95,
    warranty: "2 años",
    careInstructions: "Limpiar tapizado con paño seco.",
    tags: JSON.stringify(["destacado", "dormitorio", "storage"]),
    featured: true,
    stock: 4,
  },
  {
    name: "Escritorio Ejecutivo L",
    slug: "escritorio-ejecutivo-l",
    description:
      "Escritorio en forma de L para oficina o home office. Amplia superficie de trabajo, cajones y compartimentos organizadores.",
    price: 650,
    comparePrice: 850,
    categorySlug: "oficina",
    images: JSON.stringify([
      "/images/products/escritorio-1.jpg",
      "/images/products/escritorio-2.jpg",
    ]),
    material: "MDF 18mm + melamina blanca",
    finish: "Melamina blanca brillante",
    color: "Blanco / Gris",
    width: 160,
    height: 75,
    depth: 140,
    weight: 55,
    warranty: "1 año",
    careInstructions: "Limpiar con paño ligeramente húmedo.",
    tags: JSON.stringify(["oficina", "home-office"]),
    featured: false,
    stock: 6,
  },
  {
    name: "Juego de Sala Modular",
    slug: "juego-sala-modular",
    description:
      "Sala modular configurable, 5 piezas intercambiables. Ideal para espacios amplios o pequeños. Tapizado en microfibra.",
    price: 1450,
    comparePrice: 1900,
    categorySlug: "salas",
    images: JSON.stringify(["/images/products/sala-modular-1.jpg"]),
    material: "Madera pino + espuma de alta densidad + microfibra",
    finish: "Natural",
    color: "Beige / Crema",
    width: 300,
    height: 85,
    depth: 95,
    weight: 110,
    warranty: "2 años",
    careInstructions: "Tapizado lavable. Extraer fundas para lavar.",
    tags: JSON.stringify(["sala", "modular", "familia"]),
    featured: true,
    stock: 2,
  },
  {
    name: "Silla de Oficina Ergonómica",
    slug: "silla-oficina-ergonomica",
    description:
      "Silla ergonómica con soporte lumbar ajustable, reposabrazos en altura y respaldo de malla transpirable. Certificada para uso 8h.",
    price: 285,
    comparePrice: 380,
    categorySlug: "oficina",
    images: JSON.stringify(["/images/products/silla-1.jpg"]),
    material: "Malla de nylon + estructura acero",
    finish: "Negro mate",
    color: "Negro",
    width: 65,
    height: 120,
    depth: 65,
    weight: 14,
    warranty: "2 años",
    careInstructions: "Limpiar malla con paño húmedo.",
    tags: JSON.stringify(["oficina", "ergonomia"]),
    featured: false,
    stock: 10,
  },
  {
    name: "Mesa de Centro Vidrio Templado",
    slug: "mesa-centro-vidrio-templado",
    description:
      "Mesa de centro con tapa de vidrio templado de 10mm y estructura de acero inoxidable. Diseño minimalista y moderno.",
    price: 320,
    comparePrice: 450,
    categorySlug: "salas",
    images: JSON.stringify(["/images/products/mesa-centro-1.jpg"]),
    material: "Vidrio templado 10mm + acero inoxidable",
    finish: "Cromado / Transparente",
    color: "Transparente / Plateado",
    width: 120,
    height: 42,
    depth: 60,
    weight: 18,
    warranty: "1 año",
    careInstructions: "Limpiar vidrio con limpiavidrios. Evitar golpes.",
    tags: JSON.stringify(["sala", "moderno", "vidrio"]),
    featured: false,
    stock: 8,
  },
  {
    name: "Closet 4 Puertas Corredizas",
    slug: "closet-4-puertas-corredizas",
    description:
      "Closet amplio de 4 puertas corredizas con espejos, cajones internos, barras colgadoras y estantes ajustables.",
    price: 1100,
    comparePrice: 1400,
    categorySlug: "dormitorios",
    images: JSON.stringify([
      "/images/products/closet-1.jpg",
      "/images/products/closet-2.jpg",
    ]),
    material: "MDF + espejo de seguridad",
    finish: "Blanco mate",
    color: "Blanco",
    width: 240,
    height: 220,
    depth: 60,
    weight: 130,
    warranty: "2 años",
    careInstructions: "Limpiar espejo con limpiavidrios. Estructura con paño.",
    tags: JSON.stringify(["dormitorio", "closet", "almacenamiento"]),
    featured: true,
    stock: 3,
  },
];

async function main() {
  console.log("🌱 Iniciando seed de base de datos...");

  // Seed categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✅ ${categories.length} categorías creadas`);

  // Seed site config
  for (const config of siteConfig) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }
  console.log(`✅ ${siteConfig.length} configuraciones creadas`);

  // Seed products
  for (const product of products) {
    const { categorySlug, ...productData } = product;
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });
    if (!category) continue;
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: { ...productData, categoryId: category.id },
    });
  }
  console.log(`✅ ${products.length} productos creados`);

  console.log("🎉 Seed completado exitosamente");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
