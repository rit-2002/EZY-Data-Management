import React from 'react';

interface NavbarSectionProps {
  title: string;
  subtitle?: string;
}

const NavbarSection: React.FC<NavbarSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col">
      <div className={`${subtitle ? 'self-start font-medium text-black' : 'text-neutral-400'}`}>
        {title}
      </div>
      {subtitle && (
        <>
          <div className="mt-14 text-neutral-400 max-md:mt-10">{subtitle}</div>
          <div className="shrink-0 mt-3.5 h-0 border-2 border-solid border-neutral-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[84px] max-md:mr-0.5" />
        </>
      )}
      {!subtitle && (
        <div className="shrink-0 mt-3 h-0 border-2 border-solid border-neutral-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[130px] max-md:mr-0.5" />
      )}
    </div>
  );
};

export default NavbarSection;