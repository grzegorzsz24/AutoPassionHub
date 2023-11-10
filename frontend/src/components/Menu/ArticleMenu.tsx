import { FaBookReader, FaBookmark } from "react-icons/fa";
import { MdCreate, MdOutlineTextFields } from "react-icons/md";

import Menu from "./Menu";

const links = [
  {
    link: "/articles",
    text: "Artykuły",
    icon: <FaBookReader className="text-md lg:text-xl" />,
  },
  {
    link: "/articles/add",
    text: "Utwórz nowy artykuł",
    icon: <MdCreate className="text-md lg:text-xl" />,
  },
  {
    link: "/articles/my",
    text: "Moje artykuły",
    icon: <MdOutlineTextFields className="text-md lg:text-xl" />,
  },
  {
    link: "/articles/bookmarks",
    text: "Zapisane artykuły",
    icon: <FaBookmark className="text-md lg:text-xl" />,
  },
];

const ArticleMenu = () => {
  return <Menu links={links} />;
};

export default ArticleMenu;
