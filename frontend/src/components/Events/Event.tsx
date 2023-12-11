import { useAppDispatch, useAppSelector } from "../../store/store";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import DateFormatter from "../../utils/DateFormatter";
import DropdownMenu from "../../ui/DropdownMenu";
import EventModel from "../../models/EventModel";
import { FC } from "react";
import Gallery from "../Gallery";
import { NotificationStatus } from "../../store/features/notificationSlice";
import OutlineButton from "../../ui/OutlineButton";
import { addNotification } from "../../store/features/notificationSlice";
import handleError from "../../services/errorHandler";
import { reportEvent } from "../../services/reportService";
import { useStompClient } from "react-stomp-hooks";

interface EventProps {
  event: EventModel;
  onDeleteEvent: () => void;
}

const Event: FC<EventProps> = ({ event, onDeleteEvent }) => {
  const stompClient = useStompClient();
  const dispatch = useAppDispatch();
  const { userId, role } = useAppSelector((state) => state.user);

  const userIsEventAuthor = Number(userId) === event.user;

  const reportEventHandler = async () => {
    try {
      const response = await reportEvent(event.id);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(
        addNotification({
          message: response.message,
          type: NotificationStatus.SUCCESS,
        })
      );
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
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  return (
    <div className="bg-white dark:bg-primaryDark2 rounded-md shadow-md ">
      <div className="flex items-center justify-between gap-6 p-6">
        <div className="flex items-center gap-6">
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
