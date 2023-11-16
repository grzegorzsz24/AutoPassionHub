import ChatAside from "../../components/Chats/ChatAside";
import ChatConversation from "../../components/Chats/ChatConversation";
import ChatModel from "../../models/ChatModel";
import { useAppSelector } from "../../store/store";
import { useState } from "react";

const ChatPage = () => {
  const [currentChat, setCurrentChat] = useState<ChatModel | null>(null);

  const setCurrentChatHandler = (chat: ChatModel) => {
    console.log(chat);
    setCurrentChat(chat);
  };

  const chats = useAppSelector((state) => state.socket.chats);
  return (
    <div className="h-full flex ">
      <div className="m-8 flex gap-8 grow  text-primaryDark2 dark:text-blue-50">
        <ChatAside
          chats={chats}
          currentChat={currentChat}
          setCurrentChat={setCurrentChatHandler}
        />
        <div className="bg-white dark:bg-primaryDark2 shadow-md grow rounded-md min-w-xl">
          <ChatConversation currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
