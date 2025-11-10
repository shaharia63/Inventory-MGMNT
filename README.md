# Inventory Management System (Local Version)

A simplified inventory management system refactored to use local storage instead of Supabase, with admin-only user management.

## Key Changes from Supabase Version

### ✅ What Was Removed
- **Supabase Dependencies** - No external database required
- **Public Registration** - Only admin can create accounts
- **External API Calls** - All operations are local
- **Complex Authentication** - Simple session-based auth

### ✅ What Was Added
- **Local Storage** - Data persists in browser localStorage
- **Admin User Management** - Create users, change roles, manage accounts
- **Simple Setup** - No database configuration needed
- **Self-Contained** - Everything runs locally

## Quick Start

### 1. Start the Backend Server
```bash
node server.js
```
The server runs on port 5000 by default.

### 2. Start the Frontend
```bash
npm run dev
```
The frontend runs on port 5173 by default.

### 3. Login with Default Admin
- Go to http://localhost:5173
- **Email:** `admin@inventory.com`
- **Password:** `admin123456`

## Default Admin Account

**IMPORTANT:** Change the admin password after first login through User Management.

## User Management (Admin Only)

As an admin, you can:

### Create New Users
1. Navigate to User Management
2. Click "Add User"
3. Enter user details:
   - Email
   - Password
   - Full Name
   - Role (Admin/Manager/User)
4. Click "Create User"

### Manage User Roles
1. Find user in User Management
2. Click edit icon
3. Change role (User/Manager/Admin)
4. Save changes

### Reset Passwords
1. Find user in User Management
2. Click key icon
3. Enter new password
4. Click "Reset Password"

### Activate/Deactivate Users
1. Find user in User Management
2. Click shield icon
3. User will be activated or deactivated

## Core Features

### User Roles
- **Admin**: Full system access, user management
- **Manager**: Inventory management, reports access
- **User**: Basic operations, view products

### Inventory Management
- **Product Management** - Add, edit, delete products
- **Categories & Suppliers** - Organized product catalog
- **Stock Tracking** - Real-time stock levels
- **Low Stock Alerts** - Automatic notifications
- **Reports & Analytics** - Export data to CSV

### Data Storage
- **Local Storage**: Products, categories, suppliers, stock movements
- **User JSON File**: User accounts (server-side)
- **No Database**: Everything runs locally

## File Structure

```
inventory-system/
├── src/
│   ├── lib/
│   │   ├── api.ts          # Local API service (replaces Supabase)
│   │   └── supabase.ts     # Type definitions only
│   ├── contexts/
│   │   └── AuthContext.tsx # Simple local authentication
│   ├── pages/
│   │   ├── LoginPage.tsx   # Login only (no registration)
│   │   ├── UsersPage.tsx   # Admin user management
│   │   ├── ProductsPage.tsx # Product management
│   │   ├── CategoriesPage.tsx # Category management
│   │   ├── SuppliersPage.tsx # Supplier management
│   │   ├── Dashboard.tsx   # Overview dashboard
│   │   ├── AlertsPage.tsx  # Stock alerts
│   │   ├── ReportsPage.tsx # Generate reports
│   │   └── StockMovementsPage.tsx # View stock history
├── user.json              # User storage (server-side)
└── server.js              # Express server with user management API
```

## API Endpoints

### Authentication
- `POST /login` - User login

### User Management (Admin Only)
- `GET /users` - Get all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `PUT /users/:id/password` - Reset user password
- `DELETE /users/:id` - Delete user

## Technology Stack

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Backend**: Node.js + Express
- **Data Storage**: localStorage + JSON file
- **Authentication**: Session-based (localStorage)

## User Guide

### Dashboard
- View key metrics at a glance
- Monitor low stock items
- Track inventory value
- Quick access to critical functions

### Products
- Add new products with all details
- Search by name or SKU
- Filter by category
- Edit or delete existing products
- Track stock levels

### Categories & Suppliers
- Organize products with categories
- Manage supplier information
- Link products to categories and suppliers

### Stock Movements
- Record incoming stock (purchases, returns)
- Record outgoing stock (sales, usage)
- View complete movement history
- Track inventory changes

### Reports
- Export full inventory to CSV
- Generate category reports
- View inventory breakdown
- Analyze stock levels

### User Management (Admin Only)
- Create new user accounts
- Assign roles and permissions
- Reset user passwords
- Activate/deactivate accounts
- Search and filter users

## Data Persistence

### Local Storage (Browser)
- Products, categories, suppliers
- Stock movements
- User session data
- **Note**: Clearing browser data will reset inventory

### JSON File (Server)
- User accounts
- Passwords and roles
- **Note**: Persists across browser sessions

## Security Features

- Session-based authentication
- Role-based access control
- Admin-only user management
- Local data storage
- No external dependencies

## Mobile Support

The application is fully responsive and optimized for:
- Tablets (iPad, Android tablets)
- Smartphones (iPhone, Android phones)
- Desktop computers
- Touch-friendly interface

## Troubleshooting

### Cannot Login with Admin Account
1. Verify credentials: `admin@inventory.com` / `admin123456`
2. Ensure server is running on port 5000
3. Check browser console for errors

### Data Lost After Browser Refresh
- Data is stored in localStorage
- Clearing browser data will reset inventory
- User accounts persist in JSON file

### User Management Not Available
- Ensure you're logged in as admin
- Check User Management appears in navigation menu
- Verify admin role in user profile

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation
1. Install dependencies: `npm install`
2. Start backend: `node server.js`
3. Start frontend: `npm run dev`
4. Open http://localhost:5173

### Building for Production
```bash
npm run build
```
The built files will be in the `dist` directory.

## Notes

- This is a simplified version suitable for small teams or personal use
- Data is stored locally, perfect for development and testing
- No database setup required
- Ideal for single-user or small team environments
- User accounts persist, inventory data is per-browser

## Migration from Supabase Version

If migrating from the Supabase version:
1. User accounts need to be recreated via admin panel
2. Inventory data will start fresh
3. All products, categories, and suppliers need to be re-entered
4. Barcode scanning features are disabled in this version

## Support

For issues or questions:
1. Check browser console for errors
2. Verify both server and frontend are running
3. Test with default admin account
4. Check network requests in developer tools

---

**Last Updated:** 2025-11-11  
**Version:** 3.0.0 (Local Version)