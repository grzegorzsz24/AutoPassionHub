import { FC, useEffect, useState } from "react";

import ChatModel from "../../models/ChatModel";
import ChatSkeleton from "./ChatSkeleton";
import UserModel from "../../models/UserModel";
import { getUserById } from "../../services/userService";
import { useAppSelector } from "../../store/store";

interface ChatProps {
  chat: ChatModel;
  currentChat?: ChatModel | null;
  setCurrentChat: (chat: ChatModel) => void;
}

const Chat: FC<ChatProps> = ({ chat, currentChat, setCurrentChat }) => {
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const active = true;

  const fetchUser = async () => {
    setIsLoading(true);
    console.log(chat);
    const userId = chat.users.find((user) => user !== Number(loggedInUserId));
    try {
      const data = await getUserById(userId as number);
      if (data.status !== "ok") {
        throw new Error(data.message);
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
  }, []);

  return (
    <>
      {isLoading ? (
        <ChatSkeleton />
      ) : (
        user && (
          <div
            onClick={() => {
              setCurrentChat(chat);
            }}
            className={`px-2 py-4  w-full  dark:border-primaryDark flex gap-6  group  transition-all rounded-md ${
              currentChat && currentChat.id === chat.id
                ? "bg-blue-600 text-blue-50 cursor-default"
                : "cursor-pointer hover:bg-blue-600 hover:text-blue-50"
            }`}
          >
            <div className="relative h-12 w-12 shrink-0">
              <img
                src={user.imageUrl}
                alt="profile"
                className="rounded-full "
              />
              {active && (
                <div className="absolute top-[-4px] right-[-4px] w-4 h-4 rounded-full bg-green-500"></div>
              )}
            </div>
            <div className="py-1">
              <div className="font-bold  rounded  ">
                {user.firstName} {user.lastName}
              </div>
              <div className={`rounded  text-sm `}>{user.nickname}</div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Chat;
