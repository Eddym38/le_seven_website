import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImageLightbox } from "./ImageLightbox";

interface ImageCarouselProps {
  images: Array<{
    thumbnail: string;
    fullRes: string;
    alt: string;
  }>;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-soft group cursor-pointer h-80"
            onClick={() => openLightbox(index)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            role="button"
            tabIndex={0}
            aria-label={`View ${image.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <motion.img
              src={image.thumbnail}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-montserrat font-semibold text-lg">
                Voir en grand
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <ImageLightbox
        images={images.map((img) => img.fullRes)}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
};
