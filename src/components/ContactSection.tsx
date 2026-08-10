"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import ContactModal from "./ContactModal";

export default function ContactSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-28 md:py-44 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#E2DFD7] text-center">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-[#767470] mb-6"
          >
            [ Start a Project ]
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#111111] uppercase font-display leading-[0.95] mb-8 text-balance"
          >
            Have an idea? <br />
            <span className="italic font-serif font-normal lowercase tracking-normal text-[#33312E] opacity-90 pr-2">
              Let's make it
            </span>
            real.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl text-[#6B6862] max-w-xl font-normal leading-relaxed mb-12"
          >
            Tell us what you're imagining. We'll turn it into a fast, responsive, polished website people remember.
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-[#F5F3EE] text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-[#3B4CCA] transition-all duration-300 group shadow-lg"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              href="mailto:hello@atvdev.com"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#6B6862] hover:text-[#111111] transition-colors py-2 px-4 border border-transparent hover:border-[#E2DFD7]"
            >
              <Mail className="w-4 h-4 text-[#767470]" />
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
