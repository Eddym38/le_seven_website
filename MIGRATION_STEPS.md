# Step-by-Step Next.js Migration Guide

## Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager
- Git for version control
- Basic understanding of React and Next.js

## Phase 1: Project Setup (30 minutes)

### Step 1: Create a New Next.js Project

```bash
# Option A: Create new Next.js project in a separate directory
npx create-next-app@latest le-seven-nextjs --typescript --tailwind --app --no-src-dir
cd le-seven-nextjs

# Option B: Or manually in current project (backup first!)
# Backup current project
cp -r . ../le-seven-backup

# Install Next.js dependencies
npm install next@14 react@18 react-dom@18
npm install -D @types/node @types/react @types/react-dom

# Remove React Router and Vite
npm uninstall react-router-dom vite @vitejs/plugin-react
```

### Step 2: Update package.json Scripts

Replace your scripts section in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postbuild": "next-sitemap"
  }
}
```

### Step 3: Copy Configuration Files

```bash
# Copy from NEXT_APP_EXAMPLES folder to project root:
cp NEXT_APP_EXAMPLES/next.config.example.js ./next.config.js
cp NEXT_APP_EXAMPLES/next-sitemap.config.example.js ./next-sitemap.config.js
cp NEXT_APP_EXAMPLES/.env.example.nextjs ./.env.local

# Edit .env.local with your actual values
```

### Step 4: Update TypeScript Configuration

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 5: Update Tailwind Configuration

Edit `tailwind.config.js`:

```javascript
// Keep your existing config but update content paths
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Keep your existing theme customizations
    },
  },
  plugins: [],
};
```

### Step 6: Create globals.css

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Keep any custom global styles from your index.css */
```

## Phase 2: File Structure Migration (1-2 hours)

### Step 7: Create Directory Structure

```bash
# Create app directory structure
mkdir -p app/{api/reservations,menu,gallery,contact,privatisation,blog}
mkdir -p components/{layout,home,ui,gallery}
mkdir -p lib
mkdir -p public/images

# Move assets
cp -r src/assets/images/* public/images/
```

### Step 8: Create Root Layout

Copy and adapt `NEXT_APP_EXAMPLES/layout.example.tsx` to `app/layout.tsx`

Key points:
- Add font imports
- Set up global metadata
- Include global CSS
- Structure should wrap all pages

### Step 9: Create Loading UI

Create `app/loading.tsx`:

```typescript
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-pacifico text-4xl text-primary mb-4 animate-pulse">
          Le Seven
        </h1>
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Phase 3: Component Migration (2-3 hours)

### Step 10: Migrate Layout Components

#### Navbar Migration

```bash
# Create client component for Navbar
touch components/layout/Navbar.tsx
```

In `components/layout/Navbar.tsx`:
```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ... rest of your Navbar logic
  // Replace <Link to="/"> with <Link href="/">
  // Replace useLocation() with usePathname()
}
```

Key changes:
- Add `'use client'` at top
- Replace `react-router-dom` imports with Next.js
- `<Link to="/">` → `<Link href="/">`
- `useLocation()` → `usePathname()`
- Keep all styling and animations

#### Footer Migration

Similar process - copy your Footer component and:
- Add `'use client'` if it has interactivity
- Update Link imports
- Keep existing styling

### Step 11: Migrate Page Sections

For each section component (HeroSection, MenuSection, etc.):

**If component uses hooks/animations/events:**
```typescript
'use client';

// Add directive at top, rest stays the same
```

**If component is purely presentational:**
```typescript
// No directive needed - it's a Server Component
// But update image imports to use next/image
```

Example for MenuSection (Server Component):
```typescript
import Image from 'next/image';
import Link from 'next/link';

export function MenuSection() {
  return (
    <section>
      <Image
        src="/images/menu-preview.jpg"
        alt="Menu preview"
        width={400}
        height={300}
        loading="lazy"
      />
      <Link href="/menu">View Full Menu</Link>
    </section>
  );
}
```

### Step 12: Migrate Utility Components

**AnimatedSection** (Client Component):
```typescript
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ... rest of component
```

**ScrollToTop** (Client Component):
```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ... rest of component
```

## Phase 4: Pages Migration (1-2 hours)

### Step 13: Create Home Page

Copy and adapt `NEXT_APP_EXAMPLES/page.example.tsx` to `app/page.tsx`

### Step 14: Create Other Pages

For each route, create:
- `app/menu/page.tsx`
- `app/gallery/page.tsx`
- `app/contact/page.tsx`
- `app/privatisation/page.tsx`

Each page should:
1. Export metadata
2. Import and render components
3. Add structured data if relevant

Example for Menu page:

```typescript
// app/menu/page.tsx
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = generatePageMetadata({
  title: 'Notre Menu',
  description: 'Découvrez notre carte méditerranéenne...',
  path: '/menu',
});

