import { FC, ReactNode } from "react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

interface Link {
  link: string;
  text: string;
  icon: ReactNode;
}

interface MenuProps {
  links: Link[];
}

const menuVariants = {
  hidden: { opacity: 0, y: -200 },
  visible: { opacity: 1, y: 0 },
};

const Menu: FC<MenuProps> = ({ links }) => {
  return (
    <motion.nav
      className="bg-white sm:rounded-md sm:py-6 text-primaryDark2 dark:bg-primaryDark2 dark:text-white sticky top-0 md:w-96"
      initial="hidden"
      animate="visible"
      variants={menuVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {links.map(({ link, text, icon }) => (
        <NavLink
          key={link}
          to={link}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 text-blue-50 px-6 sm:px-6 md:px-12 py-2  flex items-center gap-2 "
              : "px-6 sm:px-6 md:px-12 py-2 flex  items-center gap-2 hover:bg-blue-900 hover:text-white transition-all "
          }
          end={true}
        >
          {icon}
          <span className="block text text-sm lg:text-xl">{text}</span>
        </NavLink>
      ))}
    </motion.nav>
  );
};

export default Menu;
