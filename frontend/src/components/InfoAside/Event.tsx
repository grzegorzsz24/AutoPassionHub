import DateFormatter from "../../utils/DateFormatter";
import EventModel from "../../models/EventModel";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface EventProps {
  event: EventModel;
}

const Event: FC<EventProps> = ({ event }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      onClick={onClickHandler}
      className="flex gap-2 cursor-pointer group  items-center"
    >
      <div className="flex flex-col bg-blue-600 text-blue-50 rounded-md items-center justify-center w-16   py-1 group-hover:bg-blue-800 transition-all">
        <p className="font-bold">
          {DateFormatter.getDayNumber(event.eventDate)}
        </p>
        <p className="text-xs">{DateFormatter.getMonthName(event.eventDate)}</p>
        <p className="text-xs">{DateFormatter.getYear(event.eventDate)}</p>
      </div>
      <div className="flex flex-col px-2 max-w-[14rem]">
        <p className="truncate overflow-hidden">{event.title}</p>
        <p className="text-xs">{event.city}</p>
      </div>
    </div>
  );
};

export default Event;
