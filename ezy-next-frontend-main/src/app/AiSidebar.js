"use client";
import React, { useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AiSidebar({ toggleSidebar, isCollapsed }) {
  return (
    <div
      className={`${
        isCollapsed ? "w-10" : "w-20"
      } h-screen bg-gradient-to-b from-[#1E6BA1] to-[#0B273B] flex flex-col items-center py-6 fixed top-auto left-0 transition-all duration-300 z-50`}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <span className="text-white text-xs font-bold text-center">
          {isCollapsed ? "EZY" : "EZY GPT"}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-blue-500 mb-8"></div>

      {/* Menu Item - Predictive Scoring */}
      <div className="flex flex-col items-center mb-6">
        <AiOutlineLineChart className="text-white text-2xl mb-2" />
        <span className="text-white text-xs text-center">
          {isCollapsed ? "" : "Predictive Scoring"}
        </span>
      </div>

      {/* Collapse Button */}
      <div className="mt-auto">
        <button
          className="text-white mb-14 p-4 rounded-full hover:bg-blue-600"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </div>
  );
}
