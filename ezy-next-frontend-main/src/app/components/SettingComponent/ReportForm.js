import React from 'react';
import FormInput from './FormInput';

function ReportForm() {
  return (
    <form className="flex overflow-hidden flex-col py-14 pr-55 pl-5   bg-white rounded-3xl shadow-md  max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 self-center   w-[919px]  max-md:mt-10">
        <label htmlFor="reportName" className=" my-auto ">Report name</label>
    <FormInput
        id="reportName"
        placeholder="Attribution Window"
        className="w-full "
    />
    <FormInput
        placeholder="Data Type"
        className="w-full"
    />
      </div>
      <div className="flex flex-wrap gap-10 self-center mt-12  max-w-full w-[919px] ml-[0px] max-md:mt-10">
        <div className="self-start mt-2.5 gap-20 mr-[43px]">Add link</div>
        <FormInput placeholder="Forward Attribution Window" />
        <FormInput placeholder="Data Type" />
      </div>
      <div className="flex flex-wrap gap-10 self-center mt-12 ml-5 max-w-full w-[925px]  max-md:mt-10">
        <FormInput placeholder="Months" />
        <FormInput placeholder="Economic Value" />
      </div>
      <button type="submit" className="overflow-hidden self-center px-10 py-5 mt-12 max-w-full text-2xl font-semibold text-white whitespace-nowrap rounded-3xl border border-solid bg-stone-300 border-stone-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[152px] max-md:px-5 max-md:mt-10 hover:bg-[#1C6BA0]">
        save
      </button>
    </form>
  );
}

export default ReportForm;