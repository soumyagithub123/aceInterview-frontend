// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../Landing/Navbar";
// import Footer from "../../Landing/Footer";

// export default function Blog() {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   const blogPosts = [
//     {
//       id: 1,
//       date: "Apr 8, 2025",
//       title: "30 Most Common Attitude Questions Interview Questions You Should Prepare For",
//       image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
//       link: "#"
//     },
//     {
//       id: 2,
//       date: "Jan 17, 2025",
//       title: "First Round of Interviews More Difficult Than Expected?",
//       image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=500&fit=crop",
//       link: "#"
//     },
//     {
//       id: 3,
//       date: "Feb 25, 2025",
//       title: "Is Final Round AI Legit? Unveiling the Truth About AI-Powered Interview Prep",
//       image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
//       link: "#"
//     },
//     {
//       id: 4,
//       date: "Jun 28, 2024",
//       title: "Why Should You Join Us? Mastering the Interview Question with Interview Copilot",
//       image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
//       link: "#"
//     },
//     {
//       id: 5,
//       date: "Oct 21, 2024",
//       title: "Top Features to Look for in an AI Interview Copilot",
//       image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop",
//       link: "#"
//     },
//     {
//       id: 6,
//       date: "Feb 10, 2025",
//       title: "High School Student Resume Secrets: Unlocking Your Path to a Successful Internship Application",
//       image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop",
//       link: "#"
//     }
//   ];

//   const filteredPosts = blogPosts.filter(post =>
//     post.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-surface-50">
//       <Navbar />

//       <div className="pt-32 pb-16 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wide">
//             Resources
//           </p>
//           <h1 className="text-5xl md:text-6xl font-bold text-surface-900 mb-6">
//             Interview Tips & More
//           </h1>
//           <p className="text-xl text-surface-600 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Offering tips, expert strategies, and tools to help you master every aspect of the job interview process and achieve career success
//           </p>

//           <div className="max-w-2xl mx-auto relative">
//             <input
//               type="text"
//               placeholder="Search resources..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="input-base pl-6 pr-12 py-4 text-lg"
//             />
//             <svg
//               className="w-6 h-6 text-surface-400 absolute right-5 top-1/2 -translate-y-1/2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 pb-24">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts.map((post) => (
//             <article
//               key={post.id}
//               className="card-base overflow-hidden group cursor-pointer hover:-translate-y-2"
//               onClick={() => window.location.href = post.link}
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//               </div>
//               <div className="p-6">
//                 <p className="text-sm text-surface-500 mb-3">{post.date}</p>
//                 <h3 className="text-xl font-semibold text-surface-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">
//                   {post.title}
//                 </h3>
//                 <span className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
//                   Read now
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </span>
//               </div>
//             </article>
//           ))}
//         </div>

//         {filteredPosts.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-xl text-surface-500">No blog posts found matching your search.</p>
//           </div>
//         )}
//       </div>

//       <section className="bg-surface-900 py-20">
//         <div className="max-w-4xl mx-auto text-center px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Interview Copilot: Your AI-Powered Personalized Cheatsheet
//           </h2>
//           <button
//             onClick={() => navigate("/sign-in")}
//             className="btn-dark px-10 py-4 text-lg"
//           >
//             Get Started Free
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, TrendingUp, Calendar, Clock } from "lucide-react";
import Navbar from "../../Landing/Navbar";
import Footer from "../../Landing/Footer";

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: 1,
      date: "Apr 8, 2025",
      readTime: "5 min read",
      title: "30 Most Common Attitude Questions Interview Questions You Should Prepare For",
      excerpt: "Master the most frequently asked attitude and behavioral interview questions with expert tips and sample answers.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
      category: "Interview Tips",
      link: "#"
    },
    {
      id: 2,
      date: "Jan 17, 2025",
      readTime: "4 min read",
      title: "First Round of Interviews More Difficult Than Expected?",
      excerpt: "Learn proven strategies to overcome challenges in your initial interview rounds and make a lasting impression.",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=500&fit=crop",
      category: "Career Advice",
      link: "#"
    },
    {
      id: 3,
      date: "Feb 25, 2025",
      readTime: "6 min read",
      title: "Is Final Round AI Legit? Unveiling the Truth About AI-Powered Interview Prep",
      excerpt: "Discover how AI-powered interview preparation tools are revolutionizing the job search process.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
      category: "AI Technology",
      link: "#"
    },
    {
      id: 4,
      date: "Jun 28, 2024",
      readTime: "5 min read",
      title: "Why Should You Join Us? Mastering the Interview Question with Interview Copilot",
      excerpt: "Perfect your answer to one of the most important interview questions with AI-driven insights.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
      category: "Interview Tips",
      link: "#"
    },
    {
      id: 5,
      date: "Oct 21, 2024",
      readTime: "7 min read",
      title: "Top Features to Look for in an AI Interview Copilot",
      excerpt: "Find out what makes an AI interview assistant truly effective and worth your investment.",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop",
      category: "Product Guide",
      link: "#"
    },
    {
      id: 6,
      date: "Feb 10, 2025",
      readTime: "8 min read",
      title: "High School Student Resume Secrets: Unlocking Your Path to a Successful Internship Application",
      excerpt: "Essential resume writing tips for high school students seeking their first internship opportunities.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop",
      category: "Resume Tips",
      link: "#"
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(blogPosts.map(post => post.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            Resources & Insights
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Interview Tips & 
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Success Stories</span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Expert strategies, actionable tips, and AI-powered tools to help you ace every interview and accelerate your career growth
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <Search className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles, tips, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 text-lg text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(category)}
                className="px-4 py-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-full text-sm font-medium text-slate-700 hover:text-blue-700 transition-all shadow-sm hover:shadow"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => window.location.href = post.link}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/95 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600">Try adjusting your search or browse all categories</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Start Your Journey
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Ace Your Next Interview?
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Get AI-powered personalized interview preparation and land your dream job
          </p>

          <button
            onClick={() => navigate("/sign-in")}
            className="inline-flex items-center gap-3 bg-white hover:bg-blue-50 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 group"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-blue-200 text-sm mt-6">No credit card required • Start in 2 minutes</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}