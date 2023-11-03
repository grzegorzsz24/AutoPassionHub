import { MdCreate, MdForum, MdOutlineTextFields } from "react-icons/md";

import { NavLink } from "react-router-dom";

const links = [
  {
    link: "/forums",
    text: "Przeglądaj fora",
    icon: <MdForum className="text-md lg:text-xl" />,
  },
  {
    link: "/forums/add",
    text: "Utwórz nowy temat",
    icon: <MdCreate className="text-md lg:text-xl" />,
  },
  {
    link: "/forums/my",
    text: "Moje tematy",
    icon: <MdOutlineTextFields className="text-md lg:text-xl" />,
  },
];

const ForumMenu = () => {
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
          end={true}
        >
          {icon}
          <span className="block text text-sm lg:text-xl">{text}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default ForumMenu;
