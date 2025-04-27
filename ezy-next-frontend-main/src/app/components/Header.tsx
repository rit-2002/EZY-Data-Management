import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode } = useTheme();

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-lg mb-6`}>
      <h1 className="text-2xl font-bold">Customise</h1>
     
    </header>
  );
};

export default Header;
