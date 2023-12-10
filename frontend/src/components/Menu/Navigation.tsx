import { AnimatePresence, motion } from "framer-motion";
import { CgClose, CgMenu } from "react-icons/cg";
import {
  FaBookReader,
  FaBookmark,
  FaHome,
  FaUserFriends,
} from "react-icons/fa";
import { MdChat, MdForum } from "react-icons/md";

import { BsFillCalendarEventFill } from "react-icons/bs";
import MessagesButton from "../../ui/MessagesButton";
import NavigationLink from "../../ui/NavigationLink";
import NotificationButton from "../../ui/NotificationButton";
import { RiAdminFill } from "react-icons/ri";
import { useAppSelector } from "../../store/store";
import { useState } from "react";

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const links = [
  {
    to: "/",
    icon: <FaHome className="text-sm lg:text-xl xl:text-2xl" />,
    text: "Główna",
  },
  {
    to: "/friends",
    icon: <FaUserFriends className="text-sm lg:text-xl xl:text-2xl" />,
    text: "Znajomi",
  },
  {
    to: "/chats",
    icon: <MdChat className="text-sm lg:text-lg xl:text-xl" />,
    text: "Wiadomości",
  },
  {
    to: "/forums",
    icon: <MdForum className="text-sm lg:text-lg xl:text-xl" />,
    text: "Fora",
  },
  {
    to: "/articles",
    icon: <FaBookReader className="text-sm lg:text-lg xl:text-xl" />,
    text: "Artykuły",
  },
  {
    to: "/events",
    icon: <BsFillCalendarEventFill className="text-sm lg:text-lg xl:text-xl" />,
    text: "Wydarzenia",
  },
  {
    to: "/bookmarks",
    icon: <FaBookmark className="text-sm lg:text-lg xl:text-xl" />,
    text: "Zapisane",
  },
];

const adminLinks = [
  {
    to: "/admin",
    icon: <RiAdminFill className="text-sm lg:text-lg xl:text-xl" />,
    text: "Admin",
  },
];

const Navigation = () => {
  const [menuNavIsOpen, setMenuNavIsOpen] = useState(false);
  const { role } = useAppSelector((state) => state.user);

  const toggleMenuNav = () => setMenuNavIsOpen((prevState) => !prevState);

  return (
    <>
      <nav className=" bg-blue-600 w-full md:w-min justify-between text-blue-50 md:rounded-ee-md overflow-hidden hidden sm:flex">
        {links.map((link) => (
          <NavigationLink key={link.text} to={link.to} end={false}>
            {link.icon}
            <span className="block text text-sm lg:text-md xl:text-lg">
              {link.text}
            </span>
          </NavigationLink>
        ))}
        {role === "ADMIN" &&
          adminLinks.map((link) => (
            <NavigationLink key={link.text} to={link.to} end={false}>
              {link.icon}
              <span className="block text text-sm lg:text-md xl:text-lg">
                {link.text}
              </span>
            </NavigationLink>
          ))}
      </nav>
      <div className="sm:hidden bg-blue-600 w-full py-2 px-4">
        <div className="flex items-center justify-between">
          <button
            className="text-blue-50 text-2xl hover:scale-125 transition-all cursor-pointer"
            onClick={toggleMenuNav}
          >
            {menuNavIsOpen ? <CgClose /> : <CgMenu />}
          </button>
          <div className="flex items-center gap-8 xl:gap-16">
            <MessagesButton />
            <NotificationButton />
          </div>
        </div>

        <AnimatePresence>
          {menuNavIsOpen && (
            <motion.nav
              className=" bg-blue-600 w-full md:w-min justify-between flex flex-col gap-2 text-blue-50 md:rounded-ee-md overflow-hidden mt-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {links.map((link) => (
                <div key={link.text} onClick={toggleMenuNav}>
                  <NavigationLink to={link.to} end={false}>
                    {link.icon}
                    <span className="block text text-sm lg:text-md xl:text-lg">
                      {link.text}
                    </span>
                  </NavigationLink>
                </div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navigation;
