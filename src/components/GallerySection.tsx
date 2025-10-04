import React from "react";
import galery1 from "../assets/images/galery-souris_serveuse.jpg";
import galery2 from "../assets/images/galery-burger_vege.jpg";
import galery3 from "../assets/images/galery-camembert.jpg";
import galery4 from "../assets/images/galery-creme_brulee.jpg";
import galery5 from "../assets/images/galery-entrecote.jpg";
import galery6 from "../assets/images/galery-mousse_au_chocolat.jpg";

export const GallerySection: React.FC = () => {
  const galleryImages = [galery1, galery2, galery3, galery4, galery5, galery6];

  return (
    <section id="gallery" className="py-20 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-4">
            Galerie
          </h2>
          <p className="font-montserrat text-lg text-[#4C4C4C]/80 max-w-2xl mx-auto">
            Un voyage visuel à travers nos recettes délicieuses et notre
            ambiance bohème
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-80"
            >
              <img
                src={src}
                alt={`Photo ${index + 1} du restaurant`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
