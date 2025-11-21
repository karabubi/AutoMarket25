//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthForm.jsx
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
