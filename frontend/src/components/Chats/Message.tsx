import DateFormatter from "../../utils/DateFormatter";
import { FC } from "react";

interface MessageProps {
  message: string;
  my: boolean;
  date: string;
}

const Message: FC<MessageProps> = ({ message, my, date }) => {
  return (
    <div
      className={`flex flex-col gap-1   lg:max-w-[65%] ${
        my ? "ml-auto items-end" : "items-start"
      }`}
    >
      <div
        className={`py-2 px-4 rounded md text-lg  ${
          my ? "bg-grayLight text-primaryDark" : "bg-blue-600 text-blue-50"
        }`}
      >
        {message}
      </div>
      <span className="text-xs">{DateFormatter.formatDate(date)}</span>
    </div>
  );
};

export default Message;
