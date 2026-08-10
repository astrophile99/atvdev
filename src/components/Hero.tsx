"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ProjectMockupFrame from "./ProjectMockupFrame";
import { PROJECTS } from "@/data/projects";

export default function Hero() {
  const cocaColaProject = PROJECTS[0];
  const nikeProject = PROJECTS[1];
  const beautyProject = PROJECTS[2];

  return (
    <section className="relative min-h-[90vh] md:min-h-screen pt-28 md:pt-36 pb-16 px-6 md:px-10 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden">
      {/* Top Studio Micro Header / Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-[#E2DFD7] pb-4 mb-8 md:mb-12"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#3B4CCA] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#767470]">
            Digital Web Development Studio
          </span>
        </div>
        <span className="text-xs font-mono uppercase tracking-wider text-[#9E9A91] hidden sm:block">
          Est. 2026 — Available for select commissions
        </span>
      </motion.div>

      {/* Main Hero Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1 my-auto">
        {/* Left Column: Bold Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tighter leading-[0.95] text-[#111111] font-display uppercase text-balance mb-8"
          >
            We turn ideas <br className="hidden sm:block" />
            <span className="italic font-serif font-normal lowercase tracking-normal text-[#33312E] opacity-90 pr-2">
              into
            </span>
            websites.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#6B6862] max-w-xl font-normal leading-relaxed text-balance mb-8"
          >
            From the first thought to the final interaction, we build websites that feel like they belong to the brand.
          </motion.p>

          {/* Editorial Link / Jump to Work */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-widest text-[#111111] group"
            >
              <span className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#F5F3EE] transition-colors">
                ↓
              </span>
              <span>Explore Selected Work</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Art-Directed Project Preview Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] max-h-[520px] rounded-xs overflow-visible"
        >
          {/* Main Hero Fragment 1: Large Base Card */}
          <div className="absolute inset-0 top-0 left-0 w-[88%] h-[82%] shadow-2xl transition-transform duration-500 hover:scale-[1.01] z-10">
            <ProjectMockupFrame project={cocaColaProject} compact />
          </div>

          {/* Overlapping Hero Fragment 2: Accent Card (Nike) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-2 right-0 w-[62%] h-[60%] z-20 shadow-2xl border border-[#F5F3EE]/40"
          >
            <ProjectMockupFrame project={nikeProject} compact />
          </motion.div>

          {/* Overlapping Hero Fragment 3: Floating Micro Badge (Beauty Store) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-8 -left-4 w-[42%] h-[40%] z-30 shadow-xl border border-[#E2DFD7]/80 hidden sm:block"
          >
            <ProjectMockupFrame project={beautyProject} compact />
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Micro-Interaction / Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex items-center justify-between pt-8 border-t border-[#E2DFD7] text-xs text-[#767470]"
      >
        <div className="flex items-center gap-2">
          <ArrowDown className="w-3.5 h-3.5 text-[#3B4CCA] animate-bounce" />
          <span className="font-mono uppercase tracking-wider">Scroll for Exhibition</span>
        </div>
        <div className="font-mono text-right text-[11px] text-[#9E9A91] hidden sm:block">
          [ 08 Curated Projects ]
        </div>
      </motion.div>
    </section>
  );
}
