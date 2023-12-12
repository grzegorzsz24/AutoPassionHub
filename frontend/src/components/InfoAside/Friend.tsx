import { FC, useEffect, useState } from "react";

import ChatModel from "../../models/ChatModel";
import FriendSkeleton from "./FriendSkeleton";
import UserModel from "../../models/UserModel";
import { getUserById } from "../../services/userService";
import { useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

interface FriendProps {
  chat: ChatModel;
}

const Friend: FC<FriendProps> = ({ chat }) => {
  const navigate = useNavigate();
  const { showErrorNotification } = useNotification();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);

  const fetchUser = async () => {
    const userId = chat.users.find((id) => id !== Number(loggedInUserId));
    if (!userId) {
      return;
    }
    try {
      setIsLoading(true);
      const data = await getUserById(userId);
      if (data.status !== "ok") {
        throw new Error("Something went wrong");
      }
      setUser(data.user);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToUserChat = () => {
    navigate(`/chats?chat=${chat.id}`);
  };

  useEffect(() => {
    fetchUser();
  }, [chat]);

  return (
    <div>
      {isLoading && <FriendSkeleton />}
      {!isLoading && user && (
        <div
          onClick={goToUserChat}
          className={`group  flex  w-full cursor-pointer items-center gap-6  rounded-md  p-2 transition-all hover:bg-blue-600 dark:border-primaryDark`}
        >
          <div className="relative">
            <img
              src={user.imageUrl}
              alt="profile"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="py-1">
            <div className="rounded  text-sm font-bold ">
              {user.firstName} {user.lastName}
            </div>
            <div className={`rounded  text-xs `}>{user.nickname}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friend;
