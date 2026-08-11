"use client";

import React from "react";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

interface ProjectMockupFrameProps {
  project: Project;
  compact?: boolean;
  heroVariant?: boolean;
}

export default function ProjectMockupFrame({ project, compact = false, heroVariant = false }: ProjectMockupFrameProps) {
  // Render bespoke design previews according to project slug
  const renderVisualContent = () => {
    switch (project.slug) {
      case "coca-cola":
        return (
          <div className="w-full h-full bg-[#110505] text-white p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Background Kinetic Ambient Glow & Grid Cues */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#F40009]/25 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />
            <div className="absolute inset-0 bg-[radial-gradient(#F40009_1.2px,transparent_1.2px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 text-[10px] sm:text-xs font-mono tracking-widest text-[#F40009]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F40009] animate-pulse" />
                <span>COCA-COLA® REAL MAGIC</span>
              </div>
              <span className="border border-[#F40009]/40 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider">
                CAMPAIGN 2026
              </span>
            </div>

            {/* Middle Kinetic Typography & Fluid Product Feature */}
            <div className="my-auto z-10 py-2 sm:py-4 space-y-2 sm:space-y-3">
              <span className="text-[10px] font-mono text-[#E5C3C3] uppercase tracking-widest block">
                01 / FLUID REFRESHMENT
              </span>
              <h4 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white font-display drop-shadow-md">
                REFRESH <br className="hidden sm:block" /> THE WORLD
              </h4>
              <p className="text-xs sm:text-sm text-[#E5C3C3]/90 max-w-xs font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                An energetic digital experience built around movement, refreshment and iconic brand personality.
              </p>

              {/* Kinetic Meter Cues */}
              <div className="pt-1 flex items-center gap-3">
                <div className="h-1.5 w-20 sm:w-32 bg-gradient-to-r from-[#F40009] to-[#FF4D4D] rounded-full" />
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">ICE COLD — 3°C</span>
              </div>
            </div>

            {/* Bottom Interactive Cues */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#331111] text-[10px] sm:text-xs text-zinc-400 font-mono">
              <span className="truncate">FLAVOR MATRIX & REFRESHMENT WHEEL</span>
              <span className="text-[#F40009] font-bold shrink-0 ml-2">EXPLORE ↗</span>
            </div>
          </div>
        );

      case "nike":
        return (
          <div className="w-full h-full bg-[#0D0D0D] text-[#F5F5F5] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 text-[10px] sm:text-xs font-mono">
              <span className="font-extrabold tracking-tighter text-lg text-white">NIKE // LAB</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 tracking-widest uppercase border border-zinc-700 px-2 py-0.5">
                PERFORMANCE ARCHIVE
              </span>
            </div>

            {/* Middle Specs Showcase */}
            <div className="my-auto z-10 py-2 sm:py-4 space-y-2">
              <div className="text-[9px] sm:text-[10px] font-mono text-[#E0E0E0] uppercase tracking-widest">
                PROJECT 002 — SPEED & STRUCTURE
              </div>
              <h4 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none font-display">
                AIR VAPOR STRIKE
              </h4>

              {/* Sports Data Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-4 max-w-xs text-[10px] sm:text-xs font-mono border-l-2 border-white pl-3 text-zinc-300">
                <div>
                  <span className="block text-zinc-500 text-[8px] sm:text-[9px] uppercase">FLYKNIT WEAVE</span>
                  <span className="font-bold">198g ULTRALIGHT</span>
                </div>
                <div>
                  <span className="block text-zinc-500 text-[8px] sm:text-[9px] uppercase">ENERGY RETURN</span>
                  <span className="font-bold text-white">+88% PROPULSION</span>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between z-10 text-[10px] sm:text-xs font-mono text-zinc-400 border-t border-zinc-800 pt-3">
              <span>GLOBAL RELEASE 2026</span>
              <span className="text-white font-bold">SPEC SHEET →</span>
            </div>
          </div>
        );

      case "beauty-store":
        return (
          <div className="w-full h-full bg-[#F7F5F0] text-[#2C2926] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Top Store Header */}
            <div className="flex items-center justify-between z-10 border-b border-[#E5E0D6] pb-3 text-[10px] sm:text-xs">
              <span className="font-serif text-base sm:text-lg tracking-wide italic">Aura Botanical Skincare</span>
              <span className="font-mono text-[#8C857B] uppercase tracking-widest text-[9px] sm:text-[10px]">
                TACTILE LUXURY
              </span>
            </div>

            {/* Middle Product Showcase */}
            <div className="my-auto z-10 py-2 sm:py-4 space-y-2">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#C9B6A1] uppercase tracking-wider block">
                N° 04 BOTANICAL ELIXIR
              </span>
              <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2C2926] leading-tight">
                Pure Organic Balancing Serum
              </h4>
              <p className="text-xs sm:text-sm text-[#6E685E] max-w-xs font-sans leading-relaxed">
                Formulated with cold-pressed rosehip, squalane and wild harvested botanicals.
              </p>
            </div>

            {/* Bottom Action */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#E5E0D6] text-[10px] sm:text-xs font-mono text-[#524D44]">
              <span>50ml / 1.7 fl. oz.</span>
              <span className="font-semibold text-[#2C2926]">$84 — VIEW PRODUCT</span>
            </div>
          </div>
        );

      case "ecommerce":
        return (
          <div className="w-full h-full bg-[#F2F0EB] text-[#141414] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Top Navigation */}
            <div className="flex items-center justify-between z-10 border-b border-[#D8D4CA] pb-3">
              <span className="font-mono font-bold text-xs sm:text-sm tracking-widest uppercase">
                FORM / MARKET
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#3B4CCA] font-semibold bg-[#3B4CCA]/10 px-2 py-0.5 rounded-full">
                CURATED UTILITY
              </span>
            </div>

            {/* Product Grid Mockup */}
            <div className="my-auto z-10 grid grid-cols-2 gap-3 sm:gap-4 py-2">
              <div className="bg-[#E5E2D9] p-3 rounded-xs flex flex-col justify-between aspect-[4/3] border border-[#D8D4CA]">
                <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500">OBJECT 01 / LIGHTING</span>
                <span className="text-xs font-semibold">Anodized Desk Lamp</span>
              </div>
              <div className="bg-[#E5E2D9] p-3 rounded-xs flex flex-col justify-between aspect-[4/3] border border-[#D8D4CA]">
                <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500">OBJECT 02 / CERAMICS</span>
                <span className="text-xs font-semibold">Cast Iron Vessel</span>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between z-10 text-[10px] sm:text-xs font-mono text-zinc-600">
              <span>CATALOG & INDUSTRIAL DESIGN</span>
              <span className="font-bold text-[#141414]">VIEW STORE →</span>
            </div>
          </div>
        );

      case "hospital":
        return (
          <div className="w-full h-full bg-[#F4F7F4] text-[#1B2A23] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 border-b border-[#D3E0D6] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A44]" />
                <span className="font-bold text-xs sm:text-sm tracking-tight">DHANWANTARI</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-xs font-medium">
                HUMAN-CENTERED CARE
              </span>
            </div>

            {/* Main Content */}
            <div className="my-auto z-10 py-2 sm:py-3 space-y-2">
              <h4 className="text-xl sm:text-3xl font-semibold tracking-tight text-[#1B2A23] leading-snug">
                Clinical Excellence & Empathetic Healthcare
              </h4>
              <p className="text-xs sm:text-sm text-[#44594E] max-w-sm font-sans leading-relaxed">
                Empathetic care backed by leading specialists, modern architecture and transparent patient portals.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#D3E0D6] text-[10px] sm:text-xs font-mono text-[#2E5A44]">
              <span>24/7 SPECIALTY DIRECTORY</span>
              <span className="font-bold">APPOINTMENT ENGINE →</span>
            </div>
          </div>
        );

      case "burger-place":
        return (
          <div className="w-full h-full bg-[#141110] text-[#F9F6F0] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E65100]/25 rounded-full blur-3xl pointer-events-none" />

            {/* Top Header */}
            <div className="flex items-center justify-between z-10">
              <span className="font-black text-lg sm:text-xl tracking-tighter text-[#E65100]">
                STACKED BURGERS
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#E65100] border border-[#E65100]/40 px-2 py-0.5">
                CRAFT CULINARY
              </span>
            </div>

            {/* Middle Feature */}
            <div className="my-auto z-10 py-2 sm:py-4 space-y-2">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                SMOKY OAK WOOD FIRED
              </span>
              <h4 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none font-display">
                TRIPLE WAGYU STACK
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xs font-sans leading-relaxed">
                Aged cheddar, caramelized shallots, smoked bacon jam on artisanal brioche.
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-zinc-800 text-[10px] sm:text-xs font-mono text-zinc-400">
              <span>INSTANT ORDER & PICKUP</span>
              <span className="text-[#E65100] font-bold">VIEW MENU ↗</span>
            </div>
          </div>
        );

      case "travel":
        return (
          <div className="w-full h-full bg-[#EFF4F8] text-[#1A202C] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Top Header */}
            <div className="flex items-center justify-between z-10 border-b border-[#D2E0EC] pb-3">
              <span className="font-bold text-xs sm:text-sm tracking-widest uppercase text-[#2C5282]">
                ROAM // EXPEDITIONS
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#2C5282] uppercase tracking-wider">
                NORWEGIAN FJORDS
              </span>
            </div>

            {/* Middle Content */}
            <div className="my-auto z-10 py-2 sm:py-3 space-y-2">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#2C5282] uppercase tracking-widest block">
                CURATED DESTINATIONS
              </span>
              <h4 className="text-xl sm:text-3xl font-semibold tracking-tight text-[#1A202C] leading-snug">
                Untamed Wilderness & Modern Quiet Luxury
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-xs font-sans leading-relaxed">
                Private alpine lodges, guided fjord kayaking, and slow culinary travel itineraries.
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#D2E0EC] text-[10px] sm:text-xs font-mono text-[#2C5282]">
              <span>NEXT EXPEDITION: OCT 2026</span>
              <span className="font-bold text-[#1A202C]">EXPLORE ITINERARY →</span>
            </div>
          </div>
        );

      case "construction":
      default:
        return (
          <div className="w-full h-full bg-[#ECEAE6] text-[#1C1C1C] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden group select-none">
            {/* Top Structural Header */}
            <div className="flex items-center justify-between z-10 border-b border-[#D4D0C7] pb-3">
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wider uppercase">
                FORMWORK ARCHITECTURE
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-600 border border-zinc-400 px-2 py-0.5">
                STRUCTURAL STUDIO
              </span>
            </div>

            {/* Middle Content */}
            <div className="my-auto z-10 py-2 sm:py-3 space-y-2">
              <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                PROJECT 044 — ZURICH
              </div>
              <h4 className="text-xl sm:text-3xl font-bold tracking-tight text-[#1C1C1C] uppercase leading-none font-display">
                MONOLITHIC CONCRETE PAVILION
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-sm font-sans leading-relaxed">
                Precision timber-formed concrete, floor-to-ceiling glass, and structural steel integration.
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#D4D0C7] text-[10px] sm:text-xs font-mono text-zinc-700">
              <span>ARCHITECTURAL ARCHIVE</span>
              <span className="font-bold text-[#1C1C1C]">CASE STUDY →</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full border border-[#E2DFD7] bg-white overflow-hidden shadow-xs hover:border-[#111111]/40 transition-colors flex flex-col">
      {/* Editorial Browser Top Frame Bar */}
      <div className="h-7 sm:h-8 bg-[#EFECE6] border-b border-[#E2DFD7] px-3 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4CEBF]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4CEBF]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4CEBF]" />
        </div>
        <div className="text-[9px] sm:text-[10px] font-mono text-[#767470] tracking-wider truncate max-w-[140px] sm:max-w-[200px]">
          atvdev.com{project.href}
        </div>
        <div className="text-[#9E9A91]">
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      {/* Main Visual Presentation Container */}
      <div className="flex-1 relative overflow-hidden min-h-[200px]">
        {renderVisualContent()}
      </div>
    </div>
  );
}
