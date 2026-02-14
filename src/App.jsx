// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import { AuthProvider } from "./components/Auth/AuthContext";
import ProtectedRoute   from "./components/Auth/ProtectedRoute";

// GLOBAL DATA PROVIDER
import { AppDataProvider } from "./context/AppDataContext";

// PAGES
import LandingPage     from "./components/Landing/LandingPage";
import Interview       from "./components/InterviewAssistant/Pages/Interview";
import InterviewAssist from "./components/InterviewAssistant/Pages/InterviewAssist";
import Pricing         from "./components/Payment/Pricing";
import SignIn          from "./components/Auth/SignIn";
import SignUp          from "./components/Auth/SignUp";

// RESOURCES
import Blog          from "./components/Resources/Blog/Blog";
import ResumeBuilder from "./components/Resources/Blog/ResumeBuilder";
import ComingSoon    from "./components/Shared/ComingSoon";

// PAYMENT
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import PaymentFailure from "./components/Payment/PaymentFailure";

// ─────────────────────────────────────────────────────────────
// Root App
// BrowserRouter yahan hai — useNavigate sabke liye kaam karega
// Popup logic Interview page ke andar (useSubscriptionPopup hook)
// ─────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <BrowserRouter>
          <Routes>

            {/* ── PUBLIC ── */}
            <Route path="/"               element={<LandingPage />} />
            <Route path="/pricing"        element={<Pricing />} />
            <Route path="/sign-in"        element={<SignIn />} />
            <Route path="/sign-up"        element={<SignUp />} />
            <Route path="/blog"           element={<Blog />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />

            {/* ── PAYMENT ── */}
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />

            {/* ── INTERVIEW — free + expired sabko allow, UI mein cards locked ── */}
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <Interview mode="assist" />
                </ProtectedRoute>
              }
            />

            {/* ── PAID ONLY ── */}
            <Route
              path="/interview/ai-mock"
              element={
                <ProtectedRoute >
                  <Interview mode="mock" />
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
              path="/mock-interview"
              element={
                <ProtectedRoute>
                  <InterviewAssist />
                </ProtectedRoute>
              }
            />

            {/* ── COMING SOON FEATURES ── */}
            <Route path="/interview/coding"                   element={<ComingSoon />} />
            <Route path="/interview/online-assessment"        element={<ComingSoon />} />
            <Route path="/interview/phone"                    element={<ComingSoon />} />
            <Route path="/interview/meeting"                  element={<ComingSoon />} />
            <Route path="/interview/software-engineering"     element={<ComingSoon />} />
            <Route path="/interview/data-science"             element={<ComingSoon />} />
            <Route path="/interview/product-management"       element={<ComingSoon />} />

            {/* ── INTERNAL PAGES — free users bhi ── */}
            <Route
              path="/interview/personas"
              element={
                <ProtectedRoute>
                  <Interview mode="assist" initialPage="personas" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/knowledge-base"
              element={
                <ProtectedRoute>
                  <Interview mode="assist" initialPage="knowledge-base" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/questions"
              element={
                <ProtectedRoute>
                  <Interview mode="assist" initialPage="questions" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/train"
              element={
                <ProtectedRoute>
                  <Interview mode="assist" initialPage="trains" />
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