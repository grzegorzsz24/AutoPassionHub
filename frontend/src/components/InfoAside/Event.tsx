import DateFormatter from "../../utils/DateFormatter";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface EventProps {
  id: string;
  date: string;
  title: string;
  city: string;
}

const Event: FC<EventProps> = ({ id, date, title, city }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/events/${id}`);
  };

  return (
    <div onClick={onClickHandler} className="flex gap-4 cursor-pointer group">
      <div className="flex flex-col bg-blue-600 text-blue-50 rounded-md items-center w-24 py-1 group-hover:bg-blue-800 transition-all">
        <p className="font-bold">{DateFormatter.getDayNumber(date)}</p>
        <p className="text-xs">{DateFormatter.getMonthName(date)}</p>
      </div>
      <div className="flex flex-col px-2">
        <p>{title}</p>
        <p className="text-xs">{city}</p>
      </div>
    </div>
  );
};

export default Event;
