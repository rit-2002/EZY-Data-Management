import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SettingsTabs = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow`}>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
     
      <p>Settings tabs content goes here.</p>
    </div>
  );
};

export default SettingsTabs;
