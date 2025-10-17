// app/page.tsx
// Home page - This is a Server Component, but includes Client Components

import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { MenuSection } from '@/components/home/MenuSection';
import { AboutSection } from '@/components/home/AboutSection';
import { GallerySection } from '@/components/home/GallerySection';
import { OpeningHoursSection } from '@/components/home/OpeningHoursSection';
import { ReservationsSection } from '@/components/home/ReservationsSection';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

// Page-specific metadata
export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Le Seven, restaurant bistronomique méditerranéen au cœur de Grenoble. Découvrez notre cuisine authentique faite maison dans une ambiance chaleureuse et conviviale.',
  alternates: {
    canonical: 'https://www.leseven-grenoble.fr',
  },
  openGraph: {
    title: 'Le Seven - Restaurant Méditerranéen à Grenoble',
    description:
      'Restaurant bistronomique méditerranéen au cœur de Grenoble. Cuisine authentique faite maison.',
    url: 'https://www.leseven-grenoble.fr',
    siteName: 'Le Seven',
    images: [
      {
        url: '/images/compressed_and_resized/galery-burger_vege.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

// JSON-LD Structured Data for Restaurant
const restaurantStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Le Seven',
  image: 'https://www.leseven-grenoble.fr/images/logo.png',
  '@id': 'https://www.leseven-grenoble.fr',
  url: 'https://www.leseven-grenoble.fr',
  telephone: '+33953468128',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2 boulevard de l\'esplanade',
    addressLocality: 'Grenoble',
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
  servesCuisine: 'Mediterranean',
  acceptsReservations: 'True',
  menu: 'https://www.leseven-grenoble.fr/menu',
};

export default function HomePage() {
  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantStructuredData),
        }}
      />

      {/* Page Layout */}
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <MenuSection />
          <AboutSection />
          <GallerySection />
          <OpeningHoursSection />
          <ReservationsSection />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

/*
 * MIGRATION NOTES:
 *
 * 1. This page is a Server Component by default (no "use client")
 * 2. Each section component needs "use client" if it uses:
 *    - useState, useEffect, or other hooks
 *    - Event handlers (onClick, onChange, etc.)
 *    - Framer Motion animations
 *
 * 3. Metadata is exported as a constant, not in <Head>
 *
 * 4. Structured data is added via <script> tag with dangerouslySetInnerHTML
 *
 * 5. Import paths use @ alias (configured in tsconfig.json):
 *    "@/components/..." instead of "../components/..."
 *
 * 6. All sections are now standalone components imported from
 *    the components directory
 */
