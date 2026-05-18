import React from 'react'

export default function GuidBanner() {
    return (
        <>
            <section className="py-16 mt-28 bg-white border-y border-[#F4F1DE]">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-[#E07A5F] uppercase tracking-[4px] text-xs font-bold mb-2">Easy Steps</p>
                    <h2 className="text-3xl font-bold text-[#1A365D] font-serif mb-12">How to Book Your Entry Ticket</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Select Destination", desc: "Choose your favorite heritage site or nature trail from Jaipur." },
                            { step: "02", title: "Pick Date & Slot", desc: "Select a convenient date along with morning or evening time slots." },
                            { step: "03", title: "Instant QR Pass", desc: "Make secure payment online and receive your digital verification code pass." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#F4F1DE]/30 p-8 rounded-2xl text-left relative border border-[#F4F1DE]/60">
                                <span className="text-5xl font-extrabold text-[#E07A5F]/10 absolute top-4 right-6 font-serif">{item.step}</span>
                                <h4 className="text-lg font-bold text-[#1A365D] font-serif mt-4">{item.title}</h4>
                                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
