import React, { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "Can interviewers see or detect the copilot?", answer: "No, the copilot runs discreetly on your device and is designed to be undetectable. It operates in the background, providing you with real-time suggestions through a separate window or overlay that only you can see." },
    { question: "Is there a free plan?", answer: "Yes! We offer a free plan that includes basic features such as limited interview sessions per month, standard AI responses, and support for common interview types. You can upgrade to our Pro plan anytime." },
    { question: "What types of interviews are supported?", answer: "Our copilot supports all major interview types including behavioral interviews, technical interviews, coding interviews, case studies, system design, and product management interviews." },
    { question: "What meeting platforms are supported?", answer: "The copilot works seamlessly with Zoom, Microsoft Teams, Google Meet, Webex, Skype, and more. It also supports phone interviews through our mobile app." },
    { question: "What AI model does interview copilot use?", answer: "We use state-of-the-art AI models including GPT-4, Claude, and custom-trained models optimized for interview scenarios." },
    { question: "How about coding interviews?", answer: "Coding interviews are fully supported! The copilot helps with algorithm questions, data structures, system design, and supports 20+ programming languages." },
    { question: "How do I get started?", answer: "Simply sign up for a free account, upload your resume and job description, and launch your first interview session. Our onboarding wizard will guide you through setup." },
  ];

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-24 md:py-32 bg-surface-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-surface-500 font-medium mb-3 uppercase text-sm tracking-wide">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-surface-200 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-50/50 transition-colors"
              >
                <span className="text-lg font-semibold text-surface-900 pr-4">{faq.question}</span>
                <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"}`}>
                <div className="px-6 pb-6 pt-0 text-surface-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
