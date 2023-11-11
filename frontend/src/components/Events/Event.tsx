import DateFormatter from "../../utils/DateFormatter";
import EventModel from "../../models/EventModel";
import { FC } from "react";
import Gallery from "../Gallery";
import PrimaryButton from "../../ui/PrimaryButton";
import { useAppSelector } from "../../store/store";

interface EventProps {
  event: EventModel;
  onDeleteEvent: () => void;
}

const Event: FC<EventProps> = ({ event, onDeleteEvent }) => {
  const { userId } = useAppSelector((state) => state.user);
  return (
    <div className="bg-white dark:bg-primaryDark2 rounded-md shadow-md ">
      <div className="flex items-center gap-6 p-6">
        <div className="bg-blue-600 text-blue-50 rounded-md p-2 flex flex-col items-center group-hover:bg-blue-700 transition-all w-24 h-24">
          <p className="font-bold text-2xl">
            {DateFormatter.getDayNumber(event.eventDate)}
          </p>
          <p>{DateFormatter.getMonthName(event.eventDate)}</p>
          <p className="text-xs">{DateFormatter.getYear(event.eventDate)}</p>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-lg">{event.city}</p>
          {event.user === Number(userId) && (
            <PrimaryButton size="sm" color="red" onClick={onDeleteEvent}>
              Usuń wydarzenie
            </PrimaryButton>
          )}
        </div>
      </div>
      <div className="h-64 ">
        <Gallery images={[event.imageUrl]} />
      </div>
      <div className="p-6">
        <p className=" text-justify leading-10">{event.description}</p>
      </div>
    </div>
  );
};

export default Event;
