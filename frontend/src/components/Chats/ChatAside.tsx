import Chat from "./Chat";
import ChatModel from "../../models/ChatModel";
import { FC } from "react";
import { motion } from "framer-motion";

const asideVariants = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
};

interface ChatAsideProps {
  chats: ChatModel[];
  currentChat?: ChatModel | null;
  setCurrentChat: (chat: ChatModel) => void;
}

const ChatAside: FC<ChatAsideProps> = ({
  chats,
  currentChat,
  setCurrentChat,
}) => {
  return (
    <motion.div
      className="bg-white flex flex-col dark:bg-primaryDark2 shadow-md rounded-md overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={asideVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <h2 className="text-lg font-bold  text-blue-50 bg-blue-600 py-2 px-4">
        Użytkownicy
      </h2>
      <div className="flex flex-col p-4 mr-2 grow gap-2 overflow-y-auto">
        {chats.map((chat) => (
          <div key={chat.id}>
            <Chat
              chat={chat}
              setCurrentChat={setCurrentChat}
              currentChat={currentChat}
            />
            <hr className="border-gray-300 dark:border-primaryDark" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatAside;
