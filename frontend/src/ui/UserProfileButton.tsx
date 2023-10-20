import { useAppDispatch, useAppSelector } from "../store/store";

import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { clearUser } from "../store/features/userSlice";
import { useState } from "react";

const UserProfileButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const { firstName, lastName } = useAppSelector((state) => state.user);

  const logout = () => {
    dispatch(clearUser());
  };

  const handleMouseOver = () => setIsHovering(true);

  const handleMouseOut = () => setIsHovering(false);

  return (
    <div
      className="relative"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button className="flex items-center gap-2 py-2 text-blue-900 dark:text-blue-50 relative group">
        <img
          src="anonim.webp"
          className="w-8 h-8 xl:w-12 xl:h-12 rounded-full group-hover:ring-4 group-hover:ring-blue-600 transition-all"
        />
        <span className="block font-semibold text-sm xl:text-lg">
          {firstName} {lastName}
        </span>
        <FaChevronDown className="text-md xl:text-xl" />
      </button>
      {isHovering && (
        <ul className="absolute top-full bg-grayLight dark:bg-grayDark w-full rounded-md px-2 py-4 flex flex-col gap-2 shadow-md text-sm xl:text-md  items-center">
          <li className="hover:underline transition">
            <Link to="/me">Mój profil</Link>
          </li>
          <li className="hover:underline transition">
            <Link to="/me/settings/data">Ustawienia</Link>
          </li>
          <li className="hover:underline transition mt-2">
            <PrimaryButton size="sm" onClick={logout}>
              Wyloguj
            </PrimaryButton>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserProfileButton;
