import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { MdDelete, MdPrivacyTip } from "react-icons/md";

import { NavLink } from "react-router-dom";

const links = [
  {
    link: "/me/settings/data",
    text: "Twoje dane",
    icon: <FaUserEdit className="text-md lg:text-xl" />,
  },
  {
    link: "/me/settings/photo",
    text: "Zdjęcie profilowe",
    icon: <FaUserCircle className="text-md lg:text-xl" />,
  },
  {
    link: "/me/settings/privacy",
    text: "Prywatność",
    icon: <MdPrivacyTip className="text-md lg:text-xl" />,
  },
  {
    link: "/me/settings/close",
    text: "Zamknij konto",
    icon: <MdDelete className="text-md lg:text-xl" />,
  },
];

const UserSettingsMenu = () => {
  return (
    <nav className="bg-white rounded-md py-6 text-primaryDark2 dark:bg-primaryDark2 dark:text-white sticky top-12">
      {links.map(({ link, text, icon }) => (
        <NavLink
          key={link}
          to={link}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-blue-50 px-12 py-2  flex flex-col md:flex-row items-center gap-2"
              : "px-12 py-2 flex flex-col md:flex-row items-center gap-2 hover:bg-blue-900 hover:text-white transition-all"
          }
          end={true}
        >
          {icon}
          <span className="block text text-sm lg:text-xl">{text}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default UserSettingsMenu;
