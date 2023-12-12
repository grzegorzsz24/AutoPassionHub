import { FC, useEffect, useRef } from "react";

import Message from "./Message";
import MessageModel from "../../models/MessageModel";
import { useAppSelector } from "../../store/store";

interface MessagesProps {
  messages: MessageModel[];
}

const Messages: FC<MessagesProps> = ({ messages }) => {
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 px-4 ">
      {messages.map((message, index) => (
        <div ref={scroll} key={index}>
          <Message
            my={message.senderId === Number(loggedInUserId)}
            message={message.message}
            date={message.createdAt}
          />
        </div>
      ))}
    </div>
  );
};

export default Messages;
