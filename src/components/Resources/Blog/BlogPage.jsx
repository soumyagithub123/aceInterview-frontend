// src/components/Resources/Blog/BlogPage.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../Landing/Navbar"; // yeh path sahi rakh, agar galat lage to adjust kar lena
import Footer from "../../Landing/Footer";
import { Link } from "react-router-dom"; // react-router-dom ka Link (Next.js ka nahi)
import { blogData } from "../../../data/blogData"; // agar blogData src/data/blogData.js mein hai

function BlogPage() {
  const categoryColor = {
    Resumes: "bg-[#4D869C] text-white hover:bg-[#3A6B7C]",
    CareerAdvice:
      "bg-green-400 text-gray-800 hover:bg-green-200 hover:text-gray-600",
    JobBoards:
      "bg-green-300 text-gray-800 hover:bg-green-200 hover:text-gray-700",
    LinkedInProfile:
      "bg-blue-200 text-gray-900 hover:bg-blue-300 hover:text-gray-600",
    JobApplications:
      "bg-teal-500 text-gray-800 hover:bg-teal-200 hover:text-gray-700",
    BehavioralInterview:
      "bg-teal-700 text-gray-800 hover:bg-teal-300 hover:text-gray-600",
    ChatGPT:
      "bg-orange-400 text-gray-800 hover:bg-orange-600 hover:text-gray-600",
    Interviews:
      "bg-blue-200 text-gray-800 hover:bg-blue-300 hover:text-gray-600",
    Negotiation:
      "bg-orange-200 text-gray-800 hover:bg-orange-400 hover:text-gray-700",
    Jobsearch:
      "bg-pink-300 text-gray-800 hover:bg-pink-400 hover:text-gray-700",
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    setVisibleBlogs(6);
  }, []);

  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const handleViewMore = () => {
    setVisibleBlogs((prev) => prev + 6);
  };

  const categoryColors = {
    default:
      "bg-white text-[#1d2939] border border-[#d0d5dd] hover:bg-gray-100",
    selected: "bg-[#3A6B7C] text-white border border-[#3A6B7C]",
  };

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogData.filter((blog) => {
    const isCategoryMatch =
      selectedCategory === "All" || blog.category === selectedCategory;
    const isSearchMatch =
      searchTerm === "" ||
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  const slugify = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div>
      <Navbar />

      {/* <section className="pt-[170.45px] pb-[80.55px] relative overflow-hidden"> */}
      <section className="pt-28 md:pt-36 lg:pt-44 pb-12 md:pb-20 relative overflow-hidden">
        <div className="z-3 flex flex-col items-stretch w-full max-w-[1280px] mb-0 ml-auto mr-auto pb-0 px-6 lg:px-8 relative">
          <div className="gap-x-3 gap-y-3 text-center flex flex-col justify-center items-center">
            {/* <h1 className="tracking-[-.04em] mb-3 font-onest lg:text-7xl leading-[1.1] text-gray-800 mt-0 mb-8 text-[50px] font-bold leading-[56px]"> */}
            <h1 className="tracking-tight font-onest text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-gray-800 font-bold leading-tight text-center">
              Interview AI
              <span className="text-[#4D869C]"> Blogs and Guides</span>
            </h1>
            {/* <div className="text-[#344054] font-semibold text-center tracking-[-.02em] font-inter text-xl font-medium leading-[1.5]"> */}
            <div className="text-gray-600 text-base sm:text-lg md:text-xl text-center max-w-2xl">
              Explore our extensive blog library for insights, tips,
              <br />
              and industry updates
            </div>
          </div>
          <div className="flex justify-start items-center w-full max-w-[200px] h-full max-h-[200px] absolute inset-[-20%_-12%_auto_auto]">
            <img
              className="absolute opacity-10 inline-block max-w-full"
              src="https://cdn.prod.website-files.com/635c591378332f38be25d45f/671752e9089b646934f0aa96_Vector%20(28).webp"
              alt=""
            />
            <div className="opacity-30 blur-[80px] bg-[#7AB2B2] w-full h-full"></div>
          </div>
          <div className="flex justify-start items-center w-full max-w-[200px] h-full max-h-[200px] absolute inset-[20%_auto_auto_-12%]">
            <img
              className="absolute opacity-10 inline-block max-w-full"
              src="https://cdn.prod.website-files.com/635c591378332f38be25d45f/671752e9089b646934f0aa96_Vector%20(28).webp"
              alt=""
            />
            <div className="opacity-30 blur-[80px] bg-[#7AB2B2] w-full h-full"></div>
          </div>
        </div>
      </section>

      <section className="pt-[5px] h-fit md:pt-[30px] lg:pt-[80.5px] pb-[5px] md:pb-[30px] lg:pb-[80.5px]">
        <div className="relative z-[3] flex flex-col items-stretch w-full max-w-[1280px] mb-0 ml-auto mr-auto pb-0 px-4 lg:px-8 max-w-[1344px]">
          <div className="relative z-[1] mb-12">
            <div className="">
              <a className="max-w-full inline-block" href="">
                <div className="grid gap-x-[10px] lg:gap-x-[80px] gap-y-[14px] lg:gap-y-[80px] grid-rows-[auto] items-center grid grid-rows-[auto_auto] md:grid-cols-1 lg:grid-cols-2 auto-cols-fr">
                  <div className="">
                    <div className="flex flex-col gap-x-6 gap-y-6">
                      <div className="mb-6 block ">
                        <div className="uppercase text-[#3A6B7C] font-bold">
                          featured Blog
                        </div>
                      </div>
                    </div>
                    <img
                      // className="object-cover rounded-lg sm:w-[93vw] md:w-[94vw] lg:w-[90vw] border aspect-[16/9]"
                      className="w-full h-auto object-cover rounded-lg border aspect-video"
                      src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20130.png"
                      alt=""
                    />
                  </div>
                  <div className="gap-6 flex flex-col">
                    <div className="gap-[14px] flex flex-col items-start">
                      <div className="relative group hidden lg:block border rounded-lg self-start bg-[#4D869C] text-white hover:bg-[#3A6B7C] p-[6px_14px] hover:shadow-2xl">
                        <a
                          href="/blog/ats-friendly-resume" // agar detail page ke liye route hai to yeh rakh
                          className="relative z-10 text-lg font-bold block"
                        >
                          Resumes
                        </a>
                      </div>
                      <div>
                        <h2 className="mb-0 font-sans text-[43px] lg:text-[48px] leading-[42.8px] lg:leading-[52.8px] font-bold text-gray-700 mt-0">
                          An ATS Friendly Resume Is Your Key to Getting Hired
                        </h2>
                      </div>
                      <div className="text-[#344054] font-sans text-[18px] leading-[26px]">
                        Up to 75% of qualified job applicants are screened out
                        by automated systems (Applicant Tracking Systems) before
                        a human ever sees their resume. But don't worry! With a
                        few simple changes, you can ensure your resume passes
                        through the ATS and lands directly on a recruiter's
                        desk.
                      </div>
                    </div>
                    <div className="bg-[#4d869c] text-white font-semibold lg:hidden w-[30%] ml-[40%] text-center block border-[#1570ef] text-[#101828] border rounded-lg self-start p-[6px_14px] font-sans font-normal">
                      <div className="text-lg">Resumes</div>
                    </div>
                    <div className="gap-[20px] flex flex-wrap justify-between items-center">
                      <div className="gap-[20px] flex items-center">
                        <div className="text-[#3A6B7C] font-sans text-[18px] font-semibold leading-[26px]">
                          January 15, 2026
                        </div>
                      </div>
                      <div className="group gap-[8px] flex items-center">
                        <div className="text-[#3A6B7C] font-sans text-[18px] font-semibold leading-[26px]">
                          Read More
                        </div>
                        <img
                          className="transition-transform color-[#4D869C] duration-300 ease-in-out max-w-full inline-block group-hover:translate-x-[5px]"
                          src="https://cdn.prod.website-files.com/635c591378332f38be25d45f/671239bf668d3a6c900923ec_arrow-right-02.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[10px] pb-[40px]">
        <div className="max-w-[1344px] z-3 flex flex-col items-stretch w-full max-w-[1280px] mb-0 ml-auto mr-auto pb-0 px-8 relative">
          <div className="gap-[48px] flex flex-col">
            <div className="gap-[16px] flex flex-col items-stretch">
              <div className="mb-0 mb-[15px]">
                {/* <form className="gap-[12px] flex flex-row" action=""> */}
                <form className="flex flex-col md:flex-row gap-4" action="">
                  {/* Search Bar */}
                  {/* <div className="pt-4 flex gap-[16px] mb-6"> */}
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Search Blog"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full text-[#475467] bg-[#f9fafb] border border-[#d0d5dd] rounded-[12px] h-[50px] px-[20px] shadow-sm"
                    />
                  </div>

                  {/* <div className="flex pt-4 gap-[12px] overflow-auto pb-4"> */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {[
                      "All",
                      ...new Set(
                        blogData
                          .map((blog) => blog.category)
                          .filter((category) => category.trim() !== ""),
                      ),
                    ].map((category) => (
                      <label
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer rounded-[12px] px-[20px] py-[12px] font-bold uppercase text-center transition-all duration-[200ms] shadow-md block hover:scale-105 ${selectedCategory === category ? categoryColors.selected : categoryColors.default}`}
                      >
                        {category}
                      </label>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* <div className="gap-x-6 gap-y-14 grid mt-6 grid-rows-[auto_auto] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-cols-fr"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
              <div
                key={index}
                role="listitem"
                className="gap-4 transition-all duration-300 hover:border-teal-500 hover:shadow-md hover:-translate-y-1 text-[#2d72e3] font-medium no-underline bg-white border border-[#e4e7ec] rounded-2xl flex flex-col justify-between h-full p-6 transition-shadow transition-border-color duration-300 ease-in-out inline-block max-w-full"
              >
                <Link
                  to={`/blog/${slugify(blog.title)}`} // yahan react-router ka Link use kiya
                  className="gap-4 bg-white rounded-2xl flex flex-col justify-between h-full transition-shadow transition-border-color duration-300 ease-in-out"
                >
                  <div className="gap-4 flex flex-col justify-start items-center h-full">
                    <img
                      src={blog.imgSrc}
                      alt={blog.imgAlt}
                      loading="lazy"
                      // className="border border-[#e4e7ec] rounded-lg max-w-full inline-block"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="gap-6 flex flex-col">
                      <div className="gap-2 flex flex-col">
                        <div className="text-[#101828] font-sans text-[20px] font-semibold leading-[1.4]">
                          {blog.title}
                        </div>
                        <p className="text-[#344054] mb-0 font-semibold font-sans">
                          {blog.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="gap-4 flex flex-row justify-between items-center">
                    <div>
                      <span
                        className={`font-semibold relative z-10 text-lg relative lg:block border rounded-lg self-start p-[6px_14px] font-sans font-normal overflow-hidden shadow-lg hover:shadow-xl transition-all duration-100 hover:shadow-2xl hover:-translate-y-1 font-bold block transition-colors duration-300 ${categoryColor[blog.category] || categoryColors.default}`}
                      >
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {visibleBlogs < filteredBlogs.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleViewMore}
                className="relative text-[#4D869C] inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-300 to-blue-500 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative text-xl font-semibold px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Load More
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BlogPage;
