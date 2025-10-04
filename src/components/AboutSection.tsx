import React from "react";
import aboutBg from "../assets/images/galery-souris_serveuse.jpg";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-6">
              Notre histoire
            </h2>
            <div className="space-y-6 font-montserrat text-lg leading-relaxed text-[#4C4C4C]">
              <p>
                Depuis près de 10 ans, Le Seven fait vibrer Grenoble avec une
                cuisine maison colorée, inspirée par les racines
                franco-libanaises de notre chef. Entre assiettes généreuses,
                ambiance bohème et terrasse conviviale, nous cultivons un esprit
                chaleureux où l’on vient autant pour se régaler que pour
                partager.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={aboutBg}
              alt="Chef preparing Mediterranean dishes"
              className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#F6E08B] p-6 rounded-2xl shadow-lg">
              <p className="font-pacifico text-xl text-[#4C4C4C]">
                Gourmandise • Fait maison • Passion
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
