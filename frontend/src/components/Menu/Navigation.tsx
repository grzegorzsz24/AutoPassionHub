import {
  FaBookReader,
  FaBookmark,
  FaHome,
  FaUserFriends,
} from "react-icons/fa";

import { BsFillCalendarEventFill } from "react-icons/bs";
import { MdForum } from "react-icons/md";
import NavigationLink from "../../ui/NavigationLink";

const links = [
  {
    to: "/",
    icon: <FaHome className="text-md lg:text-2xl" />,
    text: "Główna",
  },
  {
    to: "/friends",
    icon: <FaUserFriends className="text-md lg:text-2xl" />,
    text: "Znajomi",
  },
  {
    to: "/forum",
    icon: <MdForum className="text-md lg:text-2xl" />,
    text: "Forum",
  },
  {
    to: "/articles",
    icon: <FaBookReader className="text-md lg:text-2xl" />,
    text: "Artykuły",
  },
  {
    to: "/events",
    icon: <BsFillCalendarEventFill className="text-md lg:text-2xl" />,
    text: "Wydarzenia",
  },
  {
    to: "/bookmarks",
    icon: <FaBookmark className="text-md lg:text-2xl" />,
    text: "Zapisane",
  },
];

const Navigation = () => {
  return (
    <nav className="w-content bg-blue-600 w-full md:w-min flex justify-between text-blue-50 md:rounded-ee-md overflow-hidden">
      {links.map((link) => (
        <NavigationLink key={link.text} to={link.to} end={false}>
          {link.icon}
          <span className="block text text-sm lg:text-xl">{link.text}</span>
        </NavigationLink>
      ))}
    </nav>
  );
};

export default Navigation;
