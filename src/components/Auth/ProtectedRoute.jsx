// // frontend/src/components/Auth/ProtectedRoute.jsx

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
//         <div className="text-white text-center">
//           <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/sign-in" replace />;
//   }

//   return children;
// }


// frontend/src/components/Auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        {/* ⭐ RESPONSIVE CONTAINER */}
        <div className="text-white text-center max-w-sm w-full">
          
          {/* ⭐ RESPONSIVE SPINNER */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* ⭐ RESPONSIVE TEXT */}
          <p className="text-sm sm:text-base text-gray-300">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
