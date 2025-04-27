import React from 'react';

const ProductionCard = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((item, index) => (
        <div key={index} className="relative w-72 h-72">
          <div className="absolute top-0 left-0 w-full h-10 bg-blue-500 rounded-tl-2xl rounded-tr-2xl" />
          <div className="absolute top-10 left-0 w-full h-[calc(100%-10px)] bg-white rounded-bl-2xl rounded-br-2xl shadow-md">
            <div className="text-center text-black text-2xl font-medium font-['Roboto'] mt-12">
              Box {item}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default ProductionCard;

