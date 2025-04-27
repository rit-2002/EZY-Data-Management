import { useTheme } from '../../context/ThemeContext';

const MainContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-lg mb-6`}>
      
    </div>
  );
};

export default MainContent;
