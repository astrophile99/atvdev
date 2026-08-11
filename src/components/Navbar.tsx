"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Selected Work", href: "/#work" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5F3EE]/90 backdrop-blur-md border-b border-[#E2DFD7]/80 py-4 shadow-xs"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-xl font-bold tracking-tight text-[#111111]"
          >
            <span className="font-mono text-xs tracking-wider uppercase text-[#767470] group-hover:text-[#111111] transition-colors">
              [ studio ]
            </span>
            <span className="text-xl md:text-2xl font-semibold tracking-tighter uppercase font-display">
              ATVDEV
            </span>
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A4742]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] border border-[#111111] px-4 py-2.5 hover:bg-[#111111] hover:text-[#F5F3EE] transition-all duration-200 group"
            >
              <span>Let's build something</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#111111] hover:opacity-75 transition-opacity z-50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F5F3EE] flex flex-col justify-between p-8 pt-28 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono text-[#767470] tracking-widest uppercase">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-semibold tracking-tight text-[#111111] hover:text-[#3B4CCA] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-[#E2DFD7] pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="w-full text-center py-4 bg-[#111111] text-[#F5F3EE] text-sm font-semibold uppercase tracking-wider hover:bg-[#3B4CCA] transition-colors"
            >
              Start a Project →
            </button>
            <div className="flex justify-between items-center text-xs text-[#767470] pt-2">
              <span>atvdev.com</span>
              <span>hello@atvdev.com</span>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal Triggered by Navbar CTA */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}
