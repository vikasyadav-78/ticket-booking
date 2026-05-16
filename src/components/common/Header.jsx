"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BookNowBtn from "../ui/BookNowBtn";
import { usePlaces } from "@/lib/queries/usePlace";
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { data: places = [] } = usePlaces();
    const firstPlace = places?.[0];
    const bookingLink = firstPlace ? `/book-tickets/${firstPlace.id || firstPlace._id}` : "#";
 

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed w-full z-[999] top-0 left-0 transition-all duration-500 border-b backdrop-blur-xl ${scrolled ? "bg-royal-blue/90 shadow-2xl shadow-black/10 border-gold/20 py-2" : "bg-sandstone/90 border-jaipur-dark/10 py-2"}`} >
            <div className="max-w-7xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-10 h-[60px]">
                <Link href="/" className="flex items-center gap-3 group" >
                    <img src="https://s7ap1.scene7.com/is/image/incredibleindia/gaitore-jaipur-rajasthan-1-attr-nearby?qlt=82&ts=1742194269699"
                        alt="Logo"
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-jaipur-pink object-cover shadow-lg shadow-jaipur-pink/20 transition-all duration-500 group-hover:scale-105"
                    />

                    <p className={`font-bold text-lg sm:text-xl leading-tight transition-colors duration-500 ${scrolled ? "text-white" : "text-royal-blue"}`} >
                        Jaipur <br />
                        <span className="text-jaipur-pink text-xs uppercase tracking-[3px] font-sans">
                            Travel
                        </span>
                    </p>
                </Link>

                <div className="md:order-2">
                    <Link href={bookingLink}>
                        <BookNowBtn title={"Book Now"} addClass={scrolled ? "bg-jaipur-pink text-white border-none hover:bg-gold hover:scale-105" : "bg-jaipur-dark text-white border-none hover:bg-royal-blue hover:scale-105"} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;