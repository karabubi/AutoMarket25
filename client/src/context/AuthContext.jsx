//Users/salehalkarabubi/works/project/AutoMarket25/client/src/context/AuthContext.jsx


import { createContext, useContext, useState } from "react";
import { register as apiRegister } from "../utils/api"; // ✅ use api.js (works in prod + dev)

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ keep existing function
  const login = (userData) => {
    setUser(userData);
  };

  // ✅ keep existing function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // ✅ keep existing function name + return shape
  // ✅ remove localhost and use api.js instead
  const register = async (userData) => {
    try {
      const res = await apiRegister(userData);
      return res.data; // returns { user, token }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed";
      throw new Error(msg);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


