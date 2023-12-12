import { BiDotsHorizontalRounded } from "react-icons/bi";
import DateFormatter from "../../utils/DateFormatter";
import DropdownMenu from "../../ui/DropdownMenu";
import EventModel from "../../models/EventModel";
import { FC } from "react";
import Gallery from "../Gallery";
import OutlineButton from "../../ui/OutlineButton";
import { reportEvent } from "../../services/reportService";
import { useAppSelector } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";
import { useStompClient } from "react-stomp-hooks";

interface EventProps {
  event: EventModel;
  onDeleteEvent: () => void;
}

const Event: FC<EventProps> = ({ event, onDeleteEvent }) => {
  const stompClient = useStompClient();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const { userId, role } = useAppSelector((state) => state.user);

  const userIsEventAuthor = Number(userId) === event.user;

  const reportEventHandler = async () => {
    try {
      const response = await reportEvent(event.id);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      showSuccessNotification(response.message);
      if (stompClient) {
        stompClient.publish({
          destination: `/app/admin/notification`,
          body: JSON.stringify({
            userTriggeredId: userId,
            receiverId: 1,
            content: "Użytkownik zgłosił post",
            type: "FORUM_REPORT",
            entityId: event.id,
          }),
        });
      }
    } catch (error) {
      showErrorNotification(error);
    }
  };

  return (
    <div className="rounded-md bg-white shadow-md dark:bg-primaryDark2 ">
      <div className="flex items-center justify-between gap-6 p-6">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 flex-col items-center rounded-md bg-blue-600 p-2 text-blue-50 transition-all group-hover:bg-blue-700">
            <p className="text-2xl font-bold">
              {DateFormatter.getDayNumber(event.eventDate)}
            </p>
            <p>{DateFormatter.getMonthName(event.eventDate)}</p>
            <p className="text-xs">{DateFormatter.getYear(event.eventDate)}</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-lg">{event.city}</p>
          </div>
        </div>

        <DropdownMenu
          triggerElement={
            <BiDotsHorizontalRounded className="text-lg sm:text-2xl" />
          }
        >
          <>
            {(role === "ADMIN" || userIsEventAuthor) && (
              <OutlineButton
                size="sm"
                color="red"
                fullWidth={true}
                onClick={onDeleteEvent}
              >
                Usuń wydarzenie
              </OutlineButton>
            )}
            {role !== "ADMIN" && !userIsEventAuthor && (
              <OutlineButton
                size="sm"
                fullWidth={true}
                onClick={reportEventHandler}
              >
                Zgłoś wydarzenie
              </OutlineButton>
            )}
          </>
        </DropdownMenu>
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
