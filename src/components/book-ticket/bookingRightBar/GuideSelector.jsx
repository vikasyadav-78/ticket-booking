"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setAddons, setTotalAmount } from "@/redux/features/booking/bookingSlice";
import { usePlace } from "@/hooks/usePlace";
import { useAddons } from "@/lib/queries/useAddon";

export default function GuideSelector({ addons, onNext, onBack }) {
    const dispatch = useDispatch();
    const ticketTotal = useSelector((state) => state.booking.totalAmount);
    const { placeId } = usePlace();

    const { data: addonList = [], isLoading } = useAddons(placeId, "active");
    const [counts, setCounts] = useState(addons || {});

    useEffect(() => {
        if (addonList.length > 0 && Object.keys(counts).length === 0) {
            const init = {};
            addonList.forEach((item) => {
                const id = item.id || item._id;
                init[id] = 0;
            });
            setCounts(init);
        }
    }, [addonList]);

    const updateCount = (id, value) => {
        setCounts((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + value),
        }));
    };

    const addonTotal = useMemo(() => {
        return addonList.reduce((acc, item) => {
            const id = item.id || item._id;
            return acc + ((counts[id] || 0) * item.price);
        }, 0);
    }, [addonList, counts]);

    const grandTotal = ticketTotal + addonTotal;

    const handleContinue = () => {
        dispatch(setAddons(counts));
        dispatch(setTotalAmount(grandTotal));
        onNext();
    };

    const handleSkip = () => {
        const resetCounts = {};
        addonList.forEach((item) => {
            const id = item.id || item._id;
            resetCounts[id] = 0;
        });
        dispatch(setAddons(resetCounts));
        dispatch(setTotalAmount(ticketTotal));
        onNext();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-jaipur-pink/20 border-t-jaipur-dark rounded-full animate-spin" />
                <p className="font-serif italic text-jaipur-dark">Discovering Royal Add-ons...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-royal-blue leading-tight">Enhance Visit</h2>
                    <div className="h-1 w-12 bg-jaipur-pink mt-1 rounded-full" />
                </div>
                <button onClick={handleSkip} className="text-jaipur-dark hover:text-royal-blue font-bold text-xs uppercase tracking-widest border-b border-jaipur-dark/30 pb-1 transition-all">
                    Skip & Continue →
                </button>
            </div>
            <div className="max-h-[350px] overflow-y-auto space-y-4 pr-1 scrollbar-hide">
                {addonList.map((item, index) => {
                    const itemId = item.id || item._id;
                    const isSelected = (counts[itemId] || 0) > 0;
                    return (
                        <motion.div
                            key={itemId || index} // Fixed unique key
                            className={`flex justify-between items-center p-5 rounded-2xl transition-all duration-300 border-2 
                                ${isSelected ? "border-dotted border-royal-blue bg-jaipur-pink/5 shadow-md" : "border-jaipur-pink/10 bg-white"}`}>
                            <div>
                                <p className={`text-lg font-serif font-bold ${isSelected ? "text-royal-blue" : "text-gray-800"}`}>
                                    {item.name}
                                </p>
                                <p className="text-jaipur-dark font-bold text-sm">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-sandstone px-2 py-1 rounded-xl border border-jaipur-pink/20">
                                <button
                                    onClick={() => updateCount(itemId, -1)}
                                    className="w-8 h-8 rounded-full border border-jaipur-pink text-jaipur-pink hover:bg-jaipur-pink hover:text-white transition-colors flex items-center justify-center font-bold">
                                    -
                                </button>
                                <div className="w-8 text-center font-bold font-serif text-royal-blue">
                                    {counts[itemId] || 0}
                                </div>
                                <button
                                    onClick={() => updateCount(itemId, 1)}
                                    className="w-8 h-8 rounded-full bg-jaipur-pink text-white hover:bg-jaipur-dark transition-colors flex items-center justify-center font-bold">
                                    +
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-royal-blue text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-mandala pointer-events-none" />
                <div className="relative z-10 space-y-3">
                    <div className="flex justify-between text-[10px] tracking-[2px] uppercase text-jaipur-pink font-bold">
                        <span>Tickets: ₹{ticketTotal}</span>
                        <span>Add-ons: ₹{addonTotal}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-3">
                        <div>
                            <p className="text-[10px] tracking-[3px] text-white/60 font-bold uppercase">Grand Total</p>
                            <h3 className="text-3xl font-serif font-bold">₹{grandTotal}</h3>
                        </div>
                        <div className="text-3xl opacity-50">👑</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-10 gap-4">
                <button onClick={onBack} className="flex-1 py-4 font-bold text-jaipur-dark hover:text-royal-blue transition-colors uppercase tracking-widest text-sm">
                    ← Back
                </button>
                <button onClick={handleContinue} className="flex-[2] py-4 bg-jaipur-dark text-white rounded-2xl font-serif font-bold tracking-[2px] shadow-xl hover:bg-royal-blue active:scale-95 transition-all shadow-jaipur-pink/20">
                    PROCEED TO DETAILS ➜
                </button>
            </div>
        </motion.div>
    );
}