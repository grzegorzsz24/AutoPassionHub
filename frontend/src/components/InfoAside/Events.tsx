import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import Event from "./Event";
import EventModel from "../../models/EventModel";
import EventSkeleton from "./EventSkeleton";
import OutlineButton from "../../ui/OutlineButton";
import { getUpcomingEvents } from "../../services/eventService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const dispatch = useAppDispatch();
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
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const goToEventsPage = () => {
    navigate("/events");
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="border-b border-blue-600 dark:border-blue-100 px-4 py-4">
      <h2 className="font-bold ml-4">Nadchodzące wydarzenia</h2>
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
