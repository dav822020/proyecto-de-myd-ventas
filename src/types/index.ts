export interface ProductType {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  comparePrice?: number | null;
  categoryId: number;
  category?: CategoryType;
  images: string[];
  material?: string | null;
  finish?: string | null;
  color?: string | null;
  width?: number | null;
  height?: number | null;
  depth?: number | null;
  weight?: number | null;
  warranty?: string | null;
  careInstructions?: string | null;
  tags: string[];
  featured: boolean;
  active: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  order: number;
}

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface OrderType {
  id: number;
  customerName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  items: string;
  total: number;
  status: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteType {
  id: number;
  customerName: string;
  email: string;
  phone?: string | null;
  productId?: number | null;
  productName?: string | null;
  details?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageType {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  body: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
