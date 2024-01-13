import { FC, useEffect, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
import NotificationMessageModel from "../../models/NotificationMessageModel";
import NotificationSkeleton from "./NotificationSkeleton";
import UserModel from "../../models/UserModel";
import { changeMessageNotificationStatusAsRead } from "../../store/features/socketSlice";
import { getUserById } from "../../services/userService";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

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
  const { showErrorNotification } = useNotification();

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
      showErrorNotification(error);
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
          className="flex w-full cursor-pointer items-center justify-between  gap-2 rounded-md p-2 transition-all hover:bg-blue-600 hover:text-blue-50"
          onClick={handleNotificationClick}
        >
          <div className="flex w-max grow items-center justify-start gap-4">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
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
            <div className="animate-pulse justify-self-end rounded-full bg-green-600 p-2"></div>
          )}
        </div>
      )}
    </>
  );
};

export default MessageNotification;
