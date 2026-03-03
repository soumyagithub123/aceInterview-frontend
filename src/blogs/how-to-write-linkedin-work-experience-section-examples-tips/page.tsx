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
                            <a href="/blog-categories/job-applications">Job search</a>
                        </div>
                    </div>
                </div>

                <div className='z-3 flex flex-col lg:flex-row items-stretch w-full max-w-[1272px] mx-auto relative px-4 lg:px-0'>
                    <div className='z-2 flex flex-col lg:flex-row justify-around items-start mt-6 w-full'>

                        <img
                            className='rounded-[10px] w-full lg:max-w-[45%] max-h-[500px] object-cover'
                            src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/65d260d829f6f9c10f2b82e0_linkedin%20experience%20section.avif"
                            alt=""
                        />

                        <div className='flex items-left text-left flex-col items-start lg:ml-24 mt-0 lg:mt-7 w-full px-2 sm:px-4'>
                        <div className='bg-[#f3a8d4] text-[#ffffff] text-center px-[4px] py-[2px] rounded-[3px]'>Job search</div>
                            <h1 className='max-w-[90%] text-gray-800 mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                                How To Write LinkedIn Work Experience Section (Examples & Tips)
                            </h1>

                            <div className="flex items-left">
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
                                        <a href="#1" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            What is the experience section on LinkedIn?
                                        </a>
                                        <a href="#2" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            Why do you need to craft the experience section carefully?
                                        </a>
                                        <a href='#3' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            Few things you should take care of while crafting your profile's experience section
                                        </a>
                                        <a href='#4' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            What are the different parts of the experience section?
                                        </a>
                                        <a href='#5' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            How to write a description of the experience section on your LinkedIn Profile?
                                        </a>
                                        <a href='#6' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            How to add new positions and edit or delete old jobs in the experience section?
                                        </a>
                                        <a href='#7' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            Expert-led examples
                                        </a>
                                        <a href='#8' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            Frequently Asked Questions
                                        </a>
                                        <a href='#9' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            Conclusion
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-10 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p><em>"Success is when who you are is lined up with what you do. A very effective way to bring your unique success story to life is through your LinkedIn Profile.”</em>~LinkedIn</p>
                                    <p>Whether you are a new graduate looking for your first job in the industry, professional thinking of a career switch, or a mother restarting a career after a break, an optimized LinkedIn Profile can take you places. This guide covers everything you need to know to update your LinkedIn Profile's experience section 👇</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>What is the experience section on LinkedIn?</li><li>Why do you need to craft the experience section carefully?</li><li>Few things you should take care of while crafting your profile's experience section.</li><li>Take inspiration from others' LinkedIn Profiles.</li><li>What are the different parts of the experience section?</li><li>How to curate an experience section that will help you stand out?</li><li>How to add new positions and edit or delete old jobs in the experience section? </li><li>Expert-led examples.</li></ul>
                                    <h3 className='font-bold text-[30px]'>Here we go!</h3>
                                    <p>But wait…!</p>
                                    <p>Before you start learning how to prepare the most effective experience section for your LinkedIn Profile, let me tell you that Careerflow’s LinkedIn Optimization tool can make job hunting easier. Also, check out Hiredeasy's free hiring search tool if you're having trouble finding hiring managers and recruiters at top tech companies and startups.</p>
                                    <p>Let’s get started.</p>

                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63839f2515bbb6a7308eedb8_linkedin%20scroll.avif" alt="" />
                                    </div>

                                    <h2 id='1' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>What is the experience section on LinkedIn?</strong>
                                    </h2>
                                    <p>The “Experience” section of your LinkedIn Profile allows you to share your previous and current roles, positions of responsibilities, and details of your past work experience with your professional network. You can list your internships, contract positions, freelancing experience, and part-time jobs in this section. In short, it is part of your profile that gives a glimpse of your professional journey to your LinkedIn community.</p>
                                    <p>Wondering then what's the difference between a resume and a LinkedIn Profile?</p>
                                    <p>LinkedIn says: "While a resume is traditionally a straightforward listing of your experiences, a LinkedIn Profile gives you room to elaborate."</p>


                                    <h2 id='2' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Why do you need to craft the experience section carefully?</strong>
                                    </h2>
                                    <p>Nikita Gupta, a technical recruiter at Uber, hires talent for her company on LinkedIn.</p>
                                    <p>She said: "While searching candidates on LinkedIn, the parts of LinkedIn Profiles that I pay most attention to are the Headline, the About section, and, of course, the Experience section."</p>
                                    <p>It's not just Nikita who looks at your experience section when checking your LinkedIn Profile-- there are many others as well.</p>
                                    <p>Here are some reasons why you should have a well-crafted LinkedIn section on your profile.</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>A well-crafted experience section will increase the probability of hiring managers and recruiters reaching out to you. And secondly, if you reach out to someone in your network, this will greatly increase the possibility of you hearing back.</li><li>Adding work experience to the profile leads to <strong>8 times</strong> more profile views, <strong>5 times </strong>more connection requests, and <strong>10 times</strong> more messages.</li><li>Members who include at least one position receive up to 3.5 times as many profile views.</li></ol>



                                    <h2 id='3' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Few things you should take care of while crafting your profile's experience section</strong>
                                    </h2>
                                    <h3 className='font-bold text-[30px]'>1. Always write descriptions in the first-person narrative</h3>
                                    <p><em>“Your career story is more authentic when it’s told by you."</em>- LinkedIn</p>
                                    <p>Always write in the first person and follow a conversational writing style. While writing about your current role, use the present tense, and for all previous roles use the past tense.</p>


                                    <h3 className='font-bold text-[30px]'>2. Experiment. Analyze. Adapt</h3>
                                    <p>You can’t expect to get everything right in one go. LinkedIn is a professional platform that keeps evolving as per the demands of its users. It is likely that after reading this guide, you will want to try something that wasn't mentioned here. So, if you have enough time, you should definitely try it. We encourage experimentation. See what works and what doesn't for you.</p>

                                    <h3 className='font-bold text-[30px]'>3. Add relevant keywords and make your experience section search friendly</h3>
                                    <p>Many hiring managers and recruiters use “LinkedIn Recruiter”, the hiring platform of LinkedIn to find candidates thus they have access to many filters and targeted search options. They often narrow down their search results by skills, positions, titles, and locations.</p>
                                    <p>So, read the job descriptions of the roles you are listing, pick some keywords from the description and add these to your experience section. In your LinkedIn Profile, for example, if you are listing the Software Engineer position, list keywords used by recruiters in job descriptions for the Software Engineer role in your experience section.</p>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Bonus Tip 🔉: Use job search websites like Indeed, Glassdoor, AngelList, and LinkedIn jobs to find what keywords hiring managers and recruiters are using.</h6>


                                    <h3 className='font-bold text-[30px]'>4. Take inspiration from others' LinkedIn Profiles</h3>
                                    <p>Crafting an experience section all on your own can be a bit overwhelming. But remember you are not alone in this. Your professional network is the ultimate amplifier, so ask them for help. However, keep in mind that you may reach out to 10 people and only 3 will respond and ultimately, only 1 will agree to help you. But it's fine because you only need one to guide you.</p>
                                    <p>But if you are looking for an easier way to update your LinkedIn Profile, Hiredeasy has got you covered. This tool gives you the best practices for each section of your LinkedIn Profile based on industry experts’ LinkedIn Profiles. Install a completely FREE LinkedIn Optimization Chrome Extension to boost your search visibility by 2.5x.</p>
                                    <p>The key to crafting an impressive experience section is sound research. Follow these steps:</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>Check out the profiles of key leaders, experts, and influencers in your industry. </li><li>Take a peek at the profiles of your colleagues, classmates, and friends. </li><li>Ask your professional community the right questions.</li></ol>
                                    <p>According to LinkedIn's "Rock Your LinkedIn Profile" course, you should ask your network the following questions:</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>What words describe my work?</li><li>After you have had a conversation with me, what are the top three words you would use to describe the experience I created for you? </li><li>What can you count on me for? </li></ol>


                                    <h2 id='4' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>What are the different parts of the experience section?</strong>
                                    </h2>
                                    <p>While adding any new job role to your LinkedIn experience section, you need to fill in the following details:</p>
                                    <p><strong>Title-</strong>This is your official title or position at work.</p>
                                    <p>For example, Software Engineer, Content Writer, Frontend Developer, Freelancer, Gym Trainer, Financial Manager, etc.</p>
                                    <p>*This is a mandatory field.</p>
                                    <p><strong>Employment type- </strong>Though it is an optional field, adding an employment type is highly recommended because it represents your professional experience more accurately. LinkedIn provides country-specific employment types. However, some common types are contract, self-employed, part-time, full-time, internship, apprenticeship, and freelance. To learn more about each of these employment types check LinkedIn’s official guide.</p>
                                    <p><strong>Company name -</strong>This is the name of the organization you worked with or are currently working for. For example, Uber, Google, Apple, etc. While adding a company name, LinkedIn gives the option to tag the LinkedIn page of that company. If you do so, LinkedIn will tag your work experience to the company and the company's logo will appear alongside that job. Also, you will show up as an employee on the company's official page.</p>
                                    <p>*This is a mandatory field.</p>
                                    <p><strong>Location-</strong>This is your work location for that particular position. We have already discussed that recruiters filter candidates by location. Thus, if an employer sees that you have previous work experience in a certain geographical area, you may get preference over other candidates.</p>
                                    <p><strong>Description - </strong>In a nutshell, it is an overview of your work. You can use this section to describe your role and responsibilities, achievements, and the tech stack of your job.</p>
                                    <p><strong>Skills -</strong>LinkedIn recommends listing your top 5 skills for every position. Skills that you add to each experience also appear under the Skills section of your profile. Add skills to every job position because they appear just below the job description.</p>
                                    <p><strong>Media-</strong>LinkedIn gives you the option to add external documents, photos, sites, videos, and presentations to the experience section.</p>
                                    <p>So many people ask-- how do you curate an experience section that will help me stand out?</p>
                                    <p>The secret is that there is no secret.</p>
                                    <p>But a few small things can have a big impact. Adding photos, videos, presentations, and documents related to your work in the experience section can help you stand out in a crowd of 875 million LinkedIn users.</p>
                                    <p>The media plays a huge role. Use photos, videos, website links, and presentations. One of the easiest ways to differentiate yourself from the crowd is by using rich media.</p>

                                    <h2 id='5' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>How to write a description of the experience section on your LinkedIn Profile?</strong>
                                    </h2>
                                    <p>This is a field where you can describe your work in 2000 characters. A powerful job description can make all the difference. Here are a few tips 👇that will help you write a compelling experience section</p>
                                    <h3 className='font-bold text-[30px]'>1. Spend your words wisely</h3>
                                    <p>Every sentence you write costs the reader a few seconds. So make sure you use words wisely and don’t add any information that is not worth the reader’s time.</p>
                                    <p>Remember - the shorter the better.</p>
                                    <p>You can follow these tips to make the description more scannable for readers:</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>To maintain consistency, use a structured format and follow the same layout while listing every experience.</li><li>Add subheadings “Responsibilities”, “Achievements”, “Tech-stack”, “Tools” etc in your description.</li><li>Use bullet points, don’t write lengthy paragraphs. </li><li>Don’t use fancy vocabulary. The purpose is to communicate your work to the masses. The simpler it is, the more people will understand it. </li><li>Keep it clear and concise. Don’t overuse bullets while listing responsibilities and achievements. </li></ol>
                                    <p>Example:</p>

                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a0819f78ed851be2314c_description%20experience%20section.avif" alt="" />
                                        <p>Image Source: Koulick Sadhu</p>
                                    </div>
                                    <p>Bonus Tip 🔉: You can also try using Google’s X by Y by Z formula– "Accomplished [X] as measured by [Y], by doing [Z]."</p>


                                    <h3 className='font-bold text-[30px]'>2. Use some action verbs</h3>
                                    <p>You can use action verbs like implemented, managed, directed, conducted, organized, reduced, saved, added, delegated, produced, launched, enhanced, refined, upgraded, trained, and built while describing your work.</p>

                                    <h3 className='font-bold text-[30px]'>3. Talk about your employer</h3>
                                    <p>You can begin your description by describing the company you work for and providing an overview of your job in 1-2 lines. This hack is especially useful if your company is lesser-known.  You can also talk about the team or the organizational unit you were part of.</p>

                                    <h3 className='font-bold text-[30px]'>4. Describe your responsibilities</h3>
                                    <p>Discuss the product or service you worked on. 3-4 bullet points will do justice to this part. For example:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>If you are an engineer, which product did you work on, and which feature you updated or launched?</li><li>If you are a manager, which team do you manage?</li><li>If you are a tester, what tool do you use?</li></ul>
                                    <p>Examples:</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a64c8111f579cfe2c920_upal.avif" alt="" />
                                        <p>Image source: Rajendra Uppal</p>
                                    </div>
                                    <h3 className='font-bold text-[30px]'>5. Highlight your key accomplishments</h3>
                                    <p>Do you know what is one of the most famous marketing tactics?</p>
                                    <p>Capitalizing on the highest-quality results.</p>
                                    <p>Yes, you got it! That's exactly what you need to do while marketing yourself to potential employers.</p>
                                    <p>Forefront your key accomplishments!</p>
                                    <p>Ask yourself questions like 👇:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>What features did I contribute to the launch?</li><li>How fast did I achieve your targets? </li><li>If I increased sales, traffic, conversions, safety, customer satisfaction, and retention?</li><li>If I reduced website loading time and reduced costs?</li><li>Did I receive any awards and titles during my work tenure with the company? </li></ul>
                                    <p>Examples:</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a3020b97f64eabd83a6c_accomplishments.avif" alt="" />
                                    </div>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a310428da0863e247b90_adobe.avif" alt="" />
                                    </div>


                                    <h3 className='font-bold text-[30px]'>6. Talk in numbers</h3>
                                    <p>When listing roles and responsibilities or achievements, use numbers and percentages. Quantify your job experiences with data (For example– Reduced website loading time by x percentage and improved user engagement time from X to Y).</p>
                                    <p>Bonus Tip 🔉: While listing responsibilities and achievements use Google’s X by Y by Z formula– "Accomplished [X] as measured by [Y], by doing [Z]."</p>
                                    <p>Examples:</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a1179f6b477f2e048d64_amazon%20nikita.avif" alt="" />
                                        <p>Image source: Nikita Gupta</p>
                                    </div>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a35b5f097f83c15fa72b_workspan.avif" alt="" />
                                        <p>Image source: Rajendra Uppal</p>
                                    </div>



                                    <h2 id='6' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>How to add new positions and edit or delete old jobs in the experience section?</strong>
                                    </h2>
                                    <p>If you have no work position listed in your profile, follow these simple steps to add the “Experience” section:</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>Open your LinkedIn Profile.</li><li>Find and click the “Add profile section” option below your headline.</li><li>Select the “Add position” option from the dropdown.</li><li>Fill in all the necessary information and click "Save".</li></ol>
                                    <p></p>
                                    <ol className="list-disc pl-6 space-y-2"><li>Scroll down to the “Experience” section of your profile.</li><li>Click on the “➕” icon and select the "Add position" option to list a new position.</li><li>Enter information into the given fields and click “save”.</li></ol>
                                    <p></p>
                                    <ol className="list-disc pl-6 space-y-2"><li>Scroll down to the “Experience” section of your profile.</li><li>Click on the “➕” icon and select the "Add career break" option to list a career break.</li><li>Enter information into the given fields and click “save”.</li></ol>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a3a38895b74958b60a2f_career%20gap.avif" alt="" />
                                    </div>
                                    <p>To edit or delete old jobs in the experience section, follow these simple steps:</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>Scroll down to the “Experience” section of your profile.</li><li>Click on the pencil icon to edit or delete any position.</li><li>Then click the pencil icon next to the position you want to edit or delete. &nbsp;</li><li><strong>To edit-</strong> Edit information into the given fields and click “save”.</li><li><strong>To delete- </strong>Find and click the “Delete experience” option and then click “Delete”.</li></ol>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Bonus Tip🔉 : In case you get stuck, use Careerflow’s LinkedIn Review tool which has an “Edit now” button that will completely ease your job.</h6>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a3f55f097f5c245fadfc_linkedin%20review.avif" alt="" />
                                        <p>Edit Your Linked Profile Seamlessly</p>
                                    </div>


                                    <h2 id='7' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Expert-led examples</strong>
                                    </h2>
                                    <h3 className='font-bold text-[30px]'>Example 1- For the software development engineer role</h3>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a4421a643132d6727b99_example%201.aviff" alt="" />
                                        <p>Image source: Nidhi Sharma</p>
                                    </div>
                                    <h4 className='font-bold text-[28px]'>✅ Our favorite things:</h4>
                                    <ul className="list-disc pl-6 space-y-2"><li>Talks about the team and gives an overview of the tool. </li><li>A short description followed by bullet points describing roles and responsibilities. </li><li>Tools and frameworks are explicitly mentioned. </li></ul>
                                    <h3 className='font-bold text-[30px]'>Example 2- For college students</h3>
                                    <p>During college, many students teach juniors or run coding clubs. You can also list these in your experience section. You don’t have to include too many bullet points. You can simply explain your work in 1-3 lines.</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a46d502a3e121990567f_example%202.avif" alt="" />
                                        <p>Image source: Aanshul Sadaria</p>
                                    </div>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a48a8895b781ceb61f63_example%203.avif" alt="" />
                                        <p>Image source: Nidhi Sharma</p>
                                    </div>

                                    <h4 className='font-bold text-[28px]'>✅ Our favorite things:</h4>
                                    <ul className="list-disc pl-6 space-y-2"><li>Crisp, clear, and straight to the point.</li><li>Stats are mentioned.</li></ul>
                                    <h3 className='font-bold text-[30px]'>Example 3- For strategy consulting intern role</h3>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a4bbee70734ca177814f_example%204.avif" alt="" />
                                        <p>Image source: Hemali Mashru</p>
                                    </div>

                                    <h4 className='font-bold text-[28px]'>✅ Our favorite things:</h4>
                                    <ul className="list-disc pl-6 space-y-2"><li>Starts the description by introducing the employer.</li><li>Used many action keywords throughout like “Conducted”, “Worked”, and “Led”.</li><li>Bullet points are short and clear.</li></ul>
                                    <h3 className='font-bold text-[30px]'>Example 4- For software engineer role</h3>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6383a5069f6b47360e04e48c_example%205.avif" alt="" />
                                        <p>Image source: Paras Saini</p>
                                    </div>
                                    <h4 className='font-bold text-[28px]'>✅ Our favorite things:</h4>
                                    <ul className="list-disc pl-6 space-y-2"><li>The tech stack is separately mentioned.</li><li>alks about the team he was part of.</li><li>Explains the feature he worked on.</li></ul>


                                    <h2 id='8' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Frequently Asked Questions</strong>
                                    </h2>
                                    <p>Answers to frequently asked questions 👇.</p>
                                    <h3 className='font-bold text-[30px]'>1. Should I add a career break to the experience section?</h3>
                                    <p>If you have taken a career break, don't be afraid to mention it. It helps recruiters understand breaks you've taken outside of regular employment. In fact, LinkedIn says “Experiences outside a linear career path can make people better colleagues, thought partners, and leaders.”</p>

                                    <h3 className='font-bold text-[30px]'>2. If I work somewhere for only 2-3 months, do I have to include it in my job experience?</h3>
                                    <p>You might have explored many different roles throughout your career, but you don’t need to add each of them to your profile. Be selective. In fact, we would encourage you to only add roles and jobs that are related to your target job role. This will help your potential employer assess what value you will bring to their organization.</p>
                                    <p>If you are still unsure what to add or what to leave. Ask yourself one self-question– “What do I want to achieve with my profile?”</p>
                                    <p>And most likely you will find your answer.</p>

                                    <h3 className='font-bold text-[30px]'>3. I do have access to all information, yet I am unable to revamp my LinkedIn Profile. What should I do?</h3>
                                    <p>Download Hiredeasy's FREE LinkedIn Optimization Chrome extension! In this tool, under each section of your LinkedIn Profile, you will find expert-backed suggestions, a tried-and-true checklist, and an easy-to-follow guide on how to optimize your LinkedIn Profile. If you need any further assistance, check out our LinkedIn Makeover service.</p>

                                    <h3 className='font-bold text-[30px]'>4. How do I list my freelancing experience on my LinkedIn Profile?</h3>
                                    <p>Add it as you would any other experience section to your LinkedIn Profile keeping the following points in mind.</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>In the "Title" field add the role you are freelancing in. For example, if you are providing web development services add "Web developer" to this field.</li><li>Choose "freelance" as the employment type.</li><li>If you are freelancing for a particular company, mention its name in the "Company name" field. If you will be working with multiple clients skip this field.</li></ol>


                                    <h2 id='9' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Conclusion</strong>
                                    </h2>
                                    <p>It's obvious that your online presence matters to recruiters and hiring managers. And in order to find suitable candidates for their companies, they review hundreds of profiles every day. This is why you need to optimize every section of your profile in order to unlock the true potential of your LinkedIn Profile.</p>
                                    <p>And hence this guide equips you with a thorough understanding of the experience section of your LinkedIn Profile. Listing a position in the experience section isn't limited to adding a job title, company name, and employment dates. There are many more aspects involved in the process.</p>
                                    <p>So here are some key points of this guide 👇</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>Check out others' profiles to get inspiration from a variety of sources. </li><li>Write 1-2 lines about your company followed by 3-4 bullet points under “Responsibilities” and "key achievements".</li><li>Include bite-sized yet insightful points in the description.</li><li>If needed use additional subheadings such as Tech-stack, tools, achievements, roles, responsibilities, etc.</li><li>Focus on experiences relevant to your target job roles.</li></ol>
                                    <p>All the best 👍!</p>



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