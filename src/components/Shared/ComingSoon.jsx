import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rocket, ArrowLeft, Construction } from 'lucide-react';

export default function ComingSoon() {
  const location = useLocation();
  const navigate = useNavigate();
  const { featureName } = location.state || { featureName: "This Feature" };

  return (
    <div className="min-h-screen bg-[#070A0F] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        
        {/* Icon & Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <div className="relative h-20 w-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
              <Construction className="h-10 w-10 text-blue-400" />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            <Rocket className="h-3 w-3" />
            In Development
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-lg text-white/80 font-medium">
            {featureName}
          </p>
          <p className="text-sm text-white/50 leading-relaxed">
            We are working hard to bring this feature to life. 
            Stay tuned for updates!
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(-1)}
          className="group relative inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-gray-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Go Back
        </button>
      </div>
    </div>
  );
}
