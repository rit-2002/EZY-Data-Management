'use client';
import React, { useState } from 'react';
import SettingsTabs from '../../components/SettingComponent/SettingsTabs';
import { useTheme } from '../../context/ThemeContext';
import Layout from '../../components/Layout';

const SettingPage2 = () => {
  const { isDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Layout>
      <div className={`flex flex-col md:flex-row min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-[280px]'} mt-[66px]`}>
          <div className="mt-2.5 w-full max-w-[1418px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col mt-8 w-full text-xl text-neutral-400 max-md:mt-10 max-md:max-w-full">
                <SettingsTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingPage2;