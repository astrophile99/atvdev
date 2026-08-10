"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CAPABILITIES } from "@/data/projects";

export default function CapabilitiesSection() {
  const [activeCapability, setActiveCapability] = useState<number | null>(null);

  return (
    <section id="capabilities" className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E2DFD7]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Concept */}
        <div className="lg:col-span-4 sticky top-28">
          <span className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-4">
            [ What We Build ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-[#111111] uppercase font-display mb-6">
            Capabilities
          </h2>
          <p className="text-sm md:text-base text-[#6B6862] leading-relaxed max-w-sm">
            We don't try to be everything for everyone. We focus on building web experiences that feel tailored, fast, and memorable.
          </p>
        </div>

        {/* Right Column: Editorial Vertical List */}
        <div className="lg:col-span-8 divide-y divide-[#E2DFD7]">
          {CAPABILITIES.map((cap, index) => (
            <motion.div
              key={cap.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onMouseEnter={() => setActiveCapability(index)}
              onMouseLeave={() => setActiveCapability(null)}
              className="py-8 md:py-10 transition-colors group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-sm text-[#9E9A91] group-hover:text-[#3B4CCA] transition-colors">
                    {cap.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111] group-hover:text-[#3B4CCA] transition-colors font-display">
                    {cap.title}
                  </h3>
                </div>

                <p className="text-sm text-[#6B6862] max-w-md md:text-right font-sans pl-10 md:pl-0">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
