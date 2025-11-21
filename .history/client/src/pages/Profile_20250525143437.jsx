

// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Profile.jsx
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Profile.jsx



// import { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import defaultAvatar from '../images/logo.png';

// function Profile() {
//   const { currentUser, setCurrentUser } = useContext(AuthContext);
//   const [name, setName] = useState(currentUser?.name || '');
//   const [email, setEmail] = useState(currentUser?.email || '');
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('email', email);
//       if (avatarFile) formData.append('avatar', avatarFile);

//       const response = await fetch('http://localhost:5001/api/profile', {
//         method: 'PUT',
//         body: formData,
//         credentials: 'include',
//       });

//       if (!response.ok) throw new Error('Failed to update profile');
//       const updated = await response.json();

//       setCurrentUser((prev) => ({
//         ...prev,
//         name: updated.name,
//         email: updated.email,
//         avatar: updated.avatarUrl || prev.avatar,
//       }));

//       setMessage('✅ Profile updated successfully!');
//     } catch (err) {
//       setMessage('❌ Error updating profile.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">👤 My Profile</h1>

//       <div className="flex justify-center mb-4">
//         <img
//           src={currentUser?.avatar || defaultAvatar}
//           alt="Avatar"
//           className="w-24 h-24 rounded-full border object-cover"
//           onError={(e) => {
//             e.currentTarget.src = defaultAvatar;
//           }}
//         />
//       </div>

//       {message && (
//         <div className={`mb-4 text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Change Avatar</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full text-sm"
//             onChange={(e) => setAvatarFile(e.target.files[0])}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-60"
//           disabled={loading}
//         >
//           {loading ? 'Saving...' : 'Save Changes'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Profile;



// Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Profile.jsx

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import defaultAvatar from '../images/logo.png'; // ✅ Make sure logo.png exists in /images

function Profile() {
  const { user: currentUser, login } = useAuth(); // useAuth instead of useContext(AuthContext)
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (avatarFile) formData.append('avatar', avatarFile);

      const response = await fetch('http://localhost:5001/api/profile', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const updated = await response.json();

      // Update context via login()
      login({
        ...currentUser,
        name: updated.name,
        email: updated.email,
        avatar: updated.avatarUrl || currentUser.avatar,
      });

      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      setMessage('❌ Error updating profile.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">👤 My Profile</h1>

      <div className="flex justify-center mb-4">
        <img
          src={currentUser?.avatar || defaultAvatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultAvatar;
          }}
        />
      </div>

      {message && (
        <div className={`mb-4 text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Change Avatar</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
