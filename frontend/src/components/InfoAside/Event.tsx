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
      className="group flex cursor-pointer items-center  gap-2"
    >
      <div className="flex w-16 flex-col items-center justify-center rounded-md bg-blue-600 py-1   text-blue-50 transition-all group-hover:bg-blue-800">
        <p className="font-bold">
          {DateFormatter.getDayNumber(event.eventDate)}
        </p>
        <p className="text-xs">{DateFormatter.getMonthName(event.eventDate)}</p>
        <p className="text-xs">{DateFormatter.getYear(event.eventDate)}</p>
      </div>
      <div className="flex max-w-[14rem] flex-col px-2">
        <p className="overflow-hidden truncate">{event.title}</p>
        <p className="text-xs">{event.city}</p>
      </div>
    </div>
  );
};

export default Event;
