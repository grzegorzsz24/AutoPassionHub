import { FC, useEffect, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
import { FaComment } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import NotificationModel from "../../models/NotificationModel";
import NotificationSkeleton from "./NotificationSkeleton";
import UserModel from "../../models/UserModel";
import { changeNotificationStatusAsRead } from "../../store/features/socketSlice";
import { getUserById } from "../../services/userService";
import { markNotificationAsRead } from "../../services/notificationService";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface CommentNotificationProps {
  notification: NotificationModel;
  typeOfContent: "POST" | "FORUM";
}

const CommentNotification: FC<CommentNotificationProps> = ({
  notification,
  typeOfContent,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    if (!notification) return;
    try {
      setIsLoading(true);
      const response = await getUserById(notification.userTriggeredId);
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
    try {
      const data = await markNotificationAsRead(notification.notificationId);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      dispatch(changeNotificationStatusAsRead(notification.notificationId));
      if (typeOfContent === "FORUM") {
        navigate(`/forums/${notification.entityId}`);
      }
      if (typeOfContent === "POST") {
        navigate(`/posts/${notification.entityId}`);
      }
    } catch (error) {
      console.log(error);
    }
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
            <div className=" flex items-center justify-center relative w-10 h-10 shrink-0">
              <img
                src={user?.imageUrl}
                alt="user image"
                className=" rounded-full"
              />
              <div className="absolute bottom-[-4px] right-[-4px] bg-orange-500 text-white rounded-full p-1">
                {typeOfContent === "POST" ? (
                  <FaComment className="text-md" />
                ) : (
                  <MdForum className="text-md" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-wrap">
                <span className="font-bold">
                  {user?.firstName} {user?.lastName}
                </span>{" "}
                skomentował{" "}
                {typeOfContent === "POST" ? "twój post" : "twoje forum"}
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

export default CommentNotification;
