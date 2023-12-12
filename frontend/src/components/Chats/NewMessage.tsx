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
    <div className="relative flex flex-col gap-2 px-2 pt-2 sm:flex-row sm:gap-8 sm:px-4">
      <TextareaAutosize
        className="w-full resize-none overflow-auto rounded-md border-none bg-grayLight px-2 py-2 outline-none focus:ring-2  focus:ring-blue-600 dark:bg-grayDark"
        minRows={1}
        maxRows={5}
        placeholder="Napisz wiadomość"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <div
        ref={emojiIconRef}
        className="hidden cursor-pointer text-4xl text-gray-600 transition-all hover:scale-110 hover:text-blue-600 dark:text-blue-50 dark:hover:text-blue-600 sm:block"
        onClick={toggleEmojiPicker}
      >
        {showPicker ? <MdEmojiEmotions /> : <MdOutlineInsertEmoticon />}
      </div>
      {showPicker && (
        <div className="absolute bottom-12 right-0" ref={pickerRef}>
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
