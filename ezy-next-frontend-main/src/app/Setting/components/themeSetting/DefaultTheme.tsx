import { useTheme } from "../../../context/ThemeContext";

const DefaultTheme = () => {
  const {defaultColor, updateDefaultColor} = useTheme()

  const rows = [
    ["#CB4154", "#F0F0F0", "#FF007F", "#1C6BA0"],
    ["#57FF81", "#72A38A", "#3DCAB5", "#ff7777"],
  ];

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-3xl mt-4 mb-4 w-full">
      {rows.map((colors, rowIndex) => (
        <div key={rowIndex} className="flex gap-x-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full relative overflow-hidden cursor-pointer ${defaultColor === color ? 'ring-2 ring-offset-2' : ''}`}
              onClick={() => updateDefaultColor(color)}
              style={{ 
                backgroundColor: color,
                boxShadow: defaultColor === color ? `0 0 9px 3px ${color}` : "none",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DefaultTheme;
