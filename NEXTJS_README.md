# Le Seven - Next.js 14 Migration Documentation

## 📚 Complete Migration Package

This documentation package contains everything you need to migrate the Le Seven restaurant website from React + Vite to Next.js 14 with enhanced SEO and performance.

## 🗂️ Documentation Files

### 🎯 Start Here
1. **`NEXTJS_MIGRATION_GUIDE.md`** - Overview and architecture
2. **`MIGRATION_STEPS.md`** - Step-by-step migration instructions (8-12 hours)
3. **`VERCEL_DEPLOY.md`** - Quick deployment reference

### 📦 Example Files
All examples are in the `NEXT_APP_EXAMPLES/` directory:

#### Configuration Files
- `next.config.example.js` - Next.js configuration
- `next-sitemap.config.example.js` - Sitemap generation
- `.env.example.nextjs` - Environment variables template
- `package.nextjs.json` - Updated dependencies

#### Application Files
- `layout.example.tsx` - Root layout with fonts and metadata
- `page.example.tsx` - Home page with structured data
- `api-route.example.ts` - API route for reservations
- `metadata-utils.example.ts` - SEO utility functions

#### Component Examples
- `client-component.example.tsx` - Client component pattern
- `server-component.example.tsx` - Server component pattern

## 🚀 Quick Start

### For Complete Migration (Recommended)

```bash
# 1. Read the guides
Start with: NEXTJS_MIGRATION_GUIDE.md
Follow: MIGRATION_STEPS.md

# 2. Set up project
npx create-next-app@latest le-seven-nextjs --typescript --tailwind --app

# 3. Copy example files
cp NEXT_APP_EXAMPLES/* your-nextjs-project/

# 4. Follow step-by-step migration
# (See MIGRATION_STEPS.md for detailed instructions)

# 5. Deploy
Follow: VERCEL_DEPLOY.md
```

### For Quick Reference

```bash
# Key migration points:

# 1. Add "use client" to components with:
- useState, useEffect, other hooks
- Event handlers (onClick, onChange)
- Framer Motion animations
- Browser APIs

# 2. Update imports:
import { Link } from 'react-router-dom'  →  import Link from 'next/link'
import { useLocation } from 'react-router-dom'  →  import { usePathname } from 'next/navigation'

# 3. Update components:
<Link to="/">  →  <Link href="/">
<img src="...">  →  <Image src="..." fill sizes="..." />

# 4. Update API calls:
fetch('/.netlify/functions/...')  →  fetch('/api/...')
```

## 📋 Migration Checklist

### Phase 1: Setup
- [ ] Create Next.js project
- [ ] Install dependencies
- [ ] Configure TypeScript
- [ ] Update Tailwind config
- [ ] Set up environment variables

### Phase 2: Structure
- [ ] Create app directory
- [ ] Create components directory
- [ ] Move images to public/
- [ ] Set up lib/ for utilities

### Phase 3: Core Files
- [ ] Create root layout (app/layout.tsx)
- [ ] Create home page (app/page.tsx)
- [ ] Create loading UI (app/loading.tsx)
- [ ] Create not-found page

### Phase 4: Components
- [ ] Migrate Navbar (client component)
- [ ] Migrate Footer (client component)
- [ ] Migrate Hero section
- [ ] Migrate Menu section
- [ ] Migrate Gallery (with carousel)
- [ ] Migrate Reservations form
- [ ] Migrate Contact section
- [ ] Migrate utility components

### Phase 5: Pages
- [ ] Menu page (app/menu/page.tsx)
- [ ] Gallery page (app/gallery/page.tsx)
- [ ] Contact page (app/contact/page.tsx)
- [ ] Privatization page (app/privatisation/page.tsx)
- [ ] Blog pages (app/blog/)

### Phase 6: API Routes
- [ ] Create reservations API (app/api/reservations/route.ts)
- [ ] Test email sending with Resend
- [ ] Update form submissions

### Phase 7: SEO
- [ ] Add metadata to all pages
- [ ] Add structured data (JSON-LD)
- [ ] Configure sitemap generation
- [ ] Add robots.txt
- [ ] Test Open Graph tags

### Phase 8: Testing
- [ ] Test all pages locally
- [ ] Test navigation
- [ ] Test forms
- [ ] Test API routes
- [ ] Run production build
- [ ] Check for errors

### Phase 9: Deployment
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables
- [ ] Deploy to production
- [ ] Configure custom domain
- [ ] Verify deployment

## 🎨 Design & Features Preserved

### ✅ Kept from Original
- All Tailwind styling
- Framer Motion animations
- Color palette and theme
- Typography (Pacifico + Montserrat)
- Component structure
- User experience
- Gallery carousel with lightbox
- Reservation form functionality
- Contact sections
- Opening hours
- All content

