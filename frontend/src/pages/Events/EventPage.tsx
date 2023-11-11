import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { deleteEvent, getEventById } from "../../services/eventService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Event from "../../components/Events/Event";
import EventModel from "../../models/EventModel";
import NoContent from "../../ui/NoContent";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const EventPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const onDeleteEvent = async () => {
    try {
      dispatch(startLoading());
      const data = await deleteEvent(Number(eventID));
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      dispatch(
        addNotification({
          message: data.message,
          type: NotificationStatus.SUCCESS,
        })
      );
      navigate("/events");
      setEvent(null);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
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
      {event && <Event event={event} onDeleteEvent={onDeleteEvent} />}
    </div>
  );
};

export default EventPage;
