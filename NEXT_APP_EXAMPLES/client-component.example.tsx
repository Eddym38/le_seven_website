// components/home/ReservationsSection.tsx
// CLIENT COMPONENT EXAMPLE - Uses "use client" directive

'use client'; // This directive MUST be at the very top

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import {
  Calendar,
  Users,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';

export function ReservationsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    time: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Call Next.js API route instead of Vercel function
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      const data = await response.json();

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          guests: '2',
          date: '',
          time: '',
          message: '',
        });
      }, 5000);
    } catch (err) {
      setIsSubmitting(false);
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Submission error:', err);
    }
  };

  return (
    <section id="reservations" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Réserver une table
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto">
            Réservez votre table dès maintenant et laissez-nous vous accueillir
            dans notre ambiance chaleureuse
          </p>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 text-center shadow-soft">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={64} className="text-primary mx-auto mb-6" />
                </motion.div>
                <h3 className="font-pacifico text-3xl text-primary mb-4">
                  Réservation confirmée !
                </h3>
                <p className="font-montserrat text-text-light text-lg mb-4">
                  Merci {formData.name} ! Nous avons bien reçu votre demande de
                  réservation.
                </p>
                <p className="font-montserrat text-text-lighter">
                  Nous vous contacterons très prochainement au {formData.phone}{' '}
                  pour confirmer les détails.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error && (
                <div className="max-w-5xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  {error}
                </div>
              )}

              <AnimatedSection delay={0.2}>
                <form
                  onSubmit={handleSubmit}
                  className="bg-gradient-to-br from-background to-background-light rounded-2xl shadow-large p-8 md:p-12 border border-primary/10"
                >
                  {/* Form fields here - same as before */}
                  {/* ... */}

                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-primary to-accent-olive text-white px-8 py-5 rounded-xl font-montserrat font-semibold text-lg hover:shadow-glow transition-all duration-400 ease-smooth-out ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting
                        ? 'Envoi en cours...'
                        : 'Confirmer la réservation'}
                    </motion.button>
                  </div>
                </form>
              </AnimatedSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/*
 * CLIENT COMPONENT MIGRATION NOTES:
 *
 * 1. ADD "use client" directive at the very top of the file
 *
 * 2. This is required when the component:
 *    - Uses React hooks (useState, useEffect, etc.)
 *    - Has event handlers (onClick, onChange, onSubmit)
 *    - Uses Framer Motion animations
 *    - Accesses browser APIs (window, document, localStorage)
 *
 * 3. API calls now point to Next.js API routes:
 *    - Old: fetch('/.netlify/functions/...')
 *    - New: fetch('/api/reservations')
 *
 * 4. All imports remain the same, just add @ path alias
 *
 * 5. Export as named export (not default) for better tree-shaking
 *
 * 6. Error handling is more explicit with try/catch
 */
