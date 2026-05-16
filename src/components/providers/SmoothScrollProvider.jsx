"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // 2 thoda zyada heavy lagta hai, 1.5 par perfect luxury feel aati hai
            lerp: 0.08,
            smoothWheel: true,
            smoothTouch: false, // Touch validation ko false rakhein taaki inner modal container mobile/trackpad par jam na ho
            wheelMultiplier: 0.8,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return children;
}