import { useEffect, useReducer, useState } from "react";

import EventItem from "../../components/Events/EventItem";
import EventModel from "../../models/EventModel";
import EventSkeleton from "../../components/Events/EventSkeleton";
import Pagination from "../../components/Pagination";
import articleFilterReducer from "../../reducers/ArticlePaginationReducer";
import { getEvents } from "../../services/eventService";
import { useNotification } from "../../hooks/useNotification";
import { useSearchParams } from "react-router-dom";

const EVENTS_PER_PAGE = import.meta.env.VITE_EVENTS_PER_PAGE as number;

const EventsPage = () => {
  const { showErrorNotification } = useNotification();
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
    setFiltersFromParams(),
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
      setTotalNumberOfEvents(data.eventsNumber);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filterState]);

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col gap-4">
        {loading ? (
          <>
            <EventSkeleton />
            <EventSkeleton />
            <EventSkeleton />
          </>
        ) : (
          events.map((event) => <EventItem event={event} key={event.id} />)
        )}
      </div>
      {!loading && events.length > 0 && (
        <div className=" my-4 flex items-center justify-center">
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
