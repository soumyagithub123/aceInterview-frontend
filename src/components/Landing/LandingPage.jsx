/*import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import SocialProof from "./SocialProof";
import Features from "./Features";
import ToolsSection from "./ToolsSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {
  useEffect(() => {
    if (window.location.hash === "#faq") {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-surface-900">
      <Navbar />

      <main className="overflow-hidden">
        <Hero />
        <SocialProof />
        <Features />
        <ToolsSection />
        <HowItWorks />
        <Testimonials />
        <section id="faq">
          <FAQ />
        </section>
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}*/
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import SocialProof from "./SocialProof";
import Features from "./Features";
import ToolsSection from "./ToolsSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {
  // useEffect(() => {
  //   if (window.location.hash === "#faq") {
  //     document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, []);
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-surface-900">
      {/* 🔽 GLOBAL FIX FOR LARGE GAPS */}
      <style>
        {`
          section {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
        `}
      </style>

      <Navbar />

      <main className="overflow-hidden">
        {/* Hero only */}
        <div className="pt-20">
          <Hero />
        </div>
        <SocialProof />
        <Features />
        <ToolsSection />
        <HowItWorks />
        <Testimonials />

        <section id="faq">
          <FAQ />
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
