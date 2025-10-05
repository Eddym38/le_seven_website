import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Privatization } from "./pages/Privatization";
import { Preloader } from "./components/Preloader";
import heroBg from "./assets/images/compressed_and_resized/galery-burger_vege.jpg";

function ScrollToSection() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.slice(1);
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
  const [isLoading, setIsLoading] = useState(true);

  const imagesToPreload = [heroBg];

  return (
    <>
      <Preloader
        imagesToPreload={imagesToPreload}
        onLoadComplete={() => setIsLoading(false)}
      />
      {!isLoading && (
        <Router>
          <ScrollToSection />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privatisation" element={<Privatization />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
