import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/store";

import { setTheme } from "../store/features/themeSlice";

const SwitchThemeButton = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    if (theme === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  return (
    <button
      aria-label="Toogle Theme Button"
      className="btn btn-outline-secondary text-blue-950 dark:text-blue-100  justify-self-end hover:scale-125 transition-all text-xl"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default SwitchThemeButton;
