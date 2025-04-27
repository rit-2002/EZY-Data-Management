
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
const tabs = [
  { name: "GENERAL SETTINGS", link: "/Setting/SettingPage1" },
  { name: "CUSTOM DASHBOARD", link: "/Setting/SettingPage2" },
  { name: "SIDEBAR SETTINGS", link: "/Setting/SettingPage4/Insight " },
  { name: "THEME SETTINGS", link: "/Setting/SettingPage3" }
];


function SettingsTabs() {
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-wrap gap-9 mb-5">
        {tabs.map((tab, index) => (
          <Link key={index} href={tab.link} passHref>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="flex flex-col hover:text-[#1C6BA0] cursor-pointer"
            >
              <div>{tab.name}</div>
              <div className="mt-3.5 border-2 border-solid border-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[200px] mr-1" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SettingsTabs;
