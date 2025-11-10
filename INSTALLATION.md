# Local Installation Guide

Complete guide for setting up the Inventory Management System on your local machine or server.

## Table of Contents

- [System Requirements](#system-requirements)
- [Quick Start](#quick-start)
- [Detailed Installation](#detailed-installation)
- [Configuration](#configuration)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Software Requirements

- **Node.js**: Version 18.x or higher
- **Package Manager**: pnpm (recommended) or npm
- **Database**: PostgreSQL 14+ or Supabase account
- **Web Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Operating System**: Windows 10+, macOS 11+, or Linux

### Hardware Requirements

- **Minimum**: 2GB RAM, 2 CPU cores, 10GB disk space
- **Recommended**: 4GB RAM, 4 CPU cores, 20GB disk space

### Optional Hardware

- **Barcode Scanner**: USB barcode scanner (keyboard emulation mode)
- **Camera**: For mobile barcode scanning

## Quick Start

### 1. Clone or Download the Project

```bash
# Download the project files to your local machine
cd /path/to/your/workspace
```

### 2. Install Dependencies

```bash
cd inventory-system
pnpm install
# or
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## Detailed Installation

### Step 1: Database Setup

#### Option A: Using Supabase (Recommended)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Get Database Credentials**
   - Navigate to Project Settings > API
   - Copy the following:
     - Project URL
     - Anon/Public Key
     - Service Role Key (keep secure)

3. **Configure Authentication**
   - Go to Authentication > Settings
   - **Disable email confirmation** (for warehouse use):
     - Uncheck "Enable email confirmations"
   - Set password requirements as needed
   - Configure email templates for password resets

4. **Run Database Migrations**

   Navigate to the SQL Editor in Supabase dashboard and run the following migrations in order:

   **Migration 1: Categories Table**
   ```sql
   -- Run the contents of supabase/migrations/1762183403_create_categories_table.sql
   ```

   **Migration 2: Suppliers Table**
   ```sql
   -- Run the contents of supabase/migrations/1762183405_create_suppliers_table.sql
   ```

   **Migration 3: Products Table**
   ```sql
   -- Run the contents of supabase/migrations/1762183406_create_products_table.sql
   ```

   **Migration 4: Stock Movements Table**
   ```sql
   -- Run the contents of supabase/migrations/1762183407_create_stock_movements_table.sql
   ```

   **Migration 5: User Profiles Table**
   ```sql
   -- Run the contents of supabase/migrations/1762183409_create_user_profiles_table.sql
   ```

   **Migration 6: First User Admin**
   ```sql
   -- Run the contents of supabase/migrations/1762184633_make_first_user_admin.sql
   ```

   **Migration 7: Enhanced User Policies**
   ```sql
   -- Run the contents of supabase/migrations/1730881896_add_barcode_index_and_admin_policies.sql
   ```

   **Migration 8: Default Admin User**
   ```sql
   -- Run the contents of supabase/migrations/1730881897_create_default_admin.sql
   ```

5. **Deploy Edge Functions**

   Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

   Login to Supabase:
   ```bash
   supabase login
   ```

   Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

   Deploy the user management function:
   ```bash
   supabase functions deploy user-management
   ```

#### Option B: Using Local PostgreSQL

1. **Install PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib

   # macOS (with Homebrew)
   brew install postgresql

   # Windows
   # Download installer from postgresql.org
   ```

2. **Create Database**
   ```bash
   psql -U postgres
   CREATE DATABASE inventory_db;
   \q
   ```

3. **Run Migrations**
   ```bash
   psql -U postgres -d inventory_db -f supabase/migrations/*.sql
   ```

### Step 2: Application Setup

1. **Install Project Dependencies**

   ```bash
   cd inventory-system
   pnpm install
   ```

2. **Configure Environment Variables**

   Create `.env` file:

   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here

   # Optional: Analytics, monitoring, etc.
   # VITE_ANALYTICS_ID=your-analytics-id
   ```

3. **Verify Configuration**

   ```bash
   # Test database connection
   pnpm dev
   ```

   Navigate to `http://localhost:5173` and try logging in.

### Step 3: Default Admin Account

The system comes with a pre-configured admin account:

**Credentials:**
- Email: `admin@inventory.local`
- Password: `password`

**IMPORTANT:** Change the admin password immediately after first login:
1. Login with default credentials
2. Navigate to User Management
3. Click the key icon next to the admin user
4. Set a new secure password

### Step 4: Configure Barcode Scanner

#### USB Barcode Scanner Setup

1. **Connect Scanner**
   - Plug USB barcode scanner into computer
   - Most scanners work in "keyboard emulation" mode by default

2. **Test Scanner**
   - Open any text editor
   - Scan a barcode
   - Scanner should type the barcode number

3. **Configure in Application**
   - Go to Products page
   - Click "Scan Barcode" button
   - Choose "Manual Input" mode
   - Scan barcode (it will auto-fill the field)
   - Press Enter or click "Use This Barcode"

#### Mobile Camera Scanner

1. **Enable HTTPS**
   - Camera API requires HTTPS (except localhost)
   - For local network testing, use ngrok or similar

2. **Grant Camera Permissions**
   - Browser will prompt for camera access
   - Allow camera permissions

3. **Use Camera Scanner**
   - Click "Scan Barcode" button
   - Choose "Camera Scan" mode
   - Point camera at barcode
   - System will auto-detect and scan

## Configuration

### Email Setup (Password Resets)

1. **Configure SMTP in Supabase**
   - Go to Project Settings > Auth > SMTP Settings
   - Enter your SMTP details:
     - SMTP Host
     - SMTP Port
     - SMTP User
     - SMTP Password
     - Sender Email

2. **Test Email**
   - Use password reset feature
   - Check spam folder if not received

### User Roles

The system supports three user roles:

1. **Admin**
   - Full system access
   - User management
   - All CRUD operations
   - System configuration

2. **Manager**
   - Inventory management
   - Reports access
   - Cannot manage users

3. **User**
   - Basic operations
   - View-only for reports
   - Limited permissions

### Customization

#### Branding

Edit `src/components/Layout.tsx`:

```typescript
// Change company name
<h1 className="text-xl font-bold text-gray-800">Your Company Name</h1>
```

#### Default Settings

Edit `src/lib/constants.ts` (create if doesn't exist):

```typescript
export const DEFAULT_CURRENCY = 'USD';
export const DEFAULT_WEIGHT_UNIT = 'kg';
export const LOW_STOCK_THRESHOLD = 10;
```

## Production Deployment

### Build for Production

```bash
# Create production build
pnpm build

# Output will be in dist/ folder
```

### Deployment Options

#### Option 1: Static Hosting (Netlify, Vercel)

1. **Connect Git Repository**
   - Push code to GitHub
   - Connect to Netlify/Vercel
   - Auto-deploy on push

2. **Configure Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Add environment variables

#### Option 2: Self-Hosted (Nginx)

1. **Install Nginx**
   ```bash
   sudo apt-get install nginx
   ```

2. **Copy Build Files**
   ```bash
   sudo cp -r dist/* /var/www/inventory
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name inventory.yourdomain.com;
       root /var/www/inventory;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable HTTPS (Let's Encrypt)**
   ```bash
   sudo certbot --nginx -d inventory.yourdomain.com
   ```

#### Option 3: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   FROM nginx:alpine
   COPY --from=0 /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run**
   ```bash
   docker build -t inventory-system .
   docker run -p 80:80 inventory-system
   ```

### SSL/HTTPS Setup

For production, always use HTTPS:

**Using Let's Encrypt (Free)**
```bash
sudo certbot --nginx -d yourdomain.com
```

**Using CloudFlare (Recommended)**
- Point domain to CloudFlare
- Enable automatic HTTPS
- Configure firewall rules

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Symptoms:**
- Cannot connect to database
- "Failed to fetch" errors

**Solutions:**
```bash
# Check environment variables
cat .env

# Verify Supabase URL and keys are correct
# Ensure no trailing slashes in SUPABASE_URL
# Check network connectivity
```

#### 2. Email Verification Required

**Problem:** Users stuck on email confirmation screen

**Solution:**
1. Go to Supabase Dashboard
2. Authentication > Settings
3. Uncheck "Enable email confirmations"
4. Save changes

#### 3. Admin User Cannot Login

**Problem:** Default admin credentials not working

**Solutions:**
```sql
-- Option 1: Reset admin password in Supabase SQL Editor
UPDATE auth.users 
SET encrypted_password = '$2a$10$xRKT8VqVvVVTmVXWGvVOAOKhF8xvVSrBJrKJPLcZb3bvCJPTjKPG6'
WHERE email = 'admin@inventory.local';

-- Option 2: Create new admin user
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_user_meta_data)
VALUES ('newadmin@inventory.local', '$2a$10$...', NOW(), '{"full_name":"New Admin"}');

INSERT INTO user_profiles (id, full_name, role)
SELECT id, 'New Admin', 'admin' FROM auth.users WHERE email = 'newadmin@inventory.local';
```

#### 4. Barcode Scanner Not Working

**Camera Scanner Issues:**
```javascript
// Check browser support
if (!('BarcodeDetector' in window)) {
    console.log('Barcode Detection not supported. Use manual input.');
}

// Check HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.log('Camera requires HTTPS');
}
```

**USB Scanner Issues:**
- Ensure scanner is in keyboard emulation mode
- Test in a text editor first
- Check USB connection
- Try a different USB port

#### 5. Edge Functions Not Working

**Problem:** User management functions fail

**Solutions:**
```bash
# Redeploy edge functions
supabase functions deploy user-management

# Check function logs
supabase functions logs user-management

# Verify service role key is set
supabase secrets list
```

#### 6. Build Errors

**Problem:** `pnpm build` fails

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Update dependencies
pnpm update

# Check Node version
node --version  # Should be 18+
```

### Performance Optimization

#### Database Indexes

Ensure indexes are created for better performance:

```sql
-- Check existing indexes
SELECT * FROM pg_indexes WHERE tablename = 'products';

-- Add indexes if missing
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_name ON products(name);
```

#### Caching

For production, enable caching:

```nginx
# Nginx caching configuration
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Logs and Debugging

#### Enable Debug Mode

```env
# .env
VITE_DEBUG=true
```

#### Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors or warnings

#### Check Network Requests

1. Open DevTools > Network tab
2. Filter by XHR/Fetch
3. Check failed requests
4. Inspect request/response data

### Getting Help

If you encounter issues not covered here:

1. Check browser console for errors
2. Review Supabase logs
3. Verify environment variables
4. Check database migrations
5. Test with default admin account

### Support Resources

- **Documentation**: README.md, USER-GUIDE.md
- **Database**: Supabase Dashboard > SQL Editor
- **Logs**: Supabase Dashboard > Logs
- **Community**: Stack Overflow (tag: supabase)

## Security Best Practices

### Production Checklist

- [ ] Change default admin password
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up regular database backups
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable Supabase RLS policies
- [ ] Configure secure SMTP settings
- [ ] Set up monitoring and alerts
- [ ] Regular security updates

### Regular Maintenance

**Daily:**
- Monitor system logs
- Check for failed logins
- Verify backup completion

**Weekly:**
- Review user access
- Check disk space
- Update dependencies

**Monthly:**
- Security audit
- Performance review
- Database optimization
- Update documentation

## Backup and Recovery

### Database Backup

**Automated Backups (Supabase):**
- Supabase Pro: Daily automatic backups
- Manual backups: Download from dashboard

**Manual Backup:**
```bash
# Export database
supabase db dump -f backup.sql

# Restore database
supabase db reset --db-url "postgresql://..."
psql -f backup.sql
```

### Application Backup

```bash
# Backup entire application
tar -czf inventory-backup-$(date +%Y%m%d).tar.gz inventory-system/

# Restore
tar -xzf inventory-backup-YYYYMMDD.tar.gz
```

## Scaling Considerations

### Horizontal Scaling

- Use load balancer (Nginx, HAProxy)
- Deploy multiple instances
- Use CDN for static assets

### Database Scaling

- Enable connection pooling
- Optimize queries
- Consider read replicas
- Implement caching (Redis)

### Monitoring

- Set up application monitoring (Sentry, LogRocket)
- Database monitoring (Supabase dashboard)
- Server monitoring (Prometheus, Grafana)

## License

Private use for inventory management operations.

---

**Last Updated:** 2025-11-06

For the latest updates and detailed documentation, refer to the project README.md
