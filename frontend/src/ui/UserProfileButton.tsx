import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";

const UserProfileButton = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => setIsHovering(true);

  const handleMouseOut = () => setIsHovering(false);

  return (
    <button
      className="flex items-center gap-2 py-2 text-blue-900 dark:text-blue-50 relative"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img src="anonim.webp" className="w-12 h-12 rounded-full" />
      <span className="block font-semibold">Kacper Stępień</span>
      <FaChevronDown />
      {isHovering && (
        <ul className="absolute top-full bg-grayLight dark:bg-grayDark w-full rounded-md px-2 py-4 flex flex-col gap-2 shadow-md">
          <li className="hover:underline transition">
            <Link to="/me">Mój profil</Link>
          </li>
          <li className="hover:underline transition">
            <Link to="/me/settings">Ustawienia</Link>
          </li>
          <li className="hover:underline transition mt-4">
            <PrimaryButton size="sm" onClick={() => {}}>
              Wyloguj
            </PrimaryButton>
          </li>
        </ul>
      )}
    </button>
  );
};

export default UserProfileButton;
