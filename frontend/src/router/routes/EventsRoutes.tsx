import AddEventPage from "../../pages/Events/AddEventPage";
import EventPage from "../../pages/Events/EventPage";
import EventsPage from "../../pages/Events/EventsPage";
import EventsPageLayout from "../../pages/Events/EventsPageLayout";

const EventsRoutes = {
  path: "/events",
  element: <EventsPageLayout />,
  children: [
    {
      path: "",
      element: <EventsPage />,
    },
    {
      path: ":id",
      element: <EventPage />,
    },
    {
      path: "add",
      element: <AddEventPage />,
    },
  ],
};

export default EventsRoutes;
