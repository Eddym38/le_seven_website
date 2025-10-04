import React from "react";

export const MenuSection: React.FC = () => {
  return (
    <section id="menu" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-4">
            Notre menu
          </h2>
          <p className="font-montserrat text-lg text-[#4C4C4C]/80 max-w-2xl mx-auto">
            Découvrez notre menu méditerranéen avec des inspirations libanaises{" "}
          </p>
        </div>
      </div>
    </section>
  );
};
