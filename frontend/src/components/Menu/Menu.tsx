import { FC, ReactNode } from "react";

import { NavLink } from "react-router-dom";

interface Link {
  link: string;
  text: string;
  icon: ReactNode;
}

interface MenuProps {
  links: Link[];
}

const Menu: FC<MenuProps> = ({ links }) => {
  return (
    <nav className="bg-white rounded-md py-6 text-primaryDark2 dark:bg-primaryDark2 dark:text-white sticky top-0">
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

export default Menu;
