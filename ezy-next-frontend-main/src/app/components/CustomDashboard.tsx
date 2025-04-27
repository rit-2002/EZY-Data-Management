import React from "react";
import ToggleButton from "./ToggleButton";

interface CustomDashboardProps {
  title: 'CustomDashboard';
}

const CustomDashboard: React.FC<CustomDashboardProps> = ({ title }) => {
  return (
    <section className="flex overflow-hidden flex-col py-5 pr-20 pl-6   w-full bg-white rounded-3xl shadow-md max-md:px-5 h-20 max-md:pr-5 max-md:mt-10 ">
      <h1 className="my-auto w-[960px] text-xl text-neutral-600">{'Custom Dashboard'}</h1>
      <ToggleButton />
    </section>
  );
};

export default CustomDashboard;
