import {
  FaUserCheck,
  FaUserClock,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";

import Menu from "./Menu";

const links = [
  {
    link: "/friends",
    text: "Twoi znajomi",
    icon: <FaUserFriends className="text-md lg:text-xl" />,
  },
  {
    link: "/friends/invitations",
    text: "Zaproszenia do znajomych",
    icon: <FaUserCheck className="text-md lg:text-xl" />,
  },

  {
    link: "/friends/pending",
    text: "Oczekujące na odpowiedź",
    icon: <FaUserClock className="text-md lg:text-xl" />,
  },
  {
    link: "/friends/suggestions",
    text: "Propozycje",
    icon: <FaUserPlus className="text-md lg:text-xl" />,
  },
];

const UserFriendsMenu = () => {
  return <Menu links={links} />;
};

export default UserFriendsMenu;
