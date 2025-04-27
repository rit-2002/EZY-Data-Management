import React from 'react';

function FormInput({ id, placeholder }) {
  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="overflow-hidden p-5  rounded-3xl border border-solid bg-white bg-opacity-80 border-stone-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pr-5"
      aria-label={placeholder}
    />
  );
}

export default FormInput;