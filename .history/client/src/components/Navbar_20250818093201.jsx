
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Navbar.jsx

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import logo from '../assets/logo.png';
// import { MoonIcon, SunIcon, ChevronDownIcon } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDark, setIsDark] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', isDark);
//   }, [isDark]);

//   const toggleDarkMode = () => setIsDark(!isDark);

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <nav className="bg-gray-900 text-white shadow fixed w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo + Brand */}
//           <Link to="/" className="flex items-center space-x-3">
//             <img src={logo} alt="AutoMarket25 Logo" className="h-20 w-auto object-contain" />
//             <span className="text-2xl font-bold text-blue-400 hidden sm:inline">AutoMarket25</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link to="/cars" className="hover:text-blue-400 transition">{t('navbar.cars')}</Link>
//             <Link to="/auth" className="hover:text-blue-400 transition">{t('navbar.login')}</Link>
//             <Link to="/dashboard" className="hover:text-blue-400 transition">{t('navbar.dashboard')}</Link>

//             {/* Dark Mode Toggle */}
//             <button onClick={toggleDarkMode} className="text-white hover:text-blue-400 transition" title="Toggle Dark Mode">
//               {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
//             </button>

//             {/* Language Selector */}
//             <select
//               onChange={(e) => changeLanguage(e.target.value)}
//               value={i18n.language}
//               className="bg-gray-800 border border-gray-600 text-sm rounded px-2 py-1 focus:outline-none"
//             >
//               <option value="en">EN</option>
//               <option value="de">DE</option>
//             </select>

//             {/* User Dropdown */}
//             <div className="relative">
//               <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
//                 <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-8 h-8 rounded-full border" />
//                 <ChevronDownIcon className="w-4 h-4" />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md overflow-hidden z-50">
//                   <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">{t('navbar.profile')}</Link>
//                   <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">{t('navbar.settings')}</Link>
//                   <button className="w-full text-left px-4 py-2 hover:bg-gray-100">{t('navbar.logout')}</button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none" aria-label="Toggle Menu">
//             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2">
//           <Link to="/cars" className="block py-2 hover:bg-gray-700 rounded">{t('navbar.cars')}</Link>
//           <Link to="/auth" className="block py-2 hover:bg-gray-700 rounded">{t('navbar.login')}</Link>
//           <Link to="/dashboard" className="block py-2 hover:bg-gray-700 rounded">{t('navbar.dashboard')}</Link>
//           <button onClick={toggleDarkMode} className="block py-2 hover:bg-gray-700 rounded w-full text-left">
//             {isDark ? t('navbar.light') : t('navbar.dark')}
//           </button>
//           <div>
//             <select
//               onChange={(e) => changeLanguage(e.target.value)}
//               value={i18n.language}
//               className="w-full bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
//             >
//               <option value="en">English</option>
//               <option value="de">Deutsch</option>
//             </select>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;








