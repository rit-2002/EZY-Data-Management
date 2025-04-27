"use client";
import React, { useState } from "react";

const SettingTab = () => {
  const [options, setOptions] = useState({
    "": {
      "Global Setting": true,
      "Integrations": true,
      "Campaign Mapping": true,
      "Channel Manager": true,
      "Segment Manager": true,
      "Content Grouping": true,
    }
  });

  const handleCheckboxChange = (section, option) => {
    setOptions((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [option]: !prevState[section][option],
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(options);
  };

  return (
    <div className="flex justify-start pl-12 ">
      <div className="w-[900px] max-w-[1000px] p-6 bg-gray-200 rounded-lg shadow-md">

        <form onSubmit={handleSubmit} className="space-y-4 ">
          {Object.entries(options).map(([section, options]) => (
            <div key={section} className="space-y-2">
              <ul className="space-y-2 pl-10">
                {Object.entries(options).map(([option, isChecked]) => (
                  <li key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option}
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(section, option)}
                      className="mr-2"
                    />
                    <label htmlFor={option} className="text-sm text-black">
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex justify-center">
            <button type="submit" className="overflow-hidden self-center px-10 py-5 mt-12 max-w-full text-2xl font-semibold text-white whitespace-nowrap rounded-3xl border border-solid bg-[#1C6BA0] border-stone-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[152px] max-md:px-5 max-md:mt-10 hover:bg-[]">
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingTab;
