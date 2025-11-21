//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthPage.jsx

// import React from 'react';
// import Login from '../pages/Login';
// import Register from '../pages/Register';

// function AuthPage() {
//   return (
//     <div className="flex flex-col md:flex-row items-start max-w-4xl mx-auto my-8 px-4 md:px-8">
//       {/* Left column: Login form */}
//       <div className="w-full md:w-1/2 md:border-r md:border-gray-300 md:pr-8 mb-8 md:mb-0">
//         <Login />
//       </div>
//       {/* Right column: Register form */}
//       <div className="w-full md:w-1/2 md:pl-8">
//         <Register />
//       </div>
//     </div>
//   );
// }

// export default AuthPage;

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthPage.jsx

// import React, { useState, useEffect } from 'react';
// import { MoonIcon, SunIcon } from 'lucide-react';
// import Login from '../pages/Login';
// import Register from '../pages/Register';

// function AuthPage() {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', isDark);
//   }, [isDark]);

//   const toggleDarkMode = () => setIsDark(!isDark);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start px-4 pt-16 transition-colors duration-500">
      
//       {/* Dark Mode Toggle Button */}
//       <div className="flex justify-end w-full max-w-6xl mb-6 px-2">
//         <button
//           onClick={toggleDarkMode}
//           className="text-gray-800 dark:text-white bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/70 dark:hover:bg-white/20 transition"
//         >
//           {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
//           {isDark ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       </div>

//       {/* Login / Register Card */}
//       <div className="w-full max-w-6xl rounded-3xl border border-white/30 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 transition-all duration-500">
        
//         {/* Login Section */}
//         <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/30 dark:border-white/10 pr-0 md:pr-6 transition-all">
//           <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center md:text-left">
//             Login
//           </h2>
//           <Login />
//         </div>

//         {/* Register Section */}
//         <div className="flex flex-col justify-center pl-0 md:pl-6 transition-all">
//           <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center md:text-left">
//             Register
//           </h2>
//           <Register />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;

//Users/salehalkarabubi/Desktop/Backup Project/27-05-2025 AutoMarket25/AutoMarket25/client/src/components/AuthPage.jsx
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start px-4 pt-24 transition-colors duration-500">
      <div className="w-full max-w-6xl rounded-3xl border border-white/30 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 transition-all duration-500">
        
        {/* Login Section */}
        <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/30 dark:border-white/10 pr-0 md:pr-6 transition-all">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center md:text-left">
            Login
          </h2>
          <Login embedded />
        </div>

        {/* Register Section */}
        <div className="flex flex-col justify-center pl-0 md:pl-6 transition-all">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center md:text-left">
            Register
          </h2>
          <Register />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
