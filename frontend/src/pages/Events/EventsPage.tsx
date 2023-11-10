import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useReducer, useState } from "react";

import EventItem from "../../components/Events/EventItem";
import EventModel from "../../models/EventModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Pagination from "../../components/Pagination";
import articleFilterReducer from "../../reducers/ArticlePaginationReducer";
import { getEvents } from "../../services/eventService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useSearchParams } from "react-router-dom";

const EVENTS_PER_PAGE = import.meta.env.VITE_EVENTS_PER_PAGE as number;

const EventsPage = () => {
  const reduxDispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [totalNumberOfEvents, setTotalNumberOfEvents] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const setFiltersFromParams = () => {
    return {
      page: getPageFromParams(),
      size: EVENTS_PER_PAGE,
      title: "",
    };
  };

  const getPageFromParams = () => {
    let page = Number(params.get("page")) || 1;
    if (page < 1) page = 1;
    return page;
  };

  const [filterState, filterDispatch] = useReducer(
    articleFilterReducer,
    setFiltersFromParams()
  );

  const { page, size } = filterState;

  const buildQueryParams = () => {
    let queryParams = "";
    queryParams += `page=${page}`;
    return queryParams;
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setParams(buildQueryParams());
      const data = await getEvents(page, size);
      if (data.status !== "ok") throw new Error(data.message);
      setEvents(data.events);
      console.log(data.events);
      setTotalNumberOfEvents(data.eventsNumber);
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filterState]);

  if (loading) return <LoadingSpinner small />;

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </div>
      {!loading && events.length > 0 && (
        <div className=" flex items-center justify-center my-4">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalNumberOfEvents / size)}
            goToPage={(page: number) =>
              filterDispatch({ type: "SET_PAGE", payload: page })
            }
          />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
