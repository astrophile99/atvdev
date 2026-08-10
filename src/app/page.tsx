import Hero from "@/components/Hero";
import PortfolioExhibition from "@/components/PortfolioExhibition";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="w-full">
      {/* Editorial Hero */}
      <Hero />

      {/* Selected Work Exhibition */}
      <PortfolioExhibition />

      {/* Capabilities / What We Build */}
      <CapabilitiesSection />

      {/* Process / How We Work */}
      <ProcessSection />

      {/* About / Positioning */}
      <AboutSection />

      {/* Closing Project Inquiry CTA */}
      <ContactSection />
    </div>
  );
}
