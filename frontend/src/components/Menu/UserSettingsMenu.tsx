import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { MdDelete, MdPrivacyTip } from "react-icons/md";

import Menu from "./Menu";

const links = [
  {
    link: "/me/settings/data",
    text: "Twoje dane",
    icon: <FaUserEdit className="text-md lg:text-xl" />,
  },
  {
    link: "/me/settings/photo",
    text: "Zdjęcie profilowe",
    icon: <FaUserCircle className="text-md lg:text-xl" />,
  },
  {
    link: "/me/settings/privacy",
    text: "Prywatność",
    icon: <MdPrivacyTip className="text-md lg:text-xl" />,
  },
  {
    link: "/me/settings/close",
    text: "Zamknij konto",
    icon: <MdDelete className="text-md lg:text-xl" />,
  },
];

const UserSettingsMenu = () => {
  return <Menu links={links} />;
};

export default UserSettingsMenu;
