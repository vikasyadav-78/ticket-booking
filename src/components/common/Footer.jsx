"use client";

import Link from "next/link";

import BookNowBtn from "../ui/BookNowBtn";

import { usePlaces } from "@/lib/queries/usePlace";

export default function Footer() {

    const { data: places = [] } = usePlaces();

    const firstPlace = places?.[0];

    const bookingLink = firstPlace
        ? `/book-tickets/${firstPlace.id || firstPlace._id}`
        : "#";

    return (

        <footer className="relative overflow-hidden bg-royal-blue pt-24 md:pt-32">

            {/* BACKGROUND */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage:
                        `url('https://www.transparenttextures.com/patterns/mandala-light.png')`
                }}
            />

            {/* TOP CTA */}
            <div className="relative z-20 flex flex-col items-center px-4 text-center">

                <p className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight">

                    Ready to Explore{" "}

                    <span className="text-jaipur-pink italic">

                        Royalty?

                    </span>

                </p>

                <p className="mt-4 max-w-2xl text-sandstone/80 text-base sm:text-lg leading-relaxed">

                    Secure your entry to Jaipur's most iconic heritage sites.
                    Experience history like never before.

                </p>

                <Link href={bookingLink} className="mt-8">

                    <BookNowBtn
                        title={"Get Your Royal Pass"}
                        addClass={
                            "bg-jaipur-pink text-white border-none px-12 py-4 text-lg hover:bg-gold hover:scale-105 transition-all duration-500"
                        }
                    />

                </Link>

            </div>

            {/* MAIN FOOTER */}
            <div className="relative z-10 mt-20 mx-auto max-w-7xl rounded-t-[50px] md:rounded-t-[70px] bg-sandstone px-6 sm:px-10 py-12 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-royal-blue">

                    {/* CONTACT */}
                    <div className="space-y-4">

                        <h3 className="font-serif font-bold text-2xl border-b-2 border-jaipur-pink w-fit">

                            Contact Us

                        </h3>

                        <p className="font-medium opacity-80 leading-relaxed">

                            Azzunique Jaipur Head Office
                            <br />
                            Near Hawa Mahal, Jaipur, RJ

                        </p>

                    </div>

                    {/* EMAIL */}
                    <div className="space-y-4">

                        <h3 className="font-serif font-bold text-2xl border-b-2 border-jaipur-pink w-fit">

                            Digital Desk

                        </h3>

                        <p className="font-medium opacity-80 break-all cursor-pointer hover:text-jaipur-dark transition-all duration-300">

                            info@azzunique.com

                        </p>

                        <p className="font-medium opacity-80">

                            +91 141-XXXXXXX

                        </p>

                    </div>

                    {/* LINKS */}
                    <div className="flex flex-col gap-4 font-bold uppercase text-xs tracking-widest pt-2">

                        <Link
                            href="/privacy"
                            className="hover:text-jaipur-pink hover:translate-x-1 transition-all duration-300"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-jaipur-pink hover:translate-x-1 transition-all duration-300"
                        >
                            Terms & Conditions
                        </Link>

                        <Link
                            href="/faq"
                            className="hover:text-jaipur-pink hover:translate-x-1 transition-all duration-300"
                        >
                            FAQs
                        </Link>

                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="mt-16 pt-8 border-t border-royal-blue/10 text-center text-sm font-sans tracking-widest text-royal-blue/60">

                    MADE WITH ❤️ IN JAIPUR BY{" "}

                    <span className="text-jaipur-dark font-black uppercase">

                        Vikas

                    </span>

                </div>

            </div>

            {/* DECORATION */}
            <img
                src="https://naturetrail.mcgm.gov.in/images/website/footer/left-side-footer-img.webp"
                alt=""
                className="absolute bottom-0 left-0 z-20 w-32 md:w-56 grayscale sepia opacity-30 pointer-events-none"
            />

            <img
                src="https://naturetrail.mcgm.gov.in/images/website/footer/right-side-footer-img.webp"
                alt=""
                className="absolute bottom-0 right-0 z-20 w-32 md:w-56 grayscale sepia opacity-30 pointer-events-none"
            />

        </footer>
    );
}