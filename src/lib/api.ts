// Local API service to replace Supabase
const API_BASE = 'http://localhost:5000';

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
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
}

export interface StockMovement {
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
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

// Local storage keys
const STORAGE_KEYS = {
  CATEGORIES: 'inventory_categories',
  SUPPLIERS: 'inventory_suppliers',
  PRODUCTS: 'inventory_products',
  STOCK_MOVEMENTS: 'inventory_stock_movements',
};

// Helper function to get from localStorage
function getFromStorage<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from storage:', error);
    return [];
  }
}

// Helper function to save to localStorage
function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
}

// Helper function to generate ID
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Helper function to get current timestamp
function getTimestamp(): string {
  return new Date().toISOString();
}

// Categories API
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    return getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
  },

  async create(data: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
    const categories = getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
    const newCategory: Category = {
      ...data,
      id: generateId(),
      created_at: getTimestamp(),
      updated_at: getTimestamp(),
    };
    categories.push(newCategory);
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
    return newCategory;
  },

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const categories = getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    
    categories[index] = {
      ...categories[index],
      ...data,
      updated_at: getTimestamp(),
    };
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
    return categories[index];
  },

  async delete(id: string): Promise<void> {
    const categories = getFromStorage<Category>(STORAGE_KEYS.CATEGORIES);
    const filtered = categories.filter(c => c.id !== id);
    saveToStorage(STORAGE_KEYS.CATEGORIES, filtered);
  },
};

// Suppliers API
export const suppliersApi = {
  async getAll(): Promise<Supplier[]> {
    return getFromStorage<Supplier>(STORAGE_KEYS.SUPPLIERS);
  },

  async create(data: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>): Promise<Supplier> {
    const suppliers = getFromStorage<Supplier>(STORAGE_KEYS.SUPPLIERS);
    const newSupplier: Supplier = {
      ...data,
      id: generateId(),
      created_at: getTimestamp(),
      updated_at: getTimestamp(),
    };
    suppliers.push(newSupplier);
    saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers);
    return newSupplier;
  },

  async update(id: string, data: Partial<Supplier>): Promise<Supplier> {
    const suppliers = getFromStorage<Supplier>(STORAGE_KEYS.SUPPLIERS);
    const index = suppliers.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Supplier not found');
    
    suppliers[index] = {
      ...suppliers[index],
      ...data,
      updated_at: getTimestamp(),
    };
    saveToStorage(STORAGE_KEYS.SUPPLIERS, suppliers);
    return suppliers[index];
  },

  async delete(id: string): Promise<void> {
    const suppliers = getFromStorage<Supplier>(STORAGE_KEYS.SUPPLIERS);
    const filtered = suppliers.filter(s => s.id !== id);
    saveToStorage(STORAGE_KEYS.SUPPLIERS, filtered);
  },
};

// Products API
export const productsApi = {
  async getAll(): Promise<Product[]> {
    return getFromStorage<Product>(STORAGE_KEYS.PRODUCTS);
  },

  async create(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const products = getFromStorage<Product>(STORAGE_KEYS.PRODUCTS);
    const newProduct: Product = {
      ...data,
      id: generateId(),
      created_at: getTimestamp(),
      updated_at: getTimestamp(),
    };
    products.push(newProduct);
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  },

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const products = getFromStorage<Product>(STORAGE_KEYS.PRODUCTS);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    products[index] = {
      ...products[index],
      ...data,
      updated_at: getTimestamp(),
    };
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return products[index];
  },

  async delete(id: string): Promise<void> {
    const products = getFromStorage<Product>(STORAGE_KEYS.PRODUCTS);
    const filtered = products.filter(p => p.id !== id);
    saveToStorage(STORAGE_KEYS.PRODUCTS, filtered);
  },
};

// Stock Movements API
export const stockMovementsApi = {
  async getAll(): Promise<StockMovement[]> {
    return getFromStorage<StockMovement>(STORAGE_KEYS.STOCK_MOVEMENTS);
  },

  async create(data: Omit<StockMovement, 'id' | 'created_at'>): Promise<StockMovement> {
    const movements = getFromStorage<StockMovement>(STORAGE_KEYS.STOCK_MOVEMENTS);
    const newMovement: StockMovement = {
      ...data,
      id: generateId(),
      created_at: getTimestamp(),
    };
    movements.push(newMovement);
    saveToStorage(STORAGE_KEYS.STOCK_MOVEMENTS, movements);
    return newMovement;
  },
};

// Users API
export const usersApi = {
  async getAll(): Promise<UserProfile[]> {
    const response = await fetch(`${API_BASE}/users`);
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.users;
  },

  async create(data: { email: string; password: string; name: string; role: string }): Promise<UserProfile> {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.user;
  },

  async update(id: string, data: { name?: string; role?: string; isActive?: boolean }): Promise<UserProfile> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.user;
  },

  async resetPassword(id: string, password: string): Promise<void> {
    const response = await fetch(`${API_BASE}/users/${id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
  },
};