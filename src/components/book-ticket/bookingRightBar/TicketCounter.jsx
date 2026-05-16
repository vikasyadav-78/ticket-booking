"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import CounterBtn from "../../ui/CounterBtn";
import { setTickets, setTotalAmount } from "@/redux/features/booking/bookingSlice";
import { usePlace } from "@/hooks/usePlace";
import { useTicketTypes } from "@/lib/queries/useTicketType";

export default function TicketCounter({ tickets, onNext, onBack }) {
    const dispatch = useDispatch();
    const { placeId } = usePlace();
    const { data: ticketTypes = [], isLoading } = useTicketTypes(placeId);
    const [counts, setCounts] = useState(tickets || {});

    useEffect(() => {
        if (ticketTypes.length > 0 && (Object.keys(counts).length === 0 || Object.values(counts).every((v) => v === 0))) {
            const init = {};
            ticketTypes.forEach((t) => { init[t.id] = 0; });
            setCounts(init);
        }
    }, [ticketTypes]);

    const updateCount = (id, value, max) => {
        setCounts((prev) => {
            const currentCount = prev[id] || 0;
            const newCount = currentCount + value;
            if (newCount >= 0 && newCount <= max) {
                return { ...prev, [id]: newCount };
            }
            return prev;
        });
    };

    const total = useMemo(() => {
        return ticketTypes.reduce((acc, t) => acc + ((counts[t.id] || 0) * t.price), 0);
    }, [ticketTypes, counts]);

    const handleContinue = () => {
        if (total === 0) return;
        dispatch(setTickets(counts));
        dispatch(setTotalAmount(total));
        onNext();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-jaipur-pink/20 border-t-jaipur-dark rounded-full animate-spin" />
                <p className="font-serif italic text-jaipur-dark tracking-widest">Preparing Royal Passes...</p>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full space-y-6">
            <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-royal-blue">Select Tickets</h2>
                <div className="h-1 w-16 bg-jaipur-pink mt-1 rounded-full" />
            </div>

            <div className="max-h-[380px] overflow-y-auto space-y-4 pr-1 scrollbar-hide">
                {ticketTypes.map((t) => {
                    const uniqueKey = t._id || t.id || index;
                    const isSelected = (counts[uniqueKey] || 0) > 0;
                    return (
                        <motion.div key={uniqueKey} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-2xl transition-all duration-300 border-2 ${isSelected ? "border-dotted border-royal-blue bg-jaipur-pink/5 shadow-md" : "border-jaipur-pink/10 bg-white"}`}>
                            <div className="mb-4 sm:mb-0">
                                <p className={`text-xl font-serif font-bold ${isSelected ? "text-royal-blue" : "text-gray-800"}`}>{t.name}</p>
                                <p className="text-jaipur-dark/60 text-[10px] font-bold uppercase tracking-wider">Max limit: {t.maxPerBooking} Visitors</p>
                            </div>
                            <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                                <p className="font-bold text-xl text-jaipur-dark">₹{t.price}</p>
                                <div className="flex items-center gap-3 bg-sandstone px-2 py-1 rounded-xl border border-jaipur-pink/20">
                                    <CounterBtn text="-" onClick={() => updateCount(uniqueKey, -1, t.maxPerBooking)} disabled={(counts[uniqueKey] || 0) <= 0} />
                                    <div className="w-10 text-center font-bold font-serif text-lg text-royal-blue">{counts[uniqueKey] || 0}</div>
                                    <CounterBtn text="+" onClick={() => updateCount(uniqueKey, 1, t.maxPerBooking)} disabled={(counts[uniqueKey] || 0) >= t.maxPerBooking} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-royal-blue text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] tracking-[3px] text-jaipur-pink font-bold uppercase">Total Payable Amount</p>
                        <motion.h3 key={total} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-3xl font-serif font-bold text-white">₹{total}</motion.h3>
                    </div>
                    <div className="text-3xl">🎟️</div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-10 gap-4">
                <button onClick={onBack} className="flex-1 py-4 font-bold text-jaipur-dark hover:text-royal-blue transition-colors uppercase tracking-widest text-sm">← Back</button>
                <button disabled={total === 0} onClick={handleContinue} className={`flex-[2] py-4 rounded-2xl font-serif font-bold tracking-[2px] transition-all duration-300 shadow-lg ${total === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-jaipur-dark text-white hover:bg-royal-blue active:scale-95 shadow-jaipur-pink/20"}`}>CONTINUE ➜</button>
            </div>
        </motion.div>
    );
}