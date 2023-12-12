import ChatAside from "../../components/Chats/ChatAside";
import ChatConversation from "../../components/Chats/ChatConversation";
import ChatModel from "../../models/ChatModel";
import { useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const chats = useAppSelector((state) => state.socket.chats);
  const chat = chats.find(
    (chat) => chat.id === Number(searchParams.get("chat")),
  );

  const [currentChat, setCurrentChat] = useState<ChatModel | null>(
    chat || null,
  );

  const setCurrentChatHandler = (chat: ChatModel) => {
    navigate(`/chats?chat=${chat.id}`);
    setCurrentChat(chat);
  };

  return (
    <div className="flex h-full">
      <div className="my-4 flex grow flex-col gap-4 overflow-y-auto  text-primaryDark2 dark:text-blue-50 md:m-6  md:flex-row md:gap-8 lg:m-8">
        <ChatAside
          chats={chats}
          currentChat={currentChat}
          setCurrentChat={setCurrentChatHandler}
        />
        <div className="h-full grow rounded-md bg-white shadow-md dark:bg-primaryDark2">
          <ChatConversation currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
