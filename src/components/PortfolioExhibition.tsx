"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectMockupFrame from "./ProjectMockupFrame";
import { PROJECTS, Project } from "@/data/projects";

export default function PortfolioExhibition() {
  const p1 = PROJECTS[0]; // Coca-Cola
  const p2 = PROJECTS[1]; // Nike
  const p3 = PROJECTS[2]; // Beauty Store
  const p4 = PROJECTS[3]; // Ecommerce (Form / Market)
  const p5 = PROJECTS[4]; // Hospital (Dhanwantari)
  const p6 = PROJECTS[5]; // Burger (Stacked)
  const p7 = PROJECTS[6]; // Travel (Roam)
  const p8 = PROJECTS[7]; // Construction (Formwork)

  return (
    <section id="work" className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section Transition Header */}
      <div className="border-b border-[#E2DFD7] pb-12 mb-16 md:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-4"
        >
          [ Selected Work ]
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-[#111111] max-w-3xl text-balance"
        >
          Different ideas. Different industries. Same attention to detail.
        </motion.h2>
      </div>

      {/* Editorial Exhibition Layout */}
      <div className="space-y-24 md:space-y-36">
        {/* PROJECT 01 — Feature Immersive Showcase (Coca-Cola) */}
        <ProjectExhibitionItem project={p1} variant="feature" />

        {/* PROJECT 02 + 03 — Split Asymmetric Composition (Nike + Beauty Store) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ProjectExhibitionItem project={p2} variant="split-left" />
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <ProjectExhibitionItem project={p3} variant="split-right" />
          </div>
        </div>

        {/* PROJECT 04 — Horizontal Banner Layout (Form / Market) */}
        <ProjectExhibitionItem project={p4} variant="horizontal" />

        {/* PROJECT 05 — Horizontal Offset Sidebar Layout (Dhanwantari) */}
        <ProjectExhibitionItem project={p5} variant="offset" />

        {/* PROJECT 06 + 07 — Vertical Balance Composition (Stacked + Roam) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <ProjectExhibitionItem project={p6} variant="vertical-tall" />
          </div>
          <div className="lg:col-span-7 lg:pt-12">
            <ProjectExhibitionItem project={p7} variant="vertical-wide" />
          </div>
        </div>

        {/* PROJECT 08 — Finale Portfolio Showcase (Formwork Construction) */}
        <ProjectExhibitionItem project={p8} variant="finale" />
      </div>

      {/* Portfolio Ending Statement / Invitation */}
      <div className="mt-28 md:mt-40 pt-16 border-t border-[#E2DFD7] text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-widest text-[#767470] mb-4"
        >
          [ What's next? ]
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
          className="inline-flex items-center gap-3 text-sm md:text-base font-semibold uppercase tracking-widest text-[#111111] border-b-2 border-[#111111] pb-1 hover:text-[#3B4CCA] hover:border-[#3B4CCA] transition-colors group"
        >
          <span>Tell us what you're thinking</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.a>
      </div>
    </section>
  );
}

interface ProjectExhibitionItemProps {
  project: Project;
  variant: string;
}

function ProjectExhibitionItem({ project, variant }: ProjectExhibitionItemProps) {
  // Determine layout styling based on variant
  if (variant === "offset") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#EFECE6] p-6 sm:p-10 md:p-12 border border-[#E2DFD7]"
      >
        <div className="lg:col-span-7">
          <Link
            href={project.href}
            data-cursor="view"
            className="block group relative aspect-[16/10] overflow-hidden"
          >
            <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.025]">
              <ProjectMockupFrame project={project} />
            </div>
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div>
            <div className="flex items-center justify-between font-mono text-xs text-[#767470] mb-3">
              <span>{project.number}</span>
              <span>{project.year}</span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-[#111111] uppercase font-display mb-2">
              {project.title}
            </h3>
            <span className="text-xs font-mono uppercase tracking-widest text-[#3B4CCA] block mb-4">
              {project.category}
            </span>
            <p className="text-sm md:text-base text-[#6B6862] leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <Link
              href={project.href}
              data-cursor="view"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#111111] group hover:text-[#3B4CCA] transition-colors"
            >
              <span>View project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="flex flex-col space-y-6 group"
    >
      {/* Visual Frame Wrapper with Hover Scale */}
      <Link
        href={project.href}
        data-cursor="view"
        className={`block relative w-full overflow-hidden ${project.aspectRatio}`}
      >
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.025]">
          <ProjectMockupFrame project={project} />
        </div>
      </Link>

      {/* Project Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-2 border-t border-[#E2DFD7]/80">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#767470] mb-1">
            <span>{project.number}</span>
            <span>/</span>
            <span className="uppercase tracking-wider text-[#3B4CCA] font-semibold">
              {project.category}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase font-display group-hover:text-[#3B4CCA] transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-md sm:text-right">
            {project.description}
          </p>
          <Link
            href={project.href}
            data-cursor="view"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#111111] group-hover:text-[#3B4CCA] transition-colors pt-1"
          >
            <span>View project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
