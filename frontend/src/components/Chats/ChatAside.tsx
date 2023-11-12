import Chat from "./Chat";
import ChatSkeleton from "./ChatSkeleton";
import { motion } from "framer-motion";
import { useState } from "react";

const asideVariants = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
};

const chats = [
  {
    firstName: "Jan",
    lastName: "Kowalski",
    nickname: "janek77",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: true,
  },
  {
    firstName: "Anna",
    lastName: "Nowak",
    nickname: "ania88",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: false,
  },
  {
    firstName: "Piotr",
    lastName: "Wiśniewski",
    nickname: "piotr90",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: true,
  },
  {
    firstName: "Katarzyna",
    lastName: "Wójcik",
    nickname: "kasia91",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: false,
  },
  {
    firstName: "Michał",
    lastName: "Kozłowski",
    nickname: "michal92",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: true,
  },
  {
    firstName: "Agnieszka",
    lastName: "Lewandowska",
    nickname: "agnieszka93",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: false,
  },
  {
    firstName: "Łukasz",
    lastName: "Zieliński",
    nickname: "lukasz94",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: true,
  },
  {
    firstName: "Monika",
    lastName: "Szymańska",
    nickname: "monika95",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: false,
  },
  {
    firstName: "Krzysztof",
    lastName: "Woźniak",
    nickname: "krzysztof96",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: true,
  },
  {
    firstName: "Izabela",
    lastName: "Dąbrowska",
    nickname: "izabela97",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: false,
  },
  {
    firstName: "Tomasz",
    lastName: "Kowalczyk",
    nickname: "tomasz98",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: true,
  },
  {
    firstName: "Julia",
    lastName: "Kamińska",
    nickname: "julia99",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: false,
  },
  {
    firstName: "Mateusz",
    lastName: "Pawlak",
    nickname: "mateusz100",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: true,
  },
  {
    firstName: "Małgorzata",
    lastName: "Kaczmarek",
    nickname: "gosia101",
    imageUrl: "http://localhost:8080/images/default_profile_picture.jpg",
    active: false,
  },
];

const ChatAside = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <motion.div
      className="bg-white flex flex-col dark:bg-primaryDark2 shadow-md rounded-md overflow-hidden "
      initial="hidden"
      animate="visible"
      variants={asideVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <h2 className="text-lg font-bold  text-blue-50 bg-blue-600 py-2 px-4">
        Użytkownicy
      </h2>
      <div className="flex flex-col p-4 mr-2 grow gap-4 overflow-y-auto">
        {isLoading ? (
          <>
            {Array.from({ length: 13 }).map((_, index) => (
              <ChatSkeleton key={index} />
            ))}
          </>
        ) : (
          chats.map((chat, index) => (
            <Chat
              key={index}
              firstName={chat.firstName}
              lastName={chat.lastName}
              nickname={chat.nickname}
              imageUrl={chat.imageUrl}
              active={chat.active}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ChatAside;
