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
        const isTodaySelected = selectedDate === today;

        if (!isTodaySelected) {
            return slots.map(slot => ({
                ...slot,
                isAvailable: slot.isAvailable !== false && slot.status !== "not_available"
            }));
        }

        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        return slots.map((slot) => {
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
            <div className="p-10 text-center font-serif text-jaipur-dark/60 animate-pulse tracking-widest text-sm">
                ALIGNING CONCIERGE...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="w-full space-y-5"
        >
            <div className="relative">
                <p className="text-[9px] tracking-[4px] text-gold uppercase font-bold mb-1">Schedule Journey</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-royal-blue leading-tight">
                    Plan Your Visit
                </h2>
                <div className="h-[1px] w-12 bg-gold/40 mt-2" />
            </div>

            {/* Step 1 */}
            <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-royal-blue/60 uppercase tracking-[2px] block ml-1">
                    Step 01: Choose Date
                </label>
                <input
                    type="date"
                    min={today}
                    value={selectedDate || ""}
                    onChange={handleDateChange}
                    className="w-full p-3.5 border border-gold/20 rounded-xl outline-none font-serif text-royal-blue bg-sandstone/20 focus:border-gold/50 focus:bg-white transition-all text-sm font-medium cursor-pointer"
                />
            </div>

            {/* Step 2 */}
            <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-royal-blue/60 uppercase tracking-[2px] block ml-1">
                    Step 02: Select Session Gate
                </label>
                <div className="max-h-[180px] overflow-y-auto pr-0 rounded-xl border border-dashed border-gold/15 p-2 bg-sandstone/10 no-scrollbar">
                    {isLoading ? (
                        <div className="py-10 text-center text-royal-blue/40 font-serif italic text-xs tracking-wider animate-pulse">
                            Fetching Imperial Hours...
                        </div>
                    ) : validatedSlots.length === 0 ? (
                        <div className="py-10 text-center text-jaipur-dark/60 font-serif italic text-xs tracking-wider">
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

            {/* Button */}
            <motion.button
                whileHover={selectedSlot ? { scale: 1.01 } : {}}
                whileTap={selectedSlot ? { scale: 0.99 } : {}}
                disabled={!selectedSlot}
                onClick={onNext}
                className={`w-full py-3.5 rounded-xl font-serif text-xs font-bold tracking-[3px] transition-all duration-300 uppercase border mt-2
                    ${!selectedSlot
                        ? "bg-sandstone/50 text-gray-400 cursor-not-allowed border-gray-200/60"
                        : "bg-gradient-to-r from-jaipur-dark to-[#994113] text-white border-gold/30 cursor-pointer"
                    }`}
            >
                {selectedSlot ? `Confirm ${selectedSlot.displayTime || selectedSlot.time} Entry ⟶` : "SELECT TIMING AT GATE"}
            </motion.button>
        </motion.div>
    );
}