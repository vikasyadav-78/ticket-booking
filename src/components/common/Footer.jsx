"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, FileText, HelpCircle } from "lucide-react";
import BookNowBtn from "../ui/BookNowBtn";
import { usePlaces } from "@/lib/queries/usePlace";

export default function Footer() {
    const { data: places = [] } = usePlaces();
    const firstPlace = places?.[0];
    const bookingLink = firstPlace ? `/book-tickets/${firstPlace.id || firstPlace._id}` : "#";

    return (
        <footer className="relative overflow-hidden bg-[#001f14] pt-24 md:pt-32 select-none">
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-center bg-repeat"
                style={{
                    backgroundImage: `url('https://www.transparenttextures.com/patterns/mandala-light.png')`,
                    backgroundSize: '300px'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-20 flex flex-col items-center px-4 text-center max-w-4xl mx-auto"
            >
                <p className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight font-normal">
                    Ready to Explore{" "}
                    <span className="text-gold italic font-serif font-medium">Royalty?</span>
                </p>
                <p className="mt-4 max-w-xl text-sandstone/70 text-sm sm:text-base leading-relaxed font-sans font-light">
                    Secure your premium gate pass access to Jaipur's most iconic heritage landmarks and protected ecological trails. Experience timeless history.
                </p>

                <Link href={bookingLink} className="mt-8 group">
                    <BookNowBtn
                        title="Book Your Ticekt Now"
                        addClass="bg-jaipur-pink text-white border-none px-10 py-4 text-xs tracking-[2px] uppercase font-serif font-bold rounded-xl hover:bg-[#C35A40] hover:scale-105 hover:shadow-[0_10px_25px_rgba(195,90,64,0.3)] transition-all duration-300 transform"
                    />
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative z-30 mt-20 mx-auto max-w-7xl rounded-t-[40px] md:rounded-t-[60px] bg-white border-t border-gold/20 px-6 sm:px-12 py-14 shadow-[0_-25px_60px_rgba(0,0,0,0.15)]"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-royal-blue pb-10 border-b border-gold/10">

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gold/20 pb-2 w-fit">
                            <MapPin size={18} className="text-jaipur-dark" />
                            <h3 className="font-serif font-bold text-xl tracking-wide">Contact Hub</h3>
                        </div>
                        <p className="font-sans font-medium text-sm text-gray-600 leading-relaxed max-w-xs pl-1">
                            Azzunique Jaipur Head Office
                            <br />
                            <span className="text-xs text-gray-400 font-normal">Opposite Hawa Mahal, Core Heritage Zone, Jaipur, Rajasthan (302002)</span>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gold/20 pb-2 w-fit">
                            <Mail size={18} className="text-jaipur-dark" />
                            <h3 className="font-serif font-bold text-xl tracking-wide">Digital Desk</h3>
                        </div>
                        <div className="space-y-2.5 pl-1 font-sans text-sm text-gray-600 font-medium">
                            <p className="break-all hover:text-jaipur-dark transition-colors inline-block cursor-pointer underline decoration-gold/40">
                                info@azzunique.com
                            </p>
                            <p className="flex items-center gap-2 text-xs font-mono tracking-wider text-gray-400 font-bold">
                                <Phone size={12} className="text-jaipur-dark/60" /> +91 141-2XXXXXX
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-gold/20 pb-2 w-fit">
                            <ShieldCheck size={18} className="text-jaipur-dark" />
                            <h3 className="font-serif font-bold text-xl tracking-wide">Governance</h3>
                        </div>

                        <div className="flex flex-col gap-3 font-sans font-bold text-xs tracking-wider uppercase text-royal-blue/80 pl-1">
                            <Link href="/privacy-policy" className="flex items-center gap-1.5 hover:text-jaipur-dark group transition-colors w-fit">
                                <FileText size={13} className="text-gold" /> Privacy Policy
                                <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>

                            <Link href="/terms-and-conditions" className="flex items-center gap-1.5 hover:text-jaipur-dark group transition-colors w-fit">
                                <FileText size={13} className="text-gold" /> Terms & Conditions
                                <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>

                            <Link href="/faq" className="flex items-center gap-1.5 hover:text-jaipur-dark group transition-colors w-fit">
                                <HelpCircle size={13} className="text-gold" /> FAQs
                                <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-10 text-center text-[11px] font-sans tracking-[3px] text-gray-400 uppercase">
                    MADE WITH ❤️ IN INDIA BY{" "}
                    <span className="text-royal-blue font-black tracking-[2px] ml-1">
                        AZZUNIQUE
                    </span>
                </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 z-20 w-28 sm:w-36 md:w-52 pointer-events-none opacity-[0.12] mix-blend-luminosity select-none">
                <img
                    src="https://naturetrail.mcgm.gov.in/images/website/footer/left-side-footer-img.webp"
                    alt=""
                    className="w-full h-auto object-contain object-bottom origin-bottom-left"
                />
            </div>

            <div className="absolute bottom-0 right-0 z-20 w-28 sm:w-36 md:w-52 pointer-events-none opacity-[0.12] mix-blend-luminosity select-none">
                <img
                    src="https://naturetrail.mcgm.gov.in/images/website/footer/right-side-footer-img.webp"
                    alt=""
                    className="w-full h-auto object-contain object-bottom origin-bottom-right"
                />
            </div>

        </footer>
    );
}