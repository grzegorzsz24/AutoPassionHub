import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import Event from "../../components/Events/Event";
import EventModel from "../../models/EventModel";
import NoContent from "../../ui/NoContent";
import { getEventById } from "../../services/eventService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const dispatch = useAppDispatch();
  const { id: eventID } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getEvent = async () => {
    try {
      setIsLoading(true);
      const data = await getEventById(Number(eventID));
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setEvent(data.event);
      console.log(data.event);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className=" max-w-4xl pb-12">
      {!isLoading && !event && (
        <NoContent>Wydarzenie o podanym ID nie istnieje</NoContent>
      )}
      {event && <Event event={event} />}
    </div>
  );
};

export default EventPage;
