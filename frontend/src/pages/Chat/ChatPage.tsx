import ChatAside from "../../components/Chats/ChatAside";
import ChatConversation from "../../components/Chats/ChatConversation";

const ChatPage = () => {
  return (
    <div className="h-full flex ">
      <div className="m-8 flex gap-8  grow  text-primaryDark2 dark:text-blue-50">
        <ChatAside />
        <div className="bg-white dark:bg-primaryDark2 shadow-md grow rounded-md ">
          <ChatConversation />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
