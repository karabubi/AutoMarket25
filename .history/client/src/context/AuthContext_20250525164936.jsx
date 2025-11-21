//Users/salehalkarabubi/works/project/AutoMarket25/client/src/context/AuthContext.jsx

// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   const register = async (userData) => {
//     const response = await fetch('http://localhost:5001/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Registration failed');
//     }

//     return data; // returns { user, token }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // used for avatar/profile updates

  // Load user info from localStorage if token exists (example logic)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      fetch('http://localhost:5001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setCurrentUser(data);
        })
        .catch(() => {
          setUser(null);
          setCurrentUser(null);
        });
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setCurrentUser(userData);
    localStorage.setItem('token', userData.token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  // Register function (unchanged)
  const register = async (userData) => {
    const response = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data; // returns { user, token }
  };

  return (
    <AuthContext.Provider value={{ user, currentUser, setCurrentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
