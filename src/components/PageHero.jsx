import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";

export default function PageHero({ title, }) {
    return (
        <div className="relative leading-none flex flex-col items-center z-10 mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="
                            text-[3.02rem]
                            md:text-[5.6rem]
                            lg:text-[7.7rem]
                            font-header
                            font-black
                            text-primary-light 
                            dark:text-primary-dark
                            uppercase
                            transition-colors duration-300
                            tracking-[0.02em]
                            "
                >
                  {title}
                </motion.h1>
                <motion.span
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-12"
                >
                  <PiStarFourFill className=" text-primary-light dark:text-primary-dark text-[35px] md:text-[35px] lg:text-[50px]" />
                </motion.span>
              </div>
    )
}