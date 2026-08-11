"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectMockupFrame from "./ProjectMockupFrame";
import { CAPABILITIES, PROJECTS } from "@/data/projects";

export default function CapabilitiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  // Map each capability slug to its target project
  const getProjectForCapability = (slug: string) => {
    return PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  };

  return (
    <section id="capabilities" className="py-20 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E2DFD7] relative">
      {/* Header */}
      <div className="mb-12 md:mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-3">
          [ Capabilities ]
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#111111] uppercase font-display">
          What We Build
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Stacked Editorial Words */}
        <div className="lg:col-span-7 space-y-8 md:space-y-12">
          {CAPABILITIES.map((cap, index) => {
            const isHovered = hoveredIndex === index;
            const targetProject = getProjectForCapability(cap.previewProjectSlug);

            return (
              <div
                key={cap.title}
                onMouseEnter={() => setHoveredIndex(index)}
                className="group border-b border-[#E2DFD7] pb-8 md:pb-10 cursor-pointer transition-all duration-300"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-mono text-xs md:text-sm text-[#9E9A91] group-hover:text-[#3B4CCA] transition-colors">
                      {cap.number}
                    </span>
                    <h3
                      className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase font-display transition-all duration-300 ${
                        isHovered ? "text-[#111111] translate-x-2" : "text-[#767470] group-hover:text-[#111111]"
                      }`}
                    >
                      {cap.title}
                    </h3>
                  </div>
                </div>

                {/* Supporting description */}
                <div className="mt-3 pl-8 md:pl-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="text-sm md:text-base text-[#4A4742] max-w-lg leading-relaxed font-sans">
                    "{cap.description}"
                  </p>
                  <span className="text-xs font-mono text-[#3B4CCA] uppercase tracking-wider hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                    {cap.subtitle}
                  </span>
                </div>

                {/* Mobile Preview Visual (Inline) */}
                <div className="mt-6 block lg:hidden w-full aspect-[16/10] overflow-hidden rounded-xs border border-[#E2DFD7]">
                  <ProjectMockupFrame project={targetProject} compact />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Desktop Dynamic Project Visual Preview */}
        <div className="hidden lg:block lg:col-span-5 sticky top-32">
          <div className="relative w-full aspect-[4/3.5] bg-[#EFECE6] border border-[#E2DFD7] rounded-xs shadow-2xl overflow-hidden p-3">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <ProjectMockupFrame
                    project={getProjectForCapability(CAPABILITIES[hoveredIndex].previewProjectSlug)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#767470]">
            <span>GALLERY EXHIBIT PREVIEW</span>
            <span className="text-[#3B4CCA]">ATVDEV CRAFT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
