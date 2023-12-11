import "./Notification.css";

import { AiOutlineClose } from "react-icons/ai";
import { FC } from "react";
import { NotificationStatus } from "../store/features/notificationSlice";
import { useAppNotification } from "../hooks/useAppNotificatio";

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
          className={` py-4 px-4 md:px-16 rounded-md text-lg 2xl:text-xl transition-all duration-300 ease-in-out transform fade-in shadow-lg ${
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
            className="0 absolute top-1 right-1 text-2xl hover:scale-110 transition-all"
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
