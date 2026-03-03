// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// GLOBAL DATA PROVIDER
import { AppDataProvider } from "./context/AppDataContext";

// Pages
import LandingPage from "./components/Landing/LandingPage";
import Interview from "./components/InterviewAssistent/Interview";
import InterviewAssist from "./components/InterviewAssist";
import Pricing from "./components/Payment/Pricing";
import PersonasPage from "./components/InterviewAssistent/PersonasPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

// Resources
//import Blog from "./components/Resources/Blog/oldBlog";
// import ResumeBuilder from "./components/Resources/Blog/ResumeBuilder";
// //import Blog from "./components/Resources/Blog/Blog";
// import BlogDetail from "./components/Resources/Blog/oldBlogDetail";
import BlogPage from "./components/Resources/Blog/BlogPage";
import AtsFriendlyResume from "./components/Resources/Blog/AtsFriendlyResume";
// ⭐ Payment Pages
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import PaymentFailure from "./components/Payment/PaymentFailure";
// Individual Blog Posts (src/blogs/ ke andar se sab import)
import AmazonBehavioralGuide from "./blogs/amazon-behavioral-interview-questions-guide/page";
import AtsFriendlyKey from "./blogs/an-ats-friendly-resume-is-your-key-to-getting-hired/page";
import AtsFriendlyResumePage from "./blogs/ats-friendly-resume/page";
import BestFontResume from "./blogs/choosing-the-best-font-for-your-resume/page";
import GooglePmGuide2024 from "./blogs/google-product-manager-interview-guide-2024-with-questions/page";
import SeniorLevelResumeLength from "./blogs/how-long-should-a-senior-level-resume-be/page";
import AskForRaiseTips from "./blogs/how-to-ask-for-a-raise-8-effective-tips/page";
import LinkedinBannerMinutes from "./blogs/how-to-create-an-effective-linkedin-banner-in-minutes/page";
import DeclineJobOffer from "./blogs/how-to-decline-a-job-offer-politely-with-sample-email-template/page";
import JobInRecession2023 from "./blogs/how-to-find-a-job-during-a-recession-ultimate-guide-2023/page";
import FollowUpApplicationTemplates from "./blogs/how-to-follow-up-on-a-job-application-phone-email-sample-templates/page";
import DataAnalystJob2025 from "./blogs/how-to-get-a-data-analyst-job-in-2025/page";
import PodcastResearchJob from "./blogs/how-to-get-a-job-doing-research-for-podcasts/page";
import TechJobNoExperience from "./blogs/how-to-get-a-job-in-tech-with-no-experience/page";
import JobWithoutDegree2025 from "./blogs/how-to-get-a-job-without-a-degree-in-2025/page";
import FirstConstructionJob2025 from "./blogs/how-to-get-your-first-construction-job-in-2025/page";
import TrackJobApplicationsEasy from "./blogs/how-to-keep-track-of-job-applications-the-easy-way/page";
import ListPublicationsLinkedin from "./blogs/how-to-list-publications-on-your-linkedin-profile/page";
import OptimizeLinkedinProfile40x from "./blogs/how-to-optimize-your-linkedin-profile-for-40x-more-opportunities/page";
import PrepareJobInterview from "./blogs/how-to-prepare-for-a-job-interview/page";
import SearchJobOnLinkedin2025 from "./blogs/how-to-search-for-a-job-on-linkedin-in-2025/page";
import ChatgptBehavioralInterviews from "./blogs/how-to-use-chatgpt-to-prepare-for-behavioral-interviews/page";
import GreatLinkedinHeadline from "./blogs/how-to-write-a-great-linkedin-headline-with-examples/page";
import ResumeToGetJob2025 from "./blogs/how-to-write-a-resume-to-get-a-job-in-2025/page";
import LinkedinWorkExperienceTips from "./blogs/how-to-write-linkedin-work-experience-section-examples-tips/page";
import TooMuchSpaceResumeBad from "./blogs/is-too-much-space-on-a-resume-bad/page";
import JobTrackerAppsVsSheets from "./blogs/job-tracker-apps-vs-spreadsheets-which-should-you-be-using/page";
import ManagingStressJobSearch from "./blogs/managing-stress-when-searching-for-a-job/page";
import SalaryNegotiation101 from "./blogs/salary-negotiation-101-how-to-negotiate-your-job-offer/page";
import StopQuotesResume2025 from "./blogs/stop-putting-quotes-on-your-resume-in-2025/page";
import TechJobBoards from "./blogs/tech-job-boards-what-they-are-and-why-you-should-be-using-them/page";
import TpmInterviewQuestions from "./blogs/technical-program-manager-interview-questions-tpm-interview/page";
import WhatIsJobBoard from "./blogs/what-is-a-job-board-and-how-do-they-help-you-find-a-new-job/page";
import GoodTimeToApplyJobs from "./blogs/when-is-a-good-time-to-apply-for-jobs/page";
import JobApplicationTracker2025 from "./blogs/why-you-should-be-using-a-job-application-tracker-in-2025/page";
import ResumeHeadlineMatters from "./blogs/why-your-resume-headline-matters-and-how-to-nail-it/page";
import LinkedinSummaryStandOut from "./blogs/write-a-linkedin-summary-that-stands-out-with-examples/page";
function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <BrowserRouter>
          <Routes>
            {/* ---------- PUBLIC ROUTES ---------- */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<AtsFriendlyResume />} />
            {/* All Individual Blog Routes */}
            <Route
              path="/blog/amazon-behavioral-interview-questions-guide"
              element={<AmazonBehavioralGuide />}
            />
            <Route
              path="/blog/an-ats-friendly-resume-is-your-key-to-getting-hired"
              element={<AtsFriendlyKey />}
            />
            <Route
              path="/blog/ats-friendly-resume"
              element={<AtsFriendlyResumePage />}
            />
            <Route
              path="/blog/choosing-the-best-font-for-your-resume"
              element={<BestFontResume />}
            />
            <Route
              path="/blog/google-product-manager-interview-guide-2024-with-questions"
              element={<GooglePmGuide2024 />}
            />
            <Route
              path="/blog/how-long-should-a-senior-level-resume-be"
              element={<SeniorLevelResumeLength />}
            />
            <Route
              path="/blog/how-to-ask-for-a-raise-8-effective-tips"
              element={<AskForRaiseTips />}
            />
            <Route
              path="/blog/how-to-create-an-effective-linkedin-banner-in-minutes"
              element={<LinkedinBannerMinutes />}
            />
            <Route
              path="/blog/how-to-decline-a-job-offer-politely-with-sample-email-template"
              element={<DeclineJobOffer />}
            />
            <Route
              path="/blog/how-to-find-a-job-during-a-recession-ultimate-guide-2023"
              element={<JobInRecession2023 />}
            />
            <Route
              path="/blog/how-to-follow-up-on-a-job-application-phone-email-sample-templates"
              element={<FollowUpApplicationTemplates />}
            />
            <Route
              path="/blog/how-to-get-a-data-analyst-job-in-2025"
              element={<DataAnalystJob2025 />}
            />
            <Route
              path="/blog/how-to-get-a-job-doing-research-for-podcasts"
              element={<PodcastResearchJob />}
            />
            <Route
              path="/blog/how-to-get-a-job-in-tech-with-no-experience"
              element={<TechJobNoExperience />}
            />
            <Route
              path="/blog/how-to-get-a-job-without-a-degree-in-2025"
              element={<JobWithoutDegree2025 />}
            />
            <Route
              path="/blog/how-to-get-your-first-construction-job-in-2025"
              element={<FirstConstructionJob2025 />}
            />
            <Route
              path="/blog/how-to-keep-track-of-job-applications-the-easy-way"
              element={<TrackJobApplicationsEasy />}
            />
            <Route
              path="/blog/how-to-list-publications-on-your-linkedin-profile"
              element={<ListPublicationsLinkedin />}
            />
            <Route
              path="/blog/how-to-optimize-your-linkedin-profile-for-40x-more-opportunities"
              element={<OptimizeLinkedinProfile40x />}
            />
            <Route
              path="/blog/how-to-prepare-for-a-job-interview"
              element={<PrepareJobInterview />}
            />
            <Route
              path="/blog/how-to-search-for-a-job-on-linkedin-in-2025"
              element={<SearchJobOnLinkedin2025 />}
            />
            <Route
              path="/blog/how-to-use-chatgpt-to-prepare-for-behavioral-interviews"
              element={<ChatgptBehavioralInterviews />}
            />
            <Route
              path="/blog/how-to-write-a-great-linkedin-headline-with-examples"
              element={<GreatLinkedinHeadline />}
            />
            <Route
              path="/blog/how-to-write-a-resume-to-get-a-job-in-2025"
              element={<ResumeToGetJob2025 />}
            />
            <Route
              path="/blog/how-to-write-linkedin-work-experience-section-examples-tips"
              element={<LinkedinWorkExperienceTips />}
            />
            <Route
              path="/blog/is-too-much-space-on-a-resume-bad"
              element={<TooMuchSpaceResumeBad />}
            />
            <Route
              path="/blog/job-tracker-apps-vs-spreadsheets-which-should-you-be-using"
              element={<JobTrackerAppsVsSheets />}
            />
            <Route
              path="/blog/managing-stress-when-searching-for-a-job"
              element={<ManagingStressJobSearch />}
            />
            <Route
              path="/blog/salary-negotiation-101-how-to-negotiate-your-job-offer"
              element={<SalaryNegotiation101 />}
            />
            <Route
              path="/blog/stop-putting-quotes-on-your-resume-in-2025"
              element={<StopQuotesResume2025 />}
            />
            <Route
              path="/blog/tech-job-boards-what-they-are-and-why-you-should-be-using-them"
              element={<TechJobBoards />}
            />
            <Route
              path="/blog/technical-program-manager-interview-questions-tpm-interview"
              element={<TpmInterviewQuestions />}
            />
            <Route
              path="/blog/what-is-a-job-board-and-how-do-they-help-you-find-a-new-job"
              element={<WhatIsJobBoard />}
            />
            <Route
              path="/blog/when-is-a-good-time-to-apply-for-jobs"
              element={<GoodTimeToApplyJobs />}
            />
            <Route
              path="/blog/why-you-should-be-using-a-job-application-tracker-in-2025"
              element={<JobApplicationTracker2025 />}
            />
            <Route
              path="/blog/why-your-resume-headline-matters-and-how-to-nail-it"
              element={<ResumeHeadlineMatters />}
            />
            <Route
              path="/blog/write-a-linkedin-summary-that-stands-out-with-examples"
              element={<LinkedinSummaryStandOut />}
            />
            {/* ---------- PAYMENT ROUTES ---------- */}
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />

            {/* ---------- PROTECTED ROUTES ---------- */}
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview-assist"
              element={
                <ProtectedRoute>
                  <InterviewAssist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personas"
              element={
                <ProtectedRoute>
                  <PersonasPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppDataProvider>
    </AuthProvider>
  );
}

export default App;
