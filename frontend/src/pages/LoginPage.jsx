import React, { useState } from "react";
import Logo from "../components/Logo";
import Card from "../components/Card";
import landingBg from "../assets/landingPage.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./css/login.css";

const roles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const LoginPage = ({ setPage, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.role !== selectedRole) {
        setError(`Role mismatch. Your registered role is "${data.role}".`);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      setUserRole(data.role);
      setPage("dashboard");
    } catch (err) {
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Background Image */}
      <img
        src={landingBg}
        alt="Background"
        className="login-background absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="login-overlay absolute inset-0 bg-black bg-opacity-40" />

      {/* Close button */}
      <button
        onClick={() => setPage("landing")}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all backdrop-blur-md"
        aria-label="Close"
      >
        <XMarkIcon className="h-6 w-6 text-gray-800" />
      </button>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <Card
          className="p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-200 bg-white"
          darkMode={false} // Force light mode
          userRole="guest" // Avoid role-based dark theme
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo className="w-28 sm:w-36 h-auto" />
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-fadeIn"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Select Your Role
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`login-button w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Forgot password?{" "}
            <a
              href="#"
              className="text-indigo-500 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Reset it here
            </a>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              onClick={() => setPage("landing")}
              className="text-indigo-500 hover:underline font-medium"
            >
              Contact Sales
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
