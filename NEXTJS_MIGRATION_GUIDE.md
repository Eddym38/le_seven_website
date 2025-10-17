# Next.js 14 Migration Guide for Le Seven Restaurant

## Overview
This guide outlines the complete migration from React + Vite to Next.js 14 (App Router) with enhanced SEO, performance, and maintainability.

## Migration Strategy

### Phase 1: Setup New Next.js Project Structure
```bash
# Create new Next.js project in a separate directory
npx create-next-app@latest le-seven-nextjs --typescript --tailwind --app --no-src-dir

# Or migrate in place (recommended approach below)
```

### Phase 2: Key Architectural Changes

#### 1. **Project Structure**
```
le-seven-nextjs/
├── app/
│   ├── page.tsx                      # Home page (replaces src/pages/Home.tsx)
│   ├── layout.tsx                    # Root layout with Navbar/Footer
│   ├── loading.tsx                   # Loading UI (replaces Preloader)
│   ├── not-found.tsx                 # 404 page
│   ├── menu/
│   │   └── page.tsx                  # Menu page
│   ├── gallery/
│   │   └── page.tsx                  # Gallery page
│   ├── contact/
│   │   └── page.tsx                  # Contact page
│   ├── privatisation/
│   │   └── page.tsx                  # Privatization page
│   ├── blog/
│   │   ├── page.tsx                  # Blog index
│   │   └── [slug]/
│   │       └── page.tsx              # Individual blog post
│   └── api/
│       └── reservations/
│           └── route.ts              # API route for reservations
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollToTop.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── MenuSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ...
│   ├── gallery/
│   │   ├── ImageCarousel.tsx
│   │   └── ImageLightbox.tsx
│   └── ui/
│       └── AnimatedSection.tsx
├── lib/
│   ├── metadata.ts                   # SEO metadata utilities
│   └── resend.ts                     # Email service
├── public/
│   ├── images/                       # All images from src/assets
│   ├── sitemap.xml                   # Generated sitemap
│   └── robots.txt                    # Robots file
├── styles/
│   └── globals.css                   # Tailwind imports
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── .env.local                        # Environment variables
```

#### 2. **Key Dependencies to Add**
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^12.23.22",
    "lucide-react": "^0.344.0",
    "resend": "^6.1.3"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.5.3"
  }
}
```

#### 3. **Migration Checklist**

**Router Migration:**
- ✅ Replace `react-router-dom` with Next.js App Router
- ✅ Convert `<Link>` to `next/link`
- ✅ Replace `useLocation` with `usePathname` from `next/navigation`
- ✅ Remove `BrowserRouter` wrapper

**Image Optimization:**
- ✅ Replace `<img>` tags with `next/image`
- ✅ Move all images from `src/assets` to `public/images`
- ✅ Update import paths (use relative paths from public)
- ✅ Configure image domains in next.config.js

**Component Updates:**
- ✅ Add `"use client"` directive to components using hooks, animations, or events
- ✅ Keep server components for static content
- ✅ Update Navbar navigation logic for Next.js
- ✅ Remove PreLoader component, use Next.js loading.tsx

**API Routes:**
- ✅ Create `/app/api/reservations/route.ts`
- ✅ Move Resend email logic from Vercel functions
- ✅ Update environment variables

**SEO Implementation:**
- ✅ Add metadata exports to all pages
- ✅ Implement generateMetadata for dynamic pages
- ✅ Add JSON-LD structured data
- ✅ Create sitemap.xml generator
- ✅ Add robots.txt

#### 4. **Environment Variables**
Create `.env.local`:
```env
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_SITE_URL=https://www.leseven-grenoble.fr
```

#### 5. **Build and Deploy**
```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Deploy to Vercel
vercel --prod
```

## Detailed Migration Steps

### Step 1: Create Next.js Config
See: `next.config.js`

### Step 2: Update TypeScript Config
See: `tsconfig.json` modifications

### Step 3: Create Root Layout
See: `app/layout.tsx`

### Step 4: Migrate Pages
Each page needs:
- Metadata export
- Server or Client component designation
- Updated imports

### Step 5: Update Components
- Add "use client" where needed
- Update image imports
- Update navigation logic

### Step 6: Create API Routes
See: `app/api/reservations/route.ts`

### Step 7: Add SEO Enhancements
- Metadata API
- Structured data
- Sitemap generation

## Performance Optimizations

1. **Image Optimization**
   - Use next/image with proper sizes
   - Add priority to above-the-fold images
   - Lazy load gallery images

2. **Code Splitting**
   - Automatic with Next.js App Router
   - Dynamic imports for heavy components

3. **Static Generation**
   - All pages use SSG by default
   - ISR for blog posts if needed

4. **Font Optimization**
   - Use next/font for Google Fonts
   - Prevent layout shift

## SEO Best Practices Implemented

1. **Metadata API** - Each page has comprehensive metadata
2. **Structured Data** - Restaurant JSON-LD on home page
3. **Sitemap** - Auto-generated sitemap.xml
4. **Robots.txt** - Proper crawling instructions
5. **Canonical URLs** - Prevent duplicate content
6. **Open Graph** - Social media optimization
7. **Semantic HTML** - Proper heading hierarchy

## Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works (no client-side errors)
- [ ] Images load and are optimized
- [ ] Forms submit successfully
- [ ] API routes work
- [ ] SEO metadata is present on all pages
- [ ] Build completes without errors
- [ ] Lighthouse score > 90 for all metrics

## Common Issues and Solutions

### Issue 1: "use client" directive needed
**Solution:** Add `"use client"` at the top of components using:
- useState, useEffect, other hooks
- Event handlers (onClick, onChange, etc.)
- Framer Motion animations
- Browser APIs

### Issue 2: Image imports not working
**Solution:** Move images to `/public/images` and reference as `/images/filename.jpg`

### Issue 3: Hydration errors
**Solution:** Ensure server and client render the same HTML initially

### Issue 4: API routes not found
**Solution:** Check file is named `route.ts` not `index.ts`

## Next Steps

1. Review generated files in this migration
2. Test locally with `npm run dev`
3. Fix any TypeScript errors
4. Test all functionality
5. Run production build
6. Deploy to Vercel

## Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [next/image](https://nextjs.org/docs/app/api-reference/components/image)
