"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RoyalCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);
        };
        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.tagName === "INPUT" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        const handleMouseLeave = () => {
            setIsHidden(true);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            <motion.div
                animate={{
                    x: position.x - 3, 
                    y: position.y - 3,
                    scale: isHovering ? 1.3 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 700, damping: 30, mass: 0.1 }}
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#FFD700] z-[9999] pointer-events-none shadow-[0_0_10px_rgba(255,215,0,0.9)]"
            />
            <motion.div
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#FFD700]/70 z-[9998] pointer-events-none shadow-[0_0_15px_rgba(255,215,0,0.25)] backdrop-blur-[0.5px]"
            />
            <motion.div
                animate={{
                    x: position.x - 24, 
                    y: position.y - 24,
                    scale: isHovering ? 1.6 : 1,
                    opacity: isHidden ? 0 : isHovering ? 0.15 : 0.08,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 28 }}
                className="fixed top-0 left-0 w-12 h-12 rounded-full bg-[#FFD700] blur-2xl z-[9997] pointer-events-none"
            />
        </>
    );
}