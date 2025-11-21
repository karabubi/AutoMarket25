
//------update 1

//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/AdminLogin.jsx


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';


// const AdminLogin = () => {
//  const { login } = useAuth();
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const [error, setError] = useState('');
//  const navigate = useNavigate();


//  const handleAdminLogin = async (e) => {
//    e.preventDefault();
//    setError('');


//    try {
//      const res = await fetch('http://localhost:5001/api/auth/login', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ email, password }),
//      });


//      const data = await res.json();


//      if (!res.ok) throw new Error(data.message || 'Login failed');


//      // ✅ Check if user is admin (data includes user info directly)
//      if (!data.is_admin) {
//        throw new Error('Access denied: not an admin');
//      }


//      localStorage.setItem('token', data.token);
//      login(data); // ✅ Save full user data (with is_admin and token)
//      navigate('/dashboard/admin');
//    } catch (err) {
//      setError(err.message);
//    }
//  };


//  return (
//    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//      <form
//        onSubmit={handleAdminLogin}
//        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
//      >
//        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Admin Login</h2>
//        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
//        <div className="mb-4">
//          <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">Email</label>
//          <input
//            type="email"
//            className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
//            value={email}
//            onChange={(e) => setEmail(e.target.value)}
//            required
//          />
//        </div>
//        <div className="mb-6">
//          <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">Password</label>
//          <input
//            type="password"
//            className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
//            value={password}
//            onChange={(e) => setPassword(e.target.value)}
//            required
//          />
//        </div>
//        <div className="flex items-center justify-between">
//          <button
//            type="submit"
//            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
//          >
//            Login as Admin
//          </button>
//        </div>
//      </form>
//    </div>
//  );
// };


// export default AdminLogin;


//--------update 2 

