"use client";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import Status from "@/components/book-ticket/bookingRightBar/Status";

function FailureContent() {
    const router = useRouter();
    const handleRetry = () => {
        router.push("/book-tickets");
    };

    return (
        <div className="min-h-screen bg-[#f6f1e8] p-6 flex items-center justify-center">
            <div className="max-w-xl w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-red-100">
                <Status
                    status="failed"
                    onRetry={handleRetry}
                />

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push("/")}
                        className="text-gray-400 font-bold uppercase tracking-widest text-xs hover:text-black transition-colors" >
                        Cancel and Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PaymentFailurePage() {
    return (
        <Suspense fallback={<div className="text-center p-20 font-bold">Please wait...</div>}>
            <FailureContent />
        </Suspense>
    );
}