
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-indigo-40 via-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Subheading */}
        <p className="text-indigo-600 font-semibold mb-3 uppercase text-sm tracking-wider">
          Proven Results
        </p>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-6 leading-tight">
          Achieve Success with InterviewAI
        </h2>

        {/* Description */}
        <p className="text-lg text-indigo-700 mb-12 max-w-2xl mx-auto leading-relaxed">
          From first application to final offer, InterviewAI empowers job seekers to succeed — faster, smarter, and with confidence.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/interview")}
          className="inline-flex items-center justify-center px-12 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold text-lg shadow-lg
                     hover:from-indigo-600 hover:to-indigo-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Try InterviewAI - Free
        </button>
      </div>
    </section>
  );
}