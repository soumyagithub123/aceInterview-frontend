import React from "react";
import Navbar from "../../Landing/Navbar"; // agar path galat lage to adjust kar lena (Landing folder se)
import Footer from "../../Landing/Footer";

const AtsFriendlyResume = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-0 pt-[120px] block pb-0 bg-[#f7fafc] pt-[10%] relative">
        <div className="z-3 flex flex-col items-stretch w-full max-w-[1272px] mb-0 mx-auto pb-0  flex relative">
          <div className="w-fit rounded-full flex justify-start items-center px-[18px] py-[12px] text-center bg-[#e9eef1] text-[#9ba4aa] inline-block">
            <div className="flex items-center mb-0 pl-0">
              <a href="/blog">Blog</a>
              <img
                src="https://cdn.prod.website-files.com/635c591378332f38be25d45f/635c591478332f8fc425d5b8_icon-caret-right.svg"
                alt=""
              />
              <a href="">Resumes</a>
            </div>
          </div>
        </div>

        <div className="z-3 flex flex-col items-stretch w-full max-w-[1272px] mb-0 mx-auto pb-0 relative">
          {/* <div className="z-2 flex justify-around items-start mt-6 relative"> */}
          <div className="flex flex-col lg:flex-row items-center gap-8 mt-8 px-4">
            <img
              // className="rounded-[10px] max-w-[45%] max-h-[500px]"
              className="w-full lg:w-1/2 rounded-xl object-cover"
              src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6787faa2ef202cb07a8230b5_ats-friendly-resume.webp"
              alt=""
            />
            {/* <div className="flex flex-col items-start ml-24 pt-0"> */}
            <div className="flex flex-col items-start w-full lg:w-1/2">
              <div className="flex items-center mb-6">
                <div className="mr-3 opacity-50">January 15, 2026</div>
                <a
                  className="bg-[#1570ef] text-white rounded-[3px] flex justify-center items-center h-[30px]"
                  href=""
                >
                  <div className="py-4 px-2">Resumes</div>
                </a>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                An ATS Friendly Resume Is Your Key to Getting Hired
              </h1>
              <div className="flex items-center">
                <img
                  alt="Hiredeasy Logo"
                  className="h-12 w-auto cursor-pointer transition-transform duration-200 hover:scale-110"
                  src="/Hiredeasy.png"
                />
                <a href="" className="ml-4 text-lg font-medium">
                  Hired Easy
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          className="z-1 w-screen h-[4vw] relative max-w-full inline-block align-middle"
          src="https://cdn.prod.website-files.com/635c591378332f38be25d45f/635c591478332f1f1325d5cf_divider-round-bottom.svg"
          alt=""
        />
      </div>

      {/**content  */}
      {/* <div className="pt-24 pb-24 block relative"> */}
      <div className="py-16 px-4">
        <div className="pb-[132px] pl-[3%] pr-[3%]">
          <div className="w-full max-w-[1110px] h-full mx-auto">
            {/* <div className="w-full pl-[282px] block relative"> */}
            <div className="flex flex-col lg:flex-row gap-10">
              {/* left */}
              {/* <div className="w-[230px] block absolute inset-y-0 left-0"> */}
              <div className="lg:w-1/4 w-full">
                {/* <div className="pt-1.5 sticky top-[120px]"> */}
                <div className="lg:sticky lg:top-28">
                  <div className="text-[#202146] mb-1 font-bold">
                    Table of Contents
                  </div>
                  <div>
                    <a
                      href="#what-is-ats"
                      className="hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200"
                    >
                      <strong>
                        What is an ATS, and why is it so important?
                      </strong>
                    </a>
                    <a
                      className="hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200"
                      href="#how-does-an-ats-work"
                    >
                      <strong>How Does an ATS Work?</strong>
                    </a>
                    <a
                      className="hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200"
                      href="#if-your-resume"
                    >
                      <strong>
                        If Your Resume Isn't ATS Friendly, It May Never Be Seen!
                      </strong>
                    </a>
                    <a
                      className="hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200"
                      href="#the-problem"
                    >
                      <strong>The Problem: ATS Can't Read Everything</strong>
                    </a>
                    <a
                      className="hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200"
                      href="#key-element"
                    >
                      <strong>Key Elements of an ATS-Friendly Resume</strong>
                    </a>
                    <a
                      className="hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200"
                      href="#tools"
                    >
                      <strong>Tools to Help Create ATS-Friendly Resumes</strong>
                    </a>
                    <a
                      className="hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200"
                      href="#conclusion"
                    >
                      <strong>Conclusion</strong>
                    </a>
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="max-w-full block">
                {/* <div className="max-w-[672px] mx-auto space-y-4"> */}
                <div className="prose prose-lg max-w-none space-y-6">
                  <p>
                    Many resumes are rejected by automated systems, known as
                    Applicant Tracking Systems (ATS). Up to 75% of qualified job
                    applicants are screened out by automated systems before a
                    human ever sees their resume.
                  </p>
                  <p>
                    But don't worry! With a few simple changes, you can ensure
                    your resume passes through the ATS and lands directly on a
                    recruiter's desk. In this guide, we'll share the secrets to
                    creating an ATS-friendly resume that will immediately place
                    you in that upper 25% and give you a significant edge in
                    your job search.
                  </p>
                  <p></p>
                  <h2 className=" tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong
                      id="what-is-ats"
                      className="scroll-mt-[140px] text-[#353e44] font-bold"
                    >
                      What is an ATS, and why is it so important?
                    </strong>
                  </h2>
                  <p>
                    An Applicant Tracking System (ATS) is a software tool used
                    by recruiters to efficiently sift through countless resumes.
                    It's like a digital gatekeeper, deciding which applications
                    make it to the next round. Do you know that approximately
                    <strong className="text-[#2d72e3]">
                      {" "}
                      98% of Fortune 500 companies utilize ATS to streamline
                      their recruitment processes
                    </strong>
                    , making it a common tool for businesses of all sizes? While
                    it might sound intimidating, understanding how ATS works can
                    significantly boost your chances of landing your dream job.
                  </p>
                  <h2 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong
                      id="how-does-an-ats-work"
                      className="scroll-mt-[140px] text-[#353e44] font-bold"
                    >
                      How Does an ATS Work?
                    </strong>
                  </h2>
                  <p>
                    Think of an ATS as a high-tech keyword scanner. It scans
                    your resume for specific keywords and phrases related to the
                    job description. If your resume matches these keywords, it's
                    more likely to pass the initial screening.
                  </p>
                  <p>
                    After the screening, recruiters and hiring managers can
                    filter down to more specific data points. So, if the ATS
                    can’t read a section of your resume, you might get filtered
                    out, just for having the wrong format.
                  </p>
                  <p></p>
                  <h2 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong
                      id="if-your-resume"
                      className="scroll-mt-[140px] text-[#353e44] font-bold"
                    >
                      If Your Resume Isn't ATS Friendly, It May Never Be Seen!
                    </strong>
                  </h2>
                  <p>
                    Have you ever wondered why your perfectly crafted resume
                    never lands you a job? The reason might be an
                    often-overlooked factor: Applicant Tracking Systems (ATS).
                  </p>
                  <p></p>
                  <h2 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong
                      id="the-problem"
                      className="scroll-mt-[140px] text-[#353e44] font-bold"
                    >
                      The Problem: ATS Can't Read Everything
                    </strong>
                  </h2>
                  <p>
                    While ATS have become indispensable tools for recruiters,
                    they have limitations. They can't "read" your resume in the
                    same way a human can. If your resume isn't formatted
                    correctly or lacks the right keywords, it might be
                    overlooked by the ATS, never making it to a recruiter's
                    eyes.
                  </p>
                  <p></p>
                  <h2 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong
                      id="key-element"
                      className="scroll-mt-[140px] text-[#353e44] font-bold"
                    >
                      Key Elements of an ATS-Friendly Resume
                    </strong>
                  </h2>
                  <p>
                    To ensure your resume makes it past the initial screening
                    stage and into the hands of a human recruiter, it's crucial
                    to understand the key elements of an ATS-friendly resume.
                  </p>
                  <p></p>
                  <h3 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong className="text-[#353e44] font-bold">
                      Keyword Optimization
                    </strong>
                  </h3>
                  <ul className="mt-6 mb-6 pl-6" role="list">
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Identify Relevant Keywords:</strong> Use keywords
                      directly from the job description to align your resume
                      with the specific requirements.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Strategic Placement:</strong> Incorporate keywords
                      naturally into your resume's header, summary, work
                      experience, skills, and education sections.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Keyword Density:</strong> While keyword
                      optimization is essential, avoid keyword stuffing. Focus
                      on quality over quantity.
                    </li>
                  </ul>
                  <p></p>
                  <h3 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong className="text-[#353e44] font-bold">
                      Formatting Guidelines
                    </strong>
                  </h3>
                  <ul className="mt-6 mb-6 pl-6" role="list">
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Simple and Clean:</strong> Opt for a clean and
                      minimalist design that's easy to read.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Standard Fonts:</strong> Use standard fonts like
                      Arial or Times New Roman.
                    </li>
                    <li>
                      <strong>Clear Headings:</strong> Use clear headings for
                      each section (e.g., Summary, Experience, Skills,
                      Education).
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Consistent Formatting:</strong> Maintain
                      consistent formatting throughout your resume.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>White Space:</strong> Use white space effectively
                      to improve readability.
                    </li>
                  </ul>
                  <p></p>
                  <h3 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong className="text-[#353e44] font-bold">
                      File Format and Layout
                    </strong>
                  </h3>
                  <ul className="mt-6 mb-6 pl-6" role="list">
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Standard Formats: </strong>Stick to widely
                      accepted formats like .doc, .docx, or .pdf.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Simple Layout:</strong> Avoid complex layouts,
                      excessive formatting, or tables.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Bullet Points: </strong>Use bullet points to
                      highlight key achievements and responsibilities.
                    </li>
                  </ul>
                  <p></p>
                  <h3 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong className="text-[#353e44] font-bold">
                      Content and Structure
                    </strong>
                  </h3>
                  <ul className="mt-6 mb-6 pl-6" role="list">
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Clear and Concise: </strong>Present information in
                      a clear and concise manner.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Quantifiable Achievements: </strong>Use metrics
                      and data to quantify your accomplishments.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Tailored to the Job:</strong> Customize your
                      resume for each job application to highlight relevant
                      skills and experiences.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Proofread Carefully: </strong>Ensure your resume
                      is free of errors.
                    </li>
                  </ul>
                  <p></p>
                  <h3 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong className="text-[#353e44] font-bold">
                      Content and Structure
                    </strong>
                  </h3>
                  <ul className="mt-6 mb-6 pl-6" role="list">
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Overcomplicating Your Resume: </strong>Keep your
                      resume simple and easy to read.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Using Non-Standard Fonts: </strong>Stick to
                      standard fonts to avoid potential issues.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Including Irrelevant Information:</strong> Focus
                      on relevant skills and experiences.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Ignoring Keyword Optimization: </strong>Use
                      keywords strategically to improve your visibility.
                    </li>
                    <li className="pt-1.5 pb-1.5 list-disc">
                      <strong>Poor Formatting:</strong> Maintain a clean and
                      professional format.
                    </li>
                  </ul>
                  <p>
                    By following these guidelines, you can create an
                    ATS-friendly resume that increases your chances of getting
                    noticed by recruiters and landing your dream job.
                  </p>
                  <p></p>
                  <h2 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong
                      id="tools"
                      className="scroll-mt-[140px] text-[#353e44] font-bold"
                    >
                      Tools to Help Create ATS-Friendly Resumes
                    </strong>
                  </h2>
                  <p>
                    For a straightforward approach,
                    <a
                      href="https://www.careerflow.ai/resume-builder"
                      target="_blank"
                    >
                      {" "}
                      <strong>Careerflow's AI Resume Builder</strong>
                    </a>{" "}
                    offers a user-friendly platform to create ATS-optimized
                    resumes. This tool leverages AI technology to analyze your
                    experience and generate a professional, keyword-rich
                    document.
                  </p>
                  <p>
                    You input your details, we give you a completed,
                    ATS-friendly resume.
                  </p>
                  <p>‍</p>
                  <h6 className="font-[16px] text-[#353e44] font-bold  ">
                    <strong>The Power of Plain Text</strong>
                  </h6>
                  <ul className="mt-6 mb-6 pl-6 list-disc" role="list">
                    <li className="pt-1.5 pb-1.5">
                      <strong>Visual Clarity:</strong> Converting your resume to
                      a plain-text file allows you to visualize its structure
                      and content without relying on formatting.
                    </li>
                    <li className="pt-1.5 pb-1.5">
                      <strong>ATS Compatibility:</strong> ATS systems struggle
                      to interpret complex formatting, so a plain-text format
                      ensures your resume is easily scanned and understood.
                    </li>
                  </ul>
                  <h6 className="font-[16px] text-[#353e44] font-bold  ">
                    <strong>Professional Review:</strong>
                    <a
                      href="https://www.careerflow.ai/resume-review"
                      target="_blank"
                    >
                      <strong> Careerflow's Resume Review</strong>
                    </a>
                  </h6>
                  <ul className=" mt-6 mb-6 pl-6 list-disc" role="list">
                    <li className="pt-1.5 pb-1.5">
                      <strong>Expert Guidance:</strong> A professional resume
                      reviewer can provide expert insights into your resume's
                      strengths and weaknesses.
                    </li>
                    <li className="pt-1.5 pb-1.5">
                      <strong>Error Identification:</strong> They can help
                      identify and correct errors in content, grammar, and
                      punctuation.
                    </li>
                    <li className="pt-1.5 pb-1.5">
                      <strong>Keyword Optimization:</strong> A skilled reviewer
                      can optimize your resume with industry-specific keywords
                      and phrases.
                    </li>
                    <li className="pt-1.5 pb-1.5">
                      <strong>Format and Structure:</strong> They can ensure
                      your resume adheres to best practices for ATS
                      compatibility, including clear headings, bullet points,
                      and a consistent format.
                    </li>
                  </ul>
                  <p>
                    With the power of Careerflow's AI-powered resume builders or
                    professional review, you can create a compelling resume that
                    effectively navigates ATS systems and lands you more
                    interviews.
                  </p>
                  <figure className="my-10 flex flex-col items-center">
                    <div>
                      <img
                        src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6787fbef6ff83f604c1eee8d_6787f9c945aa4e1b8df2fdb7_careerflow-resume-builder.webp"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <figcaption className="opacity-50 mt-2 font-semibold">
                      Careerflow’s AI Resume Builder
                    </figcaption>
                  </figure>
                  <h2 className="tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]">
                    <strong
                      id="conclusion"
                      className="scroll-mt-[140px] text-[#353e44] font-bold"
                    >
                      Conclusion
                    </strong>
                  </h2>
                  <p>
                    To increase your chances of landing a job interview, it's
                    essential to create a resume that's not only visually
                    appealing but also ATS-friendly. By converting your resume
                    to a plain-text format and reviewing it for any formatting
                    issues, you can ensure that your resume is easily readable
                    by both humans and machines.&nbsp;
                  </p>
                  <p>
                    Using professionally designed templates optimized for ATS
                    like Careerflow's resume templates you can have a
                    significant advantage. Incorporating strong action verbs and
                    relevant keywords tailored to the job description further
                    enhances your resume's visibility. Ultimately, a
                    well-structured and concise resume that highlights your key
                    qualifications and experiences is crucial to capture the
                    attention of recruiters and successfully navigate the
                    initial stages of the job application process.
                  </p>
                  <p>
                    Ready to land your dream job?{" "}
                    <a
                      href="https://www.careerflow.ai/resume-builder"
                      target="_blank"
                    >
                      Get started on your perfect resume today!
                    </a>
                    &nbsp;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AtsFriendlyResume;

{
  /* <div className='z-3 w-full max-w-[1272px] mb-0 mx-auto pb-0 px-[36px] flex relative'>
<div className='text-center px-6 inline-block'>
    
</div>
</div> */
}
