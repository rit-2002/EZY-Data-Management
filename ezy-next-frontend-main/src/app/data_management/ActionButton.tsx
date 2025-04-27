export const ActionButton = ({ icon, color, label, onClick }) => {
  const colors = {
    blue: {
      base: "bg-blue-100",
      hover: "hover:bg-blue-500",
      text: "text-blue-500",
    },
    green: {
      base: "bg-green-100",
      hover: "hover:bg-green-500",
      text: "text-green-500",
    },
    red: {
      base: "bg-red-100",
      hover: "hover:bg-red-500",
      text: "text-red-500",
    },
    
  };

  const colorClasses = colors[color] || colors.blue;

  return (
    <div
      className={`relative group flex items-center justify-center 
w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
${colorClasses.base} ${colorClasses.hover} 
rounded-full cursor-pointer transition-all duration-200`}
onClick={onClick}
    >
      <span className={`${colorClasses.text} group-hover:text-white`}>{icon}</span>
      <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-200">
        {label}
      </span>
    </div>
  );
};