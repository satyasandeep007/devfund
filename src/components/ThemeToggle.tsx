import { useGlobalStore } from "@/app/Store";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useGlobalStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? (
        <IconSun size={20} aria-hidden="true" />
      ) : (
        <IconMoon size={20} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
