// lib/metadata.ts
// Utility functions for generating metadata across pages

import { Metadata } from 'next';

const siteConfig = {
  name: 'Le Seven',
  title: 'Le Seven - Restaurant Méditerranéen à Grenoble',
  description:
    'Restaurant bistronomique méditerranéen à Grenoble. Cuisine maison authentique, ambiance chaleureuse. Réservez votre table au cœur de Grenoble.',
  url: 'https://www.leseven-grenoble.fr',
  ogImage: '/images/og-image.jpg',
  links: {
    facebook: 'https://facebook.com/leseven',
    instagram: 'https://instagram.com/leseven',
  },
};

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

/**
 * Generate comprehensive metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  noindex = false,
}: PageMetadataProps): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  };
}

/**
 * Generate structured data for the restaurant
 */
export function generateRestaurantStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    image: `${siteConfig.url}/images/logo.png`,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: '+33953468128',
    email: 'restaurantleseven38@gmail.com',
    priceRange: '€€',
    servesCuisine: ['Mediterranean', 'French', 'Lebanese'],
    acceptsReservations: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: "2 boulevard de l'esplanade",
      addressLocality: 'Grenoble',
      addressRegion: 'Auvergne-Rhône-Alpes',
      postalCode: '38000',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.19445765139544,
      longitude: 5.716249076692006,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '12:00',
        closes: '13:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '20:00',
        closes: '21:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '12:00',
        closes: '13:30',
      },
    ],
    sameAs: [siteConfig.links.facebook, siteConfig.links.instagram],
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate menu structured data
 */
export function generateMenuStructuredData(menuItems: Array<{
  name: string;
  description: string;
  price?: number;
  image?: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    hasMenuSection: {
      '@type': 'MenuSection',
      name: 'Menu',
      hasMenuItem: menuItems.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.price && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'EUR',
          },
        }),
        ...(item.image && { image: item.image }),
      })),
    },
  };
}

export { siteConfig };

/*
 * USAGE EXAMPLES:
 *
 * 1. In a page file (app/menu/page.tsx):
 *
 * import { generatePageMetadata } from '@/lib/metadata';
 *
 * export const metadata = generatePageMetadata({
 *   title: 'Notre Menu',
 *   description: 'Découvrez notre carte méditerranéenne...',
 *   path: '/menu',
 * });
 *
 * 2. Add structured data to a page:
 *
 * import { generateRestaurantStructuredData } from '@/lib/metadata';
 *
 * const structuredData = generateRestaurantStructuredData();
 *
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
 * />
 *
 * 3. For dynamic pages with generateMetadata:
 *
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   return generatePageMetadata({
 *     title: `Blog - ${params.slug}`,
 *     description: '...',
 *     path: `/blog/${params.slug}`,
 *   });
 * }
 */
