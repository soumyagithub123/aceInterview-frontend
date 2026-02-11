import React from "react";

/* ================= WORKING TOP COMPANIES ================= */
const LOGOS = [
  {
    name: "Google",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Apple",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Amazon",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Netflix",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Tesla",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
  {
    name: "IBM",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "Salesforce",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
  },
  {
    name: "Oracle",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  },
  {
    name: "Airbnb",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "OpenAI",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  },
];

/* ================= COMPONENT ================= */
export default function SocialProof() {
  return (
    <section className="py-12 md:py-16 bg-background border-t border-surface-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <p className="text-center text-surface-500 text-sm font-medium mb-10">
          With folks hired by top tier companies
        </p>

        <div className="relative">
          {/* Gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling logos */}
          <div className="flex animate-scroll-left">

            {/* Set 1 */}
            <div className="flex items-center gap-16 px-10 shrink-0">
              {LOGOS.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 md:h-10 object-contain transition-transform duration-300 hover:scale-110"
                />
              ))}
            </div>

            {/* Set 2 (duplicate for infinite loop) */}
            <div className="flex items-center gap-16 px-10 shrink-0">
              {LOGOS.map((logo) => (
                <img
                  key={`${logo.name}-2`}
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 md:h-10 object-contain transition-transform duration-300 hover:scale-110"
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-scroll-left {
          animation: scroll-left 28s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}