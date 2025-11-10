# Inventory Management System - User Guide

## Getting Started

### Creating Your Account

1. Navigate to https://ctaq1m5il7uf.space.minimax.io
2. Click "Don't have an account? Sign up"
3. Fill in your details:
   - Full Name
   - Email Address (must be valid)
   - Password (minimum 6 characters)
4. Click "Create Account"
5. **Important**: Check your email inbox for a confirmation email from Supabase
6. Click the confirmation link in the email
7. Return to the app and log in

**Note**: The first user to register automatically receives admin privileges.

### Logging In

1. Enter your registered email
2. Enter your password
3. Click "Sign In"
4. You'll be redirected to the Dashboard

## Dashboard Overview

The Dashboard provides a quick snapshot of your inventory:

### Key Metrics
- **Total Products**: Number of active products in your inventory
- **Inventory Value**: Total value based on cost price × current stock
- **Low Stock Items**: Count of products at or below minimum stock level
- **Total Stock Units**: Sum of all product quantities

### Low Stock Alerts Table
- Shows products that need reordering
- Displays SKU, name, current stock, minimum stock, and status
- Click "View All" to see complete low stock report

## Managing Products

### Adding a New Product

1. Navigate to "Products" in the sidebar
2. Click "Add Product" button
3. Fill in the required fields:
   - **SKU** (required) - Unique product identifier
   - **Product Name** (required)
   - **Current Stock** (required) - Starting quantity
   - **Min Stock Level** (required) - Reorder threshold
4. Fill in optional fields:
   - Description
   - Category
   - Supplier
   - Cost Price & Selling Price
   - Manufacturer
   - Warehouse Location
   - Weight & Dimensions
   - Barcode
5. Click "Add Product"

### Searching & Filtering Products

**Search Box**:
- Type product name or SKU
- Results update in real-time

**Category Filter**:
- Select a category from the dropdown
- Shows only products in that category
- Select "All Categories" to clear filter

### Editing a Product

1. Find the product in the table
2. Click the edit icon (pencil)
3. Update the information
4. Click "Update Product"

### Deleting a Product

1. Find the product in the table
2. Click the delete icon (trash)
3. Confirm deletion
4. **Warning**: This action cannot be undone

## Categories Management

### Adding a Category

1. Navigate to "Categories"
2. Click "Add Category"
3. Enter category name (required)
4. Enter description (optional)
5. Click "Add"

### Editing/Deleting Categories

- Click edit icon to modify
- Click delete icon to remove
- **Note**: Cannot delete categories that have associated products

## Suppliers Management

### Adding a Supplier

1. Navigate to "Suppliers"
2. Click "Add Supplier"
3. Fill in supplier information:
   - Name (required)
   - Contact Person
   - Email
   - Phone
   - Address
   - Notes
4. Click "Add"

## Stock Movements

### Recording Stock Movement

1. Navigate to "Stock Movements"
2. Click "Record Movement"
3. Select the product
4. Choose movement type:
   - **Incoming**: Add stock (purchases, returns)
   - **Outgoing**: Remove stock (sales, usage)
   - **Adjustment**: Set stock to specific number
5. Enter quantity
6. Enter reason (optional but recommended)
7. Add notes (optional)
8. Click "Record Movement"

**Important Notes**:
- Incoming adds to current stock
- Outgoing subtracts from current stock
- Adjustment sets stock to the exact number entered
- System prevents negative stock for outgoing movements
- All movements are logged with timestamp and user

### Viewing Movement History

- Table shows all movements in chronological order
- Columns: Date, Product, Type, Quantity, Before, After, Reason
- Most recent movements appear first

## Low Stock Alerts

### Understanding Alerts

**Out of Stock**:
- Products with zero quantity
- Displayed in red alert table
- Requires immediate attention

**Low Stock**:
- Products at or below minimum stock level
- Still have some quantity available
- Should be reordered soon

### Reorder Quantity

- System suggests reordering enough to reach 2× minimum stock
- Example: Min stock = 10, Current = 2
- Reorder Qty = (10 × 2) - 2 = 18

### Taking Action

- Note the SKU and reorder quantity
- Contact your supplier
- Record incoming stock when shipment arrives

## Reports & Data Export

### Viewing Reports

1. Navigate to "Reports"
2. View overall statistics
3. See inventory breakdown by category
4. Review total stock and values

### Exporting Data

**Export Full Inventory**:
- Downloads CSV with all product details
- Includes: SKU, Name, Category, Stock, Prices, Location
- Filename includes current date

**Export Low Stock Report**:
- CSV of products needing reorder
- Includes reorder quantity suggestions
- Useful for purchase planning

**Export Stock Movements**:
- Complete history of all stock transactions
- Includes: Date, Product, Type, Quantity, Changes
- Useful for auditing

### Using Exported Data

- Open CSV files in Excel, Google Sheets, or any spreadsheet software
- Data is formatted in comma-separated values
- Can be used for:
  - Purchase orders
  - Financial reporting
  - Inventory audits
  - Trend analysis

## Mobile Usage

### Accessing on Mobile Devices

- Application is fully responsive
- Works on tablets and smartphones
- All features available on mobile

### Mobile Tips

- Tables scroll horizontally if needed
- Forms are touch-optimized
- Use sidebar menu for navigation
- Modals adapt to screen size

## Best Practices

### Product Management
- Use consistent SKU format
- Keep descriptions clear and detailed
- Set realistic minimum stock levels
- Update prices regularly

### Stock Control
- Record movements immediately
- Always include a reason for movements
- Regular stock audits via adjustments
- Check low stock alerts daily

### Data Organization
- Create logical categories
- Maintain accurate supplier information
- Use warehouse location codes consistently
- Keep barcodes updated if using scanners

### Reporting
- Export data regularly for backup
- Review inventory value monthly
- Monitor stock movement trends
- Act on low stock alerts promptly

## Troubleshooting

### Cannot Log In
- Verify email is confirmed (check confirmation email)
- Check password is correct
- Try "Forgot Password" if needed
- Clear browser cache and cookies

### Product Not Saving
- Ensure all required fields are filled
- Check SKU is unique
- Verify numeric fields have valid numbers
- Check for error messages in red

### Stock Movement Issues
- Verify sufficient stock for outgoing movements
- Check quantity is positive number
- Ensure product is selected
- Confirm you're logged in

### Data Not Loading
- Refresh the page
- Check internet connection
- Log out and log back in
- Clear browser cache

## Tips for Efficiency

1. **Use Search**: Faster than scrolling through tables
2. **Set Alerts**: Configure minimum stock levels carefully
3. **Regular Updates**: Keep stock movements current
4. **Export Often**: Regular backups via CSV export
5. **Mobile Ready**: Use on warehouse floor with tablet
6. **Batch Operations**: Record multiple movements at once

## Security Notes

- Never share your login credentials
- Log out when finished on shared computers
- Admin accounts have full access - protect accordingly
- Regular password changes recommended
- All data is encrypted in transit and at rest

## Getting Help

If you encounter issues:
1. Check this user guide
2. Review the troubleshooting section
3. Check browser console for error messages
4. Verify internet connection
5. Contact your system administrator

---

**System Version**: 1.0
**Last Updated**: November 2025
