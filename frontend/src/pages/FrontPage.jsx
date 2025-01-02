import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function FrontPage() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="bg-black text-white flex flex-col justify-center items-center h-screen gap-8">
      <div className="text-center">
        <h1 className="text-2xl">Welcome to Secure User Authentication 🔐</h1>
        <h4 className="text-xl mt-2">Thank you for visiting our website 😀</h4>
        <h1 className="text-3xl mt-4">❤️💜</h1>
      </div>
      <nav className="flex gap-6">
        <Link
          to="/signup"
          className="text-lg font-medium bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg"
          aria-label="Go to Signup Page"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="text-lg font-medium bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg"
          aria-label="Go to Login Page"
        >
          Login
        </Link>
      </nav>
    </div>
  );
}
