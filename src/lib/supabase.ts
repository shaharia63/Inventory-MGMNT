// This file now only exports types for compatibility
// All actual data operations use the local API in api.ts

// Database types
export type Category = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  category_id: string | null;
  supplier_id: string | null;
  cost_price: number | null;
  selling_price: number | null;
  current_stock: number;
  min_stock: number;
  manufacturer: string | null;
  warehouse_location: string | null;
  weight: number | null;
  dimensions: string | null;
  image_url: string | null;
  barcode: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type StockMovement = {
  id: string;
  product_id: string;
  movement_type: string;
  quantity: number;
  previous_stock: number | null;
  new_stock: number | null;
  user_id: string;
  reason: string | null;
  notes: string | null;
  created_at: string;
};

export type UserProfile = {
  id: string;
  full_name: string | null;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};