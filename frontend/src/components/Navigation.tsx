import {
  FaBookReader,
  FaBookmark,
  FaHome,
  FaUserFriends,
} from "react-icons/fa";

import { BsFillCalendarEventFill } from "react-icons/bs";
import { MdForum } from "react-icons/md";
import NavigationLink from "../ui/NavigationLink";

const links = [
  {
    to: "/",
    icon: <FaHome className="text-2xl" />,
    text: "Główna",
  },
  {
    to: "/friends",
    icon: <FaUserFriends className="text-2xl" />,
    text: "Znajomi",
  },
  {
    to: "/forum",
    icon: <MdForum className="text-2xl" />,
    text: "Forum",
  },
  {
    to: "/articles",
    icon: <FaBookReader className="text-2xl" />,
    text: "Artykuły",
  },
  {
    to: "/events",
    icon: <BsFillCalendarEventFill className="text-2xl" />,
    text: "Wydarzenia",
  },
  {
    to: "/bookmarks",
    icon: <FaBookmark className="text-2xl" />,
    text: "Zapisane",
  },
];

const Navigation = () => {
  return (
    <nav className="w-content bg-blue-600 w-min flex text-blue-50 rounded-ee-md overflow-hidden">
      {links.map((link) => (
        <NavigationLink key={link.text} to={link.to}>
          {link.icon}
          <span className="block text">{link.text}</span>
        </NavigationLink>
      ))}
    </nav>
  );
};

export default Navigation;
