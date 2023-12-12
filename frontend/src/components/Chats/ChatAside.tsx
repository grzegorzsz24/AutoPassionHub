import Chat from "./Chat";
import ChatModel from "../../models/ChatModel";
import { FC } from "react";
import OutlineButton from "../../ui/OutlineButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const goToFriendsPage = () => {
    navigate("/friends/suggestions");
  };

  return (
    <motion.div
      className="flex shrink-0 flex-col overflow-hidden bg-white shadow-md dark:bg-primaryDark2 md:rounded-md"
      initial="hidden"
      animate="visible"
      variants={asideVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <h2 className="bg-blue-600 px-2  py-1 font-bold text-blue-50 sm:px-4 sm:py-2 md:text-lg">
        Użytkownicy
      </h2>
      <div className="mr-2 flex grow justify-center gap-2 overflow-y-auto p-2 md:flex-col md:justify-start md:p-4 ">
        {chats.length === 0 && (
          <div className="flex flex-col items-center gap-4 p-6">
            <p>Brak znajomych</p>
            <OutlineButton size="sm" onClick={goToFriendsPage}>
              Dodaj znajomych
            </OutlineButton>
          </div>
        )}
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
