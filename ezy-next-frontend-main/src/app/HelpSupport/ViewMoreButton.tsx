"use client";
import React, { useState } from "react";

interface ViewMoreButtonProps {
    title: string;
    detailedDescription: string;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({ title, detailedDescription }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="relative flex flex-col justify-between h-full">
            <button
                onClick={handleModalToggle}
                className="text-white bg-[#1C6BA0] hover:bg-blue-600 focus:ring-4 focus:outline-none mt-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-3 py-1.5 text-center dark:bg-[#1C6BA0] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {isModalOpen ? "Close Details" : "View More"}
            </button>

            {isModalOpen && (
                <div
                    className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10"
                    aria-hidden={!isModalOpen}
                    style={{ overflow: "hidden" }}
                >
                    <div
                        className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-6 md:mx-8 lg:mx-10"
                        style={{
                            maxHeight: "90vh",
                            overflowY: "hidden",
                        }}
                    >
                        <div className="flex justify-between items-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <button onClick={handleModalToggle}>
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
                        <p className="text-gray-700 dark:text-gray-300 mb-6 text-justify">
                            {detailedDescription}
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={handleModalToggle}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewMoreButton;
