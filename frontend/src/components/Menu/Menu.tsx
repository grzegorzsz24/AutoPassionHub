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
      className="sticky top-0 bg-white text-primaryDark2 dark:bg-primaryDark2 dark:text-white sm:rounded-md sm:py-6 md:w-96"
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
              ? "flex items-center gap-2 bg-blue-600 px-6 py-2  text-blue-50 sm:px-6 md:px-12 "
              : "flex items-center gap-2 px-6 py-2  transition-all hover:bg-blue-900 hover:text-white sm:px-6 md:px-12 "
          }
          end={true}
        >
          {icon}
          <span className="text block text-sm lg:text-xl">{text}</span>
        </NavLink>
      ))}
    </motion.nav>
  );
};

export default Menu;
