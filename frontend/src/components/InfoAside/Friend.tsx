import { FC, useEffect, useState } from "react";

import ChatModel from "../../models/ChatModel";
import FriendSkeleton from "./FriendSkeleton";
import UserModel from "../../models/UserModel";
import { getUserById } from "../../services/userService";
import { useAppSelector } from "../../store/store";

interface FriendProps {
  chat: ChatModel;
}

const Friend: FC<FriendProps> = ({ chat }) => {
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);

  const active = true;

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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [chat]);

  return (
    <div>
      {isLoading && <FriendSkeleton />}
      {!isLoading && user && (
        <div
          onClick={() => {
            console.log("xddd");
          }}
          className={`p-2  w-full  dark:border-primaryDark flex gap-6 items-center  group  transition-all rounded-md hover:bg-blue-600 cursor-pointer`}
        >
          <div className="relative">
            <img
              src={user.imageUrl}
              alt="profile"
              className="rounded-full h-10 w-10"
            />
            {active && (
              <div className="absolute top-[-4px] right-[-4px] w-4 h-4 rounded-full bg-green-500"></div>
            )}
          </div>
          <div className="py-1">
            <div className="font-bold  rounded text-sm ">
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
