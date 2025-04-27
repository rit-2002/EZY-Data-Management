'use client';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useTheme } from '../../context/ThemeContext';
import MainContent from '../../components/SettingComponent/MainContent';

const Customise = () => {
  const { isDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout>
      <div className={`flex flex-col md:flex-row min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>

        {/* Main Content Section */}
        <div 
          className={`flex-1 p-6 transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-[280px]'} mt-[66px]`}
        >
          <div className={`max-w-[1400px] mx-auto ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <div className="flex flex-col w-full">
              <MainContent />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customise;
