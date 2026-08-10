"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-[#F5F3EE] pt-16 pb-12 px-6 md:px-10 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto flex flex-col justify-between space-y-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-[#222222]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase font-display block">
              ATVDEV
            </Link>
            <p className="text-xs text-[#9E9A91] max-w-xs leading-relaxed">
              Websites built around ideas. An independent digital web development studio.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs font-mono uppercase tracking-wider text-[#A09C94]">
            <div className="space-y-3 flex flex-col">
              <span className="text-[#6B6862] text-[10px]">Navigation</span>
              <Link href="/#work" className="hover:text-white transition-colors">
                Work
              </Link>
              <Link href="/#capabilities" className="hover:text-white transition-colors">
                Capabilities
              </Link>
              <Link href="/#process" className="hover:text-white transition-colors">
                Process
              </Link>
              <Link href="/#about" className="hover:text-white transition-colors">
                About
              </Link>
            </div>

            <div className="space-y-3 flex flex-col">
              <span className="text-[#6B6862] text-[10px]">Social</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram ↗
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#9E9A91] hover:text-white transition-colors border border-[#333333] px-4 py-2 hover:border-[#666666]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#666666] gap-4">
          <span>© 2026 ATVDEV. All rights reserved.</span>
          <span>Built with care for atvdev.com</span>
        </div>
      </div>
    </footer>
  );
}
