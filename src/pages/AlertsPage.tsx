import React, { useEffect, useState } from 'react';
import { productsApi, categoriesApi, Product, Category } from '../lib/api';
import { AlertTriangle, Package, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AlertsPage() {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsApi.getAll(),
        categoriesApi.getAll()
      ]);

      const activeProducts = productsData.filter(p => p.is_active);
      const outOfStock = activeProducts.filter(p => p.current_stock === 0);
      const lowStock = activeProducts.filter(
        p => p.current_stock > 0 && p.current_stock <= p.min_stock
      );

      setOutOfStockProducts(outOfStock);
      setLowStockProducts(lowStock);
      setCategories(categoriesData);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'No Category';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown Category';
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderProductTable = (products: Product[], title: string, emptyMessage: string, alertColor: string) => (
    <div className="bg-white rounded-lg shadow mb-8">
      <div className="p-6 border-b border-gray-200 flex items-center">
        <AlertTriangle className={`w-6 h-6 ${alertColor} mr-3`} />
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <span className={`ml-auto ${alertColor.replace('text-', 'bg-').replace('-500', '-100')} ${alertColor.replace('text-', 'text-').replace('-500', '-800')} px-3 py-1 rounded-full text-sm font-medium`}>
          {products.length} items
        </span>
      </div>

      {products.length === 0 ? (
        <div className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          SKU: {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getCategoryName(product.category_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-medium ${
                      product.current_stock === 0 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {product.current_stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.min_stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to="/products"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Manage Stock
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts</h1>
        <p className="text-gray-600">Monitor inventory levels and stock alerts</p>
      </div>

      {outOfStockProducts.length === 0 && lowStockProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">All good!</h3>
          <p className="text-gray-500">No stock alerts at the moment. All products are well stocked.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {renderProductTable(
            outOfStockProducts,
            'Out of Stock',
            'Great! No products are out of stock.',
            'text-red-500'
          )}
          
          {renderProductTable(
            lowStockProducts,
            'Low Stock',
            'Excellent! No products are running low.',
            'text-orange-500'
          )}
        </div>
      )}
    </div>
  );
}