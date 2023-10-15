import { FC, ReactNode } from "react";

import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
}

const NavigationLink: FC<NavigationLinkProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-900 px-2 md:px-4 lg:px-6 xl:px-8 py-2  flex flex-col md:flex-row items-center gap-2"
          : "px-2 md:px-4 lg:px-6 xl:px-8 py-2 flex flex-col md:flex-row items-center gap-2 hover:bg-blue-900 transition-all"
      }
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
