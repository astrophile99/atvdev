"use client";

import { motion } from "framer-motion";
import ProjectMockupFrame from "./ProjectMockupFrame";
import { PROJECTS } from "@/data/projects";

export default function AboutSection() {
  const nikeProject = PROJECTS[1];
  const beautyProject = PROJECTS[2];

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E2DFD7]">
      <div className="bg-[#EFECE6] border border-[#E2DFD7] p-8 sm:p-12 md:p-20 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Copy */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-6"
            >
              [ Studio Positioning ]
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#111111] uppercase font-display mb-8 leading-[1.02]"
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
              className="text-lg md:text-xl text-[#4A4742] font-normal leading-relaxed text-balance max-w-2xl mb-12"
            >
              ATVDEV is a small web development studio focused on turning ideas, businesses and brands into websites people remember.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#DCD8CE] text-xs font-mono"
            >
              <div>
                <span className="text-[#9E9A91] block uppercase mb-1">01 / ARCHITECTURE</span>
                <span className="text-[#111111] font-semibold">100% Bespoke Code</span>
              </div>
              <div>
                <span className="text-[#9E9A91] block uppercase mb-1">02 / CRAFT</span>
                <span className="text-[#111111] font-semibold">No Templates / No Clichés</span>
              </div>
              <div>
                <span className="text-[#9E9A91] block uppercase mb-1">03 / GUARANTEE</span>
                <span className="text-[#111111] font-semibold">Taste, Speed & Polish</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Studio Fragment Collage */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/4.5] max-h-[420px]">
            <div className="absolute top-0 left-0 w-[85%] h-[80%] shadow-xl rounded-xs border border-[#DCD8CE] overflow-hidden">
              <ProjectMockupFrame project={nikeProject} compact />
            </div>
            <div className="absolute bottom-0 right-0 w-[65%] h-[60%] shadow-2xl rounded-xs border border-white z-10 overflow-hidden">
              <ProjectMockupFrame project={beautyProject} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
