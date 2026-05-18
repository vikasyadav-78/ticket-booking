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

    const processSlotsWithTimeCheck = () => {
        if (!slots || slots.length === 0) return [];

        // SORTING THE SLOTS CHRONOLOGICALLY (09:00 -> 10:00 -> 14:00)
        const sortedSlots = [...slots].sort((a, b) => {
            const timeA = a.time || "00:00";
            const timeB = b.time || "00:00";
            return timeA.localeCompare(timeB);
        });

        const isTodaySelected = selectedDate === today;

        if (!isTodaySelected) {
            return sortedSlots.map(slot => ({
                ...slot,
                isAvailable: slot.isAvailable !== false && slot.status !== "not_available"
            }));
        }

        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        return sortedSlots.map((slot) => {
            const timeString = slot.time || "00:00";
            const [slotHours, slotMinutes] = timeString.split(":").map(Number);

            let isExpired = false;
            if (slotHours < currentHours) {
                isExpired = true;
            } else if (slotHours === currentHours && slotMinutes <= currentMinutes) {
                isExpired = true;
            }

            return {
                ...slot,
                isAvailable: !isExpired && slot.isAvailable !== false && slot.status !== "not_available"
            };
        });
    };

    const validatedSlots = processSlotsWithTimeCheck();

    if (!placeId) {
        return (
            <div className="py-14 text-center font-serif text-jaipur-dark/60 animate-pulse tracking-widest text-xs">
                ALIGNING CONCIERGE...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full max-h-full flex flex-col justify-start space-y-5 flex-1 min-h-0 relative"
        > 
            <div className="space-y-4 shrink-0"> 
                <div className="relative">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-royal-blue leading-tight">
                        Plan Your Visit
                    </h2>
                    <div className="h-[1px] w-12 bg-gold/40 mt-1.5" />
                </div>

                <input
                    type="date"
                    min={today}
                    value={selectedDate || ""}
                    onChange={handleDateChange}
                    className="w-full p-3.5 border border-gold/20 rounded-xl outline-none font-serif text-royal-blue bg-sandstone/10 focus:border-gold/50 focus:bg-white transition-all text-xs font-medium cursor-pointer shadow-inner mt-1"
                />
            </div>
            <div className="w-full flex-1 min-h-0 flex flex-col">
                <div className="w-full max-h-[240px] sm:max-h-[280px] md:max-h-[320px] overflow-y-auto rounded-xl border border-dashed border-gold/15 p-3 bg-sandstone/5 custom-scrollbar">
                    {isLoading ? (
                        <div className="py-12 text-center text-royal-blue/40 font-serif italic text-xs tracking-wider animate-pulse">
                            Fetching Imperial Hours...
                        </div>
                    ) : validatedSlots.length === 0 ? (
                        <div className="py-12 text-center text-jaipur-dark/50 font-serif italic text-xs tracking-wider text-center">
                            No active passes available for this date.
                        </div>
                    ) : (
                        <SlotCard
                            slots={validatedSlots}
                            selectedSlot={selectedSlot}
                            onSelect={(slot) => {
                                if (slot.isAvailable) {
                                    dispatch(setSlot(slot));
                                }
                            }}
                        />
                    )}
                </div>
            </div>

            <div className="pt-2 shrink-0 w-full mt-auto">
                <motion.button
                    whileHover={selectedSlot ? { scale: 1.01 } : {}}
                    whileTap={selectedSlot ? { scale: 0.99 } : {}}
                    disabled={!selectedSlot}
                    onClick={onNext}
                    className={`w-full py-4 rounded-xl font-serif text-xs font-bold tracking-[3px] transition-all duration-300 uppercase border block
                        ${!selectedSlot
                            ? "bg-sandstone/40 text-gray-400 cursor-not-allowed border-gray-200/50"
                            : "bg-gradient-to-r from-jaipur-dark to-[#994113] text-white border-gold/30 cursor-pointer shadow-md shadow-jaipur-dark/5"
                        }`}
                >
                    {selectedSlot ? `Confirm ${selectedSlot.displayTime || selectedSlot.time} Entry ⟶` : "SELECT TIMING AT GATE"}
                </motion.button>
            </div>
        </motion.div>
    );
}