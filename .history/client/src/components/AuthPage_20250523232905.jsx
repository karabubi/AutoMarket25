//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthPage.jsx

import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AuthPage() {
  return (
    <div className="flex flex-col md:flex-row items-start max-w-4xl mx-auto my-8 px-4 md:px-8">
      {/* Left column: Login form */}
      <div className="w-full md:w-1/2 md:border-r md:border-gray-300 md:pr-8 mb-8 md:mb-0">
        <Login />
      </div>
      {/* Right column: Register form */}
      <div className="w-full md:w-1/2 md:pl-8">
        <Register />
      </div>
    </div>
  );
}

export default AuthPage;

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthPage.jsx

import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Login Section */}
        <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200 pr-0 md:pr-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Login
          </h2>
          <Login />
        </div>

        {/* Register Section */}
        <div className="flex flex-col justify-center pl-0 md:pl-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Register
          </h2>
          <Register />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
