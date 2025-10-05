import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Privatization } from "./pages/Privatization";

function ScrollToSection() {
  const location = useLocation();

  React.useEffect(() => {
    // Si nous naviguons vers la page d'accueil avec un hash
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.slice(1); // Enlever le #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToSection />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privatisation" element={<Privatization />} />
      </Routes>
    </Router>
  );
}

export default App;
