"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../../context/ThemeContext";
import { fetchProfile, updateProfile } from "../../../api/profileAPI";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    Orgname: string;
}

const ProfileSetting: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        Orgname: "",
    });
    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        Orgname: "",
    });
    const { theme, primaryColor, defaultColor } = useTheme();

    const notifySuccess = () => toast.success("Profile updated successfully!");
    const notifyError = (message: string) => toast.error(message);

    useEffect(() => {

        const loadInitialData = async () => {
            const data = await fetchProfile();

            if (data) {
                setFormData(data);
            } else {
                notifyError(`Failed to load profile`);
            }
        };

        loadInitialData();
    }, []);

    const validateInput = (name: string, value: string) => {
        let error = "";
    
        switch (name) {
            case "first_name":
            case "last_name":
                if (!/^[A-Za-z]+$/.test(value)) {
                    error = "Name must contain only alphabets.";
                } else if (value.length < 2) {
                    error = "Name must be at least 2 characters long.";
                }
                break;
            case "Orgname":
                if (!value.trim()) {
                    error = "Organization name is required.";
                }
                break;
            case "email":
                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                    error = "Invalid email address.";
                }
                break;
            default:
                break;
        }
    
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        return error === "";
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (validateInput(name, value)) {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const isValid = Object.keys(formData)
            .filter((key) => key !== "email")
            .every((key) => validateInput(key, formData[key as keyof FormData]));
    
        if (!isValid) {
            notifyError("Please fix validation errors before submitting.");
            return;
        }
    
        const response = await updateProfile(formData);
    
        if ('status' in response && response.status === 200) {
            notifySuccess();
        } else {
            notifyError(`Failed to update profile`);
        }
    };
    

    return (
        <>
            <div className="max-w-7/12 mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Profile Details
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 p-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-primary-600"
                                required
                            />
                            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-primary-600"
                                required
                            />
                            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-primary-600"
                                disabled
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Organization
                            </label>
                            <input
                                type="text"
                                name="Orgname"
                                value={formData.Orgname}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-primary-600"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-10 p-2">
                        <button
                            type="submit"
                            className="w-full py-2 px-5 active:scale-95 active:bg-opacity-90 transition-all duration-300 rounded-lg font-medium focus:outline-none"
                            style={{ backgroundColor: theme === "custom" ? primaryColor : defaultColor }}
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
            />
        </>
    );
};

export default ProfileSetting;
