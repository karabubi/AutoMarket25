//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthForm.jsx

// const AuthForm = ({ onSubmit, buttonText }) => (
//   <form onSubmit={onSubmit} className="max-w-sm mx-auto">
//     <input name="email" type="email" placeholder="Email" className="border p-2 w-full mb-2" required />
//     <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-2" required />
//     <button type="submit" className="bg-blue-500 text-white p-2 w-full">{buttonText}</button>
//   </form>
// );

// export default AuthForm;


//---------------------

import BaseForm from './BaseForm';
import axios from 'axios';

const AuthForm = ({ isLogin }) => {
  const fields = [
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true },
  ];

  const handleAuthSubmit = async (data) => {
    const endpoint = isLogin ? 'login' : 'register';
    await axios.post(`http://localhost:5001/api/auth/${endpoint}`, data);
    alert('✅ Auth successful');
  };

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleAuthSubmit}
      buttonText={isLogin ? 'Login' : 'Register'}
    />
  );
};

export default AuthForm;
