'use client';

import React from 'react';
import Nav from './Nav';
import { useTheme } from '../context/ThemeContext';
import GlobalChat from './GlobalChat';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute';

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();

  const noLayoutRoutes = ['/', '/login', '/signup', '/forgot_password', '/ai_generated'];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  if (isNoLayout) {
    return (
      <>
        <main>
          {children}
        </main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }

  return (
    <ProtectedRoute>
      <div className={isDarkMode ? 'dark' : ''}>
        <Nav />
        <Sidebar />
        <main>
          {children}
        </main>
        <GlobalChat />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
