import { FC, useEffect, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
import NotificationMessageModel from "../../models/NotificationMessageModel";
import NotificationSkeleton from "./NotificationSkeleton";
import UserModel from "../../models/UserModel";
import { changeMessageNotificationStatusAsRead } from "../../store/features/socketSlice";
import { getUserById } from "../../services/userService";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface MessageNotificationProps {
  notification: NotificationMessageModel;
}

const MessageNotification: FC<MessageNotificationProps> = ({
  notification,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    if (!notification) return;
    try {
      setIsLoading(true);
      const response = await getUserById(notification.senderId);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = async () => {
    dispatch(changeMessageNotificationStatusAsRead(notification.channelId));

    navigate(`/chats?chat=${notification.channelId}`);
  };

  useEffect(() => {
    fetchUser();
  }, [notification]);

  return (
    <>
      {isLoading && <NotificationSkeleton />}
      {!isLoading && user && (
        <div
          className="flex items-center justify-between gap-2 w-full  hover:bg-blue-600 hover:text-blue-50 p-2 rounded-md transition-all cursor-pointer"
          onClick={handleNotificationClick}
        >
          <div className="flex items-center justify-start gap-4 w-max grow">
            <div className="flex items-center justify-center relative w-10 h-10 shrink-0">
              <img
                src={user?.imageUrl}
                alt="user image"
                className=" rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm">
                {notification.message.length > 30
                  ? notification.message.slice(0, 30) + "..."
                  : notification.message}
              </p>
              <p className="text-xs">
                {DateFormatter.formatDate(notification.createdAt)}
              </p>
            </div>
          </div>
          {!notification.read && (
            <div className="justify-self-end p-2 bg-green-600 rounded-full animate-pulse"></div>
          )}
        </div>
      )}
    </>
  );
};

export default MessageNotification;
