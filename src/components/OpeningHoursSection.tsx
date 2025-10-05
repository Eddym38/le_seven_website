import React from "react";
import { Clock } from "lucide-react";

export const OpeningHoursSection: React.FC = () => {
  const openingHours = [
    { day: "Lundi", hours: "Fermé", isClosed: true },
    { day: "Mardi", hours: "12h00 - 13h30 / 20h00 - 21h30", isClosed: false },
    { day: "Mercredi", hours: "12h00 - 13h30 / 20h00 - 21h30", isClosed: false },
    { day: "Jeudi", hours: "12h00 - 13h30 / 20h00 - 21h30", isClosed: false },
    { day: "Vendredi", hours: "12h00 - 13h30 / 20h00 - 21h30", isClosed: false },
    { day: "Samedi", hours: "12h00 - 13h30 / 20h00 - 21h30", isClosed: false },
    { day: "Dimanche", hours: "12h00 - 13h30", isClosed: false },
  ];

  return (
    <section id="opening-hours" className="py-20 px-4 bg-gradient-to-b from-white to-[#FAF6EF]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#92C6C4]/10 rounded-full mb-4">
            <Clock size={32} className="text-[#92C6C4]" />
          </div>
          <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-4">
            Horaires d'ouverture
          </h2>
          <p className="font-montserrat text-lg text-[#4C4C4C]/80 max-w-2xl mx-auto">
            Nous vous accueillons chaleureusement tout au long de la semaine pour des moments de convivialité
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
          <div className="divide-y divide-[#92C6C4]/10">
            {openingHours.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-8 py-5 hover:bg-[#92C6C4]/5 transition-colors duration-200"
              >
                <span className="font-montserrat font-semibold text-[#4C4C4C] text-lg">
                  {item.day}
                </span>
                <span
                  className={`font-montserrat text-right ${
                    item.isClosed
                      ? "text-[#4C4C4C]/40 italic"
                      : "text-[#4C4C4C]/80 font-medium"
                  }`}
                >
                  {item.hours}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#92C6C4]/10 via-[#F7C8C8]/10 to-[#98A88B]/10 px-8 py-6">
            <p className="font-montserrat text-sm text-[#4C4C4C]/70 text-center">
              <span className="font-semibold">Note:</span> Les horaires peuvent varier lors des jours fériés.
              Nous vous recommandons de nous contacter pour confirmer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
