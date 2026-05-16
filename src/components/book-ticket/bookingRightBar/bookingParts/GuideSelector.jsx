"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import CounterBtn from "../../../ui/CounterBtn";
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
                <div className="w-10 h-10 border-4 border-jaipur-pink/20 border-t-jaipur-dark rounded-full animate-spin" />
                <p className="font-serif italic text-sm text-royal-blue/70 tracking-widest uppercase">Discovering Royal Add-ons...</p>
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
            {/* Header Section */}
            <div className="flex justify-between items-end mb-2">
                <div className="relative">
                    <p className="text-[9px] tracking-[4px] text-gold uppercase font-bold mb-1">Services Marketplace</p>
                    <h2 className="text-2xl sm:text-3xl font-serif font-normal text-royal-blue leading-tight">Enhance Visit</h2>
                    <div className="h-[1px] w-12 bg-gold/40 mt-2" />
                </div>
                <button onClick={handleSkip} className="text-jaipur-dark hover:text-royal-blue font-serif font-bold text-[10px] uppercase tracking-widest border-b border-gold/40 pb-0.5 transition-all cursor-pointer shrink-0">Skip Services ⟶</button>
            </div>

            {/* Scrolling Addons Container */}
            <div className="max-h-[220px] overflow-y-auto space-y-2.5 pr-0 rounded-xl border border-dashed border-gold/15 p-2 bg-sandstone/10 no-scrollbar">
                {addonList.map((item, index) => {
                    const itemId = item.id || item._id;
                    const isSelected = (counts[itemId] || 0) > 0;
                    
                    return (
                        <motion.div
                            key={itemId || index}
                            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl transition-all duration-300 border text-left select-none w-full gap-2
                                ${isSelected 
                                    ? "border-gold bg-gradient-to-br from-royal-blue to-[#112952] text-white shadow-lg" 
                                    : "border-gold/15 bg-white hover:border-gold/40 text-royal-blue"
                                }`}
                        >
                            <div className="mb-3 sm:mb-0 space-y-0.5 flex-1">
                                <p className={`font-serif text-base font-semibold tracking-wide ${isSelected ? "text-gold" : "text-royal-blue"}`}>
                                    {item.name}
                                </p>
                                <p className={`text-[10px] font-bold tracking-wider uppercase font-sans ${isSelected ? "text-white/60" : "text-gray-400"}`}>
                                    Premium Service Option
                                </p>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 shrink-0">
                                {/* FIX 1: Price Text - Big and prominent look (text-xl font-bold) */}
                                <p className={`font-serif text-xl font-bold tracking-wide ${isSelected ? "text-gold drop-shadow-sm" : "text-royal-blue"}`}>
                                    ₹{item.price}
                                </p>
                                
                                {/* Counter Controls using official CounterBtn */}
                                <div className={`flex items-center gap-3 px-2 py-1.5 rounded-lg border transition-colors duration-300
                                    ${isSelected 
                                        ? "bg-white/10 border-white/20" 
                                        : "bg-sandstone/80 border-gold/15"
                                    }`}
                                >
                                    <CounterBtn 
                                        text="-" 
                                        onClick={() => updateCount(itemId, -1)} 
                                        disabled={(counts[itemId] || 0) <= 0} 
                                    />
                                    {/* FIX 2: Counter Value Text - Size badha kar text-xl font-bold kiya */}
                                    <div className={`w-8 text-center font-bold font-serif text-xl ${isSelected ? "text-white" : "text-royal-blue"}`}>
                                        {counts[itemId] || 0}
                                    </div>
                                    <CounterBtn 
                                        text="+" 
                                        onClick={() => updateCount(itemId, 1)} 
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Total Invoice Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-royal-blue to-[#0b2149] text-white shadow-xl relative overflow-hidden border border-gold/20">
                <div className="absolute inset-0 opacity-[0.06] bg-mandala pointer-events-none scale-120"></div>
                <div className="relative z-10 space-y-2.5">
                    <div className="flex justify-between text-[10px] tracking-[2px] uppercase font-bold font-sans text-gold/80">
                        <motion.span key={ticketTotal} initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Tickets: ₹{ticketTotal}</motion.span>
                        <motion.span key={addonTotal} initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Add-ons: ₹{addonTotal}</motion.span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-2.5">
                        <div className="space-y-0.5">
                            <p className="text-[9px] tracking-[3px] text-white/60 font-bold uppercase font-sans">Grand Total Balance</p>
                            <motion.h3 key={grandTotal} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="text-2xl sm:text-3xl font-serif font-semibold text-white tracking-wide">₹{grandTotal}</motion.h3>
                        </div>
                        <div className="text-2xl filter drop-shadow-md select-none opacity-80">👑</div>
                    </div>
                </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex justify-between items-center pt-2 gap-4">
                <button onClick={onBack} className="flex-1 py-3.5 font-bold font-serif text-xs text-jaipur-dark hover:text-royal-blue transition-colors uppercase tracking-[2px]">← Back</button>
                <button onClick={handleContinue} className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-jaipur-dark to-[#994113] text-white border border-gold/30 font-serif text-xs font-bold tracking-[3px] transition-all duration-300 uppercase shadow-md shadow-jaipur-dark/10 cursor-pointer">PROCEED TO DETAILS ⟶</button>
            </div>
        </motion.div>
    );
}