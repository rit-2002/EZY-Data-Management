import React from 'react';

const SaveButton: React.FC = () => {
  return (
    <button className="overflow-hidden self-center px-14 py-5 mt-8 max-w-full text-2xl font-semibold text-white whitespace-nowrap bg-sky-700 rounded-3xl border border-solid border-stone-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[152px] max-md:px-5">
      save
    </button>
  );
};

export default SaveButton;