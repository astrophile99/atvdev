"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/projects";

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E2DFD7]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Header */}
        <div className="lg:col-span-4 sticky top-28">
          <span className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-4">
            [ How We Work ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-[#111111] uppercase font-display mb-6">
            The Process
          </h2>
          <p className="text-sm md:text-base text-[#6B6862] leading-relaxed max-w-sm">
            Building a website shouldn't feel bureaucratic or overwhelming. We keep the workflow direct, collaborative, and focused on momentum.
          </p>
        </div>

        {/* Right Vertical Timeline */}
        <div className="lg:col-span-8 space-y-12 md:space-y-16">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12 border-l border-[#E2DFD7] group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#E2DFD7] group-hover:bg-[#3B4CCA] group-hover:scale-125 transition-all" />

              <span className="font-mono text-xs text-[#9E9A91] block mb-2">
                STEP {step.number}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase font-display mb-3">
                {step.title}
              </h3>
              <p className="text-base text-[#6B6862] max-w-xl leading-relaxed">
                "{step.description}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
