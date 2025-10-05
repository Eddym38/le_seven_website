import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import galery1 from "../assets/images/compressed_and_resized/galery-souris_serveuse.jpg";
import galery2 from "../assets/images/compressed_and_resized/galery-burger_vege.jpg";
import galery3 from "../assets/images/compressed_and_resized/galery-camembert.jpg";
import galery4 from "../assets/images/compressed_and_resized/galery-creme_brulee.jpg";
import galery5 from "../assets/images/compressed_and_resized/galery-entrecote.jpg";
import galery6 from "../assets/images/compressed_and_resized/galery-mousse_au_chocolat.jpg";

export const GallerySection: React.FC = () => {
  const galleryImages = [galery1, galery2, galery3, galery4, galery5, galery6];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Galerie
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto">
            Un voyage visuel à travers nos recettes délicieuses et notre
            ambiance bohème
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-soft group cursor-pointer h-80"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={src}
                  alt={`Photo ${index + 1} du restaurant`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
