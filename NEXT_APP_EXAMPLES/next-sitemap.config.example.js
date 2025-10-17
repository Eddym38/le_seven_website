/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.leseven-grenoble.fr',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [],
  },
  // Change this to match your domain
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  // Transform function to customize URLs in the sitemap
  transform: async (config, path) => {
    // Custom priority and changefreq based on route
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/contact' || path === '/privatisation') {
      priority = 0.9;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};

/*
 * USAGE INSTRUCTIONS:
 *
 * 1. Install next-sitemap: npm install next-sitemap
 *
 * 2. Save this file as `next-sitemap.config.js` in project root
 *
 * 3. Add postbuild script to package.json:
 *    "postbuild": "next-sitemap"
 *
 * 4. After running `npm run build`, sitemap.xml and robots.txt
 *    will be generated in the /public directory
 *
 * 5. Sitemap will be available at: https://yourdomain.com/sitemap.xml
 *
 * 6. Robots.txt will be at: https://yourdomain.com/robots.txt
 */
