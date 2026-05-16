"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function RoyalCursor() {

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
            setIsHidden(false);
        };
        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
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
                    x: position.x - 5,
                    y: position.y - 5,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 28,
                    mass: 0.2,
                }}
                className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full bg-[#FFD700] z-[9999] pointer-events-none shadow-[0_0_15px_rgba(255,215,0,0.8)]"
            />
 
            <motion.div
                animate={{
                    x: position.x - 24,
                    y: position.y - 24,
                    scale: isHovering ? 1.8 : 1,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 20,
                }}
                className="fixed top-0 left-0 w-12 h-12 rounded-full border border-[#FFD700]/80 z-[9998] pointer-events-none shadow-[0_0_30px_rgba(255,215,0,0.45)] backdrop-blur-[1px]"
            />
 
            <motion.div
                animate={{
                    x: position.x - 40,
                    y: position.y - 40,
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.25 : 0.12,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 25,
                }}
                className="fixed top-0 left-0 w-20 h-20 rounded-full bg-[#FFD700] blur-3xl z-[9997] pointer-events-none"
            />

        </>
    );
}