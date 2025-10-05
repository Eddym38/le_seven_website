import React, { useState } from "react";
import { Calendar, Users, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";

export const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTheForkRedirect = () => {
    window.open("https://www.thefork.com", "_blank");
  };

  return (
    <section id="reservation-form" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-pacifico text-4xl md:text-5xl text-[#92C6C4] mb-4">
            Réserver une table
          </h2>
          <p className="font-montserrat text-lg text-[#4C4C4C]/80 max-w-2xl mx-auto">
            Remplissez ce formulaire pour préparer votre réservation, puis finalisez directement sur TheFork
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#FAF6EF] to-white rounded-2xl shadow-xl p-8 md:p-12 border border-[#92C6C4]/10">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block font-montserrat font-medium text-[#4C4C4C] mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]" size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white"
                    placeholder="Jean Dupont"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="email" className="block font-montserrat font-medium text-[#4C4C4C] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block font-montserrat font-medium text-[#4C4C4C] mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="guests" className="block font-montserrat font-medium text-[#4C4C4C] mb-2">
                  Nombre de personnes
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]" size={20} />
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "personne" : "personnes"}
                      </option>
                    ))}
                    <option value="10+">Plus de 10 personnes</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="date" className="block font-montserrat font-medium text-[#4C4C4C] mb-2">
                  Date souhaitée
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]" size={20} />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="time" className="block font-montserrat font-medium text-[#4C4C4C] mb-2">
                  Heure souhaitée
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92C6C4]" size={20} />
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Choisir une heure</option>
                    <optgroup label="Service du midi">
                      <option value="12:00">12h00</option>
                      <option value="12:30">12h30</option>
                      <option value="13:00">13h00</option>
                      <option value="13:30">13h30</option>
                    </optgroup>
                    <optgroup label="Service du soir">
                      <option value="20:00">20h00</option>
                      <option value="20:30">20h30</option>
                      <option value="21:00">21h00</option>
                      <option value="21:30">21h30</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="message" className="block font-montserrat font-medium text-[#4C4C4C] mb-2">
                Message ou demande spéciale (optionnel)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-[#92C6C4]" size={20} />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#92C6C4]/20 focus:border-[#92C6C4] focus:outline-none transition-colors font-montserrat bg-white resize-none"
                  placeholder="Allergies, régimes spéciaux, occasion particulière..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleTheForkRedirect}
                className="w-full bg-gradient-to-r from-[#92C6C4] to-[#98A88B] text-white px-8 py-5 rounded-xl font-montserrat font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Continuer sur TheFork pour finaliser
              </button>
              <p className="text-center font-montserrat text-sm text-[#4C4C4C]/60 mt-4">
                Vous serez redirigé vers TheFork pour confirmer votre réservation en toute sécurité
              </p>
            </div>
          </form>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 bg-[#FAF6EF] rounded-xl">
            <div className="w-12 h-12 bg-[#92C6C4]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="text-[#92C6C4]" size={24} />
            </div>
            <h3 className="font-montserrat font-semibold text-[#4C4C4C] mb-2">Groupes</h3>
            <p className="font-montserrat text-sm text-[#4C4C4C]/70">
              Pour les groupes de plus de 10 personnes, contactez-nous directement
            </p>
          </div>

          <div className="text-center p-6 bg-[#FAF6EF] rounded-xl">
            <div className="w-12 h-12 bg-[#F7C8C8]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="text-[#F7C8C8]" size={24} />
            </div>
            <h3 className="font-montserrat font-semibold text-[#4C4C4C] mb-2">Événements</h3>
            <p className="font-montserrat text-sm text-[#4C4C4C]/70">
              Organisez votre événement privé dans notre établissement
            </p>
          </div>

          <div className="text-center p-6 bg-[#FAF6EF] rounded-xl">
            <div className="w-12 h-12 bg-[#98A88B]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="text-[#98A88B]" size={24} />
            </div>
            <h3 className="font-montserrat font-semibold text-[#4C4C4C] mb-2">Questions</h3>
            <p className="font-montserrat text-sm text-[#4C4C4C]/70">
              Notre équipe est disponible pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
