"use client";
import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { usePlace } from "@/hooks/usePlace";
import { useSlots } from "@/lib/queries/useSlot";
import { setDate, setSlot } from "@/redux/features/booking/bookingSlice";
import SlotCard from "./SlotCard";


export default function DateSelector({ onNext }) {
    const dispatch = useDispatch();
    const { placeId } = usePlace();
    const today = new Date().toISOString().split("T")[0];
    const selectedDate = useSelector((state) => state.booking.date);
    const selectedSlot = useSelector((state) => state.booking.slot);

    const { data: slots = [], isLoading } = useSlots({
        placeId,
        date: selectedDate
    });

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        dispatch(setDate(newDate));
        dispatch(setSlot(null));
    };

    if (!placeId) {
        return (
            <div className="p-10 text-center font-serif text-jaipur-dark animate-pulse">
                Loading ...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8"
        >
            <div>
                <h2 className="text-3xl font-serif font-bold text-royal-blue leading-tight">
                    Plan Your Visit
                </h2>
                <div className="h-1 w-16 bg-jaipur-pink mt-1 rounded-full" />
            </div>

         
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-jaipur-dark uppercase tracking-[2px] ml-1">
                    Step 1: Choose Date
                </label>
                <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full p-4 border-2 border-jaipur-pink/20 rounded-xl outline-none font-bold text-royal-blue bg-white focus:border-jaipur-pink transition-all shadow-sm"
                />
            </div>
 
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-jaipur-dark uppercase tracking-[2px] ml-1">
                    Step 2: Select Session
                </label>

                <div className="max-h-[320px] overflow-y-auto pr-1 scrollbar-hide">
                    {isLoading ? (
                        <div className="py-10 text-center text-jaipur-dark/50 italic">
                            Loading Slots...
                        </div>
                    ) : (
                        <SlotCard
                            slots={slots}
                            selectedSlot={selectedSlot}
                            onSelect={(slot) => dispatch(setSlot(slot))}
                        />
                    )}
                </div>
            </div>
 
            <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={!selectedSlot}
                onClick={onNext}
                className={`w-full py-5 rounded-2xl font-serif font-bold tracking-widest transition-all duration-500 shadow-lg
                    ${!selectedSlot
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
                        : "bg-jaipur-dark text-white hover:bg-royal-blue shadow-jaipur-pink/20"
                    }`}
            >
                {selectedSlot ? `CONFIRM ${selectedSlot.displayTime} VISIT ➜` : "PLEASE SELECT A SLOT"}
            </motion.button>
        </motion.div>
    );
}