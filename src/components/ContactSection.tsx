"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import ContactModal from "./ContactModal";

export default function ContactSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="bg-[#0D0D0D] text-[#F5F3EE] py-28 md:py-44 px-6 md:px-10 border-t border-zinc-800 text-center relative overflow-hidden"
      >
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B4CCA]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center max-w-4xl mx-auto relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-[#9E9A91] mb-6 block"
          >
            [ Studio Inquiry & Commission ]
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase font-display leading-[0.95] mb-8 text-balance"
          >
            YOUR IDEA <br />
            <span className="italic font-serif font-normal lowercase tracking-normal text-zinc-400 pr-2">
              could be
            </span>
            NEXT.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl text-zinc-400 max-w-xl font-normal leading-relaxed mb-12"
          >
            Have something in mind? Tell us what you're imagining. We'll turn it into a fast, responsive, polished website people remember.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F3EE] text-[#111111] text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-[#3B4CCA] hover:text-white transition-all duration-300 group shadow-xl"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              href="mailto:hello@atvdev.com"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors py-2 px-4 border border-zinc-800 hover:border-zinc-600 rounded-xs"
            >
              <Mail className="w-4 h-4 text-zinc-500" />
              <span>hello@atvdev.com</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
