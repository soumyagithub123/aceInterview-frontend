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
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20154.png"
                            alt=""
                        />

                        <div className='flex items-left text-left flex-col items-start lg:ml-24 mt-0 lg:mt-7 w-full px-2 sm:px-4'>
                        <div className='bg-[#f3a8d4] text-[#ffffff] text-center px-[4px] py-[2px] rounded-[3px]'>Job search</div>
                            <h1 className='max-w-[90%] text-gray-800 mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                                How To Find a Job During a Recession: Ultimate Guide 2023
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
                                            What is a Recession and How Does it Affect the Job Market?
                                        </a>
                                        <a href="#2" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            Answer These 3 Questions Before You Start Looking for a Job During a Recession.
                                        </a>
                                        <a href='#3' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            How To Find a Job During a Recession?
                                        </a>
                                        <a href='#4' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            3 Things to Keep in Mind While Looking for a Job During a Recession
                                        </a>
                                        <a href='#5' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            Conclusion
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-10 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p>Job hunting is always challenging. But it gets even more challenging during a recession. Without a proper plan and guidance, you may struggle for months to grab a job opportunity in this challenging job market. In order to survive the recession, you need to prepare and strategize well. This guide will equip you with all the necessary information, tips, and tools you need to succeed in your job search during a recession. It covers the following topics:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>What is a recession and how does it affect the job market?&nbsp;</li><li>Answer 3 key questions before you start looking for a job during a recession.</li><li>How to find a job during a recession?</li><li>3 things to keep in mind while looking for a job during a recession.</li><li>Conclusion</li></ul>


                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="1" className='scroll-mt-[140px] text-[#353e44] font-bold'>What is a Recession and How Does it Affect the Job Market?</strong>
                                    </h2>
                                    <p>A recession is a slowdown in economic growth 📉 and is generally identified by a decline in GDP for two consecutive quarters. A recession is usually accompanied by a rise in unemployment. And global economic downturn forces companies to cut costs, which leads to widespread layoffs and hiring freezes. Companies sack employees as a way to compensate for these losses.</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63948eef969ae263a7f2c953_elon%20musk%20on%20recession.avif" alt="" />
                                        <p>Elon Musk's view on recession.</p>
                                    </div>
                                    <p>Meta, Amazon, Twitter, Snapchat, Salesforce, Stripe, Lyft, Shopify, Oracle, Spotify, Walmart, and Coinbase are among the tech giants that laid off employees in 2022. Also, various reports claim that more companies are planning large-scale layoffs in the coming months. And most of these companies will continue a hiring freeze for at least the first quarter of next year.</p>
                                    <p>However, the recession is not the only reason for mass layoffs. For example, the layoffs at Twitter were a step toward the company's restructuring after Elon Musk bought it. And many startups have sacked employees to become profitable. Similarly, at some companies layoffs occurred as a result of over-hiring in the past few months. So we can’t put all the blame on the recession but, no doubt, it is the reason for the majority of layoffs. </p>
                                    <p>Now the big question is- With so many companies in the process of mass layoffs, how do you find a job?</p>
                                    <p>Unfortunately, there are no quick hacks but a proper action plan and strategy can actually make the process 10x easier for you.</p>


                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="2" className='scroll-mt-[140px] text-[#353e44] font-bold'>Answer These 3 Questions Before You Start Looking for a Job During a Recession.</strong>
                                    </h2>
                                    <p>With recessions making headlines in news articles, social media full of layoff stories, videos talking about hiring freezes, and everyone around you discussing the probability of losing a job, it’s easy to assume that there are no openings in the market and it’s impossible to land a job during this time. </p>
                                    <p>Here are some questions 👇 that might be crossing your mind these days:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Are there jobs available on the market when almost all tech giants are laying off employees?</li><li>Do companies hire during a recession?</li><li>How to find a job during a recession?</li></ul>
                                    <p>Actually, there is a way by which you can realistically analyze the market situation and find answers to all these questions.</p>

                                    <h3 className='font-bold text-[30px]'>1. Are All Departments and Job Roles Affected by Recessions?</h3>
                                    <p>According to TechCrunch’s data, sales and customer roles are most affected by the recession. Also, recruiters across the tech industry are majorly affected by layoffs because there are hiring freezes in companies so they won’t be needing recruiters to hire new candidates. </p>
                                    <p>If we specifically consider the case of Amazon, job cuts were mostly focused on the devices division and the human resources department. And most of the affected employees were part of the Alexa and Luna teams. </p>
                                    <p>You can clearly see that some roles and departments are suffering more than others. But there are still openings in these companies. Even companies like Microsoft and Salesforce, which have laid off employees in the past, are still hiring for specific roles and departments on their LinkedIn pages.</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63948fa7de2f38f87623d7bb_Image-3.3.avif" alt="" />
                                        <p>Job openings on Salesforce's LinkedIn page.</p>
                                    </div>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63948fba6201a3733794c192_Image-3.4.avif" alt="" />
                                        <p>Job openings on Microsoft's LinkedIn page.</p>
                                    </div>

                                    <h3 className='font-bold text-[30px]'>2. Are All Companies Suffering During a Recession? </h3>
                                    <p>Though it’s true that tech giants like Meta, Amazon, and Coinbase are affected, that doesn’t imply no one is hiring. MAANG companies are not the only employers on the job market! Several other companies are still hiring during the recession. </p>
                                    <p>The concept of a "dream company" is often romanticized, but in such a scenario, chasing only one or two specific companies won't help. You can actually find companies that are still hiring or will hire in the near future by following these tips 👇</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Visit and check out <a href="https://www.ycombinator.com/companies">Y-combinator</a> and <a href="https://angel.co/">Wellfound</a> (formerly AngelList) to find out about startups that recently got funded. Because these startups will most likely expand in the near future.&nbsp;</li><li>Search for companies and startups that have made a significant profit in the last quarter. The most viable option during the recession is to apply for jobs at these profit-making companies.&nbsp;</li><li>Check out the list of companies that are <a href="https://www.careerflow.ai/still-hiring" target="_blank">still hiring during the recession</a> curated by Hiredeasy. It contains open job roles at different companies and the contact details of hiring managers or recruiters.</li></ul>

                                    <h3 className='font-bold text-[30px]'>3. Are All Industries Suffering During a Recession?</h3>
                                    <p>No doubt the recession has affected the tech industry badly but are all industries suffering during a recession? </p>
                                    <p>Of course, NO!</p>
                                    <p>All recessions are accompanied by recession-proof industries.</p>
                                    <p>Nikita Gupta, a technical recruiter at Uber, advises job seekers 👇:</p>
                                    <p>“Focus on industries that are hiring instead of focusing on industries that are not actively recruiting. For example, the biomedical and consulting industry is hiring in bulk even in this dramatic economic and geopolitical downturn. To apply for openings there.”</p>
                                    <p>Even during the recession, the following industries are expected to grow:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Education</li><li>Healthcare and pharmaceutical</li><li>Finance services</li><li>Communication and digital services</li><li>Consulting firms</li></ul>
                                    <p>Now that you are aware there is still a high probability that you can land a job even during a recession, let's find out what exactly you need to do.</p>



                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="3" className='scroll-mt-[140px] text-[#353e44] font-bold'>How To Find a Job During a Recession?</strong>
                                    </h2>

                                    <h3 className='font-bold text-[30px]'>Update Your Resume </h3>
                                    <p>How often do you hear people say, "you are more than your resume"?</p>
                                    <p>And that's certainly true! </p>
                                    <p>However, for recruiters and hiring managers it's the only factor that determines whether to shortlist you for the next round of interviews or not.</p>
                                    <p>You can’t take the risk of sending an out-of-date resume. Especially when due to layoffs so many talented individuals are back in the market searching for a job, it’s crucial for you to invest time in updating your resume.</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63949088c3846f39e629b7ea_Image%203.5.avif" alt="" />
                                        <p>Update your resume</p>
                                    </div>
                                    <p>Here are a few tips that will help you update your resume:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Take a look at the recent resume templates available on the market and then prepare your resume.</li><p>For example, try Careerflow’s resume template which has been created by top mentors from MAANG+ companies to help candidates prepare their resumes in a clean, easy-to-read, and machine-compatible format.</p></ul>
                                    <ul className="list-disc pl-6 space-y-2"><li>Create an ATS-compliant resume by adding relevant keywords, and standard titles and avoiding spelling mistakes and grammatical errors.</li><li>Customize your resume for every job role you are applying for. </li></ul>
                                    
                                    <h3 className='font-bold text-[30px]'>Find the Best Opportunities on LinkedIn</h3>
                                    <p>Do you know? </p>
                                    <p>Every minute 3 people get hired on LinkedIn and 95% of recruiters use LinkedIn to find candidates for their companies. Also, LinkedIn has helped 122 million candidates get an interview opportunity. </p>
                                    <p>So even now when the situation doesn’t seem favorable to job seekers, there are plenty of opportunities available on LinkedIn that can be your savior. </p>
                                    <p>Remember that no matter how challenging the situation gets, there are always companies eyeing the most qualified candidates.</p>
                                    <p>In the end, you just need one offer, just one.</p>
                                    <p>Here are a few hacks 👇 that will help you leverage LinkedIn as a job seeker</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Update your LinkedIn profile with Careerflow’s completely FREE <a href="https://www.careerflow.ai/linkedin-review" target="_blank"><strong>LinkedIn Optimization Chrome Extension</strong></a>. This tool gives you the best practices for each section of your LinkedIn Profile based on industry experts’ LinkedIn Profiles and boosts your search visibility by 2.5x.&nbsp;</li><li>Reach out to hiring managers on LinkedIn and inquire about job openings in their companies. Similarly, you can reach out to employees of your target companies and ask for referrals.</li><li>Create a post and share with your network that you need a job. You can only get help if you ask for it.</li><li>Attend live audio events. <a href="https://www.linkedin.com/in/guptanikita16/">Nikita Gupta</a>, co-founder of Hiredeasy recently co-hosted an audio event with <a href="https://www.linkedin.com/in/rpandey1234/">Rahul Pandey</a>, co-founder of Taro, talking about “How to deal with layoffs” on LinkedIn. Attend such events to get insider information and to be aware of market situations.</li><li>Make use of LinkedIn's search filters to find job postings seeking your target roles.</li></ul>
                                    <blockquote><strong>Bonus Tip 🔈:</strong> Get in touch with your alumni network on LinkedIn. People from your university must be working in different industries or companies, so it will be easier to find job opportunities.</blockquote>

                                    <h3 className='font-bold text-[30px]'>Don’t ignore Twitter– It can be your savior</h3>
                                    <p>LinkedIn seems to be the best choice when it comes to job search. </p>
                                    <p>And indeed it is! But Twitter has its own benefits 😄.</p>
                                    <div className='max-w-[65%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/6394911fbada47e19e4872af_Image%203.6.avif" alt="" />
                                        <p>Use Twitter to find job opportunities.</p>
                                    </div>
                                    <p>There are enough people on Twitter who are supporting their professional community by giving referrals, resume reviews, LinkedIn makeovers, and even mock interviews. </p>
                                    <p>Here are a few hacks 👇 that will help you leverage LinkedIn as a job seeker:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>On Twitter, many people share job openings in their companies by tweeting or commenting on others' tweets. Just DM them for inquiries and referrals.</li><li>Leveraging Twitter Spaces can provide you with plenty of opportunities to learn, network, and even find your dream job.</li><li>Follow hashtags related to job searches.</li></ul>

                                    <h3 className='font-bold text-[30px]'>Consider Freelancing as an Option</h3>
                                    <p>Try freelancing in your industry until you get a full-time job offer. Devote 3-4 hours to your freelance projects and spend your remaining time looking for a good job. This way you don’t have to compromise on pay and work culture in the rush. Also, this will give you enough time to land a better offer. </p>
                                    <p>And you don't really need a ton of social media followers to get good clients. There are plenty of other ways 👇</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Simply reach out to people via DM or mail who have posted on LinkedIn or Twitter that they need services.</li><li>Connect with people who are already well-established in freelancing in your industry. Ask them if they want to outsource some work to you.</li><li>Create a profile on freelancing platforms like <a href="https://www.fiverr.com/?source=top_nav">Fiverr</a>, <a href="https://www.upwork.com/">Upwork</a>, and <a href="https://www.freelancer.com/">Freelancer</a>.</li></ul>

                                    <h3 className='font-bold text-[30px]'>Upskill Yourself</h3>
                                    <p>You might have been planning to get a degree for a long time. Therefore, use this as an opportunity to get a degree and launch yourself into a different industry. Think of it as an opportunity to pursue your dream of higher study.</p>
                                    <p>If you don't have any plans on studying further, look for courses and certifications relevant to your target roles on Udmey, Coursera, and Skillshare.</p>
                                    <p><strong>Bonus Tip 🔈:</strong> If you have been wanting to volunteer at a certain organization for a long time but cannot because of time constraints. Do it now!</p>

                                    <h3 className='font-bold text-[30px]'>Seek Career Guidance and Mentorship </h3>
                                    <p>Everybody needs a mentor at some point in their career. And when the situation is so uncertain, it is important that you have someone you can discuss your career insecurities and challenges with. Don’t force yourself to deal with everything alone. If you feel like you are stuck and need the extra push to get started — seeking mentorship can be the most effective option. </p>
                                    <p>Here are a few ways you can get mentorship:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Find industry experts on <a href="https://www.linkedin.com/feed/">LinkedIn</a>, <a href="https://twitter.com/home">Twitter</a>, or <a href="https://discord.com/">Discord</a>. And directly reach out to them.</li><li>Get mentorship from the most qualified industry mentors through <a href="https://www.careerflow.ai/">Careerflow.</a>‍</li><li>It is possible to find a mentor on websites like <a href="https://topmate.io/">Topmate.io</a>.</li></ul>

                                    <h3 className='font-bold text-[30px]'>Tell the World You Are Looking for a Job</h3>
                                    <p>If you are on Twitter, simply tweet that you are looking for a job in these target roles. You can also tag recruiters or industry experts in your network to increase the reach of your tweet. </p>
                                    <p>If you are actively using LinkedIn, make a post sharing your skills, experience, and contact details. Don’t forget to attach your resume. Especially with LinkedIn, you have an “Open to work” option to tell recruiters you are looking for a job. So use that. </p>
                                    <p>But to take full advantage of LinkedIn, you need to make sure that you have an optimized LinkedIn profile. </p>
                                    <p>Wondering how you can optimize your profile? </p>
                                    <p>No, you don’t have to read 100s of blogs and watch 10s of videos on “How to optimize your LinkedIn Profile”. Try Careerflow’s easy-to-use, time-saving LinkedIn Profile Review Tool to improve your LinkedIn profile.</p>
                                    <blockquote><strong>Bonus Tip 🔈: </strong>You can simply start your post or tweet by saying “Looking for a job” or “Open to work opportunities”. So your community can easily identify your purpose for posting. </blockquote>



                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="4" className='scroll-mt-[140px] text-[#353e44] font-bold'>3 Things to Keep in Mind While Looking for a Job During a Recession</strong>
                                    </h2>

                                    <h3 className='font-bold text-[30px]'>1. Stop Over-consuming Negative News </h3>
                                    <p>Every news channel, news article, and YouTube video is endlessly talking about the recession, companies slashing their workforces, hiring freezes, and layoffs. While it is imperative to be informed of the current situation, regular over-consumption of such content will lead to anxiety or depression. Stop over-consuming negative news because what you focus on gets bigger and bigger. So be sure to focus on something worthwhile.</p>

                                    <h3 className='font-bold text-[30px]'>2. Don't Lose Patience</h3>
                                    <p>According to the U.S. Bureau of Labor Statistics, American job seekers took 20.2 weeks on average to find jobs in September 2022. And now when layoffs are happening everywhere, companies are cost-cutting, and startups are restructuring, it’s more critical than ever to be patient during this process. There is always a chance that you may end up getting a job within 1-2 months of job hunting but you have to plan things such that you don’t get too exhausted if things don’t turn out the way you expected.</p>

                                    <h3 className='font-bold text-[30px]'>3. Believe that Change is Only a Constant</h3>
                                    <p>Remember those days when COVID was at its peak and we used to wonder if the epidemic would ever get over? But things changed and the pandemic ended. </p>
                                    <p>Similarly, the recession today might seem endless, but gradually things will get back to normal. Eventually, the tech industry will get back on track and hiring will start all over again. But in the meantime, keep upskilling yourself and putting effort in the right direction.</p>



                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="5" className='scroll-mt-[140px] text-[#353e44] font-bold'>Conclusion</strong>
                                    </h2>
                                    <p>Be prepared for the unexpected while hoping for the best. Job search in 2022 is certainly difficult but not impossible. Remember: </p>
                                    <p>Not all departments are sacking employees!</p>
                                    <p>Hiring freezes are not implemented by all companies!</p>
                                    <p>Not all industries struggle during a recession!</p>
                                    <p>A smart strategy can actually help you land a job even during a recession.</p>
                                    <ul className="list-disc pl-6 space-y-2"><li>Update your resume before applying for jobs. Also, customize it according to the roles you are applying for.</li><li>Use social media platforms like LinkedIn and Twitter to fast-track your job hunting.</li><li>Explore freelance opportunities, courses, and certifications in your field.</li><li>Ask for help from your professional community. </li></ul>
                                    <p>All the best!</p>
                                    <p><em>“What makes a difference between candidates who succeed and those who don’t is successful people don't give up in days of struggle and frustration. Instead, they keep trying until they reach their goal.” </em></p>
                                    <p>~Shubham Jain, Co-founder, Hiredeasy</p>



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