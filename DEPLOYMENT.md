# Inventory Management System - Deployment Guide

## Deployment Information

**Deployed URL**: https://ctaq1m5il7uf.space.minimax.io

**Database**: Supabase PostgreSQL
- Project ID: lnukcsvalpqqgtfgqtfa
- Region: US East

## Initial Setup

### Creating the First Admin User

The system is configured so that the **first user to register will automatically become an administrator** with full access to all features.

**Important Notes about Supabase Authentication:**
- Supabase requires email confirmation by default
- After registration, check your email inbox for a confirmation link
- Click the confirmation link to verify your email
- Then return to the login page and sign in with your credentials

**Steps to Create Admin Account:**

1. Visit the deployed application: https://ctaq1m5il7uf.space.minimax.io
2. Click "Don't have an account? Sign up"
3. Fill in the registration form:
   - Full Name: Your Name
   - Email: your-email@example.com
   - Password: (minimum 6 characters)
4. Click "Create Account"
5. **Check your email** for the confirmation link from Supabase
6. Click the confirmation link in the email
7. Return to the app and log in with your email and password
8. You will now have admin access to the system

### Alternative: Disable Email Confirmation (Development Only)

If you have access to the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Settings
3. Find "Email Auth" section
4. Toggle OFF "Enable email confirmations"
5. Save changes
6. Now you can register and login without email confirmation

## Sample Data

The system comes pre-loaded with sample data:
- **5 Categories**: Sewing Machine Motors, Machine Parts, Needles & Accessories, Belts & Pulleys, Electronics
- **3 Suppliers**: Industrial Supply Co., Motor Parts Ltd., Sewing Tech Inc.
- **11 Products**: Various sewing machine parts and motors with realistic stock levels

## Features

### Dashboard
- Overview statistics (Total Products, Inventory Value, Low Stock Items, Total Stock Units)
- Quick view of low stock alerts
- Real-time inventory valuation

### Products Management
- Full CRUD operations (Create, Read, Update, Delete)
- Advanced search by name or SKU
- Filter by category
- Comprehensive product details including:
  - SKU, Name, Description
  - Category and Supplier
  - Cost Price and Selling Price
  - Current Stock and Minimum Stock Level
  - Manufacturer, Warehouse Location
  - Weight, Dimensions, Barcode

### Categories Management
- Create and manage product categories
- Edit category names and descriptions
- Delete unused categories

### Suppliers Management
- Maintain supplier information
- Contact details (person, email, phone)
- Address and notes

### Stock Movements
- Record incoming stock (purchases)
- Record outgoing stock (sales)
- Stock adjustments
- Complete movement history
- Automatic stock level updates

### Low Stock Alerts
- Real-time monitoring of low stock items
- Out-of-stock products list
- Reorder quantity suggestions
- Visual status indicators

### Reports & Analytics
- Overall inventory statistics
- Inventory breakdown by category
- Export to CSV:
  - Full inventory report
  - Low stock report
  - Stock movements history

## Technical Stack

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

## Database Schema

### Tables
1. **categories** - Product categories
2. **suppliers** - Supplier information
3. **products** - Product catalog
4. **stock_movements** - Stock transaction history
5. **user_profiles** - User accounts and roles

### Row Level Security (RLS)
All tables have RLS policies configured to ensure:
- Only authenticated users can access data
- All authenticated users can perform CRUD operations
- Data security at the database level

## User Roles

### Admin
- Full access to all features
- Can manage all data
- First registered user automatically becomes admin

### Regular User
- Can view all data
- Can manage products, categories, and suppliers
- Can record stock movements
- Can view reports and export data

## Support & Maintenance

### Backup
- Supabase automatically backs up your database
- Point-in-time recovery available via Supabase dashboard

### Scaling
- Current configuration supports 100-500 products
- Can scale to thousands of products with performance optimization
- Horizontal scaling available via Supabase

### Updates
- Frontend can be rebuilt and redeployed from source
- Database migrations can be applied via Supabase SQL editor
- No downtime required for most updates

## Troubleshooting

### Cannot Login After Registration
- Check your email for confirmation link
- Verify you clicked the confirmation link
- Make sure you're using the correct email and password
- Try "Forgot Password" if needed

### Products Not Loading
- Check browser console for errors
- Verify you're logged in
- Check network connection
- Contact support if issue persists

### Stock Movements Not Recording
- Verify you have sufficient stock for outgoing movements
- Check that the product exists
- Ensure quantity is a positive number
- Verify your user session is active

## Contact

For technical support or questions about deployment:
- Review the application code in the repository
- Check Supabase dashboard for database logs
- Verify RLS policies are correctly configured
