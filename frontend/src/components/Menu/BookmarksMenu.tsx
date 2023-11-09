import { FaBookReader } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import Menu from "./Menu";

const links = [
  {
    link: "/bookmarks/forums",
    text: "Zapisane fora",
    icon: <MdForum className="text-md lg:text-xl" />,
  },
  {
    link: "/bookmarks/articles",
    text: "Zapisane artykuły",
    icon: <FaBookReader className="text-md lg:text-xl" />,
  },
];

const BookmarksMenu = () => {
  return <Menu links={links} />;
};

export default BookmarksMenu;
