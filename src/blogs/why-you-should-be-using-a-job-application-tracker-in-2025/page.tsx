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
                            <a href="">Job search</a>
                        </div>
                    </div>
                </div>

                <div className='z-3 flex flex-col lg:flex-row items-stretch w-full max-w-[1272px] mx-auto relative px-4 lg:px-0'>
                    <div className='z-2 flex flex-col lg:flex-row justify-around items-start mt-6 w-full'>

                        <img
                            className='rounded-[10px] w-full lg:max-w-[45%] max-h-[500px] object-cover'
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20231.jpeg"
                            alt=""
                        />

                        <div className='flex items-center text-center flex-col items-start lg:ml-24 mt-6 lg:mt-0 w-full px-2 sm:px-4'>
                            <div className='flex items-center mb-6'>
                                <a
                                    className='bg-pink-400 hover:bg-pink-300 text-white rounded-[3px] flex justify-center items-center h-[30px]'
                                    href=""
                                >
                                    <div className='px-4 py-1 text-sm'>Job search</div>
                                </a>
                            </div>

                            <h1 className='text-gray-800 mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                            Why You Should Be Using a Job Application Tracker in 2025
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
                                            <strong >Problem With Tracking Your Applications Manually</strong>
                                        </a>
                                        <a href="#two" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Job Tracker Apps Or Spreadsheets</strong>
                                        </a>
                                        <a href='#three' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Why Do They Make Such A Big Difference In Your Job Search</strong>
                                        </a>
                                        <a href='#four' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong>Other tools to simplify your job search</strong>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-28 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <article className="prose lg:prose-xl">
                                        <p>
                                            The 2025 job market is fiercely competitive. Employers often receive hundreds of applications for a single role, making it crucial for job seekers to stand out. The average applicant in the US submits a staggering 100-200 applications before landing their next position. That's a mountain of data to manage – job descriptions, company information, application dates, contact details, follow-up reminders, and more. Trying to juggle all this information manually, with spreadsheets or scattered notes, can quickly turn your job search into a full-time job in itself. It's overwhelming, and inefficient, and can lead to missed opportunities.
                                        </p>
                                        <br />
                                        <p>
                                            The solution? A dedicated job application tracker. Whether you opt for a purpose-built app like ours or a well-structured spreadsheet template, using a job tracker is no longer optional in 2025 – it's essential for leveling the playing field. In this blog, we'll explore why using a dedicated job application tracker is needed for landing your dream job in 2025. We'll delve into the key benefits of using a tracker, from staying organized and maximizing your efficiency to gaining valuable insights into your job search strategy. Get ready to transform your job hunt from a chaotic scramble to a strategic and successful campaign.
                                        </p>
                                        <br />
                                        <h2 id='one' className="scroll-mt-[140px] tracking-[-0.04em] mt-10 mb-6 text-[40px] font-bold leading-[48px]">Problem With Tracking Your Applications Manually</h2>
                                        <br />
                                        <p>
                                            The core challenge of managing a modern job search lies in the sheer volume of data involved. Even if you "only" submit 50 applications, that translates to 50 tailored cover letters, 50 versions of your resume, 50 application submission dates to remember, and 50 follow-up reminders to schedule.
                                        </p>
                                        <br />
                                        <p>
                                            Trying to keep track of all this information manually, whether through browser tabs, scattered notes, or even spreadsheets, is a Herculean task – and often an impossible one. It's not just time-consuming; it's a recipe for overwhelm and stress.
                                        </p>
                                        <br />
                                        <p>
                                            However, the real cost of manual tracking goes beyond personal frustration. It directly impacts how you present yourself to potential employers. Imagine forgetting to follow up on an application, arriving unprepared for an interview, or sending the wrong version of your resume. These seemingly small mistakes can create a negative impression and cost you valuable opportunities.
                                        </p>
                                        <br />
                                        <p>A job application tracker transforms this chaotic process into a strategic advantage. It empowers you to follow up at precisely the right moments, arrive at phone calls and interviews fully prepared with your research and notes at your fingertips, and ensure you're always presenting the most relevant version of your resume. With a tracker, you have a clear overview of every application's status, projecting an image of professionalism, organization, and genuine interest – qualities that recruiters and hiring managers highly value.</p>
                                        <br />
                                        <h2 id='two' className="scroll-mt-[140px] tracking-[-0.04em] mt-10 mb-6 text-[40px] font-bold leading-[48px]">Job Tracker Apps Or Spreadsheets</h2>
                                        <br />
                                        <p>
                                            When it comes to job application trackers, you have two main options: dedicated job tracker apps like Hiredeasy, and spreadsheet templates. Some job seekers move towards spreadsheets due to familiarity with programs like Excel or Google Sheets. These can be perfectly adequate for basic tracking, especially if you already have a polished resume, cover letter, and LinkedIn profile.
                                        </p>
                                        <br />
                                        <p>
                                            However, if you're serious about maximizing your chances in the competitive job market, a dedicated job tracker app offers a significantly more powerful and feature-rich solution. Apps like Hiredeasy are designed specifically to streamline and optimize the entire job search process. They often integrate with other tools and resources, providing a comprehensive ecosystem to support your job hunt. Hiredeasy, for example, is part of a complete toolkit designed to help you land your next job.
                                        </p>
                                        <br />
                                        <h2 id='three' className="scroll-mt-[140px] tracking-[-0.04em] mt-10 mb-6 text-[40px] font-bold leading-[48px]">Why Do They Make Such A Big Difference In Your Job Search</h2>
                                        <br />
                                        <p>
                                            The organization isn't just about neatness; it's about empowerment. When your job search is meticulously organized with a tracker, you gain a precious resource: time. This newfound efficiency allows you to focus on the crucial details that can make or break your application. You can dedicate time to practicing for interviews, honing your responses, and perfecting your presentation. These "extras," often neglected in a chaotic job search, can be the difference between a good interview and a great one.
                                        </p>
                                        <br />
                                        <p>
                                            A well-organized approach also significantly reduces the stress associated with job hunting. Knowing where you stand with each application, having your notes readily available, and feeling in control of the process boosts your confidence. Since interviews often hinge as much on your personality and presence as your skills, this organized, rehearsed, and confident demeanor can provide the edge you need to land the job.
                                        </p>
                                        <br />
                                        <h2 id='four' className="scroll-mt-[140px] tracking-[-0.04em] mt-10 mb-6 text-[40px] font-bold leading-[48px]">Other tools to simplify your job search</h2>
                                        <br />
                                        <p>
                                            If you've previously navigated the job search the old-fashioned way, you'll be amazed by the array of tools available today. Many of these, like Hiredeasy, are even free. Our toolkit, for example, offers a range of resources to streamline your job hunt which comes as part of the premium offering, including:
                                        </p>
                                        <br />
                                        <ul className='mt-6 mb-6 pl-6' role="list">
                                            <li className='pt-1.5 pb-1.5 list-disc'><strong>AI Resume Builder:</strong> Create a professional, ATS-friendly resume in minutes. You can create your first resume for FREE!!</li>
                                            <li className='pt-1.5 pb-1.5 list-disc'><strong>Resume Templates: </strong>Design your own resume with our professionally designed templates.</li>
                                            <li className='pt-1.5 pb-1.5 list-disc'><strong>AI Cover Letter Writer:</strong> Generate tailored cover letters for each application.</li>
                                            <li className='pt-1.5 pb-1.5 list-disc'><strong>Job Application Tracker: </strong>Stay organized and in control of your applications using our job application tracker for completely FREE!!</li>
                                            <li className='pt-1.5 pb-1.5 list-disc'><strong>Job LinkedIn Optimizer: </strong>Polish your LinkedIn profile for FREE to attract recruiters.</li>
                                        </ul>
                                        <br />
                                        <p>And that's just the beginning. Explore our Premium Toolkit to discover the full suite of resources designed to help you conquer your job search and achieve your career goals.</p>

                                    </article>
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