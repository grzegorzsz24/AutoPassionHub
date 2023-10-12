import "./Notification.css";

import {
  NotificationStatus,
  removeNotification,
  setInvisible,
} from "../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";

const Notification = () => {
  const dispatch = useAppDispatch();

  const { notifications } = useAppSelector((state) => state.notification);

  const closeNotificationHandler = (id: string) => {
    dispatch(setInvisible({ id }));
    setTimeout(() => {
      dispatch(removeNotification({ id }));
    }, 300);
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        closeNotificationHandler(notification.id);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    });
  }, [notifications]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 ">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={` py-4 px-4 md:px-16 rounded-md text-lg 2xl:text-xl shadow-md transition-all duration-300 ease-in-out transform fade-in shadow-lg ${
            notification.type === NotificationStatus.SUCCESS
              ? "bg-green-500"
              : notification.type === NotificationStatus.ERROR
              ? "bg-red-500"
              : "bg-yellow-500"
          } 	${
            notification.visible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <p className="font-medium">{notification.message}</p>
          <button
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
