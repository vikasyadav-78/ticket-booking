"use client";

import { motion } from "framer-motion";

export default function Banners({ url, url2, text, reverse = false }) {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden select-none">
      <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between gap-12 lg:gap-20`} >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.2 }}
          className="relative w-full md:w-1/2 h-[320px] sm:h-[420px] md:h-[500px]"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: reverse ? 30 : -30, y: 20 },
              visible: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
            }}
            className="absolute left-0 bottom-0 z-10 shadow-2xl floatUpDown"
          >
            <img src={url} alt="Banner" className="w-48 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-52 md:h-64 lg:h-72 object-cover border-4 md:border-8 border-white rounded-xl" />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.92, y: -20 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12, delay: 0.15 } }
            }}
            className="absolute right-0 top-0 md:left-24 md:bottom-24 md:top-auto z-20 shadow-2xl floatUpDown2"
          >
            <img src={url2} alt="Banner Secondary" className="w-48 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-52 md:h-64 lg:h-72 object-cover border-4 md:border-8 border-white rounded-xl" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 text-black"
        >
          <div className="flex items-start gap-3 md:gap-4 max-w-2xl text-left">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-2 sm:w-3 md:w-2 h-16 md:h-15 bg-[#E07A5F] rounded-full shrink-0 origin-top" 
            />
            <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl leading-relaxed font-serif text-[#1A365D] tracking-wide">
              {text}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}