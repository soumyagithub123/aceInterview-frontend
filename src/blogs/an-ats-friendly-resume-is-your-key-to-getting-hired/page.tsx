import Navbar from '../../components/Landing/Navbar'
import Footer from '../../components/Landing/Footer'

import React from 'react'

const page = () => {

    return (
        <div>
            <Navbar />
            <div className='mt-0 pt-[120px] block pb-0 bg-[#f7fafc] pt-[10%] relative md:ml-4 ml-4'>
                <div className='z-3 flex flex-col items-stretch w-full max-w-[1272px] mb-0 mx-auto pb-0  flex relative'>
                    <div className='w-fit rounded-full flex justify-start items-center px-[18px] py-[12px] text-center bg-[#e9eef1] text-[#9ba4aa] inline-block'>
                        <div className='flex items-center mb-0 pl-0 '>
                            <a href="/blog">Blog</a>
                            <img src="https://cdn.prod.website-files.com/635c591378332f38be25d45f/635c591478332f8fc425d5b8_icon-caret-right.svg" alt="" />
                            <a href="">Resumes</a>
                        </div>
                    </div>
                </div>

                <div className='z-3 flex flex-col lg:flex-row items-stretch w-full max-w-[1272px] mx-auto relative px-4 lg:px-0'>
                    <div className='z-2 flex flex-col lg:flex-row justify-around items-start mt-6 w-full'>

                        <img
                            className='rounded-[10px] w-full lg:max-w-[45%] max-h-[500px] object-cover'
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20130.png"
                            alt=""
                        />

                        <div className='flex lg:items-start items-center text-center flex-col items-start lg:ml-24 mt-6 lg:mt-0 w-full px-2 sm:px-4'>
                            <div className='flex items-center mb-6'>
                                <a
                                    className='bg-[#4d869c] text-white rounded-[3px] flex justify-center items-center h-[30px]'
                                    href=""
                                >
                                    <div className='px-4 py-1 text-sm'>Resumes</div>
                                </a>
                            </div>

                            <h1 className='text-gray-800 lg:text-start mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
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



                <img className='z-1 w-screen h-[4vw] relative max-w-full inline-block align-middle' src="https://cdn.prod.website-files.com/635c591378332f38be25d45f/635c591478332f1f1325d5cf_divider-round-bottom.svg" alt="" />
            </div>

            {/**content  */}
            <div className='pt-24 pb-24 block relative'>
                <div className='pb-[132px] pl-[3%] pr-[3%]'>
                    <div className='w-full max-w-[1110px] h-full mx-auto'>
                        <div className='w-full relative flex flex-col lg:flex-row'>
                            {/* left */}
                            <div className='w-full  lg:w-[230px] lg:shrink-0 mb-8 lg:mb-0 w-full'>
                                <div className='pt-1.5 lg:sticky lg:top-[120px]'>
                                    <div className='text-[#202146] mb-1 font-bold'>Table of Contents</div>
                                    <div>
                                        <a href="#one" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong >What is an ATS, and why is it so important?</strong>
                                        </a>
                                        <a href="#two" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong >How Does an ATS Work?</strong>
                                        </a>
                                        <a href="#three" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong >If Your Resume Isn't ATS Friendly, It May Never Be Seen!</strong>
                                        </a>
                                        <a href="#four" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>The Problem: ATS Can't Read Everything</strong>
                                        </a>
                                        <a href='#five' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>‍
                                            Key Elements of an ATS-Friendly Resume</strong>
                                        </a>
                                        <a href='#six' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>‍Tools to Help Create ATS-Friendly Resumes</strong>
                                        </a>
                                        <a href='#seven' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong>Conclusion</strong>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-10 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p>Many resumes are rejected by automated systems, known as Applicant Tracking Systems (ATS). Up to 75% of qualified job applicants are screened out by automated systems before a human ever sees their resume.</p>
                                    <p>But don't worry! With a few simple changes, you can ensure your resume passes through the ATS and lands directly on a recruiter's desk. In this guide, we'll share the secrets to creating an ATS-friendly resume that will immediately place you in that upper 25% and give you a significant edge in your job search.</p>
                                    <br />
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="one" className='scroll-mt-[140px] text-[#353e44] font-bold'>What is an ATS, and why is it so important?</strong>
                                    </h2>
                                    <p>An Applicant Tracking System (ATS) is a software tool used by recruiters to efficiently sift through countless resumes. It's like a digital gatekeeper, deciding which applications make it to the next round. Do you know that approximately 98% of Fortune 500 companies utilize ATS to streamline their recruitment processes, making it a common tool for businesses of all sizes?  While it might sound intimidating, understanding how ATS works can significantly boost your chances of landing your dream job.</p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="two" className='scroll-mt-[140px] text-[#353e44] font-bold'>How Does an ATS Work?</strong>
                                    </h2>
                                    <p>Think of an ATS as a high-tech keyword scanner. It scans your resume for specific keywords and phrases related to the job description. If your resume matches these keywords, it's more likely to pass the initial screening</p>
                                    <p>After the screening, recruiters and hiring managers can filter down to more specific data points. So, if the ATS can’t read a section of your resume, you might get filtered out, just for having the wrong format.</p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="three" className='scroll-mt-[140px] text-[#353e44] font-bold'>If Your Resume Isn't ATS Friendly, It May Never Be Seen!</strong>
                                    </h2>
                                    <p>Have you ever wondered why your perfectly crafted resume never lands you a job? The reason might be an often-overlooked factor: Applicant Tracking Systems (ATS).</p>

                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="four" className='scroll-mt-[140px] text-[#353e44] font-bold'>The Problem: ATS Can't Read Everything</strong>
                                    </h2>
                                    <p>While ATS have become indispensable tools for recruiters, they have limitations. They can't "read" your resume in the same way a human can. If your resume isn't formatted correctly or lacks the right keywords, it might be overlooked by the ATS, never making it to a recruiter's eyes.</p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="five" className='scroll-mt-[140px] text-[#353e44] font-bold'>Key Elements of an ATS-Friendly Resume</strong>
                                    </h2>
                                    <p>To ensure your resume makes it past the initial screening stage and into the hands of a human recruiter, it's crucial to understand the key elements of an ATS-friendly resume.</p>
                                    <h3 className='text-[30px] font-bold'>Keyword Optimization</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Identify Relevant Keywords:</strong>Use keywords directly from the job description to align your resume with the specific requirements.</li>
                                        <li><strong>Strategic Placement:</strong>Incorporate keywords naturally into your resume's header, summary, work experience, skills, and education sections.</li>
                                        <li><strong>Keyword Density:</strong>While keyword optimization is essential, avoid keyword stuffing. Focus on quality over quantity.</li>
                                    </ul>
                                    <h3 className='text-[30px] font-bold'>Formatting Guidelines</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Simple and Clean:</strong>Opt for a clean and minimalist design that's easy to read.</li>
                                        <li><strong>Standard Fonts:</strong>Use standard fonts like Arial or Times New Roman.</li>
                                        <li><strong>Clear Headings:</strong>Use clear headings for each section (e.g., Summary, Experience, Skills, Education).</li>
                                        <li><strong>Consistent Formatting:</strong>Maintain consistent formatting throughout your resume.</li>
                                        <li><strong>White Space:</strong>Use white space effectively to improve readability.</li>
                                    </ul>
                                    <h3 className='text-[30px] font-bold'>File Format and Layout</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Standard Formats:</strong>Stick to widely accepted formats like .doc, .docx, or .pdf.</li>
                                        <li><strong>Simple Layout:</strong> Avoid complex layouts, excessive formatting, or tables.</li>
                                        <li><strong>Bullet Points:</strong>Use bullet points to highlight key achievements and responsibilities.</li>
                                    </ul>
                                    <h3 className='text-[30px] font-bold'>Content and Structure</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Clear and Concise:</strong> Present information in a clear and concise manner.</li>
                                        <li><strong>Quantifiable Achievements:</strong>Use metrics and data to quantify your accomplishments.</li>
                                        <li><strong>Tailored to the Job:</strong>Customize your resume for each job application to highlight relevant skills and experiences.</li>
                                        <li><strong>Proofread Carefully:</strong>Ensure your resume is free of errors.</li>
                                    </ul>
                                    <h3 className='text-[30px] font-bold'>Common Pitfalls to Avoid</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Overcomplicating Your Resume:</strong>Keep your resume simple and easy to read.</li>
                                        <li><strong>Using Non-Standard Fonts:</strong>Stick to standard fonts to avoid potential issues.</li>
                                        <li><strong>Including Irrelevant Information:</strong>Focus on relevant skills and experiences.</li>
                                        <li><strong>Ignoring Keyword Optimization:</strong>Use keywords strategically to improve your visibility.</li>
                                        <li><strong>Poor Formatting:</strong>Maintain a clean and professional format.</li>
                                    </ul>
                                    <p>By following these guidelines, you can create an ATS-friendly resume that increases your chances of getting noticed by recruiters and landing your dream job.</p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="six" className='scroll-mt-[140px] text-[#353e44] font-bold'>Tools to Help Create ATS-Friendly Resumes</strong>
                                    </h2>
                                    <p>For a straightforward approach, Hiredeasy's AI Resume Builder offers a user-friendly platform to create ATS-optimized resumes. This tool leverages AI technology to analyze your experience and generate a professional, keyword-rich document.</p>
                                    <p>You input your details, we give you a completed, ATS-friendly resume.</p>
                                    <p className='font-bold'>The Power of Plain Text</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Visual Clarity:</strong>Converting your resume to a plain-text file allows you to visualize its structure and content without relying on formatting.</li>
                                        <li><strong>ATS Compatibility:</strong>ATS systems struggle to interpret complex formatting, so a plain-text format ensures your resume is easily scanned and understood.</li>
                                    </ul>
                                    <h3 className='font-bold'>Professional Review: Hiredeasy's Resume Review</h3>
                                    <ul>
                                        <li><strong>Expert Guidance:</strong>A professional resume reviewer can provide expert insights into your resume's strengths and weaknesses.</li>
                                        <li><strong>Error Identification:</strong>They can help identify and correct errors in content, grammar, and punctuation.</li>
                                        <li><strong>Keyword Optimization:</strong>A skilled reviewer can optimize your resume with industry-specific keywords and phrases.</li>
                                        <li><strong>Format and Structure:</strong>They can ensure your resume adheres to best practices for ATS compatibility, including clear headings, bullet points, and a consistent format.</li>
                                    </ul>
                                    <p>With the power of Hiredeasy's AI-powered resume builders or professional review, you can create a compelling resume that effectively navigates ATS systems and lands you more interviews.</p>

                                    <figure className="w-full max-w-[2662px] mx-auto text-center">
                                        <div>
                                            <img
                                                src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6787fbef6ff83f604c1eee8d_6787f9c945aa4e1b8df2fdb7_careerflow-resume-builder.webp"
                                                alt="Careerflow’s AI Resume Builder"
                                                loading="lazy"
                                                className="w-full h-auto"
                                            />
                                        </div>
                                        <figcaption className="mt-2 text-sm text-gray-600">
                                            Hiredeasy’s AI Resume Builder
                                        </figcaption>
                                    </figure>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="seven" className='scroll-mt-[140px] text-[#353e44] font-bold'>Conclusion</strong>
                                    </h2>
                                    <p>To increase your chances of landing a job interview, it's essential to create a resume that's not only visually appealing but also ATS-friendly. By converting your resume to a plain-text format and reviewing it for any formatting issues, you can ensure that your resume is easily readable by both humans and machines. </p>
                                    <p>Using professionally designed templates optimized for ATS like Hiredeasy's resume templates you can have a significant advantage. Incorporating strong action verbs and relevant keywords tailored to the job description further enhances your resume's visibility. Ultimately, a well-structured and concise resume that highlights your key qualifications and experiences is crucial to capture the attention of recruiters and successfully navigate the initial stages of the job application process.</p>
                                    <p>Ready to land your dream job? Get started on your perfect resume today! </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page