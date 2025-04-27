"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/ThemeContext";
import { axiosAPI } from "../api/axiosInstance";

const ForgotPassword = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme(); 
  const [email, setEmail] = useState("");

  const notifySuccess = () =>
    toast.success("Reset Password link sent to email!");
  const notifyError = (message: string) => toast.error(message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosAPI.post("/api/v1/auth/forgotPass", { email });

      if (response.status === 200) {
        setEmail(""); 
        notifySuccess();

       
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        notifyError("Failed to send reset link. Please try again.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      notifyError(errorMessage);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-black"
          }`}
      >
        <div
          className={`w-full max-w-lg sm:max-w-md shadow-lg rounded-lg p-6 sm:p-8 flex flex-col justify-between ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"
            }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-full px-12 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode
                  ? "border-gray-700 bg-gray-700 text-gray-200 focus:ring-blue-400"
                  : "border-gray-300 bg-white text-black focus:ring-blue-500"
                }`}
              required
            />
            <button
              type="submit"
              className={`w-full py-2 rounded-md transition-colors ${isDarkMode
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Reset Password
            </button>
          </form>

         
          <div className="flex justify-between mt-6">
            <button
              onClick={() => router.push("/login")}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-500 hover:underline"
            >
              Signup
            </button>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default ForgotPassword;
