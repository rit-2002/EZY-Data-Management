"use client";
import React from 'react';

const ContactForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
  };

  const ContactDetails = () => (
    <>
      <div className="ml-5 text-2xl font-bold leading-none max-md:ml-2.5">
        Contact Details
      </div>
      <div className="mt-1.5 ml-5 leading-loose text-slate-500 max-md:max-w-full">
        Please fill in your information so we can get in touch with you.
      </div>
      <div className="shrink-0 self-stretch mt-4 h-px border border-solid bg-zinc-200 border-zinc-200" />
    </>
  );

  const InputField = ({
    label,
    name,
    placeholder,
  }: {
    label: string;
    name: string;
    placeholder: string;
  }) => (
    <div className="flex flex-col mt-5 ml-5 max-md:ml-2.5">
      <label htmlFor={name} className="mt-12 max-md:mt-10">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className="px-5 py-6 mt-2 bg-white border border-gray-100 shadow-sm rounded-[46px] text-slate-500 w-[284px] max-md:ml-2.5 focus:outline-none focus:ring focus:ring-indigo-500"
      />
    </div>
  );

  const SubmitButton = () => (
    <button
      type="submit"
      className="gap-2 self-stretch px-10 pt-5 pb-5 mt-12 ml-4 text-2xl leading-none text-center text-white whitespace-nowrap rounded-[56px] shadow-[0px_3px_12px_rgba(74,58,255,0.18)] max-md:px-5 max-md:mt-10 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Submit
    </button>
  );

  return (
    <div className="flex flex-col items-center font-bold max-w-[700px] text-indigo-950">
      <h1 className="z-10 mt-0 text-4xl leading-none text-center">
        Post Your Requirements
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start self-stretch px-12 pt-6 pb-24 mt-3.5 w-full text-lg font-medium leading-none border border-gray-100 shadow-lg bg-stone-50 rounded-[34px] max-md:px-5 max-md:max-w-full"
      >
        <ContactDetails />
        <InputField label="Name" name="name" placeholder="Your Name" />
        <InputField label="Phone Number" name="phone" placeholder="(123) 456 - 7890" />
        <InputField label="Email" name="email" placeholder="Your Mail ID" />
        <InputField label="Date" name="date" placeholder="dd - mm - yyyy" />
        <SubmitButton />
      </form>
    </div>
  );
};

export default ContactForm;
