import React from "react";
import { AnimatedSection } from "./AnimatedSection";
import { ImageCarousel } from "./ImageCarousel";
import galery1 from "../assets/images/compressed_and_resized/galery-souris_serveuse.jpg";
import galery2 from "../assets/images/compressed_and_resized/galery-burger_vege.jpg";
import galery3 from "../assets/images/compressed_and_resized/galery-camembert.jpg";
import galery4 from "../assets/images/compressed_and_resized/galery-creme_brulee.jpg";
import galery5 from "../assets/images/compressed_and_resized/galery-entrecote.jpg";
import galery6 from "../assets/images/compressed_and_resized/galery-mousse_au_chocolat.jpg";

export const GallerySection: React.FC = () => {
  const galleryImages = [
    {
      thumbnail: galery1,
      fullRes: galery1,
      alt: "Service au restaurant Le Seven",
    },
    {
      thumbnail: galery2,
      fullRes: galery2,
      alt: "Burger végétarien maison",
    },
    {
      thumbnail: galery3,
      fullRes: galery3,
      alt: "Camembert rôti au miel",
    },
    {
      thumbnail: galery4,
      fullRes: galery4,
      alt: "Crème brûlée à la vanille",
    },
    {
      thumbnail: galery5,
      fullRes: galery5,
      alt: "Entrecôte grillée",
    },
    {
      thumbnail: galery6,
      fullRes: galery6,
      alt: "Mousse au chocolat",
    },
  ];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-primary mb-4">
            Galerie
          </h2>
          <p className="font-montserrat text-lg text-text-light max-w-2xl mx-auto">
            Un voyage visuel à travers nos recettes délicieuses et notre
            ambiance bohème. Cliquez sur une image pour la voir en grand.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <ImageCarousel images={galleryImages} />
        </AnimatedSection>
      </div>
    </section>
  );
};
