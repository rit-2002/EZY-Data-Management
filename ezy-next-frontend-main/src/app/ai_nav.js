"use client"; // Ensures this file runs on the client side

import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { SiAdobeillustrator } from "react-icons/si"; // AI Icon

import PropTypes from "prop-types"; // For type-checking props
import axios from "axios";

const AiNavbar = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInitials, setUserInitials] = useState("");

  // Fetch user data to get initials
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/users/me",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const { first_name, last_name } = response.data;
        const initials = `${first_name.charAt(0).toUpperCase()}${last_name
          .charAt(0)
          .toUpperCase()}`;
        setUserInitials(initials);
      } catch (error) {
        console.error(
          "API Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center w-full h-[65px] bg-gray-200 text-black px-4 shadow-[0_4px_20px_rgba(0,0,0,0.7)] z-40">
        {/* Logo Section */}
        <div className="flex items-center">
          <a href="../dashboardMain">
            <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
              Ezy
            </span>
            <span
              style={{ color: "#1C6BA0" }}
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold"
            >
              Metrics
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 mr-6">
          {/* AI Icon Button */}
          <button className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-600 text-white font-bold text-lg">
            <SiAdobeillustrator className="text-white text-2xl" />
          </button>

          {/* Profile Button with User Initials */}
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">
            {userInitials}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars className="w-8 h-8 text-gray-600 hover:text-gray-800" />
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-white shadow-lg p-4 flex flex-col space-y-2 md:hidden">
            {/* AI Icon Button */}
            <button className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-600 text-white font-bold text-lg">
              <SiAdobeillustrator className="text-white text-2xl" />
            </button>

            {/* Profile Button with User Initials */}
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">
              {userInitials}
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">{children}</div>
    </>
  );
};

AiNavbar.propTypes = {
  children: PropTypes.node,
};

export default AiNavbar;
