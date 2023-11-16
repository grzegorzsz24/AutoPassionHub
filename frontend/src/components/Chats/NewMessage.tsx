import { FC, useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";

interface NewMessageProps {
  sendMessage: (message: string) => void;
}

const NewMessage: FC<NewMessageProps> = ({ sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="px-4 pt-2 flex gap-8">
      <TextareaAutosize
        className="bg-grayLight dark:bg-grayDark resize-none w-full outline-none border-none rounded-md overflow-auto py-2 px-2  focus:ring-2 focus:ring-blue-600"
        minRows={1}
        maxRows={5}
        placeholder="Napisz wiadomość"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <PrimaryButton onClick={handleSendMessage}>Wyślij</PrimaryButton>
    </div>
  );
};

export default NewMessage;
