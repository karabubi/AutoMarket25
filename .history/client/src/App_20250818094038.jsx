
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/App.jsx

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CarDetails from './pages/CarDetails';
// import CarDetailsPublic from './pages/CarDetailsPublic';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard/index';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';
// import Contact from './pages/Contact';
// import Cars from './pages/Cars'; // ✅ Import the Cars page with CarFilter
// import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';
// import AuthPage from './components/AuthPage';
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Layout>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/cars" element={<Cars />} /> {/* ✅ NEW: Car filter page route */}
//             <Route path="/car/:id" element={<CarDetails />} />
//             <Route path="/car-public/:id" element={<CarDetailsPublic />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/privacy" element={<Privacy />} />
//             <Route path="/terms" element={<Terms />} />
//             <Route path="/contact" element={<Contact />} />

//             {/* Protected Routes */}
//             <Route
//               path="/dashboard/*"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </Layout>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


// update 




// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CarDetails from './pages/CarDetails';
// import CarDetailsPublic from './pages/CarDetailsPublic';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard/index';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminReport from './pages/AdminReport';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';
// import Contact from './pages/Contact';
// import Cars from './pages/Cars';
// import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';
// import AuthPage from './components/AuthPage';
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Layout>
//           <Routes>
//             {/* 🌐 Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/cars" element={<Cars />} />
//             <Route path="/car/:id" element={<CarDetails />} />
//             <Route path="/car-public/:id" element={<CarDetailsPublic />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/privacy" element={<Privacy />} />
//             <Route path="/terms" element={<Terms />} />
//             <Route path="/contact" element={<Contact />} />

//             {/* 🔐 User Dashboard (login required) */}
//             <Route
//               path="/dashboard/*"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* 🔐 Admin Dashboard (admin only) */}
//             <Route
//               path="/dashboard/admin"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* 🔐 Admin Report Page (admin only) */}
//             <Route
//               path="/dashboard/report"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <AdminReport />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </Layout>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


//----update 2


//Users/salehalkarabubi/works/project/AutoMarket25/client/src/App.jsx


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CarDetails from './pages/CarDetails';
// import CarDetailsPublic from './pages/CarDetailsPublic';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard/index';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminReport from './pages/AdminReport';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';
// import Contact from './pages/Contact';
// import Cars from './pages/Cars';
// import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';
// import AuthPage from './components/AuthPage';
// import AdminLogin from './pages/AdminLogin'; // ⬅️ Admin-Login-Seite
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Layout>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/cars" element={<Cars />} />
//             <Route path="/car/:id" element={<CarDetails />} />
//             <Route path="/car-public/:id" element={<CarDetailsPublic />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/admin-login" element={<AdminLogin />} />
//             <Route path="/privacy" element={<Privacy />} />
//             <Route path="/terms" element={<Terms />} />
//             <Route path="/contact" element={<Contact />} />

//             {/* Protected User Dashboard */}
//             <Route
//               path="/dashboard/*"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Admin-Only Routes */}
//             <Route
//               path="/dashboard/admin"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/dashboard/report"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <AdminReport />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </Layout>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


//-------update 3

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/App.jsx

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CarDetails from './pages/CarDetails';
// import CarDetailsPublic from './pages/CarDetailsPublic';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard/index';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminReport from './pages/AdminReport';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';
// import Contact from './pages/Contact';
// import Cars from './pages/Cars';
// import Layout from './components/Layout';
// import ProtectedRoute from './components/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';
// import AuthPage from './components/AuthPage';
// import AdminLogin from './pages/AdminLogin'; // ⬅️ Admin-Login-Seite
// import { Toaster } from 'react-hot-toast'; // ✅ Import toast
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Toaster position="top-center" /> {/* ✅ Toast global component */}
//         <Layout>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/cars" element={<Cars />} />
//             <Route path="/car/:id" element={<CarDetails />} />
//             <Route path="/car-public/:id" element={<CarDetailsPublic />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/admin-login" element={<AdminLogin />} />
//             <Route path="/privacy" element={<Privacy />} />
//             <Route path="/terms" element={<Terms />} />
//             <Route path="/contact" element={<Contact />} />

//             {/* Protected User Dashboard */}
//             <Route
//               path="/dashboard/*"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Admin-Only Routes */}
//             <Route
//               path="/dashboard/admin"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/dashboard/report"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <AdminReport />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </Layout>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


//-------update 4



