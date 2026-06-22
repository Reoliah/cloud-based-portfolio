import { motion } from "framer-motion";
import portrait from "../assets/portrait.png";
import { PiStarFourFill } from "react-icons/pi";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col mt-48 mb-40 mx-auto justify-center relative">

      {/* Small label */}
      <p className="mx-auto font-body uppercase tracking-[0.08em] text-[10px] md:text-[14px] text-gray-500 dark:text-gray-400 mb-6">
        Supporting scalable digital experience
      </p>

      {/* BIG NAME Container */}
      <div className="relative leading-none z-10 mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-[6.8rem]
            md:text-[12.3rem]
            lg:text-[16rem]
            font-header
            font-black
            text-primary-light 
            dark:text-primary-dark
            uppercase
            mb-[40px] md:mb-[70px]
            transition-colors duration-300
            tracking-[0.02em]
          "
        >
          Isaiah
        </motion.h1>
        

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="
            absolute 
            top-3/5 left-1/2 
            group
            -translate-x-1/2 -translate-y-1/2 
            z-20 
            w-[85px] md:w-[150px] lg:w-[190px] 
            pointer-event-none 
            drop-shadow-2xl
          "
        >
          <img 
            src={portrait}
            alt="Isaiah Omoboriowo"
            className="w-full rounded-[50%]  object-cover transiton-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-[3.02rem]
            md:text-[5.6rem]
            lg:text-[7.3rem]
            font-header
            font-black
            text-primary-light 
            dark:text-primary-dark
            uppercase
            transition-colors duration-300
            tracking-[0.02em]
          "
        >
          Omoboriowo
        </motion.h1>

      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1,delay: 0.7 }}
        className="
          mt-20
          mx-auto
          flex
          flex-col
          items-center
          text-center
          max-w-2xl
          font-display
          md:text-lg
          text-copy-light
          dark:text-copy-dark
          leading-relaxed
          z-10
          
        "
      >
        <PiStarFourFill className=" text-primary-light dark:text-primary-dark text-[25px] md:text-[35px] lg:text-[50px]" />
        <p className="mt-20 tracking-[0.03em] px-[25px] md:px-[40px] md:text-[22px]">I'm Isaiah Omoboriowo - AWS Certified Solutions Architect passionate about enacting scalability,
        enabling visibility and supporting new and existing businesses in the cloud.</p>
        
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative mt-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-0.5 h-6 bg-primary-light dark:bg-primary-dark"></div>
        <span className="text-[14px] font-body tracking-widest uppercase text-gray-500">Scroll</span>
      </motion.div>

    </section>
  );
}