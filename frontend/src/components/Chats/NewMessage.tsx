import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

const NewMessage = () => {
  const [newMessage, setNewMessage] = useState("");
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
      <PrimaryButton onClick={() => {}}>Wyślij</PrimaryButton>
    </div>
  );
};

export default NewMessage;
