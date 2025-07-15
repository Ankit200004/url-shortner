import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";
import { loginUser } from "../apis/user.api.js";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("modiankit201@gmail.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(password, email);
      console.log(data);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
      console.log("signin success");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-emerald-200 rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-emerald-600 mb-8">
        Welcome Back 👋
      </h2>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      {/* Email Field */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block text-gray-800 text-sm font-medium mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm placeholder-gray-400 transition-all"
          required
        />
      </div>

      {/* Password Field */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-800 text-sm font-medium mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm placeholder-gray-400 transition-all"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {/* Switch to Register */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => state(false)}
            className="text-emerald-600 font-semibold hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
