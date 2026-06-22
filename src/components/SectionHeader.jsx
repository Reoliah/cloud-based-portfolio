import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const MotionLink = motion(Link);

export default function SectionHeader({ title, to }) {
  return (
    <MotionLink
      to={to}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="group flex items-center w-full mb-16 cursor-pointer"
    >
      <h2 className="text-primary-light dark:text-primary-dark font-header font-bold text-2xl md:text-3xl tracking-wide uppercase mr-6">
        {title}
      </h2>

        {/* The Animated Line */}
        <div className="flex-1 h-[5px] bg-gray-300 dark:bg-gray-700 relative flex justify-end items-center transition-colors">
          <div className="h-full bg-primary-light dark:bg-primary-dark w-12 md:w-10 group-hover:w-22 transition-all duration-300 ease-out"></div>

          {/* The Arrow (Hidden by default, appears and slides right on hover) */}
          <FiChevronRight className="absolute -right-4 text-primary-light dark:text-primary-dark opacity-0 group-hover:opacity-100 group-hover:-right-10 transition-all duration-300 text-5xl" />
        </div>
      </MotionLink>
    )
}