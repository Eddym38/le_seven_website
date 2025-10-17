// components/home/MenuSection.tsx
// SERVER COMPONENT EXAMPLE - No "use client" directive needed

import Image from 'next/image';
import Link from 'next/link';

// This component is a Server Component by default
// It does NOT use hooks, animations, or event handlers
// It can be rendered on the server for better performance

export function MenuSection() {
  // Static data can be defined here or fetched from a database
  const menuCategories = [
    {
      title: 'Entrées',
      description: 'Découvrez nos entrées méditerranéennes',
      image: '/images/compressed_and_resized/galery-camembert.jpg',
    },
    {
      title: 'Plats',
      description: 'Savourez nos spécialités maison',
      image: '/images/compressed_and_resized/galery-entrecote.jpg',
    },
    {
      title: 'Desserts',
      description: 'Terminez en beauté',
      image: '/images/compressed_and_resized/galery-creme_brulee.jpg',
    },
  ];

  return (
    <section id="menu" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Notre Menu
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto mb-8">
            Une cuisine méditerranéenne authentique préparée avec passion et des
            ingrédients frais de qualité
          </p>
          <Link
            href="/menu"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-montserrat font-semibold transition-colors duration-300"
          >
            Voir le menu complet
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-soft overflow-hidden group"
            >
              <div className="relative h-64">
                {/*
                 * IMPORTANT: Use next/image instead of <img>
                 * Benefits:
                 * - Automatic image optimization
                 * - Lazy loading
                 * - Responsive images
                 * - WebP conversion
                 * - Reduced CLS (Cumulative Layout Shift)
                 */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
              </div>
              <div className="p-6">
                <h3 className="font-pacifico text-2xl text-primary mb-2">
                  {category.title}
                </h3>
                <p className="font-montserrat text-text-light">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-montserrat text-text-light">
            Consultez nos cartes complètes pour découvrir tous nos plats et
            boissons
          </p>
        </div>
      </div>
    </section>
  );
}

/*
 * SERVER COMPONENT MIGRATION NOTES:
 *
 * 1. NO "use client" directive - this renders on the server
 *
 * 2. Benefits of Server Components:
 *    - Faster initial page load
 *    - Better SEO (content is in HTML)
 *    - Reduced JavaScript bundle size
 *    - Can fetch data directly (if needed)
 *
 * 3. Limitations of Server Components:
 *    - Cannot use hooks (useState, useEffect, etc.)
 *    - Cannot use event handlers directly
 *    - Cannot access browser APIs
 *    - Cannot use Framer Motion
 *
 * 4. Image Migration:
 *    <img src="..." /> → <Image src="..." fill sizes="..." />
 *
 * 5. next/image Props:
 *    - src: path to image (from /public)
 *    - alt: accessibility text (required)
 *    - fill: makes image fill container (use with relative parent)
 *    - sizes: responsive image sizes for different viewports
 *    - loading: "eager" for above-fold, "lazy" for below-fold
 *    - priority: true for LCP images (largest contentful paint)
 *
 * 6. Link Migration:
 *    <Link to="/menu"> → <Link href="/menu">
 *    - No need for react-router-dom
 *    - Automatic prefetching
 *    - Better performance
 *
 * 7. Static Data:
 *    - Can be defined in the component
 *    - Or fetched from API/database in async component
 *
 * 8. CSS Classes:
 *    - Tailwind classes work the same
 *    - Can use CSS Modules if preferred
 */
