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
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20146.png"
                            alt=""
                        />

                        <div className='flex items-left text-left flex-col items-start lg:ml-24 mt-0 lg:mt-7 w-full px-2 sm:px-4'>
                        <div className='bg-[#f3a8d4 text-[#ffffff] text-center px-[4px] py-[2px] rounded-[3px]'>Job search</div>
                            <h1 className='max-w-[90%] text-gray-800 mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                            How To Decline A Job Offer Politely (With Sample Email Template)
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
                                            <strong >Reasons To Reject A Job Offer 👇🏼</strong>
                                        </a>
                                        <a href="#2" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Tips To Keep In Mind When Declining A Job Offer 📝</strong>
                                        </a>
                                        <a href='#3' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Sample Email Template To Decline A Job Offer Politely 📧</strong>
                                        </a>
                                       
                                        <a href='#4' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong>Conclusion</strong>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-10 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p>The job search can be a challenging process. If you are a job seeker, you might want to start your journey by getting a resume review for your job applications. Getting to the offer stage for any company is hard as is, but if you’ve practiced and showcased yourself well in interviews, you might receive an offer, or even multiple of them. But just because you received those offers does not mean you have to accept them, right? 🤔</p>
                                    <p>Declining a job offer can be a tricky task. You want to do so without burning bridges and keeping your options open if at all you decide to join them in the future. Declining a job offer is a serious decision, and you should do so only after you've given much thought to it.</p>

                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="1" className='scroll-mt-[140px] text-[#353e44] font-bold'>Reasons To Reject A Job Offer 👇🏼</strong>
                                    </h2>
                                    <p>The fact that you've received an offer from a company indicates you've spent hours interviewing with them and weeks preparing for it. However, this shouldn't be the deciding factor for whether or not to accept a job offer.</p>
                                    <p>It may seem tempting to accept an offer just because you've received it, but not every opportunity that comes your way needs to be taken. Consider the following aspects when you receive a job offer to decide whether you should accept or decline it.</p>

                                    <h3 className='font-bold text-[30px]'>1. Compensation</h3>
                                    <p>Compensation is undeniably a deciding factor before accepting an offer. Regardless of how great a job might be, it may be the wrong choice if it doesn't help you pay your bills.</p>
                                    <p>If the offer extended to you does not match your compensation expectations, the ideal thing to do would be to negotiate the offer for a higher salary. If it still does not check the figure you're looking for, you can consider interviewing for more companies and getting more offers that match your expected compensation, in which case, you can choose to decline the rest.</p>
                                    <blockquote><strong>Read:</strong> <a href="https://www.careerflow.ai/blog/how-to-negotiate-salary" target="_blank"><strong>Salary Negotiation 101: How To Negotiate Your Job Offer</strong></a></blockquote>

                                    <h3 className='font-bold text-[30px]'>2. Benefits</h3>
                                    <p>Most offers consist of a combination of total compensation and benefits. Even if your total compensation fulfills your needs, having benefits in the offer makes it a more secure one.</p>
                                    <p>Every job seeker has a checklist they want to complete with the job offer they accept. This could mean everyone would have a different set of benefits they're looking for. While medical and financial benefits might be a priority for some, working remotely or having unlimited PTO might be something you'd want to prioritize in your offer.</p>
                                    <p>Depending on your needs, check if the offer provides these benefits. Just like your total compensation, you can also negotiate benefits if the company is ready to do so. If not, declining the offer for another one that ticks off the boxes from your checklist would be the right thing to do.</p>

                                    <h3 className='font-bold text-[30px]'>3. Limited Growth</h3>
                                    <p>It isn't uncommon for some companies to not have a clear path as to where a role would lead you. Considering how a job would help your career is just as important as ensuring the compensation package matches your expectations.</p>
                                    <p>Close to 40% candidates reject job offers that do not demonstrate a clear development plan. If you think the job will not help you advance in your career or does not provide you with enough growth opportunities to get promoted in the long run, you may want to pass.</p>

                                    <h3 className='font-bold text-[30px]'>4. Misaligned Job Expectations</h3>
                                    <p>Unclear responsibilities are a huge red flag. A company may be hiring you as a Data Analyst but may expect you to carry out the responsibilities of a Data Analyst, Data Engineer, and Machine Learning Engineer - this job is not for you.</p>
                                    <p>Not having a clear job description would mean you may end up being overworked or doing tasks that may not align with your expectations from the job. An ideal way to clarify this would be to check with your hiring manager about your duties and responsibilities and interact with employees at the company who already work in the role about their experience.</p>
                                    <p>Signing an offer without understanding its requirements could lead you to tasks or duties you may be under/overqualified to carry out, which could hurt your career in the long run.</p>

                                    <h3 className='font-bold text-[30px]'>5. Work Culture</h3>
                                    <p>No amount of higher salaries, benefits, or promotions can compete with the good work culture. If the company you're joining has a bad reputation in the job market or their culture does not align with your values, it is definitely a good idea to decline the job offer politely and consider other options.</p>
                                    <p>Being in a culture that makes you feel respected, allows you tremendous opportunities to grow and work to your potential is essential to growing faster as a professional.</p>
                                    <p>But once you are sure about declining an offer, there are a few things to remember as you say no.</p>



                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="2" className='scroll-mt-[140px] text-[#353e44] font-bold'>Tips To Keep In Mind When Declining A Job Offer 📝</strong>
                                    </h2>

                                    <h3 className='font-bold text-[30px]'>1. Let them know as soon as possible</h3>
                                    <p>If you've already made up your mind and feel sure you want to reject a job offer, be prompt in letting them know. We understand that saying "no" may not come naturally to some people, but ghosting a hiring manager or taking weeks to reject an offer is not the ideal way to deal with it.</p>
                                    <p>When you ghost a hiring manager instead of rejecting the offer, you're not just letting the offer go but also closing doors to your networking options. Getting back to them on time would help maintain a good relationship while being respectful to them if you decide to apply to the company again or want to connect with the hiring manager for any opportunity in the future.</p>

                                    <h3 className='font-bold text-[30px]'>2. Show your appreciation and explain your decision</h3>
                                    <p>Hiring processes are time and effort-consuming for both - recruiters/hiring managers and candidates. When a hiring manager reaches out to you with an offer, it is essential to remember that they've chosen you from all the other potential candidates they may have received applications from. Showing appreciation is the best way to start your email or phone call.</p>
                                    <p>Although you don't owe the company or hiring manager any explanation for why you want to turn down the job offer, it is polite to do so. Giving a specific and concise reason for explaining your decision helps convey that you gave the offer great thought before arriving at a decision and will keep your options open for future opportunities from the company.</p>

                                    <h3 className='font-bold text-[30px]'>3. Keep in touch with them</h3>
                                    <p>A common mistake most job seekers make is not keeping in touch with hiring managers they've interviewed for. People often underestimate the value of having a hiring manager in your network who has extended an offer for you in the past. If they've recognized your potential once, they would likely want to give you a chance in case you approach them the next time you are looking to switch companies.</p>
                                    <p>By keeping in touch, we do not mean sending emails to them from time to time. But you can definitely add them to your LinkedIn network and interact with their updates.</p>
                                    <p>Not sure how to send out a connection invite to a hiring manager? Look them up on LinkedIn and add the following note when sending the invite:</p>
                                    <p><em>Hey Name , We had the chance to interact recently while I was interviewing for Company Name, and I would love to connect with you on LinkedIn and keep in touch!</em></p>




                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="3" className='scroll-mt-[140px] text-[#353e44] font-bold'>Sample Email Template To Decline A Job Offer Politely 📧</strong>
                                    </h2>
                                    <p>Not sure how to let the company know you'd like to decline the offer? We've put together a sample email template to make it easier for you!</p>
                                    <p><em>Hi Name ,</em></p>
                                    <br/>
                                    <p><em>Thank you for extending this generous offer to work as a role name at company. I’m glad to know you think I’m a good fit for the role.</em></p>
                                    <br/>
                                    <p><em>I have learned a lot about the role and company during my interview process. However, after careful consideration, I have decided to accept another offer that better aligns with my career goals.</em></p>
                                    <br/>
                                    <p><em>Although I am not able to accept the offer at this time, I appreciate your efforts in extending this offer to me, and your team for helping me learn more about company.</em></p>
                                    <br/>
                                    <p><em>I wish you the best in finding the right candidate.</em></p>
                                    <br/>
                                    <p><em>Thanks!</em></p>
                                    <br/>
                                    <p><em>Best Regards,</em></p>
                                    <br/>
                                    <p><em>Your Name</em></p>




                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="4" className='scroll-mt-[140px] text-[#353e44] font-bold'>Conclusion</strong>
                                    </h2>
                                    <p>Finding the right job is not an easy task. But making an informed decision will help you make better progress in the long-run and lead you to a job that is professionally fulfilling. You may have second thoughts about declining an offer because you don’t want to let an opportunity pass, but please know that declining the wrong offer is better than realizing it after you’ve started working.</p>
                                    <p>Your career path is for you to build. So ensure you’re making the right choice for yourself!</p>




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