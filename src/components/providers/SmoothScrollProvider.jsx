"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }) {

    useEffect(() => {

        const lenis = new Lenis({

            duration: 2,

            lerp: 0.08,

            smoothWheel: true,

            smoothTouch: true,

            wheelMultiplier: 0.7,

            touchMultiplier: 1.5,

            infinite: false,

            syncTouch: true,

            syncTouchLerp: 0.1,

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