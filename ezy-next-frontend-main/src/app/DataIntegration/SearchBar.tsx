import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { memo, useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeTable: string;
}

const SearchBarComponent = ({
  searchTerm,
  setSearchTerm,
  activeTable,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4 flex justify-end">
      <div
        className={`relative flex items-center rounded-lg transition-all duration-300 ${
          isFocused
            ? "w-full sm:w-96 md:w-72 ring-2 ring-blue-500 bg-white dark:bg-gray-700 dark:border dark:border-gray-600"
            : "w-10 sm:w-64 md:w-48 bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-600"
        }`}
      >
        <button
          onClick={() => setIsFocused(true)}
          className={`flex items-center justify-center w-10 h-10 ${
            isFocused ? "hidden" : "block"
          }`}
        >
          <AiOutlineSearch className="text-gray-500 dark:text-gray-400 text-xl" />
        </button>
        <input
          type="text"
          placeholder={`Search ${
            activeTable === "table1" ? "accounts" : "integrations"
          }...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full py-2 px-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 ${
            isFocused ? "block" : "hidden sm:block"
          }`}
        />
        
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full mr-1 transition-colors"
          >
            <AiOutlineClose className="text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export const SearchBar = memo(SearchBarComponent);