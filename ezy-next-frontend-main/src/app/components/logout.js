import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { FaSignOutAlt } from 'react-icons/fa';
const LogoutButton = () => {
    const { logout } = useAuth();
    return (
        <button
            onClick={logout}
            className="w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
            <FaSignOutAlt className="mr-2" /> Logout
        </button>
    );
};
export default LogoutButton;
