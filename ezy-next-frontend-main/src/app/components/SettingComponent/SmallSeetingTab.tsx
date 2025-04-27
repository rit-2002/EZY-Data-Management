
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tabs = [
  { name: "INSIGHTS", link: "./Insight" },
  { name: "DATA QUALITY", link: "./DataQuality" },
  { name: "SETTINGS", link: "./Setting" }
];

function Smalltabs() {
  return (
    <div className="flex flex-col p-5">
      <div className="flex  gap-9 mb-5">
        {tabs.map((tab, index) => (
          <Link key={index} href={tab.link} passHref>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="flex flex-col items-center text-center hover:text-[#1C6BA0] cursor-pointer"
            >
              <div>{tab.name}</div>
              <div className="mt-3.5  border-2 border-solid border-neutral-500 w-[150px]" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Smalltabs;
