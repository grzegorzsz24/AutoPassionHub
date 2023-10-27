import {
  FaUserCheck,
  FaUserClock,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const links = [
  {
    link: "/friends/list",
    text: "Twoi znajomi",
    icon: <FaUserFriends className="text-md lg:text-xl" />,
  },
  {
    link: "/friends/invitations",
    text: "Zaproszenia do znajomych",
    icon: <FaUserCheck className="text-md lg:text-xl" />,
  },

  {
    link: "/friends/pending",
    text: "Oczekujące na odpowiedź",
    icon: <FaUserClock className="text-md lg:text-xl" />,
  },
  {
    link: "/friends/suggestions",
    text: "Propozycje",
    icon: <FaUserPlus className="text-md lg:text-xl" />,
  },
];

const UserFriendsMenu = () => {
  return (
    <nav className="bg-white rounded-md py-6 text-primaryDark2 dark:bg-primaryDark2 dark:text-white sticky top-0">
      {links.map(({ link, text, icon }) => (
        <NavLink
          key={link}
          to={link}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-blue-50 px-24 py-2  flex flex-col md:flex-row items-center gap-2"
              : "px-24 py-2 flex flex-col md:flex-row items-center gap-2 hover:bg-blue-900 hover:text-white transition-all"
          }
        >
          {icon}
          <span className="block text text-sm lg:text-xl">{text}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default UserFriendsMenu;
