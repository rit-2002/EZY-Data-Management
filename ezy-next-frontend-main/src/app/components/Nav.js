'use client'; 

import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaSignOutAlt,
  FaCog,
  FaSearch,
  FaChartBar,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import { useActiveTab } from '../context/ActiveTabContext'; 
import { logout } from '../api/authAPI';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const { setActiveTab } = useActiveTab(); 

  
  useEffect(() => {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleNavigation = () => {
    setActiveTab('dashboardMain'); 
    router.push('/dashboardMain'); 
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center w-full h-[66px] ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      } px-4 shadow-[0_4px_20px_rgba(0,0,0,0.7)] z-40`}
    >
      
      <div className="flex items-center">
        <a href="../dashboardMain">
          <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
            Ezy
          </span>
          <span
            style={{ color: '#1C6BA0' }}
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold"
          >
            Metrics
          </span>
        </a>
      </div>

      
      <div className="hidden md:flex items-center space-x-3 mr-6">
       
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </form>

        
        <div
          onClick={handleNavigation}
          className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FaChartBar className="w-6 h-6 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
        </div>

        
        <button
          onClick={toggleDarkMode}
          className="focus:outline-none p-2 rounded-full bg-gray-300 dark:bg-gray-600"
        >
          {isDarkMode ? (
            <FaSun className="w-5 h-5 text-yellow-500" />
          ) : (
            <FaMoon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

     
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars className="w-8 h-8 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white" />
      </button>

    
      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-white dark:bg-gray-700 shadow-lg p-4 flex flex-col space-y-2 md:hidden">
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </form>

         
          <button
            onClick={toggleDarkMode}
            className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          >
            {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
