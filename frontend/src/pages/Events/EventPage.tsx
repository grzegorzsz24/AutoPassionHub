import { deleteEvent, getEventById } from "../../services/eventService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Event from "../../components/Events/Event";
import EventModel from "../../models/EventModel";
import NoContent from "../../ui/NoContent";
import { useAppDispatch } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";

const EventPage = () => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();
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
    } catch (error) {
      showErrorNotification(error);
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
      showSuccessNotification(data.message);
      navigate("/events");
      setEvent(null);
    } catch (error) {
      showErrorNotification(error);
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
