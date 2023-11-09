import { MdCreate, MdForum, MdOutlineTextFields } from "react-icons/md";

import { FaBookmark } from "react-icons/fa";
import Menu from "./Menu";

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
  {
    link: "/forums/bookmarks",
    text: "Zapisane fora",
    icon: <FaBookmark className="text-md lg:text-xl" />,
  },
];

const ForumMenu = () => {
  return <Menu links={links} />;
};

export default ForumMenu;
