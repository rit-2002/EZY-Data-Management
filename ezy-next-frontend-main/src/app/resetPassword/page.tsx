"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { axiosAPI } from "../api/axiosInstance";

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState(""); 
  const [token, setToken] = useState<string | null>(null); 
  const [showPassword, setShowPassword] = useState(false);

 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);

 
  const notifySuccess = () => toast.success("Password reset successful!");
  const notifyError = (message: string) => toast.error(message);

 
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      notifyError("Invalid or missing token. Please use a valid reset link.");
      return;
    }

    try {
      const response = await axiosAPI.post(
        `/api/v1/auth/reset-password`,
        {
          new_password: newPassword,
        },
        {
          params: { token }, 
        }
      );

      if (response.status === 200) {
        notifySuccess();
        setTimeout(() => {
          router.push("/login"); 
        }, 2000);
      }
    } catch (error: any) {
      notifyError(
        error.response?.data?.message || "An error occurred while resetting the password."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} 
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)} 
            >
              {showPassword ? (
                <AiFillEye size={24} /> 
              ) : (
                <AiFillEyeInvisible size={24} /> 
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reset Password
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ResetPassword;
