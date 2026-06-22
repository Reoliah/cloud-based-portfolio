import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home"
import Aboutpage from "../pages/Aboutpage";
import Contactpage from "../pages/Contactpage";
import ProjectPage from "../pages/ProjectPage";
import ProjectDetail from "../pages/ProjectDetail";
import BlogPage from "../pages/BlogPage";
import BlogDetail from "../pages/BlogDetail";
import EducationPage from "../pages/EducationPage";
import Admin from "../pages/Admin";
import Navbar from "./Navbar"; 
import ScrollToTop from "./ScrollToTop";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <BrowserRouter>
      <main className="min-h-screen lg:max-w-[1080px] mx-auto justify-center bg-background-light dark:bg-background-dark transition-colors duration-300">
        <ScrollToTop />
      {/* 2. Inject the Navbar and pass down the theme state */}
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
      
      {/* Extra space just to prove the scrolling/sticky effect works
      <div className="h-screen bg-background-light dark:bg-background-dark transition-colors duration-300"></div> */}
      </main>
    </BrowserRouter>
    
  );
}

export default App;