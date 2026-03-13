// src/pages/PrivacyPolicy.jsx

import React, { useState, useEffect } from "react";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";

const sections = [
  {
    title: "Information We Collect",
    content: `Information we collect falls into one of two categories: "voluntarily provided" information and "automatically collected" information.

"Voluntarily provided" information refers to any information you knowingly and actively provide us when using or participating in any of our services and promotions.

"Automatically collected" information refers to any information automatically sent by your devices in the course of accessing our products and services.

Log Data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device's Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details about your visit.

Personal Information: We may ask for personal information when you register an account, which may include your name, email address, and payment details.`,
  },
  {
    title: "Collection and Use of Information",
    content: `We may collect personal information from you when you do any of the following on our website:
• Register for an account
• Purchase a subscription
• Sign up to receive updates from us via email or social media channels
• Use a mobile device or web browser to access our content
• Contact us via email, social media, or on any similar technologies

We may collect, hold, use, and disclose information for the following purposes:
• To provide you with our platform's core features and services
• To enable you to customize or personalize your experience
• To deliver products and/or services to you
• To contact and communicate with you
• For analytics, market research, and business development
• For advertising and marketing, including to send you promotional information
• For internal record keeping and administrative purposes
• For security and fraud prevention
• To comply with our legal obligations and resolve any disputes`,
  },
  {
    title: "Security of Your Personal Information",
    content: `When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.

Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure and no one can guarantee absolute data security.

You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services.`,
  },
  {
    title: "How Long We Keep Your Personal Information",
    content: `We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy.

If you have provided us with personal information as part of creating an account with us, we may retain this information for the duration your account exists on our system. If your personal information is no longer required for this purpose, we will delete it or make it anonymous by removing all details that identify you.

If you terminate or delete your account, we will delete your personal information within 30 days of the deletion of your account.`,
  },
  {
    title: "Disclosure of Personal Information to Third Parties",
    content: `We may disclose personal information to third-party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, hosting and server providers, analytics, maintenance or problem-solving providers, professional advisors, and payment systems operators.

Third parties we currently use include:
• Supabase — database, authentication, and file storage
• Razorpay — payment processing
• OpenAI / Gemini / Groq — AI services for interview assistance

We do not sell your personal information to any third party.`,
  },
  {
    title: "Your Rights and Controlling Your Personal Information",
    content: `Access: You may request details of the personal information that we hold about you.

Correction: If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy.

Deletion: You may have a right to request that we delete the personal information we hold about you at any time. If you terminate or delete your account, we will delete your personal information within 30 days.

Portability: You may request a copy of the personal information we hold about you in a machine-readable format.

Non-discrimination: We will not discriminate against you for exercising any of your rights over your personal information.

Notification of data breaches: We will comply with laws applicable to us in respect of any data breach.

To exercise any of these rights, please contact us using the details provided in this privacy policy.`,
  },
  {
    title: "Children's Privacy",
    content: `We do not aim any of our products or services directly at children under the age of 13 and we do not knowingly collect personal information about children under 13.

If you believe we have inadvertently collected information from a child under 13, please contact us immediately and we will take steps to delete such information.`,
  },
  {
    title: "Business Transfers",
    content: `If we or our assets are acquired, or in the unlikely event that we go out of business or enter bankruptcy, we would include data, including your personal information, among the assets transferred to any parties who acquire us.

You acknowledge that such transfers may occur, and that any parties who acquire us may, to the extent permitted by applicable law, continue to use your personal information according to this policy, which they will be required to assume as it is the basis for any ownership or use rights we have over such information.`,
  },
  {
    title: "Limits of Our Policy",
    content: `Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.`,
  },
  {
    title: "Changes to This Policy",
    content: `At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here.

If the changes are significant, or if required by applicable law, we will contact you and all our registered users with the new details and links to the updated or changed policy.

This policy is effective as of March 31, 2024. Last updated: May 16, 2025.`,
  },
  {
    title: "Contact Us",
    content: `For any questions or concerns regarding your privacy, you may contact us using the following details:

AceInterview
Email: support@aceinterview.ai

We aim to respond to all privacy-related inquiries within 2 business days.`,
  },
];

function AccordionItem({ section, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? "border-indigo-100 bg-indigo-50/30" : "border-gray-100 bg-white"
      } hover:border-indigo-200 shadow-sm`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors gap-4 group"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className={`text-xs font-mono flex-shrink-0 transition-colors ${open ? "text-indigo-600" : "text-gray-400"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`font-semibold text-base sm:text-lg leading-snug transition-colors ${open ? "text-indigo-900" : "text-gray-700"} group-hover:text-indigo-600`}>
            {section.title}
          </span>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-indigo-600 text-white rotate-180" : "bg-gray-50 text-gray-400"}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 border-t border-indigo-100/50">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-5">
            {section.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Compliance & Legal
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Your trust is our foundation. We're committed to protecting your personal 
              information and being transparent about how we handle it.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Effective date</p>
                <p className="text-slate-900 text-base font-bold">March 31, 2024</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Last updated</p>
                <p className="text-slate-900 text-base font-bold">May 16, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
          <div className="space-y-4">
            {sections.map((section, i) => (
              <AccordionItem key={i} section={section} index={i} />
            ))}
          </div>

          {/* Contact note */}
          <div className="mt-16 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-8 sm:p-10 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Still have questions?</h3>
            <p className="text-slate-600 mb-6">
              Our legal and privacy team is here to help you understand how we protect your information.
            </p>
            <a
              href="mailto:support@aceinterview.ai"
              className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}