//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthPage.jsx

import React from 'react';
import Login from './Login';
import Register from './Register';

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
