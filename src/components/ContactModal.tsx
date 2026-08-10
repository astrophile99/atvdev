"use client";

import { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Bespoke Website",
    budget: "$5k - $10k",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#111111]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F5F3EE] border border-[#E2DFD7] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 p-2 text-[#767470] hover:text-[#111111] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center gap-6">
            <CheckCircle2 className="w-16 h-16 text-[#3B4CCA]" />
            <h3 className="text-3xl font-semibold text-[#111111] tracking-tight">
              Inquiry Received
            </h3>
            <p className="text-[#6B6862] max-w-md text-base leading-relaxed">
              Thank you for reaching out to ATVDEV. We review every project idea carefully and will respond within 24 hours.
            </p>
            <button
              onClick={resetAndClose}
              className="mt-4 px-8 py-3 bg-[#111111] text-[#F5F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#3B4CCA] transition-colors"
            >
              Back to Website
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xs font-mono text-[#767470] tracking-widest uppercase block mb-2">
              [ Start a conversation ]
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-3">
              Tell us about your project.
            </h2>
            <p className="text-[#6B6862] text-sm md:text-base mb-8">
              Whether you have a fully formed brief or just the spark of an idea, we're ready to make it real.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#EFECE6] border border-[#E2DFD7] px-4 py-3 text-sm text-[#111111] placeholder-[#A09C94] focus:outline-none focus:border-[#111111] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#EFECE6] border border-[#E2DFD7] px-4 py-3 text-sm text-[#111111] placeholder-[#A09C94] focus:outline-none focus:border-[#111111] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] mb-2">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#EFECE6] border border-[#E2DFD7] px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors cursor-pointer"
                  >
                    <option value="Bespoke Website">Bespoke Studio Website</option>
                    <option value="Ecommerce">E-Commerce Experience</option>
                    <option value="Campaign Platform">Interactive Campaign</option>
                    <option value="Institutional Web App">Institutional / Corporate</option>
                    <option value="Other">Other Custom Build</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] mb-2">
                    Estimated Timeline / Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#EFECE6] border border-[#E2DFD7] px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors cursor-pointer"
                  >
                    <option value="< $5k">Under $5k</option>
                    <option value="$5k - $10k">$5,000 – $10,000</option>
                    <option value="$10k - $25k">$10,000 – $25,000</option>
                    <option value="$25k+">$25,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4742] mb-2">
                  Tell us about your vision *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what you want to build, key goals, or any reference websites you admire..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#EFECE6] border border-[#E2DFD7] px-4 py-3 text-sm text-[#111111] placeholder-[#A09C94] focus:outline-none focus:border-[#111111] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2DFD7]">
                <span className="text-xs text-[#767470]">
                  Or email directly at{" "}
                  <a href="mailto:hello@atvdev.com" className="underline hover:text-[#111111]">
                    hello@atvdev.com
                  </a>
                </span>
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#111111] text-[#F5F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#3B4CCA] transition-colors group"
                >
                  <span>Send Project Inquiry</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
