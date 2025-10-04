import React from "react";
import { Clock, MapPin } from "lucide-react";

export const ReservationsSection: React.FC = () => {
  return (
    <section id="reservations" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-6">
          Faire une réservation
        </h2>
        <p className="font-montserrat text-xl text-[#4C4C4C]/80 mb-12 leading-relaxed">
          Nous vous recommandons de réserver votre table à l'avance pour
          garantir votre place.
        </p>

        <a
          href="https://www.thefork.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#92C6C4] text-white px-12 py-5 rounded-full font-montserrat font-semibold text-xl hover:bg-[#F7C8C8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Reservez sur TheFork{" "}
        </a>
      </div>
    </section>
  );
};
