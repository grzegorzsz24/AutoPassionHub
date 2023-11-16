import { FC, useEffect, useRef } from "react";

import Message from "./Message";
import MessageModel from "../../models/MessageModel";
import { useAppSelector } from "../../store/store";

// const messages = [
//   {
//     my: true,
//     text: "Hello",
//     date: "2021-06-01T12:00:00.000Z",
//   },
//   {
//     my: false,
//     text: "Hi",
//     date: "2021-06-01T12:01:00.000Z",
//   },
//   {
//     my: true,
//     text: "How are you?",
//     date: "2021-06-01T12:02:00.000Z",
//   },
//   {
//     my: false,
//     text: "Good, you?",
//     date: "2021-06-01T12:03:00.000Z",
//   },
//   {
//     my: true,
//     text: "I'm fine",
//     date: "2021-06-01T12:04:00.000Z",
//   },
//   {
//     my: false,
//     text: "Nice",
//     date: "2021-06-01T12:05:00.000Z",
//   },
//   {
//     my: true,
//     text: "And you?",
//     date: "2021-06-01T12:06:00.000Z",
//   },
//   {
//     my: false,
//     text: "I'm fine too, I've just bought a new car - BMW E46. You can see it in my profile. I'm so happy!",
//     date: "2021-06-01T12:07:00.000Z",
//   },
//   {
//     my: true,
//     text: "Wow, nice car! It really impresses me! I hope it will serve you for a long time!",
//     date: "2021-06-02T12:08:00.000Z",
//   },
//   {
//     my: false,
//     text: "Thank you so much mate! I hope so too! If you want to see it, you can come to my house and we can go for a ride!",
//     date: "2021-06-02T12:09:00.000Z",
//   },
// ];

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
    <div className="px-4 flex flex-col gap-2 ">
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
