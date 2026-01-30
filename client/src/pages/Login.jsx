
///Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../utils/api"; // ✅ use api.js

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await apiLogin({ email, password });
      const data = res.data;

      login(data.user);
      localStorage.setItem("token", data.token);

      setSuccess("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start px-4 pt-24 transition-colors duration-500">
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
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
