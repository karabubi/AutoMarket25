//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Login.jsx

// import { useState } from 'react';
// import { useAuth } from '/src/context/AuthContext.jsx';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5001/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       login(data.user);
//       localStorage.setItem('token', data.token);
//       setSuccess('✅ Login successful! Redirecting...');
//       setTimeout(() => navigate('/dashboard'), 1500); // redirect after 1.5 sec
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       {success && <p className="text-green-500 mb-2">{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-2 p-2 border w-full"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-2 p-2 border w-full"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full ${
//             loading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from 'react';
import { useAuth } from '/src/context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { MoonIcon, SunIcon } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.user);
      localStorage.setItem('token', data.token);
      setSuccess('✅ Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start px-4 pt-24 transition-colors duration-500">
      {/* Dark Mode Toggle */}
      <div className="flex justify-end w-full max-w-md mb-6 px-2">
        <button
          onClick={toggleDarkMode}
          className="text-gray-800 dark:text-white bg-white/50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/70 dark:hover:bg-white/20 transition"
        >
          {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-white/30 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-lg shadow-2xl p-6 md:p-8 transition-all duration-500">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
