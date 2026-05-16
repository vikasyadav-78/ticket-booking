"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BookingFlowLeft({ place, itemVariants }) {
    return (
        <motion.section
            className="hidden lg:flex w-1/2 sticky top-0 h-full bg-gradient-to-b from-royal-blue to-[#071633] flex-col items-center justify-between p-6 overflow-hidden select-none min-h-0 relative border-r border-gold/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background Mandala Texture */}
            <div className="absolute inset-0 opacity-[0.12] bg-mandala pointer-events-none scale-105"></div>

            {/* Corner Luxury Flourishes */}
            <div className="absolute top-4 left-6 text-gold/20 font-serif text-xl select-none">✦</div>
            <div className="absolute top-4 right-6 text-gold/20 font-serif text-xl select-none">✦</div>

            {/* Top Badge */}
            <motion.div
                variants={itemVariants}
                className="mb-2 border-2 border-gold/25 px-5 py-2 text-center bg-[#071633]/50 backdrop-blur-xl rounded-xl max-w-full shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            >
                <p className="text-[9px] tracking-[5px] text-gold uppercase font-bold mb-0.5">Heritage Monument</p>
                <p className="text-white text-base font-serif tracking-wide truncate max-w-[280px]">{place?.location}</p>
            </motion.div>

            {/* Center Text Content */}
            <div className="text-center z-10 max-w-[480px] w-full shrink-0 my-auto flex flex-col items-center">
                <motion.h1
                    variants={itemVariants}
                    className="text-white font-serif text-3xl xl:text-4xl leading-tight font-normal tracking-wide"
                >
                    Welcome to <br />
                    <span className="bg-gradient-to-r from-gold via-jaipur-pink to-gold bg-clip-text text-transparent font-medium inline-block mt-1">
                        {place?.name}
                    </span>
                </motion.h1>
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent my-3" />

                {/* FIX: break-words laga diya hai taaki bina space wala text bhi andar rahe, aur line-clamp-3 ke sath text limits ke baad automatically '...' me covert ho jaye */}
                <motion.p
                    variants={itemVariants}
                    className="text-sandstone/80 text-xs xl:text-sm font-light leading-relaxed italic px-4 w-full break-words line-clamp-3 overflow-hidden text-ellipsis"
                >
                    "{place?.shortDescription}"
                </motion.p>
            </div>

            {/* Bottom Image Container (Luxury Royal Photo Frame) */}
            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, borderColor: "rgba(212,175,55,0.4)" }}
                className="w-full max-w-[360px] h-full max-h-[26vh] xl:max-h-[29vh] p-1.5 bg-sandstone/5 rounded-[24px] border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shrink-0 min-h-0 flex items-center justify-center relative overflow-hidden"
            >
                <Image
                    width={450}
                    height={320}
                    priority
                    alt={place?.name || "Place Image"}
                    className="w-full h-full object-cover rounded-[18px]"
                    src={Array.isArray(place?.images) && place.images.length > 0 ? place.images[0] : "/images/hawaMahal.png"}
                />
            </motion.div>
        </motion.section>
    );
}   