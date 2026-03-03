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
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20159.png"
                            alt=""
                        />

                        <div className='flex items-left text-left flex-col items-start lg:ml-24 mt-0 lg:mt-7 w-full px-2 sm:px-4'>
                        <div className='bg-[#f3a8d4] text-[#ffffff] text-center px-[4px] py-[2px] rounded-[3px]'>Job search</div>
                            <h1 className='max-w-[90%] text-gray-800 mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                                How to Optimize Your LinkedIn Profile for 40X More Opportunities
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
                                        <a href="1" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            Before we begin!
                                        </a>
                                        <a href="#2" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            What does it mean to “optimize” my LinkedIn profile?
                                        </a>
                                        <a href="#3" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            Why should I bother optimizing my LinkedIn profile?
                                        </a>
                                        <a href='#4' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            How do I optimize my profile?
                                        </a>
                                        <a href='#5' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            How to optimize my profile using Careerflow’s LinkedIn Optimization tool?
                                        </a>
                                        <a href='#6' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            Conclusion
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-10 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p>Have you ever wondered why some people are always getting opportunities on LinkedIn whereas others are not? Why do some people claim that recruiters are in their inbox every day, whereas others can barely get a response from even one?</p>
                                    <p>Part of the answer lies in simply having an Optimized LinkedIn profile. In this article, we’ll cover what it first means to have an optimized LinkedIn profile, how to optimize, and share about a free tool that can help you optimize your profile 10X faster and reliably..</p>



                                    <h2 id='1' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Before we begin!</strong>
                                    </h2>
                                    <p>If you don't have time to read through the entire article but still want to give your LinkedIn profile a boost, download the LinkedIn Optimization Tool directly and get started with optimization today and land up ot 40X more opportunities!</p>
                                    <p><em>Note: Only desktop Chromium-based browsers such as Chrome, Edge, Brave, Arc, Opera are currently supported.</em></p>



                                    <h2 id='2' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>What does it mean to “optimize” my LinkedIn profile?</strong>
                                    </h2>
                                    <p>LinkedIn optimization refers to the process of making your LinkedIn profile more visible to recruiters and increasing your chances of being found and receiving opportunities on the platform. This can be done by including relevant keywords in your profile, having a professional profile picture and customized background image, writing a compelling headline and summary, showcasing your skills and achievements, including multimedia, and actively engaging with others on the platform through updates and group membership. By optimizing your LinkedIn profile, you can increase your visibility and attractiveness to recruiters and improve your chances of being considered for job opportunities.</p>
                                    <p>LinkedIn has a completely separate view of the platform for recruiters known as LinkedIn Recruiter. Optimization is not only improving your own profile in a silo but also putting yourself in the shoes of your target reader (eg. a recruiter, hiring manager, etc) and thinking, “What would a recruiter want to see”, as well as, “how do I make my profile stand out in search results”.</p>
                                    <p>The process of LinkedIn Optimization can be easily compared to and can be understood much better by taking a look at the concept of Search Engine Optimization (SEO). While we won’t go over it in detail, you can always read more on it in your spare time.</p>



                                    <h2 id='3' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Why should I bother optimizing my LinkedIn profile?</strong>
                                    </h2>
                                    <p>Here are the top 3 reasons you should optimize your LinkedIn profile.</p>

                                    <h3 className='font-bold text-[30px]'>1. To boost your search visibility to recruiters</h3>
                                    <p>Optimizing your LinkedIn profile can increase your visibility to recruiters, as over 90% of recruiters use the platform to search for talent. By including relevant keywords in your profile and actively engaging with others on the platform, you can increase your chances of being found when recruiters search for candidates with specific skills and experience. Recruiters not only use keyword searches but also have filters for things like whether you’re open to work, likely to respond, have connections with their existing employees, etc.</p>
                                    <p>By optimizing your profile you are significantly increasing your chances of being seen by a recruiter. Think of it as “SEO” but for your professional profile!</p>

                                    <h3 className='font-bold text-[30px]'>2. To build your network faster and more efficiently</h3>
                                    <p>LinkedIn is a great platform for building and expanding your professional network. By regularly posting updates and engaging with others on the platform, you can connect with other professionals in your industry and build relationships that can lead to new opportunities. Optimizing your LinkedIn profile can help you reach a larger and more targeted audience, increasing your chances of making valuable connections.</p>
                                    <p>Imagine that you have an optimized profile and you send a connection request to someone in your industry. They take a look at your profile and can see how you’re immediately relevant to them, so they accept your request and you are now connected!</p>
                                    <p>On the other hand, if you didn’t have an optimized profile, they might have been left confused as to why you reached out to them, or may have simply ignored your request due to your profile not seeming to be professionally built.</p>

                                    <h3 className='font-bold text-[30px]'>3. To put your best foot forward and make an impression</h3>
                                    <p>LinkedIn is your digital resume, and it’s important to be able to showcase ourselves in the best way possible on the platform. By showcasing all your experiences, skills, education, and more, you’re making sure that a prospective visitor to your profile has all the necessary information they need.</p>



                                    <h2 id='4' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>How do I optimize my profile??</strong>
                                    </h2>
                                    <h3 className='font-bold text-[30px]'>1. Trial-and-error</h3>
                                    <p>To begin with, one simple way is through trial and error of utilizing the many different permutations and combinations of toggles, switches, and features on LinkedIn. While this may work, in practice, it is a painstakingly long and cumbersome process. Given that there’s been a lot of research and understanding of the best practices, we do not recommend this approach.</p>

                                    <h3 className='font-bold text-[30px]'>2. Read blogs, watch videos, and do your own research</h3>
                                    <p>This is essentially how most people have been optimizing their profile until today. However, one of the biggest challenges with this approach is knowing which blog to read, which video to watch, which LinkedIn influencer to follow and trust, etc. The other challenge here is a lack of consistency. While there may be a great blog on one topic such as how to write your linkedIn summary, there may not be equally good posts or videos on other topics you’re looking for. While this method generally leads to good results, your mileage may very, and we would recommend you go with option 3 instead.</p>
                                    
                                    <h3 className='font-bold text-[30px]'>3. Using a LinkedIn Optimization tool</h3>
                                    <p>That’s right! Why spend hours on trial-and-error and scouring through hundreds of resources when you can simply install a tool that can tell you exactly what to optimize, how to optimize, and give you tips, best practices, and more – all in one place?</p>
                                    <p>While there are a couple of tools available, we highly recommend you try out Careerflow’s LinkedIn Optimization tool, which is a completely free browser extension that checks your LinkedIn profile for the best practices and gives you tips, insights, and personalized checklists based on your profile.</p>

                                    <h3 className='font-bold text-[30px]'>4. Paying a Career Coach</h3>
                                    <p>While this option is most likely the “easiest” option, since someone else will do the work for you, (A) it’s likely going to be expensive, and (B) you will miss out on the learnings in the process. While this works for some people, it’s not an option available to everyone.</p>
                                    <p>If you can not go for this option, then going for an Optimization tool is your best bet, as it’s like having a Career coach always available to you. If you can go for a coach, then definitely recommend your coach to use an optimization tool to supplement their coaching and make sure you’re getting the best of both worlds!</p>



                                    <h2 id='5' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>How to optimize my profile using Careerflow’s LinkedIn Optimization tool?</strong>
                                    </h2>
                                    <p>In this next section, we’ll go over how to use Careerflow’s LinkedIn Optimazation tool to update your profile.</p>
                                    <h3 className='font-bold text-[30px]'>1. Installation and getting started</h3>
                                    <p>Simply navigate to the download link and click “Add to Chrome”. Once done, your LinkedIn Profile should automatically open up, and you’ll see a small icon floating on the right side of your screen. In fact, on the first load, you should also see a popup showing you how many issues were found in your profile! It’s hard to miss.</p>
                                    <p>Tap on the Hiredeasy icon to open up the optimization panel. You can think of this as a “magic sidebar” for your Linkedin profile. After you complete the authentication step, you will be guided through a list of onboarding screens to help you familiarize with the application. Once done, you’re now ready to optimize!</p>

                                    <h3 className='font-bold text-[30px]'>2. Understanding the profile score</h3>
                                    <p>As soon as you finish onboarding, you’ll see a score on your profile. Let’s take a moment to understand how this score works.</p>
                                    <p>Essentially, for every section of your profile the tool gives you a checklist which is segregated into two categories</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Must have improvements (marked in red): These are improvements which we deem as essential to having a successfully optimized LinkedIn Profile</li><li>Nice-to-have improvements (marked in yellow): These are improvements which are not <em>essential, </em>but essentially good to have improvements to your profile</li></ul>
                                    <p>The suggestions are divided into either category based on how important they are for improving your profile’s searchability, ranking, and more!</p>
                                    <p>Now, because the suggestions are dynamic and ever-expanding as we add more and more checks, we can’t share any exact numbers, but here’s how the score is broken down:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>70% of the weightage is for “must have improvements”</li><li>30% of the weightage is for “nice to have improvements”</li></ul>
                                    <p>So if you only do all the must-haves, you’ll have a score of 70%. If you conversely did only the nice-to-haves, your score would be at 30%.</p>

                                    <h3 className='font-bold text-[30px]'>3. Interactive Walkthrough</h3>
                                    <p>Now, you should see a “start optimization” button on the left of your profile score. By clicking this button, you’ll be shifted into Interactive Walkthrough mode. This is where you’ll get a top-to-bottom walkthrough of each section of the profile. You can get a good understanding of what each section of the profile is about, and also get a quick checklist and tips for each section. This mode is easy-going and does not overwhelm you at all with any additional text and information. At the end of the interactive walkthrough, you'll have a neat surprise (We won’t tell you what it is!)</p>

                                    <h3 className='font-bold text-[30px]'>4. Reading Mode</h3>
                                    <p>Coming back to the main page of your LinkedIn Optimization tool, you’ll also notice a list of section names below a set of colored tabs. Each color in this tab represents the status of that particular section.</p>
                                    <p>For example, if you see the section “Experience” with the green checkmark next to it, it means that all of the suggestions for the Experience section have been taken care of. Similarly, a “red” icon would have meant that there is a ‘must-have’ improvement pending in the Experience section. Finally, if you see a “yellow” icon then, needless to say, you would expect a “nice-to-have” improvement pending for that section.</p>
                                    <p>If both a must-have and nice-to-have improvement are pending, then you would see a red icon, indicating that at least one of the items is a must-have improvement.</p>
                                    <p>Now that you’ve understood the meaning of each colored icon, let’s click into one of the sections. For continuity, let’s use the Experience section as an example here as well.</p>
                                    <p>From top to bottom you should see the following,</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><strong>Introduction of the section</strong></li><li><strong>Recommendations</strong></li></ul>
                                    <p>This section gives you specific recommendations and also explains to you why you should make certain changes. It’s really good at providing you the context that is often missing and is completely data-driven with insights and statistics</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><strong>Personalized Checklist</strong></li></ul>
                                    <p>The checklist is personally tailored to you and lets you know which best practices you’ve followed and which are pending.</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><strong>More Informationt</strong></li></ul>
                                    <p>Finally, this is the last heading in each section. Any additional context we have on the section such as tips, tricks, additional links to tools / blog posts, etc are all found here.</p>
                                    <p>You can also navigate between sections easily in this view, and also directly click on “Edit Now” to quickly modify the sections of your profile and it will open the respective UI for editing that section directly.</p>
                                    <p>With this, you’ll be able to quickly, easily, and free-of-charge optimize your LinkedIn profile using Careerflow’s LinkedIn Optimization tool.</p>



                                    <h2 id='6' className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Conclusion</strong>
                                    </h2>
                                    <p>Put simply, optimizing your LinkedIn profile is a must in today’s world in order to shine through and be seen by your target audience (recruiters, hiring managers, etc).</p>
                                    <p>Summarizing our guide here,</p>
                                    <ol className="list-disc pl-6 space-y-2"><li>LinkedIn Optimization is a must and we went through what it is, why it’s important, and how to optimize your profile</li><li>We discussed the various options for profile optimization all the way from trial-and-error to using optimization tools and even career coaches.</li><li>Finally, we walked through the whole flow of <a href="https://www.careerflow.ai/" target="_blank"><strong>HiredEasy</strong></a><strong>’</strong>s LinkedIn Optimization tool and how it works</li></ol>
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