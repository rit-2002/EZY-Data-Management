
import React, { useState } from 'react';

const ToggleButton: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex px-1 py-0.5  min-h-[9px] rounded-[50px]">
      <div className="flex flex-col flex-1 shrink items-start px-4 w-full basis-0">
        <div className="flex z-10 justify-center bg-gray-200 rounded-[100px] border-black items-center p-1 mt-0 max-md:-mr-3">
          <button
            className={`flex flex-col justify-center items-center self-stretch p-1my-auto rounded-[100px] transition-all duration-300 ${
              isToggled ? 'bg-sky-700 '  : ''
            }`}
            onClick={handleToggle}
            aria-label="Toggle"
            aria-pressed={isToggled}
          >
            <div
              className={`mr-8 w-6 h-[1px] bg-white rounded-3xl min-h-[24px] transition-transform duration-200 ${
                isToggled ? 'transform translate-x-6' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
