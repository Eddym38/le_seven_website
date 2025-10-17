# Vercel Deployment Quick Reference

## Deploy in 3 Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Next.js migration"
git push origin main
```

### 2. Import to Vercel
- Visit https://vercel.com/new
- Import your GitHub repository
- Vercel auto-detects Next.js

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
RESEND_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Done!
Your site deploys automatically. Visit your Vercel URL.

## Custom Domain
1. Settings → Domains → Add Domain
2. Update DNS records at your registrar
3. Wait 24-48 hours for propagation

## Resources
- Full deployment guide: See VERCEL_DEPLOYMENT.md
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
