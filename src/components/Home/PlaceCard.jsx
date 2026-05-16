"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PlaceCard({ place }) {

    return (
        <motion.div
            whileHover={{ y: -10, }}
            transition={{ duration: 0.4, }}
            className="group relative overflow-hidden rounded-[28px] shadow-2xl bg-white w-full h-full"
        // className="group relative overflow-hidden rounded-[28px] shadow-2xl bg-white w-[85%] sm:w-[48%] xl:w-[31%] h-full snap-start flex-shrink-0"
        >
            <div className="relative h-[260px] sm:h-[320px] md:h-[340px] overflow-hidden">
                <img
                    src={place?.images?.[0] || place?.image}
                    alt={place?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6">
                <p className="text-gold uppercase tracking-[4px] text-[10px] sm:text-xs font-bold">
                    {place?.location || "Jaipur"}
                </p>
                <h2 className="text-white text-2xl sm:text-3xl font-serif mt-2 leading-tight">
                    {place?.name}
                </h2>
                <p className="text-white/70 mt-3 text-sm sm:text-base leading-relaxed line-clamp-2">
                    {place?.shortDescription}
                </p>
                <div className="flex items-center justify-between gap-4 mt-6">
                    <div className="flex flex-col">
                        <p className="text-[10px] sm:text-xs text-gold uppercase tracking-[3px]">
                            Entry Fee
                        </p>
                        <p className="text-white font-bold text-lg">
                            {place?.fee || "₹50"}
                        </p>
                    </div>

                    <Link
                        href={`/book-tickets/${place?.id || place?._id}`}
                        className="shrink-0 bg-jaipur-pink hover:bg-gold hover:scale-105 transition-all duration-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold tracking-wide shadow-xl text-sm sm:text-base">
                        Book Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}