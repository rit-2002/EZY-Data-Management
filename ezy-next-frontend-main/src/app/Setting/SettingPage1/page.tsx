'use client';
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const SettingPage1 = () => {
  const { isDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-[280px]'} mt-[66px]`}>
        <div className="max-w-[1418px] mx-auto">
          {/* Your SettingPage1 content here */}
        </div>
      </div>
    </div>
  );
};

export default SettingPage1;
