import { FC, useEffect, useState } from "react";

import ChatModel from "../../models/ChatModel";
import ChatSkeleton from "./ChatSkeleton";
import UserModel from "../../models/UserModel";
import { getUserById } from "../../services/userService";
import { useAppSelector } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";

interface ChatProps {
  chat: ChatModel;
  currentChat?: ChatModel | null;
  setCurrentChat: (chat: ChatModel) => void;
}

const Chat: FC<ChatProps> = ({ chat, currentChat, setCurrentChat }) => {
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showErrorNotification } = useNotification();
  // const active = true;

  const fetchUser = async () => {
    setIsLoading(true);
    const userId = chat.users.find((user) => user !== Number(loggedInUserId));
    try {
      const data = await getUserById(userId as number);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser(data.user);
    } catch (error) {
      showErrorNotification(error);
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
            className={`group flex h-full w-32 shrink-0 flex-col items-center gap-2 rounded-md px-2 py-1 transition-all  dark:border-primaryDark sm:w-full  md:flex-row  md:items-start md:gap-6 md:py-4 ${
              currentChat && currentChat.id === chat.id
                ? "cursor-default bg-blue-600 text-blue-50"
                : "cursor-pointer hover:bg-blue-600 hover:text-blue-50"
            }`}
          >
            <div className="relative h-8 w-8 shrink-0 md:h-12 md:w-12">
              <img
                src={user.imageUrl}
                alt="profile"
                className="rounded-full "
              />
              {/* {active && (
                <div className="absolute top-[-4px] right-[-4px] w-4 h-4 rounded-full bg-green-500"></div>
              )} */}
            </div>
            <div className="py-1 text-center md:text-left">
              <div className="rounded  text-xs font-bold sm:text-base">
                {user.firstName} {user.lastName}
              </div>
              <div className={`rounded text-[0.5rem] md:text-sm `}>
                {user.nickname}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Chat;
