import React from "react";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md border-b border-emerald-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left - Logo / Brand */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-2xl font-extrabold text-emerald-600 tracking-tight hover:text-emerald-800 transition-colors"
            >
              URL Shortener
            </Link>
          </div>

          {/* Right - Auth / Links */}
          <div className="flex items-center space-x-4">
            {/* Example when user is logged in (replace with real auth logic) */}
            {/* {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            ) : ( */}
            <Link
              to="/auth"
              className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
            {/* )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
