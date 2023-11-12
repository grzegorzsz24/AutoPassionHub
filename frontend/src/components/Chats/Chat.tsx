import { FC } from "react";

interface ChatProps {
  firstName: string;
  lastName: string;
  nickname: string;
  imageUrl: string;
  active: boolean;
}

const Chat: FC<ChatProps> = ({
  firstName,
  lastName,
  nickname,
  imageUrl,
  active,
}) => {
  return (
    <div className="px-2 py-4  w-full border-b-2 border-gray-300 flex gap-6 cursor-pointer  group hover:border-blue-600 transition-all ">
      <div className="relative">
        <img src={imageUrl} alt="profile" className="rounded-full h-10 w-10" />
        {active && (
          <div className="absolute top-[-4px] right-[-4px] w-4 h-4 rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="flex-1 py-1">
        <div className=" rounded w-48 group-hover:text-blue-600 transition-all">
          {firstName} {lastName}
        </div>
        <div className="rounded w-24 text-xs text-blue-600">{nickname}</div>
      </div>
    </div>
  );
};

export default Chat;
