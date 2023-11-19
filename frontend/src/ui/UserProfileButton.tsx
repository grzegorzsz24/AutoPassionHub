import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";

import { FaChevronDown } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";
import { clearUser } from "../store/features/userSlice";
import { useState } from "react";

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const UserProfileButton = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const { firstName, lastName, imageUrl } = useAppSelector(
    (state) => state.user
  );

  const logout = () => {
    dispatch(clearUser());
  };

  const handleMouseOver = () => setIsHovering(true);

  const handleMouseOut = () => setIsHovering(false);

  const navigateToUserPage = () => {
    navigate("/me");
  };

  return (
    <div
      className="relative shrink-0"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button className="flex items-center gap-2 py-2 text-blue-900 dark:text-blue-50 relative group">
        <img
          src={`${imageUrl}`}
          className="w-10 h-10 3xl:w-14 3xl:h-14 rounded-full group-hover:ring-4 group-hover:ring-blue-600 transition-all"
          onClick={navigateToUserPage}
        />
        <div className="hidden sm:flex items-center justify-center gap-2">
          <span
            className="block font-semibold text-sm xl:text-lg"
            onClick={navigateToUserPage}
          >
            {firstName} {lastName}
          </span>
          <FaChevronDown className="text-md xl:text-xl" />
        </div>
      </button>
      <AnimatePresence>
        {isHovering && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute top-full right-0 sm:left-0 bg-grayLight dark:bg-grayDark w-36 sm:w-full rounded-md px-8 py-4 flex flex-col gap-2 shadow-md items-center"
          >
            <li className="hover:underline transition">
              <Link to="/me">Mój profil</Link>
            </li>
            <li className="hover:underline transition">
              <Link to="/me/settings/data">Ustawienia</Link>
            </li>
            <li className=" transition mt-2">
              <PrimaryButton size="sm" onClick={logout}>
                Wyloguj
              </PrimaryButton>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileButton;
