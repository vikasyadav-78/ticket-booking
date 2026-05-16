"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { usePlace } from "@/hooks/usePlace";
import { useBookingActions } from "@/hooks/useBookingActions";
import DateSelector from "./bookingParts/DateSelector";
import TicketCounter from "./bookingParts/TicketCounter";
import GuideSelector from "./bookingParts/GuideSelector";
import VisitorForm from "./bookingParts/VisitorForm";

export default function BookingFlowRight() {
    const [step, setStep] = useState(0);
    const reduxData = useSelector((state) => state.booking);
    const { placeId, isPlaceLoaded } = usePlace();

    // Scroll Control Logic based on Step
    useEffect(() => {
        const rightSection = document.querySelector('.overflow-y-auto');

        if (step === 0) {
            if (rightSection) rightSection.style.overflowY = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            if (rightSection) rightSection.style.overflowY = 'auto';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }

        return () => {
            if (rightSection) rightSection.style.overflowY = 'auto';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [step]);

    const { mutate: createBooking, isPending: isSubmitting } = useBookingActions();

    const handleFinalBooking = (visitorInfo) => {
        const payload = {
            placeId,
            slotDateTime: `${reduxData.date}T${reduxData.slot?.time}:00.000Z`,
            ...visitorInfo,
            totalAmount: parseFloat(reduxData.totalAmount),
            totalSeats: Object.values(reduxData.tickets).reduce((a, b) => a + b, 0),
            tickets: Object.entries(reduxData.tickets)
                .filter(([_, qty]) => qty > 0)
                .map(([id, qty]) => ({ typeId: id, quantity: qty })),
            addons: Object.keys(reduxData.addons).filter((id) => reduxData.addons[id] > 0),
        };

        createBooking(payload, {
            onSuccess: (res) => {
                if (res.success && res.data.payment) {
                    const paymentData = res.data.payment;
                    const form = document.createElement("form");
                    form.method = "POST";
                    form.action = paymentData.url;

                    Object.keys(paymentData).forEach((key) => {
                        if (key !== "url") {
                            const input = document.createElement("input");
                            input.type = "hidden";
                            input.name = key;
                            input.value = paymentData[key];
                            form.appendChild(input);
                        }
                    });
                    document.body.appendChild(form);
                    form.submit();
                }
            },
            onError: (err) => {
                console.error("Booking Error:", err);
                alert("Booking failed. Please try again.");
            },
        });
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-jaipur-pink/10 overflow-hidden relative w-full">
            {/* Header Padding thoda tight kiya hai */}
            <header className="bg-royal-blue py-5 px-6 text-center relative overflow-hidden shrink-0">
                <div className="absolute inset-0 opacity-10 bg-mandala pointer-events-none"></div>
                <h2 className="text-jaipur-pink font-serif text-xl tracking-[3px] uppercase italic relative z-10">
                    {step === 0 ? "Welcome to Heritage" : "Booking Details"}
                </h2>
                <div className="h-0.5 w-10 bg-gold/50 mx-auto mt-1.5 rounded-full relative z-10" />
            </header>

            {/* Inner Content Padding dynamic kiya hai */}
            <div className="p-5 sm:p-8 min-h-0">
                {step > 0 && <StepIndicator currentStep={step} />}
                <AnimatePresence mode="wait">
                    {step > 0 && !isPlaceLoaded ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-[250px] flex items-center justify-center font-serif italic text-jaipur-dark"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-4 border-jaipur-pink/20 border-t-jaipur-dark rounded-full animate-spin"></div>
                                <p>Loading ...</p>
                            </div>
                        </motion.div>
                    ) : (
                        renderStep(step, {
                            setStep,
                            handleFinalBooking,
                            reduxData,
                            isSubmitting,
                        })
                    )}
                </AnimatePresence>
            </div>
            {isSubmitting && <LoadingOverlay />}
        </div>
    );
}

function renderStep(step, props) {
    const { setStep, handleFinalBooking, reduxData, isSubmitting } = props;
    switch (step) {
        case 0:
            return <StartStep onNext={() => setStep(1)} />;
        case 1:
            return <DateSelector onNext={() => setStep(2)} />;
        case 2:
            return <TicketCounter onNext={() => setStep(3)} onBack={() => setStep(1)} tickets={reduxData.tickets} />;
        case 3:
            return <GuideSelector onNext={() => setStep(4)} onBack={() => setStep(2)} addons={reduxData.addons} />;
        case 4:
            return <VisitorForm onSubmit={handleFinalBooking} onBack={() => setStep(3)} loading={isSubmitting} />;
        default:
            return null;
    }
}

// StartStep ko short aur compact kiya hai taaki button hamesha samne dikhe
const StartStep = ({ onNext }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, x: -15 }}
        className="text-center py-2"
    >
        <div className="relative mb-5 inline-block">
            <img
                src="https://cdn-icons-png.flaticon.com/512/10103/10103980.png"
                className="w-20 sm:w-24 mx-auto opacity-90 drop-shadow-md"
                alt="Jaipur Palace Icon"
            />
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-royal-blue mb-1">
            Padharo Mhare Des
        </h3>
        <p className="text-jaipur-dark/70 text-xs sm:text-sm font-medium mb-6 italic">
            Experience the Timeless Royalty of the Pink City
        </p>

        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full py-4 bg-jaipur-dark text-white rounded-xl font-bold font-serif text-base sm:text-lg tracking-widest shadow-xl shadow-jaipur-dark/20 flex items-center justify-center gap-2"
        >
            BEGIN YOUR EXPERIENCE ➜
        </motion.button>
        <p className="mt-4 text-[9px] uppercase tracking-[2px] text-gray-400 font-bold">
            Authorized Heritage Booking
        </p>
    </motion.div>
);

const StepIndicator = ({ currentStep }) => (
    <div className="flex justify-between mb-6 max-w-xs mx-auto">
        {[1, 2, 3, 4].map((s) => (
            <div
                key={s}
                className={`h-1 w-1/5 rounded-full transition-all duration-500 ${currentStep >= s ? "bg-jaipur-dark" : "bg-gray-100"
                    }`}
            />
        ))}
    </div>
);

const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-jaipur-dark mb-3" />
        <p className="font-bold text-sm text-jaipur-dark animate-pulse">Confirming Royalty...</p>
    </div>
);