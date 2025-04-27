import React from 'react';
import Header from '../../../components/Header'; // Adjusted path
import Content from '../../../components/SettingComponent/cmoMain';

const Settings = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-zinc-100 pb-[201px] max-md:pb-24">
      <Header />
      <div className="mt-2.5  w-full max-w-[1418px] max-md:max-w-full">
        <div className="flex gap-5ml-10  max-md:flex-col">
          <Content/>
        </div>
      </div>
    </div>
    
  );
};

export default Settings; 
