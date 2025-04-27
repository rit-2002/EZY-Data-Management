'use client';
import Image from "next/image";
import Sign from "../../public/assets/SignUpLogo.png";
import Ezy from "../../public/assets/ezy.png";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { useTheme } from './context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Home = () => {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const getDescription = () => {
    return "Simplify your workflow and boost productivity with our powerful platform designed for modern teams.";
  };

  return (
    <div className={`${isDarkMode ? 'dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'} min-h-screen w-screen flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-4 z-10">
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg transition-all hover:scale-110"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-400 text-base sm:text-lg transform transition-transform hover:scale-110 animate-spin-slow" />
          ) : (
            <FaMoon className="text-gray-700 text-base sm:text-lg transform transition-transform hover:scale-110 animate-pulse" />
          )}
        </button>
      </div>

      <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-md shadow-2xl w-full h-screen flex flex-col md:flex-row items-center justify-center border border-gray-200 dark:border-gray-700`}>
        <div className="w-full md:w-7/12 p-4 sm:p-8 lg:p-16 flex flex-col justify-center relative">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-4 sm:mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Welcome to EZY
            </h1>
            <p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center mb-8 sm:mb-12 leading-relaxed transition-all duration-300`}>
              {getDescription()}
            </p>

            <div className="flex flex-col gap-4 sm:gap-6 max-w-md mx-auto">
              <Button
                onClick={() => router.push('/signup')}
                className={`w-full transform hover:scale-105 transition-all ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300'
                  } text-base sm:text-lg py-3 sm:py-4 rounded-xl font-semibold shadow-md hover:shadow-lg`}
              >
                Register
              </Button>
              <Button
                onClick={() => router.push('/login')}
                className={`w-full transform hover:scale-105 transition-all ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300'
                  } text-base sm:text-lg py-3 sm:py-4 rounded-xl font-semibold shadow-md hover:shadow-lg`}
              >
                Login
              </Button>
            </div>

            <p className={`text-center mt-8 sm:mt-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base md:text-lg`}>
              Experience the power of EZY - Your all-in-one productivity solution.
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 justify-center items-center p-4 sm:p-8 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative w-full max-w-lg transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-8">
              <Image src={Ezy} alt="Ezy Logo" className="mx-auto w-full mb-8 sm:mb-12 drop-shadow-xl" priority unselectable="on" />
              <Image src={Sign} alt="Welcome Image" className="mx-auto w-full drop-shadow-lg" priority />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;