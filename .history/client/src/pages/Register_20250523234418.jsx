//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Register.jsx

// import { useState } from 'react';
// import AuthForm from '../components/AuthForm';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     const form = new FormData(e.target);
//     const userData = {
//       name: form.get('name'),
//       email: form.get('email'),
//       password: form.get('password'),
//     };

//     try {
//       await register(userData);
//       setSuccess('✅ Registration successful! Redirecting to login...');
//       setTimeout(() => navigate('/login'), 1500); // Redirect after 1.5 sec
//     } catch (err) {
//       setError(err.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       {success && <p className="text-green-500 mb-2">{success}</p>}
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="mb-2 p-2 border w-full"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="mb-2 p-2 border w-full"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
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
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
