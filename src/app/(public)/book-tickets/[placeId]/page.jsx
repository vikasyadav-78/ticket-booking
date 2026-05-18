"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import BookingFlowRight from "@/components/book-ticket/bookingRightBar/BookingFlowRight";
import BookingFlowLeft from "@/components/book-ticket/bookingLeftbar/BookingFlowLeft";
import { usePlaceById } from "@/lib/queries/usePlace";
import { setSelectedPlace } from "@/redux/features/place/placeSlice";
import { X, ShieldCheck } from "lucide-react";

export default function Page() {
    const { placeId } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { data: place, isLoading } = usePlaceById(placeId);

    useEffect(() => {
        if (place) {
            dispatch(setSelectedPlace(place));
        }
    }, [place, dispatch]);

    useEffect(() => {
        if (place?.name) {
            document.title = `${place.name} | Ticket Booking`;
        }
    }, [place]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sandstone">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-jaipur-pink/20 border-t-jaipur-dark rounded-full animate-spin"></div>
                    <p className="font-serif text-jaipur-dark italic">Loading Heritage...</p>
                </div>
            </div>
        );
    }

    if (!place) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sandstone">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-2">Place Not Found</h1>
                    <p className="text-gray-500">Invalid Place ID</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="fixed inset-0 flex bg-sandstone overflow-hidden z-50 flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        > 
            <div className="w-full bg-[#071633] border-b border-gold/10 px-4 sm:px-6 py-2 flex items-center justify-between z-50 shrink-0 select-none">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[3px] text-sandstone/60 font-bold font-sans">
                    <ShieldCheck size={11} className="text-gold animate-pulse" /> Official Booking Counter
                </div>
 
                <button
                    onClick={() => router.push("/")}
                    className="inline-flex items-center gap-1 text-[10px] uppercase font-sans font-bold tracking-[2px] text-white/70 hover:text-white bg-white/5 hover:bg-red-600 px-3 py-1 rounded-lg border border-white/10 hover:border-red-500/20 transition-all duration-300 cursor-pointer"
                >
                    Exit Portal <X size={12} />
                </button>
            </div>
 
            <div className="w-full flex-1 flex overflow-hidden">
                <BookingFlowLeft place={place} itemVariants={itemVariants} />

                <section
                    data-lenis-prevent
                    style={{ overscrollBehavior: "contain" }}
                    className="w-full lg:w-1/2 h-full overflow-y-auto bg-[#f8f4ed] flex items-center justify-center no-scrollbar p-4 sm:p-6 lg:p-8 relative"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full max-w-xl mx-auto h-full flex items-center justify-center"
                    >
                        <BookingFlowRight />
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
}