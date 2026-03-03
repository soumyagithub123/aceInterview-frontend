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
                            <a href="/blog-categories/job-applications">Negotiation</a>
                        </div>
                    </div>
                </div>

                <div className='z-3 flex flex-col lg:flex-row items-stretch w-full max-w-[1272px] mx-auto relative px-4 lg:px-0'>
                    <div className='z-2 flex flex-col lg:flex-row justify-around items-start mt-6 w-full'>

                        <img
                            className='rounded-[10px] w-full lg:max-w-[45%] max-h-[500px] object-cover'
                            src="https://cdn.jsdelivr.net/gh/gradhiresolutions/Blog/Frame%20149.png"
                            alt=""
                        />

                        <div className='flex items-left text-left flex-col items-start lg:ml-24 mt-6 lg:mt-0 w-full px-2 sm:px-4'>
                        <div className='bg-[#ffb800] text-[#ffffff] text-center px-[4px] py-[2px] rounded-[3px]'>Negotiation</div>
                            <h1 className='max-w-[85%] text-gray-800 mb-8 text-[28px] sm:text-[36px] lg:text-[50px] font-bold leading-snug w-full'>
                                Salary Negotiation 101 - How To Negotiate Your Job Offer
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
                                            <strong >The question is - How do you negotiate? 🤔</strong>
                                        </a>
                                        <a href="#2" className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Myths and Misconceptions about Salary Negotiation</strong>
                                        </a>
                                        <a href='#3' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200' >
                                            <strong>Salary Negotiation Email Examples </strong>
                                        </a>
                                        <a href='#4' className='hover:bg-blue-100 text-[#4a6a86] border-l border-[#dbe2eb] rounded-r-[5px] flex justify-between px-[8px] py-[10px] text-sm font-normal leading-[1.2em] no-underline transition-all duration-200'>
                                            <strong>More Tips From Our Hiredeasy Mentors </strong>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className='max-w-full lg:ml-10 block'>
                                <div className='max-w-[700px] mx-auto space-y-4'>
                                    <p>Salary negotiations are never easy. Especially if it is your dream FAANG job offer you just received, it isn't uncommon to feel like negotiating your job offer could make you lose it. Here's a reminder to begin with: THERE IS NOTHING WRONG IN NEGOTIATING YOUR COMPENSATION! You've already cleared the challenging phases of resume writing and interview preparation for your job hunt, and dealing with the negotiation phase confidently can help you bag the best offer for yourself! ✌🏻</p>


                                    <h2 id='1' className=' tracking-[-0.04em] mt-0 mb-6 text-[35px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold '>The question is - How do you negotiate? 🤔</strong>
                                    </h2>
                                    <p>
                                        There is a lot of conflicting advice around negotiating that job seekers come across, and not all of it will apply to everyone. Depending on the industry you belong to, the role you've applied for, your years of experience, skills, and many other factors, the dynamics of what you should negotiate and how may differ to some extent.
                                    </p>

                                    <div className='max-w-[60%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63674bd5892c1159de37dd3b_Offer%20Letter-pouty.avif" alt="" />
                                        <p className=' max-w-[100%]'>Just received a job offer? Resist the urge to accept it right away. Take your time to review your compensation.</p>
                                    </div>
                                    <p>Here are our top 5 salary negotiation tips! 💰</p>

                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>1. Do Your Research 🔍</strong>
                                    </h2>
                                    <p>Before quoting a number to your potential employer, do your research to find out what other employees for the same role and getting paid in that company. Knowing the market range will not only help you understand what part of that range you belong to based on your skills and expertise, but it will enable you to quote a better figure or range to your company.</p>
                                    <p>Here are two ways you can research salary bands for FAANG and other top tech companies:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Search for salary information on websites like Levels.fyi, Salary, Payscale, Glassdoor, LinkedIn, or others.</li>
                                        <li>You can also reach out to employees from the company on LinkedIn to find out from them.</li>
                                    </ul>
                                    <p>Salaries may differ based on your role, location, years of experience, skill sets, and employers. Make sure the research you do is considering all these factors to arrive at a suitable range.</p>
                                    <p>
                                        <strong><em>Also Read:</em></strong>
                                        <a href='#'>
                                            <strong><em>Understanding Salary Bands for FAANG+ Companies</em></strong>
                                        </a>
                                    </p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>2. Evaluate the Job Offer 🧐</strong>
                                    </h2>
                                    <p>A common mistake job seekers make is confusing negotiating the job offer with negotiating salary. Your base salary is not the only negotiable factor in your compensation package. Your package has perks and benefits, which, when negotiated, could help you more in the long run.</p>
                                    <p>Here are a few benefits you could negotiate beyond the basic salary:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Stock options or equity percentages</li>
                                        <li>A signing bonus</li>
                                        <li>Yearly target bonus</li>
                                        <li>Relocation allowance</li>
                                        <li>401(k) contribution (in the U.S.)</li>
                                        <li>Flexible working hours</li>
                                        <li>More work-from-home days</li>
                                        <li>Additional vacation or paid-time-off (PTO) days</li>
                                        <li>Additional upskilling resources</li>
                                        <li>Other maternity/paternity benefits</li>
                                        <li>Onsite child care</li>
                                        <li>Healthcare insurance benefits</li>
                                    </ul>
                                    <p>ome companies may not be willing to negotiate on the base salary, but would be happy to offer additional benefits to employees. It is also important to keep in mind that not all these benefits are negotiable in all companies. Focusing on the entire offer rather than just the salary would help you get a better offer at FAANG+ companies.</p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[40px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>3. Pick A Range 🎯</strong>
                                    </h2>
                                    <p>A great way to approach salary negotiation is to learn about the compensation as much as possible before and during the interview process. So when you are met with the question, "What are your salary expectations?" you don't look unprepared or answer with a figure that is way below what you could have negotiated. </p>
                                    <p>Once you've done your homework about understanding the salary bands for your role at the location you're interviewing, pick a range you would like to propose based on your skills and experience. An even smarter way to deal with this is by doing three things:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Ask for the salary budget to the recruiter first before initiating the conversation and proposing a range yourself. They might be in a position to pay higher than the range you've expected for the role.</li>
                                        <li>Avoid giving an exact figure; instead, provide a range to show you're open for discussion.</li>
                                        <li>Always propose a range ~20% higher than your expectations leaving room for further back and forth.</li>
                                    </ul>
                                    <p>However, there can be situations where you're completely clueless about what to propose. In such cases, be honest with your recruiter, ask for their budget for the role and take steps forward according to the range they share with you.</p>
                                    <div className='max-w-[60%] mx-auto'>
                                        <img className='max-w-[100%] rounded-[10px] mb-4' src="https://cdn.prod.website-files.com/635c591478332fd4db25d46e/63674c09321d973e9139105e_Compensation-kvty0.avif" alt="" />
                                        <p className=' max-w-[100%]'>Just received a job offer? Resist the urge to accept it right away. Take your time to review your compensation.</p>
                                    </div>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[35px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>4. Back Your Counteroffer with Evidence 📝</strong>
                                    </h2>
                                    <p>With so much hype around negotiating a job offer, candidates sometimes feel they should negotiate even when the offer is fair. Doing this could hurt your application and offer!</p>
                                    <p>It is absolutely okay to negotiate, but it is also essential to do so with solid reasons and a case explaining why you deserve what you're asking for. Asking for a certain percentage of salary more than what you have been offered is not enough; you will need to back it up with solid arguments as to how you will prove valuable to the organization and deliver better results than the other candidates they may have - by referring to your past accomplishments.</p>
                                    <p>Here are a few examples of the type of reasons you could state when negotiating:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Mention any compensation data points available to you from your research on the web or information from your peers about their recent offers or salary ranges to explain why the figure you’re asking for would be valid.</li>
                                        <li>You may be expecting a promotion at your current workplace or may be looking at leaving a big stock grant behind if you leave your current company. It would be essential for your new offer to match these benefits if you decide to make the switch.</li>
                                        <li>A common valid reason, given the current times, could also be the company’s poor stock performance. If the company you are planning to join has been affected by recent external factors, negotiating the offer to account for market fluctuations would be wise.</li>
                                        <li>You could also negotiate based on your exceptional interview performance or any previous exemplary professional achievements.</li>
                                    </ul>
                                    <p>These are only a few examples for reference. Your reasons may differ depending on several personal and professional factors you could state to the company.</p>
                                    <p>However, if you can't find valid reasons to prove why you deserve more, you might need to rethink whether your negotiation is going the right way or if it is wise to discuss it further.
                                    </p>
                                    <p>Don't forget - <i>how you communicate the entire message is just as important as what you ask for.</i></p>
                                    <h2 className=' tracking-[-0.04em] mt-0 mb-6 text-[35px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>5. Negotiate with Discipline 🤝</strong>
                                    </h2>
                                    <p>Talking about the how of negotiation, doing so with discipline is of utmost importance.</p>
                                    <p>There are two ways your negotiation could go -</p>
                                    <p>Option #1 You hold on to your range, communicate arrogantly how important you can be to the organization, give ultimatums about accepting another offer if the figure is not matched, piss people involved in the process off, and land the job.
                                    </p>
                                    <p>Option #2 You propose your offer and start at a point of agreement, communicate that you're flexible and open for discussion, understand their constraints and perspective, and arrive at an offer that works best for all parties while respecting their efforts to provide you the compensation you deserve.</p>
                                    <p>Option #2 is any day better than the first one. It is essential to be mindful that the people you are negotiating with will be your future colleagues. You want them to be on your side and vouch for you, rather than upsetting them even before you've started.</p>
                                    <p>In some industries and cultures, building relationships upon trust and integrity supersedes the compensation and package. Besides what you ask for, how you ask for will make or break your chances of successfully landing a fair offer.
                                    </p>
                                    <p>Keeping these basic points in mind can help you negotiate like a pro! 🙌
                                    </p>
                                    <p>But, that’s not it!</p>

                                    <h2 id='2' className=' tracking-[-0.04em] mt-0 mb-6 text-[35px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Myths and Misconceptions about Salary Negotiation</strong>
                                    </h2>
                                    <p>According to a survey by PayScale.com, 28% of people don’t negotiate or ask for more money because it makes them feel uneasy or uncomfortable. And a lot of this uneasiness  stems from the perceived notions or fears job seekers have about negotiating a job offer.</p>
                                    <p>Here are a few examples:</p>
                                    <h3 className='font-bold text-[30px]'>1. If you negotiate, your offer may be revoked.</h3>
                                    <p>While this is “likely”, most companies don’t do it. When you share your expectations, two things could happen:</p>
                                    <p>a) If the expectations are within their range or slightly above it, the company will try to match it if they can.</p>
                                    <p>b) Suppose your expectations are way higher than the initial offer, and the company cannot match them. In that case, they will share the best possible offer and ask you if you'd like to take it forward.</p>
                                    <p>Your fears are valid, but please remember that most companies don’t revoke an offer simply because you negotiated (as long as you do it correctly). They have offered you the position because they like you and want you on their team. Negotiations are only an attempt to match the expectations of both parties.</p>
                                    <h3 className='font-bold text-[30px]'>2. You will be perceived differently after you join.</h3>
                                    <p>This is absolutely not true. In most cases, you will negotiate with your recruiter, who will further discuss your case with the company’s compensation team. The compensation team of your company will then assess the data provided by you to make a decision about the revised offer if your expectations fall within the team’s budget. Since your manager will have little or no involvement in the process, there will be no judgements about you after you’ve joined.</p>
                                    <p>In the case of small companies - even if your manager is involved in the process or is aware of the expectations you stated for your offer if the company decides to match it, it is only a motivation for them to increase the overall compensation for other members of the team as well to ensure their offers are fair.</p>
                                    <h3 className='font-bold text-[30px]'>3. If you don't have any data available, you can't negotiate.</h3>
                                    <p>This is common in small companies. If you don’t have any data available, the best thing to do would be to start a conversation with your point-of-contact (usually a recruiter) and let them know that you are interested in negotiating the offer. You can ask them where this offer stands in their internal range (for example, is it the top-of-band, bottom-of-band, or around the median). This can give you an expectation of how much they would be able (and willing) to negotiate. If you can't find information online, the best source of data will be your point of contact at the company. You both have a shared goal of getting you to join the company, so it's also in their interest to help you get an offer that works out for you (within their means).</p>
                                    <h3 className='font-bold text-[30px]'>4. You can only negotiate over email.</h3>
                                    <p>Since most conversations during the hiring process happen over email, many candidates think they can only negotiate using that communication medium. This is not true. Conversations often happen through a combination of mediums, but you should choose the one that works best for you. If you think you won't be able to speak your mind over a call, an email is more suitable. On the other hand, if you have writer's block and can clearly articulate your asks over a call, go for it! If your point-of-contact pushes for a specific type of communication from you that you are not comfortable with, do not hesitate to follow up with the point-of-contact in your preferred medium.</p>


                                    <h2 id='3' className=' tracking-[-0.04em] mt-0 mb-6 text-[35px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>Salary Negotiation Email Examples</strong>
                                    </h2>
                                    <p>Our team of FAANG+ mentors have guided hundreds of candidates so far in landing their dream jobs. One of our mentors recently helped a candidate negotiate their offer successfully. The company matched the candidate’s expected salary, stock, and bonus, without having a counter-offer (and by just stating facts and information about their current situation as well as through online data points).</p>
                                    <p>Let us take a look at the initial draft the candidate prepared to send to the company (before getting it reviewed by a FAANGPath mentor) 📧</p>
                                    <h4 className='font-bold text-[28px]'><i>Before our expert guidance</i></h4>
                                    <p>---</p>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Hi,</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I gave some thought to the offer and to be honest, it is a bit lower than my expectations right now.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>The offer I received is for level X, but I believe I can perform at the level of and have the experience to be a level X+1 software engineer. I had great interview performance and work experience to support this. I have 1.75 years of software engineering experience, leadership experience, and graduated Cum Laude from ABC University. I am a top performer in my current company, having received an outstanding achiever award within my first 6 months at the company.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>As I had shared earlier, I am interviewing with other companies like Google and should I get an offer from them, it will be significantly higher than the initial offer I have received from Acme Company. To my knowledge, the TC (Total Compensation) at Google for someone with my experience can be upwards of $XXX (only counting base salary and stock). However, Google also takes several weeks for team matching, and I really like the team I have been assigned here at Acme Company and thoroughly enjoyed my conversations with ManagerName. I want my next company to be a place I stay for the long term, and so I want to be happy with the numbers. I am willing to sign with Acme Company immediately and drop interviewing with other companies if the numbers align with my expectations.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>If my offer can be upped to: Level X+1: Base: $AAA, Stock: $BBB/4, Sign on: $CCC, I will sign on happily.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I’m looking forward to moving to CityName and starting the next chapter of my career at Acme Company!</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I’m CC’ing the hiring manager, as I believe they would agree with these points and be able to advocate for me internally.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Best,</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Candidate Name</h6>
                                    <p>---</p>
                                    <p>Our mentor guided the candidate, and here’s the draft they finalized upon after the review:</p>
                                    <h4 className='font-bold text-[28px]'><i>After the expert guidance</i></h4>
                                    <p>---</p>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Hi,</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Thanks for sharing the Acme Company offer with me earlier this week. Super excited to get an opportunity to work at one of the world’s top tech companies! Taking into account the interview process as well as meeting with ManagerName, I had a positive experience and am excited to possibly work with ManagerName and his team on Technology A, B, and C.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>For reference, these are the numbers that were shared with me for an X role,</h6>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Base: $aaa</li>
                                        <li>Stock: $bbb (over 4 years)</li>
                                        <li>Joining Bonus: $ccc</li>
                                    </ul>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I gave some thought to the offer and to be honest, it is a bit lower than my expectations as it currently stands, both in terms of compensation and in terms of leveling.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>To make this offer lucrative and in-line with my experience, interview performance, past accolades, and value that I would be adding to the team and to the organization overall -- I sincerely request updated compensation (details below) and a bump up to the X+1 level. I will be outlining my thought process, reasoning, and significant data points for you to take back to the compensation team and make a strong case for an updated offer. I want to believe that you are really here to advocate for me, so I am doing my best to provide maximum inputs for making the process as smooth and easy as possible.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>What I bring to the table:</h6>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>By the time I join Acme Company, I will have <strong>1.75 years of Software Engineering</strong> experience. This puts me in a strong position for performing at the X+1 level (as opposed to X).</li>
                                        <li>I had a great <strong>interview performance</strong> when interviewing at Acme Company. I know I did well, and it is evident as I received a fast-track offer just 1 day after my interviews, and from the feedback I received. This shows my technical acumen and ability to perform under ambiguity, stress, and constrained environments -- all of which will be useful for success as an X+1 at Acme Company.</li>
                                        <li>In my current workplace, where I am a full-time Software Engineer, with experience in <strong>C++, Python, and SQL</strong>, working on some mission-critical projects, I have received an outstanding achievement <strong>award</strong> (less than 10% employees receive this) for going above and beyond the expectations of my role, and contributing to company-wide initiatives. I was also lauded as a <strong>top performer</strong> and am due for a performance-based promotion soon if I choose to stay here. I expect to consistently perform at the top of my game at Acme Company as well.</li>
                                        <li>Academically, I have graduated <strong>Cum Laude</strong> from ABC University, which showcases that I have been a consistent top performer throughout my career. I have been involved as a leader in <strong>various leadership initiatives</strong> both during my high school, university, as well as at my current employer, and contribute significantly to the organization’s culture, apart from just my work ethic and core deliverables. I expect to contribute massively to Acme Company as well, apart from my day-to-day work.</li>
                                    </ul>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Given the above points, I expect that the leveling and the compensation are adjusted to match the level of quality and work ethic I will be bringing with me to Acme Company where I would be performing at the X+1 level from Day 1.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Other Company Interviews:</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>As I had shared earlier, I am interviewing with other companies like Google and should I get an offer from them, I expect Google’s offer will be significantly higher than the initial offer I have received from Acme Company.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>To my knowledge (procured from the recruiter, online sources, and peers) the TC at Google for someone with my experience can be upwards of $XXX / year (only counting base salary, stock and sign-on for my target location).</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>However, Google also takes several weeks for team matching. On the contrary, I really like the team I have been matched with here at Acme Company and thoroughly enjoyed my conversations with ManagerName. I truly believe I can add significant value to the team. I want my next company to be a place I stay at for the long term and so I want to be happy with the numbers.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>My Expected Offer:</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I would now like to share what my expected numbers and the updated offer I would be looking forward to looks like.</h6>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Level X+1</li>
                                        <li>Base: $AAA</li>
                                        <li>Stock: $BBB (over 4 years)</li>
                                        <li>Joining Bonus: $CCC</li>
                                    </ul>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I am willing to sign with Acme Company immediately and drop interviewing with other companies if the numbers align with my expectations.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I believe this is quite a reasonable ask given the plethora of data points I have provided. You will see in the section below that I also compiled offers from candidates with similar YoE and most of them are within this range (some being significantly higher as well).</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Additional Data Points:</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I have compiled data points of Acme Company offers received by other candidates who may have had a similar background / experience as me. While I totally understand that we can not compare apples to oranges, it would at least provide you a good baseline and understanding of the realm of possibility for getting the offer to match my expectations.</h6>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>(Redacted links and screenshots from various online data sources)</li>
                                    </ul>
                                    <h6 className='font-bold text-[20px]  tracking-[-0.04em] leading-[1.2]'>There are many similar data points easily searchable online, but I have just listed a few for your reference.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Finally, I would like to reiterate that I thoroughly enjoyed talking to ManagerName about the opportunities with the TeamName team and am excited to potentially join the team. The move to CityName sounds exciting, as I’d be happy to explore the RegionName outside of work. Everything is in the right direction, and I hope we can make the numbers match up, so that we can close the deal.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>I’ve also CC’d my potential manager, ManagerName, to this email, as I am sure he would agree with the points I have shared and would be able to advocate for me internally.</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Please let me know the updated offer details at your earliest convenience. You can reply to this email or call me directly - whichever is more convenient. Thank you in advance!</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Best,</h6>
                                    <h6 className='font-bold text-[20px] tracking-[-0.04em] leading-[1.2]'>Candidate Name</h6>
                                    <p>---</p>
                                    <br></br>
                                    <br></br>
                                    <p>The candidate could successfully negotiate with the company to land an offer that matched their expectations and led to the following results:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Base salary increase: 8%</strong></li>
                                        <li><strong>Stock increase : 40%</strong></li>
                                        <li><strong>Signing Bonus increase: 140% increase </strong></li>
                                    </ul>
                                    <p>You read it right! The candidate asked for more than he was actually expecting, keeping room for any back and forth. However, due to strong negotiation, the company agreed to match the candidate’s expectations. Here are a few other things that the candidate did to ensure his negotiation was backed up with evidence and that he was negotiating the right elements of his offer:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Given that Acme Company was a large multinational company, the benefit package was standard, so there was little room to negotiate that. Regardless, the candidate remained respectful and positive throughout the conversation — calling back to their excitement to join the team.</li>
                                        <li>Candidate had a very strong and clear ask — update the level and compensation — and they mentioned if it would be met they would sign immediately — a strong call to action.</li>
                                        <li>The candidate leveraged the fact that the company was less willing to move base salary but had more wiggle room with the signing and stock component.</li>
                                    </ul>
                                    <h2 id='4' className=' tracking-[-0.04em] mt-0 mb-6 text-[35px] font-bold leading-[48px]'>
                                        <strong id="the-basic of an effective" className='scroll-mt-[140px] text-[#353e44] font-bold'>More Tips From Our Careerflow Mentors 💡</strong>
                                    </h2>
                                    <p>Additionally, these are a few other aspects to keep in mind during the process:</p>
                                    <ul role="list">
                                        <li>Make sure you come across as a likable personality. Companies would be happy to negotiate and match an offer for an employee they really want to hire. </li>
                                        <li>Be prepared for any questions that come your way while negotiating. Approach them with metrics to quantify the impact of your work and the value you bring to the table.</li><li>Don't reject an offer simply because they cannot match it at that point in time. Consider the overall package, company culture, and progression of the role before making a final decision.</li>
                                        <li>Make sure you're negotiating for the right job. If you have multiple offers on hand, resist the urge to negotiate all of them and join the one that pays the highest. Instead, channel your efforts into discussing the offer you're more likely to accept.</li>
                                        <li>Take culture into consideration. Negotiations could look different from one country to another and across industries.</li>
                                    </ul>
                                    <p>Negotiation conversations may seem hard, but remember, just like everything else, you can master these with practice and preparation. The next time you have a job offer you don't know how to negotiate; walk yourself through these points, practice/write down how you would approach the conversation, and take it to your recruiter/hiring manager for further discussion.</p>
                                    <p>Remember, most jobs are negotiable, and you're losing out on the pay you deserve if you don't advocate for yourself. YOU'VE GOT THIS! 🙌💰</p>
                                    <h1 className='text-[50px]'>***</h1>
                                    <p>Are you looking for more salary negotiation guidance? Connect with our team of 100+ FAANG mentors now and let them help you negotiate an offer you deserve!</p>
                                    <p>Follow us on LinkedIn, Instagram, Twitter, YouTube, and Clubhouse for more job search tips, interview preparation guidance, resume, and negotiation hacks.</p>
                                    <p>If you're actively applying to jobs and need a referral, join our 5000+ member community on our discord server and never miss any updates.</p>

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