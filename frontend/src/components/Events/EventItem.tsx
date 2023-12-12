import DateFormatter from "../../utils/DateFormatter";
import EventModel from "../../models/EventModel";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface EventItemProps {
  event: EventModel;
}

const EventItem: FC<EventItemProps> = ({ event }) => {
  const navigate = useNavigate();

  const goToEventPage = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      className="group flex items-center gap-6 rounded-md bg-white p-4 shadow-md hover:cursor-pointer dark:bg-primaryDark2"
      onClick={goToEventPage}
    >
      <div className="h-22 flex w-24 flex-col items-center rounded-md bg-blue-600 p-1 text-blue-50 transition-all group-hover:bg-blue-700">
        <p className="text-xl font-bold">
          {DateFormatter.getDayNumber(event.eventDate)}
        </p>
        <p className="text-sm">{DateFormatter.getMonthName(event.eventDate)}</p>
        <p className="text-xs">{DateFormatter.getYear(event.eventDate)}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-md">{event.city}</p>
      </div>
    </div>
  );
};

export default EventItem;
