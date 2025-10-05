import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  imagesToPreload: string[];
  onLoadComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  imagesToPreload,
  onLoadComplete,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imagesToPreload.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        });
      });

      const totalImages = imagePromises.length;
      let loadedImages = 0;

      imagePromises.forEach((promise) => {
        promise.then(() => {
          loadedImages++;
          setProgress((loadedImages / totalImages) * 100);
        });
      });

      await Promise.all(imagePromises);

      setTimeout(() => {
        setIsLoading(false);
        setTimeout(onLoadComplete, 600);
      }, 400);
    };

    preloadImages();
  }, [imagesToPreload, onLoadComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="font-pacifico text-5xl md:text-6xl text-primary mb-8"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Le Seven
            </motion.h1>

            <div className="w-64 h-1.5 bg-primary/20 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <p className="font-montserrat text-text-light text-sm">
              Chargement...
            </p>
          </motion.div>

          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