export default function MenuPage() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Menu content */}
      </main>
      <Footer />
    </div>
  );
}
```

## Phase 5: API Routes (30 minutes)

### Step 15: Create API Routes

Copy `NEXT_APP_EXAMPLES/api-route.example.ts` to `app/api/reservations/route.ts`

Update any Vercel function paths in your components:
```typescript
// Old
fetch('/.netlify/functions/send-email')

// New
fetch('/api/reservations')
```

### Step 16: Test API Routes

```bash
# Start dev server
npm run dev

# Test API endpoint
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com",...}'
```

## Phase 6: SEO Enhancement (1 hour)

### Step 17: Create Metadata Utilities

Copy `NEXT_APP_EXAMPLES/metadata-utils.example.ts` to `lib/metadata.ts`

### Step 18: Add Structured Data

In `app/page.tsx`, add JSON-LD:
```typescript
const structuredData = generateRestaurantStructuredData();

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

### Step 19: Generate Sitemap

```bash
# Install next-sitemap
npm install next-sitemap

# Configuration is already in next-sitemap.config.js
# Sitemap will be generated after build
```

## Phase 7: Testing (1-2 hours)

### Step 20: Run Development Server

```bash
npm run dev
```

Test all pages:
- [ ] Home page loads
- [ ] All navigation links work
- [ ] Forms submit correctly
- [ ] Images display properly
- [ ] Animations work
- [ ] Mobile responsive

### Step 21: Check Console for Errors

Common issues:
- Hydration errors: ensure server and client render same HTML
- Missing `'use client'`: add to components with hooks/events
- Image errors: check paths are correct (`/images/...`)
- API errors: verify .env.local is set up

### Step 22: Build for Production

```bash
npm run build
```

Fix any build errors before proceeding.

### Step 23: Test Production Build

```bash
npm run start
```

Visit http://localhost:3000 and test thoroughly.

## Phase 8: Deployment (30 minutes)

### Step 24: Prepare for Vercel Deployment

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Initialize Vercel project
vercel

# Or push to GitHub and connect to Vercel dashboard
```

### Step 25: Configure Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all variables from `.env.local`
5. Set for: Production, Preview, Development

Required variables:
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

### Step 26: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (if GitHub integration)
git push origin main
```

### Step 27: Verify Deployment

- [ ] Visit your production URL
- [ ] Test all pages
- [ ] Submit a test reservation
- [ ] Check sitemap: yourdomain.com/sitemap.xml
- [ ] Check robots.txt: yourdomain.com/robots.txt
- [ ] Run Lighthouse audit (should be >90)

## Phase 9: Post-Migration (Ongoing)

### Step 28: Monitor and Optimize

- Set up error tracking (Sentry, etc.)
- Monitor Core Web Vitals
- Check Google Search Console
- Verify structured data in Google Rich Results Test

### Step 29: Update DNS (if changing domain)

If deploying to new domain:
1. Update A/CNAME records to point to Vercel
2. Wait for DNS propagation (24-48 hours)
3. Set up SSL certificate (automatic with Vercel)

### Step 30: Redirect Old URLs (if needed)

In `next.config.js`:
```javascript
async redirects() {
  return [
    {
      source: '/old-path',
      destination: '/new-path',
      permanent: true,
    },
  ];
}
```

## Troubleshooting Common Issues

### Hydration Errors
```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```
**Fix**: Ensure client components don't render different content on server vs client

### Image Optimization Errors
**Fix**: Check images exist in `/public/images/` and paths are correct

### API Route Not Found
**Fix**: Ensure file is named `route.ts` in correct directory

### Build Errors
**Fix**: Run `npm run build` and fix all TypeScript/ESLint errors

## Estimated Total Time

- **Phase 1**: 30 minutes
- **Phase 2**: 1-2 hours
- **Phase 3**: 2-3 hours
- **Phase 4**: 1-2 hours
- **Phase 5**: 30 minutes
- **Phase 6**: 1 hour
- **Phase 7**: 1-2 hours
- **Phase 8**: 30 minutes

**Total**: ~8-12 hours for complete migration

## Next Steps After Migration

1. Set up monitoring and analytics
2. Optimize images further (consider Cloudinary CDN)
3. Add ISR for blog posts if needed
4. Implement internationalization if needed
5. Set up automated testing
6. Configure CI/CD pipeline

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [next-sitemap Documentation](https://github.com/iamvishnusankar/next-sitemap)