### ✨ New Enhancements
- Server-side rendering (SSR)
- Improved SEO with metadata API
- Automatic image optimization
- Better performance (Core Web Vitals)
- Sitemap generation
- Structured data (schema.org)
- Enhanced security headers
- Automatic code splitting
- Built-in API routes
- Better TypeScript support

## 🔧 Key Technical Changes

### Router
- **Before**: React Router DOM
- **After**: Next.js App Router

### Images
- **Before**: Standard `<img>` tags
- **After**: Next.js `<Image>` component with optimization

### API
- **Before**: Vercel serverless functions
- **After**: Next.js API routes

### Metadata
- **Before**: React Helmet
- **After**: Next.js Metadata API

### Rendering
- **Before**: Client-side only (SPA)
- **After**: Server + Client (hybrid)

## 📊 Expected Performance Improvements

### Before (React SPA)
- **Lighthouse Score**: ~75-80
- **First Contentful Paint**: ~2-3s
- **Time to Interactive**: ~3-4s
- **SEO**: Limited (client-rendered)

### After (Next.js SSR)
- **Lighthouse Score**: ~95+
- **First Contentful Paint**: ~0.8-1.2s
- **Time to Interactive**: ~1.5-2s
- **SEO**: Excellent (server-rendered)

## 🎯 SEO Improvements

### 1. Metadata API
- Title tags
- Meta descriptions
- Open Graph tags
- Twitter cards
- Canonical URLs

### 2. Structured Data (JSON-LD)
- Restaurant schema
- Opening hours
- Location
- Menu items
- Contact information

### 3. Sitemap & Robots
- Auto-generated sitemap.xml
- Robots.txt configuration
- Proper crawling instructions

### 4. Server Rendering
- Content in HTML (not JavaScript)
- Faster indexing by search engines
- Better social media previews

## 🔒 Security Enhancements

- Security headers configured
- Environment variables protected
- API routes server-side only
- Input validation
- CORS properly configured

## 📱 Mobile Optimization

- Responsive images with srcset
- Touch-friendly navigation
- Mobile-first approach
- Optimized bundle sizes
- Fast mobile loading

## 🌍 Internationalization Ready

The structure supports i18n if needed:
```typescript
// Future: Add internationalization
import { useTranslation } from 'next-intl';
```

## 🔄 Continuous Deployment

### Automatic Deployments
- Push to main → Production
- Pull requests → Preview deployments
- Automatic builds on Vercel

### Branch Workflow
- `main` - Production
- `develop` - Staging
- `feature/*` - Preview URLs

## 📈 Monitoring

### Analytics
- Vercel Analytics (built-in)
- Google Analytics (add if needed)
- Core Web Vitals tracking

### Error Tracking
- Console errors in Vercel logs
- Optional: Sentry integration

## 🆘 Support Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

## 🎓 Learning Resources

### Next.js 14 App Router
- [Official Tutorial](https://nextjs.org/learn)
- [App Router Best Practices](https://nextjs.org/docs/app/building-your-application/routing)

### SEO with Next.js
- [Metadata API Guide](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## 💰 Cost Considerations

### Vercel Pricing
- **Hobby (Free)**:
  - 100GB bandwidth/month
  - 100 build hours/month
  - Perfect for most restaurants

- **Pro ($20/month)**:
  - 1TB bandwidth/month
  - Unlimited builds
  - For high-traffic sites

### Resend Pricing
- **Free tier**: 100 emails/day
- **Pro**: $20/month for 50,000 emails

## ✨ Future Enhancements

Once migrated, consider:
1. Add blog with MDX
2. Implement online ordering
3. Add customer reviews
4. Integrate booking system
5. Add multilingual support
6. Implement Progressive Web App (PWA)
7. Add push notifications
8. Integrate analytics dashboard

## 📞 Need Help?

If you encounter issues during migration:

1. **Check the troubleshooting sections** in MIGRATION_STEPS.md
2. **Review component examples** in NEXT_APP_EXAMPLES/
3. **Test with production build** before deploying
4. **Use Vercel support** for deployment issues
5. **Check Next.js docs** for framework questions

## 🎉 Conclusion

This migration will transform Le Seven's website into a modern, performant, SEO-optimized Next.js application ready for growth and scale.

**Estimated Time**: 8-12 hours for complete migration
**Difficulty**: Intermediate (requires React & Next.js knowledge)
**Result**: Production-ready Next.js 14 application

---

**Ready to start?**

👉 Begin with: **`MIGRATION_STEPS.md`**

Good luck with your migration! 🚀
