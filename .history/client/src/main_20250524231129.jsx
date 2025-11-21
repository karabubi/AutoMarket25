

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/main.jsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';



// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// client/src/main.jsx

//Users/salehalkarabubi/works/project/AutoMarket25/client/src/main.jsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



// Users/salehalkarabubi/works/project/AutoMarket25/client/src/main.jsx

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n'; // ✅ Import i18n config

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ✅ Suspense handles lazy i18n loading */}
    <Suspense fallback={<div className="text-center mt-10">Loading translations...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
