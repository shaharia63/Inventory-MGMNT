import React, { useEffect, useState } from 'react';
import { stockMovementsApi, productsApi, Product, StockMovement } from '../lib/api';
import { Package, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';

export default function StockMovementsPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [movementsData, productsData] = await Promise.all([
        stockMovementsApi.getAll(),
        productsApi.getAll()
      ]);
      
      setMovements(movementsData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading stock movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const getProductSku = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.sku : 'N/A';
  };

  const getMovementIcon = (movementType: string) => {
    switch (movementType.toLowerCase()) {
      case 'incoming':
      case 'in':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'outgoing':
      case 'out':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowUpDown className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMovementColor = (movementType: string) => {
    switch (movementType.toLowerCase()) {
      case 'incoming':
      case 'in':
        return 'text-green-600';
      case 'outgoing':
      case 'out':
        return 'text-red-600';
      default:
        return 'text-gray-600';
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Movements</h1>
        <p className="text-gray-600">Track inventory movements and changes</p>
      </div>

      {movements.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stock movements yet</h3>
          <p className="text-gray-500">Stock movements will appear here when you start managing inventory.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movements.map((movement) => (
                  <tr key={movement.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {getProductName(movement.product_id)}
                        </div>
                        <div className="text-sm text-gray-500">
                          SKU: {getProductSku(movement.product_id)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getMovementIcon(movement.movement_type)}
                        <span className={`ml-2 text-sm font-medium capitalize ${getMovementColor(movement.movement_type)}`}>
                          {movement.movement_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Math.abs(movement.quantity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {movement.previous_stock !== null && movement.new_stock !== null && (
                        <span>
                          {movement.previous_stock} → {movement.new_stock}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(movement.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movement.reason || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}