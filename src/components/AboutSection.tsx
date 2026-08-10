"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E2DFD7]">
      <div className="bg-[#EFECE6] border border-[#E2DFD7] p-8 sm:p-12 md:p-20 relative overflow-hidden">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-6"
          >
            [ About ATVDEV ]
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#111111] uppercase font-display mb-8 leading-[1.05]"
          >
            Small studio. <br />
            <span className="italic font-serif font-normal lowercase tracking-normal text-[#4A4742]">
              Big attention
            </span>{" "}
            to detail.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-[#4A4742] font-normal leading-relaxed text-balance max-w-3xl mb-12"
          >
            ATVDEV is an independent web development studio focused on turning ideas, businesses and brands into websites people remember.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#DCD8CE] text-xs font-mono"
          >
            <div>
              <span className="text-[#9E9A91] block uppercase mb-1">01 / CAPABILITY</span>
              <span className="text-[#111111] font-semibold">100% Bespoke Code</span>
            </div>
            <div>
              <span className="text-[#9E9A91] block uppercase mb-1">02 / APPROACH</span>
              <span className="text-[#111111] font-semibold">No Templates / No Clichés</span>
            </div>
            <div>
              <span className="text-[#9E9A91] block uppercase mb-1">03 / FOCUS</span>
              <span className="text-[#111111] font-semibold">Craft, Speed & Taste</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
