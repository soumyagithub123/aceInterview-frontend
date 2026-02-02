// // frontend/src/context/AuthContext.jsx

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../../database/supabaseClient';


// const AuthContext = createContext({});

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check active session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const value = {
//     user,
//     loading,
//     signUp: async (email, password, fullName) => {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: fullName,
//           },
//         },
//       });
//       return { data, error };
//     },
//     signIn: async (email, password) => {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       return { data, error };
//     },
//     signOut: async () => {
//       const { error } = await supabase.auth.signOut();
//       return { error };
//     },
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };// AuthContext.jsx (temporary testing version)
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // TEMP: false so children render

  // TEMP: Hardcode a test user for UI testing
  useEffect(() => {
    const tempUser = { id: 'temp-user-id', email: 'test@example.com', full_name: 'Test User' };
    setUser(tempUser);
  }, []);

  const value = {
    user,
    loading,
    signUp: async (email, password, fullName) => {
      return { data: { user: { id: 'temp-user-id', email, full_name: fullName } }, error: null };
    },
    signIn: async (email, password) => {
      return { data: { user: { id: 'temp-user-id', email } }, error: null };
    },
    signOut: async () => {
      setUser(null);
      return { error: null };
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
