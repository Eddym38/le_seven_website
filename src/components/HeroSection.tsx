import React from "react";
import heroBg from "../assets/images/compressed/hero-restaurant.jpg";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToSection,
}) => {
  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-pacifico text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          Le Seven
        </h1>
        <p className="font-montserrat text-xl md:text-2xl lg:text-3xl mb-8 font-light leading-relaxed"></p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://www.thefork.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#92C6C4] text-white px-8 py-4 rounded-full font-montserrat font-semibold text-lg hover:bg-[#F7C8C8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Reserver une table
          </a>
          <button
            onClick={() => scrollToSection("menu")}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-montserrat font-semibold text-lg hover:bg-white hover:text-[#4C4C4C] transition-all duration-300"
          >
            Voir le menu
          </button>
        </div>
      </div>
    </section>
  );
};
