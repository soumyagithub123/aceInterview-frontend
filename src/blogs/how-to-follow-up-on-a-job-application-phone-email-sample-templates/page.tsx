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
                            <a href="/blog-categories/job-applications">Job Applications</a>
                        </div>
                    </div>
                </div>

                <div className='z-3 flex flex-col lg:flex-row items-stretch w-full max-w-[1272px] mx-auto relative px-4 lg:px-0'>
                    <div className='z-2 flex flex-col lg:flex-row justify-around items-start mt-6 w-full'>

                        <img
                            className='rounded-[10px] w-full lg:max-w-[45%] max-h-[500px] object-cover'
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20229.png"
                            alt=""
                        />

                        <div className='flex items-left text-left flex-col items-start lg:ml-24 mt-0 lg:mt-7 w-full px-2 sm:px-4'>
                            <div className='bg-[#0fbf95] text-[#ffffff] text-center px-[4px] py-[2px] rounded-[3px]'>Job Applications</div>
                            <h1 className='max-w-[85%] text-gray-800 mb-8 text-[30px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                                How to Follow Up on a Job Application (Phone & Email Sample Templates)
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
                                            <strong >Determining the Right Time to Follow Up</strong>
                                        </a>
                                        <a href="#2" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Tools You Can Use To Follow Up</strong>
                                        </a>
                                        <a href='#3' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Choosing the Appropriate Contact Method</strong>
                                        </a>
                                        <a href='#4' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong>Crafting a Concise Follow-Up Email</strong>
                                        </a>
                                        <a href='#5' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong>Follow-Up Dos and Don'ts</strong>
                                        </a>
                                        <a href='#6' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong>Sample Templates</strong>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-10 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p>Following up on a job application or interview holds the power to shift you from a “maybe” to a “yes” pile, eventually landing you the opportunity.  BUT, timing is of the essence - doing it too late or too early can sabotage your whole effort.</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>For a job application - the ideal time is about one week after submission if you applied through a personal connection and 2 weeks if you didn’t. </li>
                                        <li>For an interview - wait at least 48 hours before you reach out to the recruiter.</li>
                                    </ul>
                                    <p>The next important thing is - how professionally and politely you frame your message and what medium you choose (dm, email, or call) so that the hiring manager finds it refreshing and not annoying. Simply put, sending the right message at the right time is a great way to stay on your recruiter’s radar. </p>

                                    <div>
                                        <img className='rounded-[10px] max-w-[45%] max-h-[500px]' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/679d431e51936e7b212e2e7a_6367632b2529d139962ceac0_Blog%252038.1-a8mb6.jpeg" alt="" />
                                        <p className='max-w-[45%]'>Research shows that 51% of hiring professionals view follow-ups as a positive sign when hiring a candidate.</p>
                                    </div>
                                    <h2 className=' max-w-[80%] tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="1" className='scroll-mt-[140px] text-[#353e44] font-bold'>Determining the Right Time to Follow Up</strong>
                                    </h2>
                                    <p>
                                        Waiting to hear back on your application is hard - understandably so. But when you rush it, you risk your image in the recruiter’s eyes, appearing impatient. On the other hand, if you wait too long, you might lose your shot altogether.
                                    </p>
                                    <p>
                                        So, there are 2 ways to strike the perfect balance.
                                    </p>
                                    <p>First, stick to their time frame. If they mentioned getting back to you on a specific day, use that as your clue. For example, if they said, “You’ll hear from us by next Wednesday,” wait an extra 24 hours and then send a follow-up email by Thursday morning. </p>
                                    <p>Second, go by the 7-14-day rule. This is if you weren’t told when they’d respond. This timeframe is ideal because when you follow up any sooner than 7 days, you would probably be told, “We’re still in the interview process, and decisions haven’t been made yet. We’ll keep you updated.” And waiting longer than 2  weeks might mean your opportunity has slipped through the cracks, as they could’ve already finalized someone.</p>
                                    <p>However, timing is not just about weeks; it's also about what “day” of the week you choose. Tuesdays through Thursdays tend to be the sweet spot for reaching out. Mondays are hectic catch-up days, and Fridays risk your email getting lost in the shuffle as the work week wraps up.</p>
                                    <h2 className=' max-w-[90%] tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="2" className='scroll-mt-[140px] text-[#353e44] font-bold'>Tools You Can Use To Follow Up</strong>
                                    </h2>
                                    <p>There are a lot of tools that you can use to set follow-up reminders.</p>
                                    <p>When you are applying to multiple jobs and interviewing with several companies, keeping track of who has replied, and not, and who you need to follow up with can be challenging.</p>
                                    <p>Here are a few tools you can use to set your follow-up reminders:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><strong>Gmail “Send Later” feature</strong> - Compose an email over Gmail, click on the down arrow next to the send button, and choose Schedule Send. This will allow you to pick a date and time when you want to send the message.</li><li><strong>Google Calendar Reminders</strong> - You can also pick a date and time and schedule a reminder on Google Calendar. When you receive the notification, take a few minutes out of your schedule and send the email.</li><li><a href="https://sepia-servant-ea9.notion.site/Job-Applications-Dashboard-3de15201ed3340e9b8413bb38b52a101"><strong>FAANGPath’s Job Applications Dashboard</strong></a> - If you are tracking all your applications in one place using the Job Applications Dashboard, you can add the dates you’d like to follow up on your application/interview on the tracker.</li><li><strong>Microsoft Outlook Follow-Up Reminders</strong> - Microsoft Outlook is a great tool to manage your emails. It provides a feature to flag emails where you may need to follow up again if the information has not been received. Once you flag an email, you will see a red flag next to it, and it will also appear on your tasks page on the to-do list.</li><li><strong>Several to-do list apps</strong> - If you are someone who maintains to-do lists using applications like Google TasksBoard or Microsoft To-Do, you can add a task for the specific date and time to your list, and it will remind you to follow up.</li></ul>



                                    <h2 className=' max-w-[90%] tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="3" className='scroll-mt-[140px] text-[#353e44] font-bold'>Choosing the Appropriate Contact Method</strong>
                                    </h2>
                                    <p>The follow-up method you choose makes a big difference in how you’re perceived. The usual options are email, phone calls, and LinkedIn messages, and each has its pros and cons depending on the company and role.</p>
                                    <p></p><strong>Email is always a safe bet.</strong>It’s professional, non-intrusive, and lets the hiring manager respond on their own time. Plus, it’s easy to craft a clear and concise message. Just make sure to include your name, the position you applied for, and a brief reminder of your interest. Think something like <em>“Follow-Up: Application for Marketing Manager Role – [Your Name].</em>”
                                    <p>LinkedIn messages can also be effective, especially if the recruiter is active on the platform. A brief, polite message can remind them of your application.</p>
                                    <p><strong>Phone calls, on the other hand, are a trickier move. </strong></p>
                                    <p>One hiring manager shared, <strong>“At my last job, we could get 300 applications for a single job. We only looked at those applications that the computer told us to - 90% never even got a glance. Once HR vetted the applications, the hiring manager would only see the shortlist. So, when someone called to ask, ‘Did you get my resumaaay?’ it always invoked howls of laughter.”</strong></p>
                                    <p>Similarly, another one mentioned,<strong> “I don’t mind written follow-ups, in fact, at times, they bring my attention to something I missed in the first place, but I can’t handle calls. And if someone leaves a bad impression on a call, it’s probably over for their candidacy.”  </strong></p>
                                    <p>So, unless it’s a smaller company where the hiring process may be more personal or you already have some rapport with the recruiter, calls can come across as pushy. And even then, wait at least a week before calling, and don’t overdo it - limit yourself to one or two calls, max.</p>



                                    <h2 className=' max-w-[90%] tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="4" className='scroll-mt-[140px] text-[#353e44] font-bold'>Crafting a Concise Follow-Up Email</strong>
                                    </h2>
                                    <p>A follow-up email is your opportunity to remind the hiring manager of your candidacy while leaving a positive, professional impression. So it's important that you don’t only sound respectful, but you also reflect that practically by not wasting their time with small talk. </p>
                                    <br />
                                    <br />
                                    <p><strong>Start with a Clear Subject Line</strong></p>
                                    <p>‍It should quickly communicate the purpose of your email. So be very specific by including your name and the position you’re applying for. For example:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><em>“Follow-Up: Marketing Coordinator Application – [Your Name]”</em></li><li><em>“Checking in: [Your Name] for Software Engineer Role”</em></li></ul>
                                    <br />
                                    <br />
                                    <p><strong>Open with Professional Greetings</strong></p>
                                    <p>Unless you’re on a first-name basis with the recipient (you might have had in-person interactions before or know them by a reference), address them formally with their title and surname (e.g., <em>Ms. Adams</em>). If you’re unsure, err on the side of formality.</p>
                                    <br />
                                    <br />
                                    <p><strong>Show Enthusiasm and Specificity</strong></p>
                                    <p>Begin by thanking the hiring manager for the opportunity to interview and reference something specific from your conversation to show genuine interest. For instance:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><em>“Thank you again for taking the time to discuss the Marketing Coordinator position with me. I really enjoyed learning about the team’s innovative approach to content strategy.”</em></li></ul>
                                    <p><strong>Reiterate Your Interest</strong></p>
                                    <p>Highlight what excites you about the role and the company. Avoid generic statements like “I think this would be a great fit” and instead include specific points:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><em>“I’m particularly excited about how this role combines project management with creative strategy, two areas I’m deeply passionate about.”</em></li></ul>
                                    <p><strong>Keep It Brief and Respectful</strong></p>
                                    <p>Get to the point without unnecessary fluff and mention your purpose clearly:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><em>“I’m writing to kindly follow up on the status of my application for the Marketing Coordinator role.”</em></li></ul>
                                    <p><strong>Offer Supportive Action</strong></p>
                                    <p>Conclude by offering to provide any additional information they may need, which demonstrates proactivity:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><em>“Please don’t hesitate to reach out if there’s any additional information I can provide to assist in your decision-making process.”</em></li></ul>
                                    <p><strong>Close on a Positive Note</strong></p>
                                    <p>Wrap up with gratitude and a professional sign-off:</p>
                                    <ul className="list-disc pl-6 space-y-2"><li><em>“Thank you again for your time and consideration. I look forward to hearing from you. Best regards, [Your Name]”</em></li></ul>




                                    <h2 className=' max-w-[90%] tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="5" className='scroll-mt-[140px] text-[#353e44] font-bold'>Follow-Up Dos and Don'ts</strong>
                                    </h2>
                                    <p>Here are a few follow-up dos and don'ts to keep in mind when following up.</p>
                                    <h3 className='font-bold text-[30px]'>Do:</h3>
                                    <ul className="list-disc pl-6 space-y-2"><li><strong>Be polite and have a clear call to action.</strong> Let them know exactly what you’re seeking, whether it’s an update or clarification. Include any additional details that might assist their decision-making, but keep your tone courteous and respectful.</li><li><strong>Show genuine interest in the role and the company.</strong> Write with enthusiasm, ensuring your tone conveys how much this opportunity excites you. Make it clear this isn’t just one of many companies you’ve applied to - it’s somewhere you truly see yourself contributing.</li><li><strong>Exercise patience and persistence.</strong> Sometimes, hearing back can take longer than expected. If this is a company you’re truly passionate about, don’t let silence discourage you. A few well-timed reminders over several weeks might just secure you a thoughtful response, even if it’s not the one you were hoping for.</li></ul>
                                    <h3 className='font-bold text-[30px]'>Don't:</h3>
                                    <ul className="list-disc pl-6 space-y-2"><li><strong>Overwhelm with repeated reminders.</strong> Sending multiple follow-ups in quick succession can irritate busy hiring managers. Respect their workload and avoid being the candidate whose persistence becomes an annoyance.</li><li><strong>Frame follow-ups as ultimatums.</strong> Avoid statements like, “If I don’t hear from you soon, I’ll accept another offer.” While you can mention you’re actively interviewing elsewhere, never let it come across as a threat - it’s more likely to hurt your chances than help.</li><li><strong>Let your frustration show.</strong> Even after multiple attempts to connect, keep your messages professional and polite. Showing grace under pressure will leave a far better impression than any email tinged with impatience or annoyance.</li></ul>




                                    <h2 className=' max-w-[90%] tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="6" className='scroll-mt-[140px] text-[#353e44] font-bold'>Sample Templates</strong>
                                    </h2>
                                    <h3 className='font-bold text-[30px]'>Following Up After A Job Application: Email Template</h3>
                                    <p><em>‍Email Subject: Job Application - Follow Up -  Name Hi Name,</em></p>
                                    <br />

                                    <p><em>I hope you are doing well.</em></p>
                                    <p>I recently applied to the position title position at company name on application date. I wanted to check with you on the status of my application and the decision timeline.</p>
                                    <br />

                                    <p><em>I am excited at the prospect of working at company name and strongly believe that my previous experience working on describe your skills will equip me well to contribute to the company's goal of describe skills from job description.
                                    </em></p>
                                    <br />

                                    <p><em>Please let me know if I can provide any additional information to assess my application better. I look forward to hearing back positively.
                                    </em></p>
                                    <br />

                                    <p><em>Thanks and best regards,
                                    </em></p>
                                    <br />


                                    <h3 className='font-bold text-[30px]'>Following Up After A Job Application: Phone Call</h3>
                                    <p><em>Hello recruiter name. I am your name. I recently applied to the position of a role name at company name two weeks ago and wanted to follow up and find out about the status of my application. I strongly believe my skills from my previous experience would make me a strong addition to the team, and I look forward to discussing this role with you. It would be helpful if you could share the status of my application or your decision timeline with me. Please feel free to contact me on phone number or email address for any additional information you may require. Thanks for your time.
                                        Following Up After An Interview: Email TemplateEmail Subject: Interview Follow Up - Position Name Hi Name,
                                    </em></p>

                                    <br />
                                    <p><em>I recently interviewed with interviewer name on interview date for the position of a position name. I wanted to check on your decision for the interview and about the next steps of the hiring process. Could you please let me know?</em></p>
                                    <br />
                                    <p><em>I am excited to join company and contribute to its team name team.
                                    </em></p>
                                    <p><em>Please let me know if you require any additional information from my end to make a better decision.</em></p>
                                    <br />
                                    <br />
                                    <p><em>Thanks!</em></p>
                                    <p><em>Best Regards,
                                    </em></p>
                                    <p><em>Your Name</em></p>

                                    <h3 className='font-bold text-[30px]'>Following Up After An Interview: Phone Call</h3>
                                    <p><em>‍Hi recruiter name.I am your name . I recently interviewed with interviewer names for the position of role name at company name on date. I am calling to find out about the next steps in the process and any feedback you may have about my interview performance. I have had the chance to learn ABC about company name during the interview, and the information makes me even more confident that I'd be an excellent fit for this position. Please feel free to contact me on phone number or email addressfor any additional information you may require to make the decision. Thanks!  </em></p>
                                    <p>It is okay if you have already followed up with the company once but haven't heard back. Wait for a few more days, or follow up again after a week or two. You don't want to seem too pushy when following up, but also express your interest in the role during your follow-ups to stay on top of their mind.</p>
                                    <p>Following up can be tricky, but not following up at all could cost you a brilliant opportunity!</p>
                                    <br />
                                    <br />
                                    <p>For more job search tips, interview preparation guidance, and resume hacks, follow us on LinkedIn, Instagram, Twitter, YouTube, and Clubhouse. </p>
                                    <p>Also, join our 5000+ member community on our discord server and never miss any updates.</p>




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