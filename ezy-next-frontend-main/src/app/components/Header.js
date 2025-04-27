import Image from "next/image";
const Header = () => {
    return  <header className="flex overflow-hidden flex-col justify-center items-start px-2 py-3 w-full bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pr-5 max-md:max-w-full">

    <Image loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a89382db9e2d2a853e33b23cf081ab0be861de07826abf6c64cfdcc311f058fd?placeholderIfAbsent=true&apiKey=c65deb9a8c8e4dacb9ff8d9c2ccdd566" alt="Company logo" className="object-contain max-w-full aspect-[3.22]  w-[212px]" />

  </header>
};

export default Header;
