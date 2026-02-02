// frontend/src/components/Landing/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

// -------------------- FEATURES DROPDOWN --------------------
const FeaturesDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();   // ✅ Added

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6"
    >
      <div className="grid grid-cols-2 gap-6">
        
        {/* ---- INTERVIEW COPILOT ---- */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            INTERVIEW COPILOT
          </h3>

          <div className="space-y-3">

            {/* AI Mock Interview */}
            <div
              onClick={() => navigate("/interview")}   // ✅ Redirect added
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">AI Mock Interview</h4>
                <p className="text-xs text-gray-500 mt-0.5">Practice with AI recruiter</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- FREE TOOLS ---- */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            FREE TOOLS
          </h3>

          <div className="space-y-3">

            {/* AI Resume Builder */}
            <div
              onClick={() => navigate("/resume-builder")}   // ✅ Redirect added
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">AI Resume Builder</h4>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// -------------------- RESOURCES DROPDOWN --------------------
const ResourcesDropdown = ({ isOpen, onClose, onBlogClick }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[400px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6"
    >
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        RESOURCES
      </h3>

      <div className="space-y-3">
        <div
          onClick={onBlogClick}
          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Blog</h4>
            <p className="text-xs text-gray-500 mt-0.5">Latest industry news</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------- USER MENU --------------------
const UserMenu = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const firstLetter = user?.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
      >
        {firstLetter}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email}
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/interview");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate("/personas");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Manage Personas
          </button>

          <div className="border-t border-gray-100 mt-2 pt-2">
            <button
              onClick={onSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------- NAVBAR --------------------
export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleBlogClick = () => {
    setResourcesOpen(false);
    navigate("/blog");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
     <div className="max-w-7xl mx-auto px-6 py-4">
  <div className="flex justify-between items-center bg-white rounded-2xl px-6 py-3 
                  shadow-sm hover:shadow-lg transition-all duration-300">

{/* 
          /* Logo
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
           <span className="text-xl font-extrabold tracking-tight text-gray-900">
  Interview<span className="text-indigo-600">AI</span>
</span>

          </div> */ }
 {/* Logo - Interview Sidekick style: "Interview" grey + "AI" purple */}
          <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
           <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
</div>
          <span className="text-xl font-bold text-surface-700">Interview</span>
           <span className="text-xl font-bold text-primary-500">AI</span>
         </div>
          {/* Menu */}
          <div className="hidden md:flex items-center gap-8">

            <span
              onClick={() => navigate("/interview")}
             className="flex items-start gap-3 p-3 rounded-xl cursor-pointer
           transition-all duration-300
           hover:bg-gray-50 hover:shadow-md hover:scale-[1.02]">
              Interview Copilot
            </span>

            <span
              onClick={() => navigate("/pricing")}
              className="flex items-start gap-3 p-3 rounded-xl cursor-pointer
           transition-all duration-300
           hover:bg-gray-50 hover:shadow-md hover:scale-[1.02]">
              Pricing
            </span>

            {/* Features */}
            <div className="relative">
              <span
                onClick={() => {
                  setFeaturesOpen(!featuresOpen);
                  setResourcesOpen(false);
                }}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer
           transition-all duration-300
           hover:bg-gray-50 hover:shadow-md hover:scale-[1.02]">
                Features
                <svg
                  className={`w-4 h-4 transition-transform ${
                    featuresOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              <FeaturesDropdown
                isOpen={featuresOpen}
                onClose={() => setFeaturesOpen(false)}
              />
            </div>

            {/* Resources */}
            <div className="relative">
              <span
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setFeaturesOpen(false);
                }}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer
           transition-all duration-300
           hover:bg-gray-50 hover:shadow-md hover:scale-[1.02]">
                Resources
                <svg
                  className={`w-4 h-4 transition-transform ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              <ResourcesDropdown
                isOpen={resourcesOpen}
                onClose={() => setResourcesOpen(false)}
                onBlogClick={handleBlogClick}
              />
            </div>
          </div>

          {/* Auth Button */}
          {!user ? (
            <button
              onClick={() => navigate("/sign-in")}
             className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition shadow"

             >
              Start for free
            </button>
          ) : (
            <UserMenu user={user} onSignOut={handleSignOut} />
          )}
        </div>
      </div>
    </nav>
  );
}

//     <div
//       ref={dropdownRef}
//       className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-card-lg border border-surface-100 p-6 animate-slide-in"
//     >
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-4">Interview Copilot</h3>
//           <div
//             onClick={() => { navigate("/interview"); onClose(); }}
//             className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-50 cursor-pointer transition-all duration-200 group"
//           >
//             <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200">
//               <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//               </svg>
//             </div>
//             <div>
//               <h4 className="font-semibold text-surface-900 text-sm">AI Mock Interview</h4>
//               <p className="text-xs text-surface-500 mt-0.5">Practice with AI recruiter</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-4">Free Tools</h3>
//           <div
//             onClick={() => { navigate("/resume-builder"); onClose(); }}
//             className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-50 cursor-pointer transition-all duration-200 group"
//           >
//             <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200">
//               <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             </div>
//             <div>
//               <h4 className="font-semibold text-surface-900 text-sm">AI Resume Builder</h4>
//               <p className="text-xs text-surface-500 mt-0.5">Build ATS-optimized resumes</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ResourcesDropdown = ({ isOpen, onClose, onBlogClick }) => {
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onClose(); };
//     if (isOpen) document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={dropdownRef}
//       className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-white rounded-2xl shadow-card-lg border border-surface-100 p-6 animate-slide-in"
//     >
//       <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-4">Resources</h3>
//       <div onClick={onBlogClick} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-50 cursor-pointer transition-all duration-200 group">
//         <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200">
//           <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//           </svg>
//         </div>
//         <div>
//           <h4 className="font-semibold text-surface-900 text-sm">Blog</h4>
//           <p className="text-xs text-surface-500 mt-0.5">Latest industry news & tips</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UserMenu = ({ user, onSignOut }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false); };
//     if (isOpen) document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [isOpen]);

//   const firstLetter = user?.email?.[0]?.toUpperCase() || "U";

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-11 h-11 bg-brand-charcoal rounded-full flex items-center justify-center text-white font-semibold hover:bg-black transition-all duration-300"
//       >
//         {firstLetter}
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-card-lg border border-surface-100 py-2 animate-slide-in">
//           <div className="px-4 py-3 border-b border-surface-100">
//             <p className="text-sm font-medium text-surface-900 truncate">{user?.email}</p>
//           </div>
//           <button onClick={() => { navigate("/interview"); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50">Dashboard</button>
//           <button onClick={() => { navigate("/personas"); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50">Manage Personas</button>
//           <div className="border-t border-surface-100 mt-2 pt-2">
//             <button onClick={onSignOut} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function Navbar() {
//   const { user, signOut } = useAuth();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);
//   const [featuresOpen, setFeaturesOpen] = useState(false);
//   const [resourcesOpen, setResourcesOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   const handleSignOut = async () => {
//     await signOut();
//     navigate("/");
//   };

//   const handleBlogClick = () => {
//     setResourcesOpen(false);
//     navigate("/blog");
//   };

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-nav" : "bg-white"}`}>
//       <div className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex justify-between items-center">
//           {/* Logo - Interview Sidekick style: "Interview" grey + "AI" purple */}
//           <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
//             <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
//               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <span className="text-xl font-bold text-surface-700">Interview</span>
//             <span className="text-xl font-bold text-primary-500">AI</span>
//           </div>

//           {/* Desktop nav - plain text links like reference */}
//           <div className="hidden md:flex items-center gap-8">
//             <span onClick={() => navigate("/interview")} className="text-surface-600 hover:text-surface-900 cursor-pointer font-medium transition-colors">
//               Products
//             </span>
//             <div className="relative">
//               <span
//                 onClick={() => { setFeaturesOpen(!featuresOpen); setResourcesOpen(false); }}
//                 className="text-surface-600 hover:text-surface-900 cursor-pointer font-medium flex items-center gap-1 transition-colors"
//               >
//                 What We Offer
//                 <svg className={`w-4 h-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </span>
//               <FeaturesDropdown isOpen={featuresOpen} onClose={() => setFeaturesOpen(false)} />
//             </div>
//             <span
//               onClick={() => {
//                 if (window.location.pathname === "/") {
//                   document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
//                 } else {
//                   navigate("/#faq");
//                 }
//               }}
//               className="text-surface-600 hover:text-surface-900 cursor-pointer font-medium transition-colors"
//             >
//               FAQ
//             </span>
//             <span onClick={() => navigate("/blog")} className="text-surface-600 hover:text-surface-900 cursor-pointer font-medium transition-colors">
//               Blog
//             </span>
//             <span onClick={() => navigate("/resume-builder")} className="text-surface-600 hover:text-surface-900 cursor-pointer font-medium transition-colors">
//               Free Tools
//             </span>
//           </div>

//           <div className="flex items-center gap-3">
//             {!user ? (
//               <button onClick={() => navigate("/sign-in")} className="btn-primary px-6 py-2.5 text-sm hidden md:inline-flex">
//                 Get Started
//               </button>
//             ) : (
//               <div className="hidden md:block">
//                 <UserMenu user={user} onSignOut={handleSignOut} />
//               </div>
//             )}
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl hover:bg-surface-100" aria-label="Menu">
//               <svg className="w-6 h-6 text-surface-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-surface-100 shadow-card-lg py-6 px-6 animate-slide-in">
//           <div className="flex flex-col gap-1">
//             <button onClick={() => { navigate("/interview"); setMobileMenuOpen(false); }} className="text-left py-3 font-medium text-surface-700 hover:text-primary-500">Products</button>
//             <button onClick={() => { navigate("/interview"); setMobileMenuOpen(false); }} className="text-left py-3 font-medium text-surface-700 hover:text-primary-500">AI Mock Interview</button>
//             <button onClick={() => { navigate("/resume-builder"); setMobileMenuOpen(false); }} className="text-left py-3 font-medium text-surface-700 hover:text-primary-500">AI Resume Builder</button>
//             <button onClick={() => { navigate("/pricing"); setMobileMenuOpen(false); }} className="text-left py-3 font-medium text-surface-700 hover:text-primary-500">Pricing</button>
//             <button
//               onClick={() => {
//                 setMobileMenuOpen(false);
//                 if (window.location.pathname === "/") {
//                   document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
//                 } else {
//                   navigate("/#faq");
//                 }
//               }}
//               className="text-left py-3 font-medium text-surface-700 hover:text-primary-500"
//             >
//               FAQ
//             </button>
//             <button onClick={() => { navigate("/blog"); setMobileMenuOpen(false); }} className="text-left py-3 font-medium text-surface-700 hover:text-primary-500">Blog</button>
//             {!user && (
//               <button onClick={() => { navigate("/sign-in"); setMobileMenuOpen(false); }} className="btn-primary w-full mt-4">
//                 Get Started
//               </button>
//             )}
//             {user && (
//               <>
//                 <button onClick={() => { navigate("/personas"); setMobileMenuOpen(false); }} className="text-left py-3 font-medium text-surface-700">Manage Personas</button>
//                 <button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="text-left py-3 font-medium text-red-600">Sign Out</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
