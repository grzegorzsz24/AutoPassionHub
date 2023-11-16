import { useEffect, useState } from "react";

import ChatModel from "../../models/ChatModel";
import { FC } from "react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import MessageModel from "../../models/MessageModel";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import { getChatMessages } from "../../services/chatService";
import { getUserById } from "../../services/userService";
import handleError from "../../services/errorHandler";
import { useAppSelector } from "../../store/store";
import { useStompClient } from "react-stomp-hooks";
import { useSubscription } from "react-stomp-hooks";

interface ChatConversationProps {
  currentChat: ChatModel | null;
}

const ChatConversation: FC<ChatConversationProps> = ({ currentChat }) => {
  const stompClient = useStompClient();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<UserModel | null>(null);
  console.log(currentChat);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  useSubscription(`/user/${loggedInUserId}/queue/messages`, (message) =>
    setMessages((prev) => [...prev, JSON.parse(message.body)])
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    if (!currentChat) return;
    try {
      setIsLoading(true);
      const data = await getChatMessages(currentChat.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setMessages(data.data);
      console.log(data);
    } catch (error) {
      const newError = handleError(error);
      console.log(newError);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async () => {
    const userId = currentChat?.users.find(
      (user) => user !== Number(loggedInUserId)
    );
    if (!currentChat) return;
    try {
      const data = await getUserById(userId as number);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser(data.user);
    } catch (error) {
      const newError = handleError(error);
      console.log(newError);
    }
  };

  const sendMessage = (text: string) => {
    const userId = currentChat?.users.find(
      (user) => user !== Number(loggedInUserId)
    );
    if (stompClient) {
      console.log("wysyłam");
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify({
          senderId: Number(loggedInUserId),
          receiverId: userId as number,
          message: text,
        }),
      });
      setMessages((prev) => [
        ...prev,
        {
          channelId: currentChat?.id as number,
          senderId: Number(loggedInUserId),
          receiverId: userId as number,
          message: text,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [currentChat]);

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  return (
    <div className="p-4 flex flex-col h-full">
      {!currentChat && (
        <div className=" h-full flex items-center justify-center text-lg font-bold">
          Kliknij czat aby rozpocząć
        </div>
      )}
      {currentChat && (
        <>
          <div className="px-4 pb-4 border-b-2 dark:border-blue-600">
            {user && (
              <UserProfile
                imageUrl={user.imageUrl}
                firstName={user.firstName}
                lastName={user.lastName}
                nickname={user.nickname}
                size="medium"
              />
            )}
          </div>
          <div className="grow overflow-y-auto py-4">
            {isLoading && <LoadingSpinner small />}
            {!isLoading && messages.length === 0 && (
              <p className="h-full flex items-end justify-center text-lg">
                Brak wiadomości. Przywitaj się z użytkownikiem {user?.firstName}{" "}
                👋
              </p>
            )}
            {!isLoading && messages.length > 0 && (
              <Messages messages={messages} />
            )}
          </div>
          <NewMessage sendMessage={sendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatConversation;
