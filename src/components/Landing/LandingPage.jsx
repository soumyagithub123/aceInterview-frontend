import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import ToolsSection from "./ToolsSection";
import FAQ from "./FAQ";
import CTASection from "./CTASection";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Main Content Wrap */}
      <main className="pt-20 sm:pt-24">
        <Hero />
        <Features />
        <ToolsSection />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
