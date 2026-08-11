"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectMockupFrame from "./ProjectMockupFrame";
import { PROJECTS, Project } from "@/data/projects";

export default function PortfolioExhibition() {
  const p1 = PROJECTS[0]; // Coca-Cola — ENERGY
  const p2 = PROJECTS[1]; // Nike — PRECISION
  const p3 = PROJECTS[2]; // Beauty Store — ELEGANCE
  const p4 = PROJECTS[3]; // Ecommerce — FUNCTION
  const p5 = PROJECTS[4]; // Dhanwantari Hospital — TRUST
  const p6 = PROJECTS[5]; // Stacked Burger — PERSONALITY
  const p7 = PROJECTS[6]; // Roam Travel — ESCAPE
  const p8 = PROJECTS[7]; // Formwork Construction — AUTHORITY

  return (
    <section id="work" className="w-full relative py-12 md:py-24">
      {/* SECTION PAUSE & HEADING */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 border-b border-[#E2DFD7]">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-4"
        >
          [ Selected Work ]
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#111111] max-w-4xl text-balance font-display uppercase leading-[0.98]"
        >
          Different ideas. Different industries. <br />
          <span className="italic font-serif font-normal lowercase tracking-normal text-[#4A4742]">
            Same attention
          </span>{" "}
          to detail.
        </motion.h2>
      </div>

      {/* 08 CURATED GALLERY ROOMS */}
      <div className="space-y-16 md:space-y-28 pt-12 md:pt-20">
        {/* ROOM 01 — COCA-COLA (ENERGY / DARK RED ENVIRONMENT) */}
        <div className="bg-[#110505] text-white py-16 md:py-28 px-6 md:px-10 border-y border-[#331111] relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#331111] pb-6">
              <div>
                <span className="font-mono text-xs text-[#F40009] tracking-widest uppercase block mb-1">
                  ROOM 01 // ENERGY
                </span>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter font-display text-white">
                  {p1.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                {p1.category}
              </span>
            </div>

            <Link
              href={p1.href}
              data-cursor="view"
              className="block group relative w-full aspect-[16/9] max-h-[620px] overflow-hidden rounded-xs border border-[#F40009]/30 shadow-2xl"
            >
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <ProjectMockupFrame project={p1} />
              </div>
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono pt-2">
              <p className="text-zinc-400 max-w-xl font-sans text-sm md:text-base leading-relaxed">
                {p1.description}
              </p>
              <Link
                href={p1.href}
                data-cursor="view"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F40009] hover:text-white transition-colors shrink-0"
              >
                <span>Explore Project 01</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ROOM 02 — NIKE (PRECISION / MONOCHROME BLACK ENVIRONMENT) */}
        <div className="bg-[#0D0D0D] text-[#F5F5F5] py-16 md:py-28 px-6 md:px-10 border-y border-zinc-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#E0E0E0] tracking-widest uppercase block">
                ROOM 02 // PRECISION
              </span>
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter font-display text-white">
                {p2.title}
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
                {p2.description}
              </p>
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{p2.category}</span>
                <Link
                  href={p2.href}
                  data-cursor="view"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white hover:text-zinc-400 transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Link
                href={p2.href}
                data-cursor="view"
                className="block group relative w-full aspect-[4/3] overflow-hidden rounded-xs border border-zinc-800 shadow-2xl"
              >
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <ProjectMockupFrame project={p2} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ROOM 03 — BEAUTY STORE (ELEGANCE / WARM CREAM ENVIRONMENT) */}
        <div className="bg-[#F7F5F0] text-[#2C2926] py-16 md:py-28 px-6 md:px-10 border-y border-[#E5E0D6]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Link
                href={p3.href}
                data-cursor="view"
                className="block group relative w-full aspect-[4/3] overflow-hidden rounded-xs border border-[#E5E0D6] shadow-xl"
              >
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <ProjectMockupFrame project={p3} />
                </div>
              </Link>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#8C857B] tracking-widest uppercase block">
                ROOM 03 // ELEGANCE
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#2C2926]">
                {p3.title}
              </h3>
              <p className="text-sm md:text-base text-[#6E685E] leading-relaxed font-sans">
                {p3.description}
              </p>
              <div className="pt-4 border-t border-[#E5E0D6] flex items-center justify-between text-xs font-mono">
                <span className="text-[#8C857B]">{p3.category}</span>
                <Link
                  href={p3.href}
                  data-cursor="view"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2C2926] hover:text-[#C9B6A1] transition-colors"
                >
                  <span>Explore Store</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ROOM 04 — FORM / MARKET ECOMMERCE (FUNCTION / LIGHT NEUTRAL ENVIRONMENT) */}
        <div className="bg-[#F2F0EB] text-[#141414] py-16 md:py-24 px-6 md:px-10 border-y border-[#D8D4CA]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8D4CA] pb-6">
              <div>
                <span className="font-mono text-xs text-[#3B4CCA] tracking-widest uppercase block mb-1">
                  ROOM 04 // FUNCTION
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter font-display">
                  {p4.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                {p4.category}
              </span>
            </div>

            <Link
              href={p4.href}
              data-cursor="view"
              className="block group relative w-full aspect-[16/9] max-h-[560px] overflow-hidden rounded-xs border border-[#D8D4CA] shadow-xl"
            >
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <ProjectMockupFrame project={p4} />
              </div>
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono pt-2">
              <p className="text-zinc-600 max-w-xl font-sans text-sm md:text-base leading-relaxed">
                {p4.description}
              </p>
              <Link
                href={p4.href}
                data-cursor="view"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#141414] hover:text-[#3B4CCA] transition-colors shrink-0"
              >
                <span>View Platform</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ROOM 05 — DHANWANTARI HOSPITAL (TRUST / PALE SAGE ENVIRONMENT) */}
        <div className="bg-[#F4F7F4] text-[#1B2A23] py-16 md:py-28 px-6 md:px-10 border-y border-[#D3E0D6]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#2E5A44] tracking-widest uppercase block">
                ROOM 05 // TRUST
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase font-display text-[#1B2A23]">
                {p5.title}
              </h3>
              <p className="text-sm md:text-base text-[#44594E] leading-relaxed font-sans">
                {p5.description}
              </p>
              <div className="pt-4 border-t border-[#D3E0D6] flex items-center justify-between text-xs font-mono">
                <span className="text-[#2E5A44]">{p5.category}</span>
                <Link
                  href={p5.href}
                  data-cursor="view"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1B2A23] hover:text-[#2E5A44] transition-colors"
                >
                  <span>View Portal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Link
                href={p5.href}
                data-cursor="view"
                className="block group relative w-full aspect-[4/3] overflow-hidden rounded-xs border border-[#D3E0D6] shadow-xl"
              >
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <ProjectMockupFrame project={p5} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ROOM 06 — STACKED BURGER (PERSONALITY / SMOKY DARK ENVIRONMENT) */}
        <div className="bg-[#141110] text-[#F9F6F0] py-16 md:py-28 px-6 md:px-10 border-y border-zinc-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Link
                href={p6.href}
                data-cursor="view"
                className="block group relative w-full aspect-[4/3] overflow-hidden rounded-xs border border-[#E65100]/30 shadow-2xl"
              >
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <ProjectMockupFrame project={p6} />
                </div>
              </Link>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#E65100] tracking-widest uppercase block">
                ROOM 06 // PERSONALITY
              </span>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
                {p6.title}
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
                {p6.description}
              </p>
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-[#E65100]">{p6.category}</span>
                <Link
                  href={p6.href}
                  data-cursor="view"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E65100] hover:text-white transition-colors"
                >
                  <span>View Menu Site</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ROOM 07 — ROAM TRAVEL (ESCAPE / CINEMATIC SKY ENVIRONMENT) */}
        <div className="bg-[#EFF4F8] text-[#1A202C] py-16 md:py-24 px-6 md:px-10 border-y border-[#D2E0EC]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D2E0EC] pb-6">
              <div>
                <span className="font-mono text-xs text-[#2C5282] tracking-widest uppercase block mb-1">
                  ROOM 07 // ESCAPE
                </span>
                <h3 className="text-3xl sm:text-5xl font-bold tracking-tight font-display text-[#1A202C]">
                  {p7.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#2C5282] uppercase tracking-widest">
                {p7.category}
              </span>
            </div>

            <Link
              href={p7.href}
              data-cursor="view"
              className="block group relative w-full aspect-[16/9] max-h-[580px] overflow-hidden rounded-xs border border-[#D2E0EC] shadow-xl"
            >
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <ProjectMockupFrame project={p7} />
              </div>
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono pt-2">
              <p className="text-zinc-600 max-w-xl font-sans text-sm md:text-base leading-relaxed">
                {p7.description}
              </p>
              <Link
                href={p7.href}
                data-cursor="view"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2C5282] hover:text-[#1A202C] transition-colors shrink-0"
              >
                <span>View Expedition</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ROOM 08 — FORMWORK CONSTRUCTION (AUTHORITY / CONCRETE STONE ENVIRONMENT) */}
        <div className="bg-[#ECEAE6] text-[#1C1C1C] py-16 md:py-28 px-6 md:px-10 border-y border-[#D4D0C7]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4D0C7] pb-6">
              <div>
                <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase block mb-1">
                  ROOM 08 // AUTHORITY
                </span>
                <h3 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase font-display text-[#1C1C1C]">
                  {p8.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                {p8.category}
              </span>
            </div>

            <Link
              href={p8.href}
              data-cursor="view"
              className="block group relative w-full aspect-[16/9] max-h-[600px] overflow-hidden rounded-xs border border-[#D4D0C7] shadow-xl"
            >
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <ProjectMockupFrame project={p8} />
              </div>
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono pt-2">
              <p className="text-zinc-700 max-w-xl font-sans text-sm md:text-base leading-relaxed">
                {p8.description}
              </p>
              <Link
                href={p8.href}
                data-cursor="view"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1C1C1C] hover:text-[#525252] transition-colors shrink-0"
              >
                <span>View Archive Finale</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PORTFOLIO ENDING INVITATION */}
      <div className="mt-20 md:mt-32 pt-16 border-t border-[#E2DFD7] text-center flex flex-col items-center max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-widest text-[#767470] mb-4 block"
        >
          [ What's Next? ]
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-[#111111] uppercase font-display max-w-4xl text-balance mb-8"
        >
          What should we build next?
        </motion.h3>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          href="#contact"
          className="inline-flex items-center gap-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-[#111111] border-b-2 border-[#111111] pb-1 hover:text-[#3B4CCA] hover:border-[#3B4CCA] transition-colors group"
        >
          <span>Tell us what you're imagining</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.a>
      </div>
    </section>
  );
}
