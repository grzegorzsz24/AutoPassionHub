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
    (chat) => chat.id === Number(searchParams.get("chat"))
  );

  const [currentChat, setCurrentChat] = useState<ChatModel | null>(
    chat || null
  );

  const setCurrentChatHandler = (chat: ChatModel) => {
    navigate(`/chats?chat=${chat.id}`);
    setCurrentChat(chat);
  };

  return (
    <div className="flex h-full">
      <div className="my-4 md:m-6 lg:m-8 flex flex-col md:flex-row  gap-4 md:gap-8 grow  text-primaryDark2 dark:text-blue-50 overflow-y-auto">
        <ChatAside
          chats={chats}
          currentChat={currentChat}
          setCurrentChat={setCurrentChatHandler}
        />
        <div className="bg-white dark:bg-primaryDark2 shadow-md grow rounded-md h-full">
          <ChatConversation currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
