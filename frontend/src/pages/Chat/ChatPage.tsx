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
    <div className="h-full flex ">
      <div className="m-8 flex gap-8 grow  text-primaryDark2 dark:text-blue-50">
        <ChatAside
          chats={chats}
          currentChat={currentChat}
          setCurrentChat={setCurrentChatHandler}
        />
        <div className="bg-white dark:bg-primaryDark2 shadow-md grow rounded-md">
          <ChatConversation currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
