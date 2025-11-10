import React, { useEffect, useState } from 'react';
import { productsApi, Product } from '../lib/api';
import { Package, DollarSign, AlertTriangle, TrendingUp, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    totalStock: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const products = await productsApi.getAll();
      const activeProducts = products.filter(p => p.is_active);
      
      const totalProducts = activeProducts.length;
      const totalValue = activeProducts.reduce((sum, p) => sum + (p.current_stock * (p.cost_price || 0)), 0);
      const totalStock = activeProducts.reduce((sum, p) => sum + p.current_stock, 0);
      const lowStock = activeProducts.filter(p => p.current_stock <= p.min_stock);

      setStats({
        totalProducts,
        totalValue,
        lowStockItems: lowStock.length,
        totalStock,
      });

      setLowStockProducts(lowStock.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Inventory overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900">${stats.totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Box className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Stock</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.lowStockItems}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No low stock items</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">
                      {product.current_stock} / {product.min_stock} min
                    </p>
                    <Link
                      to="/products"
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
              {lowStockProducts.length >= 5 && (
                <Link
                  to="/products"
                  className="block text-center text-sm text-blue-600 hover:text-blue-800 mt-4"
                >
                  View all products →
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link
              to="/products"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <Package className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium text-gray-900">Add New Product</span>
            </Link>
            <Link
              to="/categories"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium text-gray-900">Manage Categories</span>
            </Link>
            <Link
              to="/suppliers"
              className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
            >
              <Package className="h-5 w-5 text-purple-600 mr-3" />
              <span className="font-medium text-gray-900">Manage Suppliers</span>
            </Link>
            <Link
              to="/stock-movements"
              className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
            >
              <Box className="h-5 w-5 text-yellow-600 mr-3" />
              <span className="font-medium text-gray-900">Stock Movements</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}