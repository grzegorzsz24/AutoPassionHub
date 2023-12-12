import { useEffect, useState } from "react";

import Event from "./Event";
import EventModel from "../../models/EventModel";
import EventSkeleton from "./EventSkeleton";
import OutlineButton from "../../ui/OutlineButton";
import { getUpcomingEvents } from "../../services/eventService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

const Events = () => {
  const { showErrorNotification } = useNotification();
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getUpcomingEvents();
      if (data.status !== "ok") throw new Error(data.message);
      setEvents(data.events);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setLoading(false);
    }
  };

  const goToEventsPage = () => {
    navigate("/events?page=1");
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="border-b border-blue-600 px-4 py-4 dark:border-blue-100">
      <h2 className="ml-4 font-bold">Nadchodzące wydarzenia</h2>
      <div className="flex flex-col gap-4 py-4">
        {loading && (
          <>
            <EventSkeleton />
            <EventSkeleton />
            <EventSkeleton />
          </>
        )}
        {!loading &&
          events.map((event) => <Event event={event} key={event.id} />)}
        {!loading && (
          <OutlineButton onClick={goToEventsPage} size="sm">
            Wszystkie wydarzenia
          </OutlineButton>
        )}
      </div>
    </div>
  );
};

export default Events;
