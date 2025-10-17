// app/layout.tsx
// This is the root layout that wraps all pages
// It's a Server Component by default - no "use client" needed

import type { Metadata } from 'next';
import { Montserrat, Pacifico } from 'next/font/google';
import './globals.css';

// Font optimization with next/font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});

// Root metadata - applies to all pages unless overridden
export const metadata: Metadata = {
  metadataBase: new URL('https://www.leseven-grenoble.fr'),
  title: {
    default: 'Le Seven - Restaurant Méditerranéen à Grenoble',
    template: '%s | Le Seven Grenoble',
  },
  description:
    'Restaurant bistronomique méditerranéen à Grenoble. Cuisine maison authentique, ambiance chaleureuse. Réservez votre table au cœur de Grenoble.',
  keywords: [
    'restaurant grenoble',
    'cuisine méditerranéenne',
    'bistronomie',
    'restaurant gastronomique grenoble',
    'manger grenoble',
    'restaurant le seven',
  ],
  authors: [{ name: 'Le Seven' }],
  creator: 'Le Seven',
  publisher: 'Le Seven',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.leseven-grenoble.fr',
    siteName: 'Le Seven',
    title: 'Le Seven - Restaurant Méditerranéen à Grenoble',
    description:
      'Restaurant bistronomique méditerranéen à Grenoble. Cuisine maison authentique, ambiance chaleureuse.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Le Seven Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Seven - Restaurant Méditerranéen à Grenoble',
    description:
      'Restaurant bistronomique méditerranéen à Grenoble. Cuisine maison authentique.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${pacifico.variable}`}>
      <body className="min-h-screen bg-background text-text antialiased">
        {/*
          Note: Navbar and Footer are now imported as Client Components
          in the individual page files or can be included here if they
          don't cause hydration issues
        */}
        {children}
      </body>
    </html>
  );
}
