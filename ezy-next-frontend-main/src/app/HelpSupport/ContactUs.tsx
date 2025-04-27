"use client";
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { sendContactForm } from "../api/helpandsupportAPI";

const ContactUsButton: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const notifySuccess = () => toast.success("Message sent successfully!");
    const notifyError = (message: string) => toast.error(message);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formBody = new FormData();
        formBody.append("name", formData.name);
        formBody.append("email", formData.email);
        formBody.append("message", formData.message);

        const status = await sendContactForm(formBody);

        if (status === 200) {
            notifySuccess();
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => {
                setIsModalOpen(false);
            }, 3000);
        } else {
            notifyError("Network response was not ok.");
        }
    };

    return (
        <div className="relative">
            <button
                onClick={toggleModal}
                className="fixed top-20 right-4 md:right-14 text-white  hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 flex items-center justify-center space-x-2 bg-[#1C6BA0] dark:hover:bg-blue-500 dark:focus:ring-blue-800 z-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M12,20H0v-3.5c0-2.4,1.3-4.5,3.2-5.6C2.5,10.2,2,9.2,2,8.1c0-2.2,1.8-4,4-4s4,1.8,4,4c0,1.1-0.4,2.1-1.2,2.8c1.9,1.1,3.2,3.3,3.2,5.6V20z M2,18h8v-1.5c0-2.4-1.8-4.5-4-4.5c-2.1,0-4,2.1-4,4.5V18z M6,6C4.9,6,4,6.9,4,8s0.9,2,2,2s2-0.9,2-2S7.1,6,6,6z M24,17H14v-2h10V17z M21,13h-7v-2h7V13z M24,9H14V7h10V9z" />
                </svg>
                <span className="hidden lg:inline">Contact Us</span>
            </button>

            {isModalOpen && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center bg-gray-800 bg-opacity-50"
                    aria-hidden={!isModalOpen}
                >
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Contact Form
                            </h3>
                            <button onClick={toggleModal}>
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-gray-600 border rounded-lg p-2.5 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-gray-600 border rounded-lg p-2.5 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-gray-600 border rounded-lg p-2.5 text-gray-900 dark:text-white"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#1C6BA0] hover:bg-blue-800 text-white font-medium rounded-lg p-2.5"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsButton;
