import {
  BsFillCalendarEventFill,
  BsFillCalendarPlusFill,
} from "react-icons/bs";

import Menu from "./Menu";

const links = [
  {
    link: "/events",
    text: "Przeglądaj wydarzenia",
    icon: <BsFillCalendarEventFill className="text-md lg:text-xl" />,
  },
  {
    link: "/events/add",
    text: "Utwórz nowe wydarzenie",
    icon: <BsFillCalendarPlusFill className="text-md lg:text-xl" />,
  },
];

const EventMenu = () => {
  return <Menu links={links} />;
};

export default EventMenu;
