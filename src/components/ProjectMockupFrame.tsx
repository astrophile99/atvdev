"use client";

import React from "react";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

interface ProjectMockupFrameProps {
  project: Project;
  compact?: boolean;
}

export default function ProjectMockupFrame({ project, compact = false }: ProjectMockupFrameProps) {
  // Render bespoke design previews according to project slug
  const renderVisualContent = () => {
    switch (project.slug) {
      case "coca-cola":
        return (
          <div className="w-full h-full bg-[#110505] text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Kinetic Red Ribbon Cues */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#F40009]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[radial-gradient(#F40009_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 text-xs font-mono tracking-widest text-[#F40009]">
              <span>COCA-COLA® REAL MAGIC</span>
              <span className="border border-[#F40009]/40 px-2 py-0.5 rounded-full text-[10px]">
                CAMPAIGN 2026
              </span>
            </div>

            {/* Middle Kinetic Typography & Product Showcase */}
            <div className="my-auto z-10 py-4">
              <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-[#FFFFFF] drop-shadow-md">
                REFRESH THE WORLD
              </h4>
              <p className="text-xs md:text-sm text-[#E5C3C3] mt-2 max-w-xs font-sans">
                An energetic digital experience built around movement and instant refreshment.
              </p>

              {/* Interactive Bottle Silhouette Feature */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 w-24 bg-[#F40009] rounded-full" />
                <span className="text-[10px] font-mono text-zinc-400">100% RECYCLED BOTTLE</span>
              </div>
            </div>

            {/* Bottom Details */}
            <div className="flex items-center justify-between z-10 pt-4 border-t border-[#331111] text-[11px] text-zinc-400 font-mono">
              <span>EXPLORE FLAVOR MATRIX</span>
              <span className="text-[#F40009] font-bold">LIVE PREVIEW ↗</span>
            </div>
          </div>
        );

      case "nike":
        return (
          <div className="w-full h-full bg-[#0D0D0D] text-[#F5F5F5] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Minimal Header */}
            <div className="flex items-center justify-between z-10">
              <span className="font-extrabold tracking-tighter text-xl text-white">NIKE // LAB</span>
              <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase border border-zinc-700 px-2 py-0.5">
                PERFORMANCE ARCHIVE
              </span>
            </div>

            {/* Middle Content */}
            <div className="my-auto z-10">
              <div className="text-[10px] font-mono text-[#E0E0E0] uppercase tracking-widest mb-1">
                ENGINEERED FOR MOTION
              </div>
              <h4 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none">
                AIR VAPOR STRIKE
              </h4>
              <div className="mt-4 grid grid-cols-2 gap-3 max-w-xs text-[11px] font-mono border-l-2 border-white pl-3 text-zinc-300">
                <div>
                  <span className="block text-zinc-500 text-[9px]">WEIGHT</span>
                  <span>198g</span>
                </div>
                <div>
                  <span className="block text-zinc-500 text-[9px]">ENERGY RETURN</span>
                  <span>+88%</span>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between z-10 text-[11px] font-mono text-zinc-400 border-t border-zinc-800 pt-3">
              <span>RELEASE 04.26</span>
              <span className="text-white font-bold">SPEC SHEET →</span>
            </div>
          </div>
        );

      case "beauty-store":
        return (
          <div className="w-full h-full bg-[#F7F5F0] text-[#2C2926] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Store Header */}
            <div className="flex items-center justify-between z-10 border-b border-[#E5E0D6] pb-3">
              <span className="font-serif text-lg tracking-wide italic">Aura Botanical</span>
              <span className="text-[10px] font-mono text-[#8C857B] uppercase tracking-widest">
                SKINCARE CATALOG
              </span>
            </div>

            {/* Middle Product Showcase */}
            <div className="my-auto z-10 py-4">
              <span className="text-[10px] font-mono text-[#C9B6A1] uppercase tracking-wider block mb-1">
                N° 04 BALANCING SERUM
              </span>
              <h4 className="text-2xl md:text-4xl font-serif text-[#2C2926] leading-tight mb-2">
                Pure Organic Botanical Elixir
              </h4>
              <p className="text-xs text-[#6E685E] max-w-xs font-sans">
                Formulated with cold-pressed rosehip, squalane and wild harvested botanicals.
              </p>
            </div>

            {/* Bottom Action */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#E5E0D6] text-[11px] font-mono text-[#524D44]">
              <span>50ml / 1.7 fl. oz.</span>
              <span className="font-semibold text-[#2C2926]">$84 — VIEW PRODUCT</span>
            </div>
          </div>
        );

      case "ecommerce":
        return (
          <div className="w-full h-full bg-[#F2F0EB] text-[#141414] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Navigation */}
            <div className="flex items-center justify-between z-10 border-b border-[#D8D4CA] pb-3">
              <span className="font-mono font-bold text-sm tracking-widest uppercase">
                FORM / MARKET
              </span>
              <span className="text-[10px] font-mono text-[#3B4CCA] font-semibold bg-[#3B4CCA]/10 px-2 py-0.5 rounded-full">
                CATALOG 2026
              </span>
            </div>

            {/* Product Grid Mockup */}
            <div className="my-auto z-10 grid grid-cols-2 gap-4 py-2">
              <div className="bg-[#E5E2D9] p-3 rounded-xs flex flex-col justify-between aspect-[4/3]">
                <span className="text-[9px] font-mono text-zinc-500">OBJECT 01</span>
                <span className="text-xs font-semibold">Anodized Desk Lamp</span>
              </div>
              <div className="bg-[#E5E2D9] p-3 rounded-xs flex flex-col justify-between aspect-[4/3]">
                <span className="text-[9px] font-mono text-zinc-500">OBJECT 02</span>
                <span className="text-xs font-semibold">Cast Iron Vessel</span>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between z-10 text-[11px] font-mono text-zinc-600">
              <span>EXPLORE ALL OBJECTS</span>
              <span className="font-bold text-[#141414]">VIEW STORE →</span>
            </div>
          </div>
        );

      case "hospital":
        return (
          <div className="w-full h-full bg-[#F4F7F4] text-[#1B2A23] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 border-b border-[#D3E0D6] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A44]" />
                <span className="font-bold text-sm tracking-tight">DHANWANTARI</span>
              </div>
              <span className="text-[10px] font-mono text-[#2E5A44] bg-[#2E5A44]/10 px-2 py-0.5 rounded-xs font-medium">
                INSTITUTIONAL PORTAL
              </span>
            </div>

            {/* Main Content */}
            <div className="my-auto z-10 py-3">
              <h4 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1B2A23] leading-snug mb-2">
                Human-Centered Healthcare & Clinical Excellence
              </h4>
              <p className="text-xs text-[#44594E] max-w-sm">
                Empathetic care backed by world-class specialists and advanced diagnostic facilities.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#D3E0D6] text-[11px] font-mono text-[#2E5A44]">
              <span>24/7 EMERGENCY CARE</span>
              <span className="font-bold">BOOK APPOINTMENT →</span>
            </div>
          </div>
        );

      case "burger-place":
        return (
          <div className="w-full h-full bg-[#141110] text-[#F9F6F0] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E65100]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Header */}
            <div className="flex items-center justify-between z-10">
              <span className="font-black text-xl tracking-tighter text-[#E65100]">
                STACKED BURGERS
              </span>
              <span className="text-[10px] font-mono text-[#E65100] border border-[#E65100]/40 px-2 py-0.5">
                CRAFT KITCHEN
              </span>
            </div>

            {/* Middle Feature */}
            <div className="my-auto z-10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                SMOKY OAK WOOD FIRED
              </span>
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-none mb-2">
                TRIPLE WAGYU STACK
              </h4>
              <p className="text-xs text-zinc-400 max-w-xs">
                Aged cheddar, caramelized shallots, smoked bacon jam on brioche.
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span>ORDER ONLINE FOR PICKUP</span>
              <span className="text-[#E65100] font-bold">VIEW MENU ↗</span>
            </div>
          </div>
        );

      case "travel":
        return (
          <div className="w-full h-full bg-[#EFF4F8] text-[#1A202C] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Header */}
            <div className="flex items-center justify-between z-10 border-b border-[#D2E0EC] pb-3">
              <span className="font-bold text-base tracking-widest uppercase text-[#2C5282]">
                ROAM // EXPEDITIONS
              </span>
              <span className="text-[10px] font-mono text-[#2C5282] uppercase tracking-wider">
                NORWEGIAN FJORDS
              </span>
            </div>

            {/* Middle Content */}
            <div className="my-auto z-10 py-3">
              <span className="text-[10px] font-mono text-[#2C5282] uppercase tracking-widest block mb-1">
                10-DAY NORDIC RETREAT
              </span>
              <h4 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#1A202C] leading-snug mb-2">
                Untamed Wilderness & Modern Quiet Luxury
              </h4>
              <p className="text-xs text-zinc-600 max-w-xs">
                Private alpine lodges, guided fjord kayaking, and slow culinary experiences.
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#D2E0EC] text-[11px] font-mono text-[#2C5282]">
              <span>NEXT EXPEDITION: OCT 2026</span>
              <span className="font-bold text-[#1A202C]">EXPLORE ITINERARY →</span>
            </div>
          </div>
        );

      case "construction":
      default:
        return (
          <div className="w-full h-full bg-[#ECEAE6] text-[#1C1C1C] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Structural Header */}
            <div className="flex items-center justify-between z-10 border-b border-[#D4D0C7] pb-3">
              <span className="font-mono font-bold text-sm tracking-wider uppercase">
                FORMWORK ARCHITECTURE
              </span>
              <span className="text-[10px] font-mono text-zinc-600 border border-zinc-400 px-2 py-0.5">
                STRUCTURAL STUDIO
              </span>
            </div>

            {/* Middle Content */}
            <div className="my-auto z-10 py-3">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                PROJECT 044 — ZURICH
              </div>
              <h4 className="text-2xl md:text-4xl font-bold tracking-tight text-[#1C1C1C] uppercase leading-none mb-2">
                MONOLITHIC CONCRETE PAVILION
              </h4>
              <p className="text-xs text-zinc-600 max-w-sm font-sans">
                Precision timber-formed concrete, floor-to-ceiling glass, and structural steel integration.
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="flex items-center justify-between z-10 pt-3 border-t border-[#D4D0C7] text-[11px] font-mono text-zinc-700">
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
      <div className="h-8 bg-[#EFECE6] border-b border-[#E2DFD7] px-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4CEBF]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4CEBF]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4CEBF]" />
        </div>
        <div className="text-[10px] font-mono text-[#767470] tracking-wider truncate max-w-[180px]">
          atvdev.com{project.href}
        </div>
        <div className="text-[#9E9A91]">
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      {/* Main Visual Presentation Container */}
      <div className="flex-1 relative overflow-hidden min-h-[220px]">
        {renderVisualContent()}
      </div>
    </div>
  );
}
