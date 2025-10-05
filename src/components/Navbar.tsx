import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  activeSection?: string;
  scrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  scrollToSection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { id: "home", label: "Accueil", path: "/" },
    { id: "menu", label: "Menu", path: "/#menu" },
    { id: "about", label: "À propos", path: "/#about" },
    { id: "gallery", label: "Galerie", path: "/#gallery" },
    { id: "reservations", label: "Reservations", path: "/#reservations" },
    { id: "contact", label: "Contact", path: "/#contact" },
    { id: "privatization", label: "Privatisation", path: "/privatisation" },
  ];

  const handleNavigation = (item: any) => {
    if (item.id === "privatization") {
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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-smooth-out ${
        scrolled
          ? "bg-background/98 backdrop-blur-md shadow-medium"
          : "bg-background/95 backdrop-blur-sm shadow-soft"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-pacifico text-2xl text-primary group">
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Le Seven
          </motion.span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => handleNavigation(item)}
              className="relative group"
            >
              <span
                className={`font-montserrat font-medium transition-colors duration-300 ${
                  (activeSection === item.id && location.pathname === "/") ||
                  (item.id === "privatization" && location.pathname === "/privatisation") ||
                  (item.id === "home" && location.pathname === "/")
                    ? "text-primary"
                    : "text-text hover:text-primary"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-smooth-out group-hover:w-full ${
                  (activeSection === item.id && location.pathname === "/") ||
                  (item.id === "privatization" && location.pathname === "/privatisation") ||
                  (item.id === "home" && location.pathname === "/")
                    ? "w-full"
                    : ""
                }`}
              />
            </Link>
          ))}
        </div>

        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-text"
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-background border-t border-primary/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => handleNavigation(item)}
                    className="block w-full text-left py-2 px-4 font-montserrat font-medium text-text hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
