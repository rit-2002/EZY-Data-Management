import React from 'react';
import { FcSearch } from 'react-icons/fc';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  isDarkMode: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isDarkMode }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className={`relative mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className={`w-[260px] py-2 pl-10 pr-4 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-[#1E6BA1] focus:border-transparent transition-colors`}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FcSearch className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
      </div>
    </div>
  );
};