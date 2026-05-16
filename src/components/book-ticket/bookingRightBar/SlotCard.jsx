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
        <div className="space-y-6">
            {categories.map((cat) => {
                const filteredSlots = slots?.filter((slot) => getCategory(slot.time) === cat);
                if (!filteredSlots || filteredSlots.length === 0) return null;
                return (
                    <div key={cat}>
                        <h3 className="text-[10px] font-bold text-jaipur-dark uppercase tracking-[3px] mb-3 italic">
                            {cat} Sessions
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                            {filteredSlots.map((slot, index) => {
                                const isFull = slot.available === 0;
                                const isSelected = selectedSlot?.time === slot.time;
                                return (
                                    <motion.button
                                        key={slot.time || index}
                                        whileHover={!isFull ? { scale: 1.02 } : {}}
                                        whileTap={!isFull ? { scale: 0.98 } : {}}
                                        disabled={isFull}
                                        onClick={() => onSelect(slot)}
                                        className={`flex p-5 items-center justify-between rounded-xl transition-all duration-300 relative ${isSelected ? "border-[3px] border-dotted border-royal-blue bg-jaipur-pink/5 shadow-md" : "border-2 border-solid border-jaipur-pink/10 bg-white"} ${isFull ? "opacity-40 cursor-not-allowed grayscale" : "cursor-pointer"} `} >
                                        <div className="text-left">
                                            <p className={`font-bold font-serif ${isSelected ? "text-royal-blue" : "text-gray-800"}`}>
                                                {slot.displayTime}
                                            </p>
                                            <p className={`text-[10px] font-bold ${isFull ? "text-red-500" : "text-green-600"}`}>
                                                {isFull ? "🚫 HOUSEFULL" : `👤 ${slot.available} SEATS LEFT`}
                                            </p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-royal-blue bg-royal-blue" : "border-gray-200"}`}>
                                            {isSelected && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
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