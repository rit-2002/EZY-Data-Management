import { useTheme } from "../../../context/ThemeContext";
import { MdColorLens } from "react-icons/md";
import CustomTheme from "./CustomTheme";
import DefaultTheme from "./DefaultTheme";

const ThemeSettings = () => {
  const { theme, updateTheme } = useTheme()

  const handleThemeChange = () => {
    if (theme === "custom") {
      updateTheme("default")
    } else {
      updateTheme("custom")
    }
  }

  return (
    <div className="w-7/12 min-w-60 mx-auto p-4 md:p-8 bg-white text-black rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-lg font-semibold mb-6 flex items-center sm:gap-4">
          <span className="text-lg sm:text-xl">
            <MdColorLens size={24} />
          </span>
          <span className="text-base sm:text-lg">Theme</span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <label className="cursor-pointer flex items-center gap-4">
            <input
              type="checkbox"
              className="hidden"
              onChange={handleThemeChange}
            />
            <span className={`transition-all duration-500 ease-in ${theme !== 'default' ? 'opacity-70' : ''}`}>
              Default
            </span>
            <div className="w-16 p-1 rounded-full bg-gray-300">
              <div className={`shadow-sm rounded-full transition-all duration-500 ease-in text-white ${theme === "custom" ? 'translate-x-8' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-[#1C6BA0] z-1"></div>
              </div>
            </div>
            <span className={`transition-all duration-300 ease-in ${theme !== 'custom' ? 'opacity-70' : ''}`}>
              Custom
            </span>
          </label>
        </div>

        <div className="justify-center overflow-x-auto">
          {
            theme === "default" ? (
              <DefaultTheme />
            ) : (
              <CustomTheme />
            )
          }
        </div>
        {/* <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg w-full sm:w-auto">Save</button> */}
      </div>
    </div>
  )
};

export default ThemeSettings