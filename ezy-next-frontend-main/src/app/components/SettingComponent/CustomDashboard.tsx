
"use client"
import React from 'react';
import ToggleButton from './ToggleButton';

interface CustomDashboardProps {
  title: string;
}

const CustomDashboard: React.FC<CustomDashboardProps> = ({ title }) => {
  return (
    <section className="flex overflow-hidden flex-wrap gap-9 py-7 pr-20 pl-6 bg-white rounded-3xl shadow-md max-md:px-5">
      <h1 className="my-auto text-xl text-neutral-600">{title}</h1>
      <ToggleButton />
    </section>
  );
};

export default CustomDashboard;
