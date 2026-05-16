"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import BookingFlowRight from "@/components/book-ticket/bookingRightBar/BookingFlowRight";
import { usePlaceById } from "@/lib/queries/usePlace";
import { setSelectedPlace } from "@/redux/features/place/placeSlice";
import BookingFlowLeft from "@/components/book-ticket/bookingLeftbar/BookingFlowLeft";

export default function Page() {
    const { placeId } = useParams();
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
            className="h-[calc(100vh-82px)] w-full flex bg-sandstone overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* LEFT SECTION */}
            <BookingFlowLeft place={place} itemVariants={itemVariants} />

            {/* RIGHT SECTION */}
            <section className="w-full lg:w-1/2 h-full overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-lg mx-auto"
                >
                    <BookingFlowRight />
                </motion.div>
            </section>
        </motion.div>
    );
}