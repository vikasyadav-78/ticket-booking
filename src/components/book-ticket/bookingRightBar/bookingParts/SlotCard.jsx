"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SlotCard({ slots, selectedSlot, onSelect }) {
    const categories = ["Morning", "Afternoon", "Evening"];

    const getCategory = (time) => {
        const hour = Number(time?.split(":")[0]);
        if (hour < 12) return "Morning";
        if (hour < 17) return "Afternoon";
        return "Evening";
    };

    return (
        <div className="space-y-5">
            {categories.map((cat) => {
                const filteredSlots = slots?.filter((slot) => getCategory(slot.time) === cat);
                if (!filteredSlots || filteredSlots.length === 0) return null;

                return (
                    <div key={cat} className="space-y-3">
                        <div className="flex items-center gap-2 px-1 pt-1">
                            <span className="text-xs sm:text-[13px] font-bold text-gold uppercase tracking-[2px] font-serif">
                                ✦ {cat} Slots
                            </span>
                            <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/20 via-transparent to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
                            {filteredSlots.map((slot, index) => {
                                const isFull = slot.available === 0;
                                const isDisabled = !slot.isAvailable || isFull;
                                const isSelected = selectedSlot?.time === slot.time;

                                const getStatusText = () => {
                                    if (!slot.isAvailable && !isFull) return "⏳ EXPIRED";
                                    if (isFull) return "🚫 FULL BOOKED";
                                    return `👤 ${slot.available} Seats Left`;
                                };

                                return (
                                    <motion.button
                                        key={slot.time || index}
                                        whileHover={!isDisabled ? { scale: 1.01, translateY: -2 } : {}}
                                        whileTap={!isDisabled ? { scale: 0.99 } : {}}
                                        disabled={isDisabled}
                                        onClick={() => onSelect(slot)}
                                        className={`flex p-4.5 items-center justify-between rounded-xl transition-all duration-300 relative border select-none text-left w-full
                                            ${isSelected
                                                ? "border-gold bg-gradient-to-br from-royal-blue to-[#112952] text-white shadow-lg shadow-royal-blue/10"
                                                : "border-gold/15 bg-white hover:border-gold/40 text-royal-blue"
                                            } 
                                            ${isDisabled
                                                ? "opacity-40 cursor-not-allowed bg-sandstone/40 border-gray-200 grayscale"
                                                : "cursor-pointer"
                                            }`}
                                    >
                                        <div className="space-y-1.5">
                                            <p className={`font-serif text-base font-semibold tracking-wide ${isSelected ? "text-gold" : "text-royal-blue"}`}>
                                                {slot.displayTime || slot.time}
                                            </p>
                                            <p className={`text-[11px] font-bold tracking-wider uppercase font-sans
                                                ${isSelected ? "text-white/80" : ""}
                                                ${isDisabled ? "text-gray-400" : isFull ? "text-red-500" : "text-jaipur-dark"}
                                            `}>
                                                {getStatusText()}
                                            </p>
                                        </div>
                                        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors duration-300 shrink-0
                                            ${isSelected ? "border-gold bg-gold" : "border-royal-blue/20 bg-sandstone/30"}`}>
                                            {isSelected && (<div className="w-2 h-2 bg-royal-blue rounded-full" />)}
                                        </div>
                                    </motion.button>    
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}