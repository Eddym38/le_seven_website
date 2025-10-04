import React from "react";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-4">
            Contactez-nous
          </h2>
          <p className="font-montserrat text-lg text-[#4C4C4C]/80 max-w-2xl mx-auto">
            Nous nous tenons à votre disposition pour toute question,
            réservation ou demande spéciale. N'hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-pacifico text-2xl text-[#92C6C4] mb-6">
                Nos coordonnées
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin
                    size={24}
                    className="text-[#92C6C4] mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold text-[#4C4C4C] mb-1">
                      Addresse
                    </h4>
                    <p className="font-montserrat text-[#4C4C4C]/80">
                      2 boulevard de l'esplanade
                      <br />
                      38000 Grenoble, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone
                    size={24}
                    className="text-[#92C6C4] mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold text-[#4C4C4C] mb-1">
                      Telephone
                    </h4>
                    <a
                      href="tel:+33953468128"
                      className="font-montserrat text-[#4C4C4C]/80 hover:text-[#92C6C4] transition-colors"
                    >
                      +33 9 53 46 81 28
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail
                    size={24}
                    className="text-[#92C6C4] mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold text-[#4C4C4C] mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:restaurantleseven38@gmail.com"
                      className="font-montserrat text-[#4C4C4C]/80 hover:text-[#92C6C4] transition-colors"
                    >
                      restaurantleseven38@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock
                    size={24}
                    className="text-[#92C6C4] mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-montserrat font-semibold text-[#4C4C4C] mb-1">
                      Horaire d'ouverture
                    </h4>
                    <div className="font-montserrat text-[#4C4C4C]/80 space-y-1">
                      <p>Le midi | Mardi - dimanche : 12h00 - 13h30</p>
                      <p>Le soir | Mardi - Samedi : 20h00 - 21h30</p>
                      <p>Fermeture : Dimanche soir et Lundi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-pacifico text-2xl text-[#92C6C4] mb-6">
              Nous trouver
            </h3>
            <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Carte Le Seven"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.630629956868!2d5.716249076692006!3d45.19445765139544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af47df2fcb28d%3A0xe83e75c9e621d830!2sRestaurant%20Le%20Seven%20%E2%80%93%20Cuisine%20maison%20%26%20Ambiance%20boh%C3%A8me%20%7C%20Grenoble!5e1!3m2!1sfr!2sfr!4v1759529020708!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
