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
