import React, { useEffect, useState } from 'react';
import { productsApi, categoriesApi, stockMovementsApi, Product, Category, StockMovement } from '../lib/api';
import { FileText, Download, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function ReportsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData, movementsData] = await Promise.all([
        productsApi.getAll(),
        categoriesApi.getAll(),
        stockMovementsApi.getAll()
      ]);

      setProducts(productsData.filter(p => p.is_active));
      setCategories(categoriesData);
      setMovements(movementsData.slice(0, 1000));
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generateInventoryReport = () => {
    const reportData = products.map(product => ({
      'Product Name': product.name,
      'SKU': product.sku,
      'Category': categories.find(c => c.id === product.category_id)?.name || 'No Category',
      'Current Stock': product.current_stock,
      'Minimum Stock': product.min_stock,
      'Cost Price': product.cost_price || 0,
      'Selling Price': product.selling_price || 0,
      'Total Value': product.current_stock * (product.cost_price || 0),
      'Status': product.current_stock <= product.min_stock ? 'Low Stock' : 'In Stock'
    }));

    exportToCSV(reportData, 'inventory-report.csv');
  };

  const generateCategoryReport = () => {
    const reportData = categories.map(category => {
      const categoryProducts = products.filter(p => p.category_id === category.id);
      const totalValue = categoryProducts.reduce((sum, p) => sum + (p.current_stock * (p.cost_price || 0)), 0);
      const totalStock = categoryProducts.reduce((sum, p) => sum + p.current_stock, 0);

      return {
        'Category Name': category.name,
        'Description': category.description || 'N/A',
        'Number of Products': categoryProducts.length,
        'Total Stock': totalStock,
        'Total Value': totalValue,
        'Created Date': new Date(category.created_at).toLocaleDateString()
      };
    });

    exportToCSV(reportData, 'category-report.csv');
  };

  const getTotalInventoryValue = () => {
    return products.reduce((sum, p) => sum + (p.current_stock * (p.cost_price || 0)), 0);
  };

  const getLowStockCount = () => {
    return products.filter(p => p.current_stock <= p.min_stock).length;
  };

  const getOutOfStockCount = () => {
    return products.filter(p => p.current_stock === 0).length;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate inventory and analytics reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
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
              <p className="text-2xl font-semibold text-gray-900">${getTotalInventoryValue().toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-semibold text-gray-900">{getLowStockCount()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Reports</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Complete Inventory Report</h3>
                <p className="text-sm text-gray-500">Export all products with stock levels and values</p>
              </div>
              <button
                onClick={generateInventoryReport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Category Summary Report</h3>
                <p className="text-sm text-gray-500">Export aggregated data by category</p>
              </div>
              <button
                onClick={generateCategoryReport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="font-semibold">{products.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Categories</span>
              <span className="font-semibold">{categories.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock Items</span>
              <span className="font-semibold text-orange-600">{getLowStockCount()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Out of Stock</span>
              <span className="font-semibold text-red-600">{getOutOfStockCount()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Stock Movements</span>
              <span className="font-semibold">{movements.length}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Total Inventory Value</span>
              <span className="font-semibold text-green-600">${getTotalInventoryValue().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
          <p className="text-gray-500">Add some products to your inventory to generate reports.</p>
        </div>
      )}
    </div>
  );
}