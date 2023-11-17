import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { FC, useEffect, useRef, useState } from "react";
import { MdEmojiEmotions, MdOutlineInsertEmoticon } from "react-icons/md";

import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";

interface NewMessageProps {
  sendMessage: (message: string) => void;
}

const emojiConfig = {
  defaultEmoji: "1f60a",
  defaultCaption: "Jaki jest twój nastrój?",
  showPreview: false,
};

const NewMessage: FC<NewMessageProps> = ({ sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const emojiIconRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  const addEmojiToMessage = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowPicker((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        emojiIconRef.current &&
        !emojiIconRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-4 pt-2 flex gap-8 relative">
      <TextareaAutosize
        className="bg-grayLight dark:bg-grayDark resize-none w-full outline-none border-none rounded-md overflow-auto py-2 px-2  focus:ring-2 focus:ring-blue-600"
        minRows={1}
        maxRows={5}
        placeholder="Napisz wiadomość"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <div
        ref={emojiIconRef}
        className="text-4xl text-gray-600 dark:text-blue-50 cursor-pointer hover:text-blue-600 dark:hover:text-blue-600 transition-all hover:scale-110"
        onClick={toggleEmojiPicker}
      >
        {showPicker ? <MdEmojiEmotions /> : <MdOutlineInsertEmoticon />}
      </div>
      {showPicker && (
        <div className="absolute bottom-12 right-0 " ref={pickerRef}>
          <EmojiPicker
            onEmojiClick={(e) => addEmojiToMessage(e.emoji)}
            height={"400px"}
            searchPlaceholder="Szukaj"
            previewConfig={emojiConfig}
            emojiStyle={EmojiStyle.TWITTER}
            theme={Theme.LIGHT}
          />
        </div>
      )}
      <PrimaryButton onClick={handleSendMessage}>Wyślij</PrimaryButton>
    </div>
  );
};

export default NewMessage;
