import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package, LayoutDashboard, Box, Tags, Users, TrendingUp, AlertTriangle, FileText, LogOut, UserCog } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const { user, profile, loading, signOut, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: Box },
    { name: 'Categories', href: '/categories', icon: Tags },
    { name: 'Suppliers', href: '/suppliers', icon: Users },
    { name: 'Stock Movements', href: '/stock-movements', icon: TrendingUp },
    { name: 'Low Stock Alerts', href: '/alerts', icon: AlertTriangle },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  // Add User Management for admins
  if (isAdmin) {
    navigation.push({ name: 'User Management', href: '/users', icon: UserCog });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <Package className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-xl font-bold text-gray-800">Inventory System</h1>
        </div>

        <nav className="px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-gray-200 p-4">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-gray-900">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-gray-500">{profile?.role === 'admin' ? 'Administrator' : 'User'}</p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
}
