import React, { useState } from "react";
import { registerUser } from "../apis/user.api";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(name, password, email);
      setLoading(false);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white/80 backdrop-blur-md border border-emerald-200 rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-emerald-600 mb-8">
        Create an Account
      </h2>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      {/* Name Field */}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-gray-800 text-sm font-medium mb-2"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-emerald-300 bg-white rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm placeholder-gray-400 transition-all"
          required
        />
      </div>

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
          className="w-full px-4 py-3 border border-emerald-300 bg-white rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm placeholder-gray-400 transition-all"
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
          className="w-full px-4 py-3 border border-emerald-300 bg-white rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm placeholder-gray-400 transition-all"
          required
          minLength={6}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      {/* Switch to Login */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => state(true)}
            className="text-emerald-600 font-semibold hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
