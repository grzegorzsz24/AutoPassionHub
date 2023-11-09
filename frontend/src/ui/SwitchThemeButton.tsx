import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/store";

import { setTheme } from "../store/features/themeSlice";

const SwitchThemeButton = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    theme === "light"
      ? dispatch(setTheme("dark"))
      : dispatch(setTheme("light"));
  };

  const buttonClasses =
    "btn btn-outline-secondary text-blue-950 dark:text-blue-100  justify-self-end hover:scale-125 transition-all text-xl xl:text-2xl";

  return (
    <button
      aria-label="Przycisk zmiany motywu"
      className={buttonClasses}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default SwitchThemeButton;
