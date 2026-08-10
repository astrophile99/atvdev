import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import ProjectMockupFrame from "@/components/ProjectMockupFrame";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found — ATVDEV" };

  return {
    title: `${project.title} — ATVDEV Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <article className="min-h-screen pt-28 md:pt-36 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Back to All Work Navigation */}
      <div className="mb-8 md:mb-12">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#767470] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </Link>
      </div>

      {/* Project Header */}
      <header className="border-b border-[#E2DFD7] pb-12 mb-12 md:mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[#767470] mb-4">
          <span className="text-[#111111] font-bold">{project.number}</span>
          <span>/</span>
          <span className="uppercase text-[#3B4CCA] font-semibold">{project.category}</span>
          <span>/</span>
          <span>{project.year}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase font-display text-[#111111] mb-6">
          {project.title}
        </h1>

        <p className="text-xl sm:text-2xl text-[#4A4742] max-w-3xl font-normal leading-relaxed text-balance mb-8">
          "{project.fullDescription}"
        </p>

        {/* Deliverables Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {project.deliverables.map((item) => (
            <span
              key={item}
              className="text-xs font-mono uppercase tracking-wider px-3 py-1 bg-[#EFECE6] text-[#4A4742] border border-[#E2DFD7]"
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* Hero Visual Mockup Preview */}
      <section className="mb-20 md:mb-28">
        <div className="w-full aspect-[16/10] max-h-[640px] shadow-2xl border border-[#E2DFD7]">
          <ProjectMockupFrame project={project} />
        </div>
      </section>

      {/* Challenge & Solution Breakdown Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 border-t border-[#E2DFD7] pt-16 mb-20 md:mb-28">
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#767470] block">
            [ The Challenge ]
          </span>
          <h3 className="text-2xl font-bold text-[#111111] font-display">
            Translating core identity into web speed and craftsmanship.
          </h3>
          <p className="text-base text-[#6B6862] leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#3B4CCA] block">
            [ The ATVDEV Solution ]
          </span>
          <h3 className="text-2xl font-bold text-[#111111] font-display">
            Custom code architecture built specifically for the brand.
          </h3>
          <p className="text-base text-[#6B6862] leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* Next Project Footer Link */}
      <footer className="border-t border-[#E2DFD7] pt-16 flex flex-col sm:flex-row items-baseline justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#767470] block mb-2">
            Up Next
          </span>
          <h3 className="text-3xl font-bold text-[#111111] uppercase font-display">
            {nextProject.title}
          </h3>
        </div>

        <Link
          href={nextProject.href}
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#111111] text-[#F5F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#3B4CCA] transition-colors group"
        >
          <span>Next Project ({nextProject.number})</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </footer>
    </article>
  );
}
