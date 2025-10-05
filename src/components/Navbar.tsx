import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  activeSection?: string;
  scrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  scrollToSection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { id: "home", label: "Accueil", path: "/" },
    { id: "menu", label: "Menu", path: "/#menu" },
    { id: "about", label: "À propos", path: "/#about" },
    { id: "gallery", label: "Galerie", path: "/#gallery" },
    { id: "reservations", label: "Reservations", path: "/#reservations" },
    { id: "contact", label: "Contact", path: "/#contact" },
    { id: "privatization", label: "Privatisation", path: "/privatisation" },
    { id: "blog", label: "Blog", path: "/blog" },
  ];

  const handleNavigation = (item: any) => {
    if (item.id === "blog" || item.id === "privatization") {
      setIsMenuOpen(false);
      return;
    }

    if (item.id === "home") {
      if (location.pathname !== "/") {
        return;
      } else {
        scrollToSection?.("home");
      }
    } else {
      if (location.pathname !== "/") {
        return;
      } else {
        scrollToSection?.(item.id);
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#FAF6EF]/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-pacifico text-2xl text-[#92C6C4]">
          Le Seven
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => handleNavigation(item)}
              className={`font-montserrat font-medium transition-colors ${
                (activeSection === item.id && location.pathname === "/") ||
                (item.id === "blog" && location.pathname === "/blog") ||
                (item.id === "privatization" && location.pathname === "/privatisation") ||
                (item.id === "home" && location.pathname === "/")
                  ? "text-[#92C6C4]"
                  : "text-[#4C4C4C] hover:text-[#92C6C4]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FAF6EF] border-t border-[#92C6C4]/20">
          <div className="px-4 py-2 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleNavigation(item)}
                className="block w-full text-left py-2 px-4 font-montserrat font-medium text-[#4C4C4C] hover:text-[#92C6C4] hover:bg-[#92C6C4]/10 rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
