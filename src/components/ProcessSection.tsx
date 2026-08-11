"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/projects";

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E2DFD7]">
      {/* Editorial Header */}
      <div className="mb-16 md:mb-24">
        <span className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-3">
          [ Workflow & Narrative ]
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#111111] uppercase font-display max-w-3xl leading-[0.98]">
          How an idea becomes a website
        </h2>
      </div>

      {/* Vertically Flowing Narrative Steps */}
      <div className="relative border-l border-[#E2DFD7] pl-6 sm:pl-10 md:pl-16 space-y-16 md:space-y-24 ml-2 sm:ml-4">
        {PROCESS_STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] sm:-left-[47px] md:-left-[71px] top-2 w-3.5 h-3.5 rounded-full bg-[#E2DFD7] group-hover:bg-[#3B4CCA] group-hover:scale-125 transition-all shadow-xs" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Step Copy */}
              <div className="lg:col-span-7 space-y-3">
                <span className="font-mono text-xs text-[#3B4CCA] uppercase tracking-widest font-semibold block">
                  STEP {step.number}
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] uppercase font-display">
                  {step.title}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-[#111111] font-serif italic leading-snug pt-1">
                  "{step.description}"
                </p>
                <p className="text-sm md:text-base text-[#6B6862] leading-relaxed pt-2 max-w-xl font-sans">
                  {step.detail}
                </p>
              </div>

              {/* Step Visual Wireframe / Fragment Cue */}
              <div className="lg:col-span-5 bg-[#EFECE6] border border-[#E2DFD7] p-5 rounded-xs space-y-3 font-mono text-xs text-[#767470] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#DCD8CE] pb-2 text-[10px]">
                  <span>ATVDEV // PROCESS STAGE 0{index + 1}</span>
                  <span className="text-[#3B4CCA]">SPECIFICATION</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-[#DCD8CE] rounded-xs w-3/4 animate-pulse" />
                  <div className="h-3 bg-[#DCD8CE] rounded-xs w-1/2" />
                  <div className="h-2 bg-[#E5E0D6] rounded-xs w-5/6" />
                </div>
                <div className="pt-2 flex justify-between items-center text-[10px] text-[#9E9A91]">
                  <span>STATUS: IN PROGRESS</span>
                  <span>100% BESPOKE</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
