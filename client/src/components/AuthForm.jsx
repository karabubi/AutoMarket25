//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthForm.jsx

import BaseForm from "./BaseForm";
import { login as apiLogin, register as apiRegister } from "../utils/api";

const AuthForm = ({ isLogin }) => {
  const fields = [
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "password", type: "password", placeholder: "Password", required: true },
  ];

  const handleAuthSubmit = async (data) => {
    if (isLogin) {
      const res = await apiLogin(data);
      // your app already handles token in Login.jsx/AuthPage usually
      // keep this simple:
      localStorage.setItem("token", res.data.token);
      alert("✅ Login successful");
      return;
    }

    const res = await apiRegister(data);
    localStorage.setItem("token", res.data.token);
    alert("✅ Registration successful");
  };

  return (
    <BaseForm
      fields={fields}
      onSubmit={handleAuthSubmit}
      buttonText={isLogin ? "Login" : "Register"}
    />
  );
};

export default AuthForm;
