"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for tracking cursor coordinates
  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor");
        if (text) {
          setCursorText(text.toUpperCase());
          setIsHovered(true);
          return;
        }
      }

      setIsHovered(false);
      setCursorText("");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:flex items-center justify-center rounded-full shadow-lg"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovered ? 80 : 10,
        height: isHovered ? 80 : 10,
        backgroundColor: "#111111",
      }}
      transition={{ type: "spring", damping: 28, stiffness: 380, mass: 0.25 }}
    >
      {isHovered && cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          className="text-[10px] font-mono font-semibold tracking-wider text-[#F5F3EE] uppercase flex items-center justify-center gap-0.5"
        >
          {cursorText === "VIEW" ? "VIEW →" : cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
