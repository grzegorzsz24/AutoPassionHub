import EventMenu from "../../components/Menu/EventMenu";
import { Outlet } from "react-router-dom";
import PageWithAsideMenuLayout from "../PageWithAsideMenuLayout";

const EventsPageLayout = () => {
  return <PageWithAsideMenuLayout menu={<EventMenu />} content={<Outlet />} />;
};

export default EventsPageLayout;
