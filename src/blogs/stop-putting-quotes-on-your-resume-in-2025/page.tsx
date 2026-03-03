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
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20114.png"
                            alt=""
                        />

                        <div className='flex items-center text-center flex-col items-start lg:ml-24 mt-6 lg:mt-0 w-full px-2 sm:px-4'>
                            <div className='flex items-center mb-6'>
                                <a
                                    className='bg-[#4d869c] text-white rounded-[3px] flex justify-center items-center h-[30px]'
                                    href=""
                                >
                                    <div className='px-4 py-1 text-sm'>Resumes</div>
                                </a>
                            </div>

                            <h1 className='text-gray-800 mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                                Stop Putting Quotes on Your Resume in 2025
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
                                        <a href="#what-is-ats" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong >Why You Need To Stop Using Quotes On Your Resume</strong>
                                        </a>
                                        <a className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' href="#how-does-an-ats-work">
                                            <strong>How to build an effective resume that gets more eyes on your application instead</strong>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-28 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p>In the evolving landscape of professional presentation, certain once-common practices have become outdated, even bad. One such trend, the inclusion of quotes within a resume, is rapidly losing its relevance and should be decisively abandoned by 2025. While it may have once served as a means to inject personality or highlight educational influences, this practice now feels antiquated and out of place in contemporary recruitment.</p>
                                    <p>Much like the personal profiles of early social media platforms, it evokes a sense of bygone eras rather than a professional sense. This blog will delve into the specific reasons why embedding quotes in your resume no longer serves its intended purpose and why it's crucial to adopt more effective strategies for showcasing your qualifications.</p>
                                    <p></p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="what-is-ats" className='scroll-mt-[140px] text-[#353e44] font-bold'>Why You Need To Stop Using Quotes On Your Resume</strong>
                                    </h2>
                                    <br />
                                    <h3 className='tracking-[-0.04em] mt-0 mb-6 text-[30px] font-bold leading-[40px]'>
                                        <strong className='text-[#353e44] font-bold'>Your Resume Needs To Get Through Automated Filters To Be Seen</strong>
                                    </h3>
                                    <br />
                                    <p>
                                        In today's competitive job market, your resume's primary function is to navigate the increasingly sophisticated landscape of Applicant Tracking Systems (ATS). A significant portion of your applications will be initially screened by these automated systems, which meticulously analyze your resume against predefined criteria. If your document fails to meet these standards, it is immediately discarded, preventing any human review. This rigorous filtering process underscores the critical need for a resume optimized for ATS compatibility.
                                    </p>
                                    <p>
                                        Even for resumes that successfully bypass the initial screening, ATS platforms assign a relevance score, effectively ranking candidates based on their perceived fit for the role. This scoring mechanism highlights the importance of maximizing every element of your resume to align with the job description. In this context, including inspirational quotes from figures like Einstein or Steven Covey is not only irrelevant but also counterproductive. These quotes consume valuable space that could be used to incorporate keywords, quantifiable achievements, and directly relevant skills, all of which contribute to a higher ATS score.
                                    </p>
                                    <p>While possessing an <a href="">ATS-friendly resume</a> was once considered a competitive edge, it has now become a fundamental requirement. Failure to adhere to these standards places your application at a major disadvantage, effectively relegating it to the digital discard pile. In essence, eliminating extraneous elements like quotes is not merely a stylistic choice but a strategic necessity for navigating the modern recruitment landscape.</p>
                                    <br />
                                    <h3 className='tracking-[-0.04em] mt-0 mb-6 text-[30px] font-bold leading-[40px]'>
                                        <strong className='text-[#353e44] font-bold'>Inspirational Quotes Will Not Be Received Well</strong>
                                    </h3>
                                    <p>
                                        Beyond the technical considerations of ATS optimization, the inclusion of inspirational quotes on a resume creates a negative impression on human reviewers. In an era where such quotes have been relentlessly overused, particularly in early social media, they have become associated with superficiality and even irony.
                                    </p>
                                    <p>
                                        This saturation has effectively transformed them into memes, a status wholly incompatible with the professional gravitas you aim to project in a job application. Presenting yourself with a cliché quote is more likely to provoke a dismissive reaction, such as an eye-roll or head-shake than to secure you a place on the shortlist.
                                    </p>
                                    <br />
                                    <h3 className='tracking-[-0.04em] mt-0 mb-6 text-[30px] font-bold leading-[40px]'>
                                        <strong className='text-[#353e44] font-bold'>They Add Zero Value To Your Resume</strong>
                                    </h3>
                                    <p>
                                        Furthermore, these quotes contribute absolutely nothing of value to your application. They lack topical relevance, offer no unique insight, and fail to authentically convey your personality, as they can be easily copied and pasted from online sources.
                                    </p>
                                    <p>
                                        Ultimately, they provide no genuine reason for a recruiter to pay closer attention to your qualifications. At best, the quote will be ignored, a wasted opportunity. At worst, it will be the decisive factor that lowers your ATS score, preventing your resume from reaching human eyes altogether.
                                    </p>
                                    <br />
                                    <h2 className='tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id='how-does-an-ats-work' className='scroll-mt-[140px] text-[#353e44] font-bold'>How to build an effective resume that gets more eyes on your application instead</strong>
                                    </h2>
                                    <br />
                                    <p>In the modern recruitment landscape, dominated by digital platforms and Applicant Tracking Systems (ATS), simply submitting a resume is no longer sufficient. To truly stand out and secure interviews, you must proactively leverage tools and strategies that align with the demands of these systems. The key to success lies in empowering yourself with the same level of technological sophistication used by recruiters.</p>
                                    <ul className='mt-6 mb-6 pl-6' role="list">
                                        <li className='pt-1.5 pb-1.5 list-disc'><strong>Understand the Digital Landscape:</strong>Recognize that recruiters rely on digital platforms and ATS to filter candidates. Acknowledge that your resume must appease these systems to secure interviews.</li>
                                        <li className='pt-1.5 pb-1.5 list-disc'><strong>Leverage AI-Powered Tools:</strong>Utilize tools like <a href=""> Hiredeasy's AI resume builder </a>to automate the creation of ATS-friendly resumes. Our tools are designed to meet the requirements of modern ATS algorithms. Upload existing resumes for optimization scores and targeted improvements.</li>
                                        <li className='pt-1.5 pb-1.5 list-disc'><strong>Prioritize Optimization:</strong> While keyword optimization is essential, avoid keyword stuffing. Focus on quality over quantity.</li>
                                        <li className='pt-1.5 pb-1.5 list-disc'><strong>Seek Professional Review: </strong>Engage professional services like <a href="">Hiredeasy's resume review</a>  services for detailed analysis and tailored advice. Expert reviewers compare your resume to specific job ads, providing actionable feedback. This will highlight areas of improvement.</li>
                                        <li className='pt-1.5 pb-1.5 list-disc'><strong>Strategic Enhancement:</strong>Transform your resume into a powerful tool for navigating the digital job market. Proactively leverage resources to align with the demands of modern recruitment. Increase your visibility to recruiters.</li>
                                    </ul>
                                    <p></p>

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