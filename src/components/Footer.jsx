import { useState } from "react";
import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";

// 1. Updated defaultItems to use objects containing both labels and links
const defaultItems = [
  { label: "TG", href: "/https://t.me/isaiahthedev" },
  { label: "IN", href: "https://www.linkedin.com/in/thedevisaiah" },
  { label: "FB", href: "https://www.facebook.com/reol.lity" },
  { label: "GIT", href: "https://www.github.com/reoliah" },
];

export default function Footer({
  items = defaultItems,
  className = "",
  speed = 18,
}) {
  // State to track if any item is currently being hovered
  const [isHovered, setIsHovered] = useState(false);

  const repeatedItems = [...items, ...items];
  const sharedRowClasses = "flex w-max items-center";
  const trackClasses = "flex w-max items-center";

  const adjustedDuration = isHovered ? speed * 12 : speed;

  return (
    <section
      className={`relative left-1/2 w-screen -translate-x-1/2 max-w-none overflow-hidden h-[100px] md:h-[200px] lg:h-[300px] ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className={ `{sharedRowClasses} h-full items-end translate-y-[20%]`}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: adjustedDuration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className={trackClasses}>
          {repeatedItems.map((item, index) => (
            <a
              key={`row-one-${item.label}-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex items-center gap-12 px-8 leading-none 
                         text-[120px] md:text-[240px] lg:text-[380px] 
                         font-header font-black uppercase tracking-tight 
                         text-primary-light dark:text-primary-dark 
                         transition-all duration-300 ease-in-out
                         hover:text-copy-light dark:hover:text-copy-dark hover:line-through"
            >
              <span>{item.label}</span>
              <PiStarFourFill className="shrink-0 text-[56px] text-gray-300 dark:text-gray-600" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
