import { BsFillCalendarEventFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { MdForum } from "react-icons/md";
import Menu from "./Menu";

const links = [
  {
    link: "posts",
    text: "Zgłoszone posty",
    icon: <IoMdPhotos className="text-md lg:text-xl" />,
  },
  {
    link: "forums",
    text: "Zgłoszone fora",
    icon: <MdForum className="text-md lg:text-xl" />,
  },
  {
    link: "events",
    text: "Zgłoszone wydarzenia",
    icon: <BsFillCalendarEventFill className="text-md lg:text-xl" />,
  },
];

const AdminMenu = () => {
  return <Menu links={links} />;
};

export default AdminMenu;
