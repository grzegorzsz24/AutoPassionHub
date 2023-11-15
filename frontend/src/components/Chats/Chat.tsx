import { FC } from "react";

interface ChatProps {
  firstName: string;
  lastName: string;
  nickname: string;
  imageUrl: string;
  active: boolean;
  selected?: boolean;
}

const Chat: FC<ChatProps> = ({
  firstName,
  lastName,
  nickname,
  imageUrl,
  active,
  selected,
}) => {
  console.log(
    `Chat: ${firstName} ${lastName} ${nickname} ${imageUrl} ${active} ${selected}`
  );

  return (
    <div
      className={`px-2 py-4  w-full  dark:border-primaryDark flex gap-6  group  transition-all rounded-md ${
        selected
          ? "bg-blue-600 text-blue-50 cursor-default"
          : "cursor-pointer hover:bg-blue-600 hover:text-blue-50"
      }`}
    >
      <div className="relative">
        <img src={imageUrl} alt="profile" className="rounded-full h-12 w-12" />
        {active && (
          <div className="absolute top-[-4px] right-[-4px] w-4 h-4 rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="py-1">
        <div className="font-bold  rounded  ">
          {firstName} {lastName}
        </div>
        <div className={`rounded  text-sm `}>{nickname}</div>
      </div>
    </div>
  );
};

export default Chat;
