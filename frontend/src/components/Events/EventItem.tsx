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
      className="bg-white dark:bg-primaryDark2 shadow-md rounded-md p-4 flex items-center gap-6 hover:cursor-pointer group"
      onClick={goToEventPage}
    >
      <div className="bg-blue-600 text-blue-50 rounded-md p-2 flex flex-col items-center group-hover:bg-blue-700 transition-all w-24 h-24">
        <p className="font-bold text-2xl">
          {DateFormatter.getDayNumber(event.eventDate)}
        </p>
        <p>{DateFormatter.getMonthName(event.eventDate)}</p>
        <p className="text-xs">{DateFormatter.getYear(event.eventDate)}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-lg">{event.city}</p>
      </div>
    </div>
  );
};

export default EventItem;
