import "./Notification.css";

import { AiOutlineClose } from "react-icons/ai";
import { FC } from "react";
import { NotificationStatus } from "../store/features/notificationSlice";
import { useAppNotification } from "../hooks/useAppNotification";

const SUCCESS_COLOR = "bg-green-500";
const ERROR_COLOR = "bg-red-500";
const WARNING_COLOR = "bg-yellow-500";

interface NotificationProps {
  clearTime: number;
}

const Notification: FC<NotificationProps> = ({ clearTime }) => {
  const { notifications, closeNotificationHandler } =
    useAppNotification(clearTime);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 ">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`fade-in transform rounded-md px-4 py-4 text-lg shadow-lg transition-all duration-300 ease-in-out md:px-16 2xl:text-xl ${
            notification.type === NotificationStatus.SUCCESS
              ? SUCCESS_COLOR
              : notification.type === NotificationStatus.ERROR
                ? ERROR_COLOR
                : WARNING_COLOR
          } 	${
            notification.visible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <p className="font-medium">{notification.message}</p>
          <button
            aria-label="Zamknij powiadomienie"
            className="0 absolute right-1 top-1 text-2xl transition-all hover:scale-110"
            onClick={() => closeNotificationHandler(notification.id)}
          >
            <AiOutlineClose />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
