// src/pages/TermsOfService.jsx

import React, { useState, useEffect } from "react";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";

const sections = [
  {
    title: "Limitations of Use",
    content: `By using this website, you warrant on behalf of yourself, your users, and other parties you represent that you will not:

• Modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website
• Remove any copyright or other proprietary notations from any materials and software on this website
• Transfer the materials to another person or "mirror" the materials on any other server
• Knowingly or negligently use this website or any of its associated services in a way that abuses or disrupts our networks or any other service we provide
• Use this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material
• Use this website or its associated services in violation of any applicable laws or regulations
• Use this website in conjunction with sending unauthorized advertising or spam
• Harvest, collect, or gather user data without the user's consent
• Use this website or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties`,
  },
  {
    title: "Intellectual Property",
    content: `The intellectual property in the materials contained in this website are owned by or licensed to AceInterview and are protected by applicable copyright and trademark law. We grant our users permission to download one copy of the materials for personal, non-commercial transitory use.

This constitutes the grant of a license, not a transfer of title. This license shall automatically terminate if you violate any of these restrictions or the Terms of Service, and may be terminated by AceInterview at any time.`,
  },
  {
    title: "Liability",
    content: `Our website and the materials on our website are provided on an 'as is' basis. To the extent permitted by law, AceInterview makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property, or other violation of rights.

In no event shall AceInterview or its suppliers be liable for any consequential loss suffered or incurred by you or any third party arising from the use or inability to use this website or the materials on this website, even if AceInterview or an authorized representative has been notified, orally or in writing, of the possibility of such damage.

In the context of this agreement, "consequential loss" includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity or otherwise.

Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.`,
  },
  {
    title: "Accuracy of Materials",
    content: `The materials appearing on our website are not comprehensive and are for general information purposes only. AceInterview does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website, or otherwise relating to such materials or on any resources linked to this website.`,
  },
  {
    title: "Links",
    content: `AceInterview has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement, approval or control by AceInterview of the site. Use of any such linked site is at your own risk and we strongly advise you make your own investigations with respect to the suitability of those sites.`,
  },
  {
    title: "Right to Terminate",
    content: `We may suspend or terminate your right to use our website and terminate these Terms of Service immediately upon written notice to you for any breach of these Terms of Service.`,
  },
  {
    title: "Severance",
    content: `Any term of these Terms of Service which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity of the remainder of these Terms of Service is not affected.`,
  },
  {
    title: "Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of Delaware. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.`,
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

export default function TermsOfService() {
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
              <FileText className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Legal & Terms
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Please read these terms carefully before using AceInterview. They 
              outline your rights and responsibilities as a user of our platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Last updated</p>
                <p className="text-slate-900 text-base font-bold">May 16, 2025</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Governing law</p>
                <p className="text-slate-900 text-base font-bold">Delaware, USA</p>
              </div>
            </div>
            
            <div className="mt-10 max-w-lg mx-auto bg-white/50 border border-slate-200 rounded-xl px-5 py-4">
              <p className="text-slate-500 text-sm">
                We reserve the right to review and amend any of these Terms of Service at our sole discretion.
                Any changes will take effect immediately from the date of publication.
              </p>
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
            <h3 className="text-xl font-bold text-slate-900 mb-3">Questions about these terms?</h3>
            <p className="text-slate-600 mb-6">
              Our support team is available to clarify any part of our service agreement.
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