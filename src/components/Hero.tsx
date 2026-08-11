"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import ProjectMockupFrame from "./ProjectMockupFrame";
import { PROJECTS } from "@/data/projects";

export default function Hero() {
  const cocaColaProject = PROJECTS[0];
  const nikeProject = PROJECTS[1];
  const hospitalProject = PROJECTS[4];
  const constructionProject = PROJECTS[7];

  const heroRef = useRef<HTMLElement>(null);

  // Mouse Parallax Physics for Desktop
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      // Normalize mouse coords from -1 to 1
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth springs for mouse parallax offset (max 5-12px)
  const springConfig = { damping: 30, stiffness: 200 };
  const mouseX = useSpring(mousePos.x * 10, springConfig);
  const mouseY = useSpring(mousePos.y * 10, springConfig);
  const mouseXReverse = useSpring(mousePos.x * -8, springConfig);
  const mouseYReverse = useSpring(mousePos.y * -8, springConfig);

  // Scroll Parallax for Hero depth layers (without scroll hijacking)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 md:pt-36 pb-12 px-6 md:px-10 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden"
    >
      {/* BACKGROUND LAYER — Subtle Grid & Ambient Texture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 pointer-events-none opacity-40"
      >
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#3B4CCA]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F40009]/5 rounded-full blur-3xl" />
      </motion.div>

      {/* TOP METADATA BAR — Choreographed Reveal Step 1 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-[#E2DFD7] pb-4 mb-6 md:mb-10 z-20"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#3B4CCA] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#767470]">
            ATVDEV Studio Gallery — V2
          </span>
        </div>
        <span className="text-xs font-mono uppercase tracking-wider text-[#9E9A91] hidden sm:block">
          Editorial Minimalism + Visual Storytelling
        </span>
      </motion.div>

      {/* MAIN HERO ASYMMETRICAL EDITORIAL COMPOSITION */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center flex-1 my-auto relative z-10"
      >
        {/* LEFT / FOREGROUND COLUMN — Bold Typography & Statement */}
        <motion.div style={{ y: foregroundY }} className="lg:col-span-6 flex flex-col justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono uppercase tracking-widest text-[#3B4CCA] mb-4 font-semibold"
          >
            [ Independent Web Development Studio ]
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.92] text-[#111111] font-display uppercase text-balance mb-6"
          >
            WE TURN <br className="hidden sm:block" />
            IDEAS{" "}
            <span className="italic font-serif font-normal lowercase tracking-normal text-[#33312E] opacity-90 pr-2">
              into
            </span>
            <br className="hidden sm:block" />
            WEBSITES.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#6B6862] max-w-lg font-normal leading-relaxed text-balance mb-8"
          >
            From raw concept to art-directed digital experience, we build websites with craft, speed, and unforgettable visual presence.
          </motion.p>

          {/* Jump to Work Link */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-widest text-[#111111] group"
            >
              <span className="w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#F5F3EE] transition-colors shadow-xs">
                ↓
              </span>
              <span className="border-b border-transparent group-hover:border-[#111111] transition-all">
                Enter Exhibition
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT / MIDGROUND COLUMN — Multi-Fragment Art-Directed Collage */}
        <motion.div
          style={{ y: midgroundY }}
          className="lg:col-span-6 relative w-full aspect-[4/3.5] sm:aspect-[16/11] lg:aspect-[4/4.5] max-h-[540px] flex items-center justify-center"
        >
          {/* FRAGMENT 1 (PRIMARY): Coca-Cola Campaign Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: isDesktop ? mouseX : 0, y: isDesktop ? mouseY : 0 }}
            className="absolute top-0 left-0 lg:left-4 w-[85%] sm:w-[80%] h-[75%] sm:h-[78%] z-20 shadow-2xl rounded-xs border border-[#E2DFD7]/80 overflow-hidden"
          >
            <ProjectMockupFrame project={cocaColaProject} heroVariant />
          </motion.div>

          {/* FRAGMENT 2 (SECONDARY): Nike Performance Lab (Overlapping Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30, y: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: isDesktop ? mouseXReverse : 0, y: isDesktop ? mouseYReverse : 0 }}
            className="absolute bottom-0 right-0 w-[65%] sm:w-[60%] h-[58%] sm:h-[60%] z-30 shadow-2xl rounded-xs border border-white/60 overflow-hidden"
          >
            <ProjectMockupFrame project={nikeProject} heroVariant compact />
          </motion.div>

          {/* FRAGMENT 3 (MICRO ACCENT): Dhanwantari Hospital (Top Right Floating Badge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: isDesktop ? mouseX : 0 }}
            className="absolute -top-4 right-2 w-[45%] h-[38%] z-40 shadow-xl rounded-xs border border-[#E2DFD7] hidden sm:block overflow-hidden"
          >
            <ProjectMockupFrame project={hospitalProject} heroVariant compact />
          </motion.div>

          {/* FRAGMENT 4 (ARCHITECTURAL FOOTER FRAGMENT): Construction Formwork (Bottom Left Background Cue) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 0.55 }}
            className="absolute -bottom-4 -left-4 w-[40%] h-[32%] z-10 rounded-xs border border-[#D4D0C7] hidden lg:block overflow-hidden pointer-events-none grayscale opacity-60"
          >
            <ProjectMockupFrame project={constructionProject} compact />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* HERO FOOTER — Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex items-center justify-between pt-6 border-t border-[#E2DFD7] text-xs text-[#767470] z-20"
      >
        <div className="flex items-center gap-2">
          <ArrowDown className="w-3.5 h-3.5 text-[#3B4CCA] animate-bounce" />
          <span className="font-mono uppercase tracking-wider">Scroll to Explore Exhibition</span>
        </div>
        <div className="font-mono text-right text-[11px] text-[#9E9A91] hidden sm:block">
          [ 08 Curated Digital Rooms ]
        </div>
      </motion.div>
    </section>
  );
}
