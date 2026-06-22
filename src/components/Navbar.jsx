import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiToggleLeft, FiToggleRight, FiSun, FiMoon } from "react-icons/fi";
import { HiOutlineMenuAlt1, HiX } from "react-icons/hi";

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  // Your navigation sections
  const navLinks = ["Home", "About", "Projects", "Education", "Blogs", "Contact"];

  return (
    <>
      {/* THE NAVBAR
        fixed: Stays at top
        z-50: Stays above everything else
        backdrop-blur-md: Creates that premium "glass" effect when scrolling
      */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background-light/100 dark:bg-background-dark/80 transition-colors duration-300">
        <div className="relative mx-auto flex justify-between px-7 py-7 md:px-13 lg:max-w-[1026px]">
          {/* Left Side: Menu Toggle Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-4xl text-copy-light dark:text-copy-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors z-50"
          >
            {isOpen ? <HiX /> : <HiOutlineMenuAlt1 />}
          </button>

          {/* Right Side: Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="text-4xl text-copy-light dark:text-copy-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors z-50"
          >
            {isDarkMode ? <FiToggleRight /> : <FiToggleLeft />}
          </button>

          {/* THE DROPDOWN MENU
            AnimatePresence allows Framer Motion to animate elements when they are removed from the screen.
          */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-[28px] md:left-[52px] bg-background-light dark:bg-background-dark z-40 w-48 py-4 transition-colors duration-300"
              >
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link}>
                      <a
                        href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                        onClick={() => setIsOpen(false)} // Close menu when clicked
                        className="block px-6 -py-1 font-header font-bold uppercase text-[30px] text-copy-light dark:text-copy-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}