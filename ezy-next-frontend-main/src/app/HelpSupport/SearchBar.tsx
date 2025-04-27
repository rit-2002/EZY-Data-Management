"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    const { isDarkMode } = useTheme();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="w-full flex justify-center mt-6">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className={`w-full max-w-md px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                    }`}
                placeholder="Search Help & Support..."
            />
        </div>
    );
};

export default SearchBar;
