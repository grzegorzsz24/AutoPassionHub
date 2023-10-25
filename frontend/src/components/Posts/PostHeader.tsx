import { FC, useState } from "react";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import DateFormatter from "../../utils/formatDate";
import OutlineButton from "../../ui/OutlineButton";
import { useNavigate } from "react-router-dom";

interface PostHeaderProps {
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string;
  createdAt: string;
}

const PostHeader: FC<PostHeaderProps> = ({
  firstName,
  lastName,
  nickname,
  avatar,
  createdAt,
}) => {
  const navigate = useNavigate();
  const [optionsAreShown, setOptionsAreShown] = useState(false);

  const onMouseOverHandler = () => {
    setOptionsAreShown(true);
  };

  const onMouseLeaveHandler = () => {
    setOptionsAreShown(false);
  };

  return (
    <div className=" py-4 px-4 flex items-center justify-between">
      <div className="flex gap-4">
        <img
          src={avatar}
          alt={`${firstName} ${lastName} picture`}
          className="w-12 h-12 rounded-full"
        />
        <div
          className="flex flex-col gap-1"
          onClick={() => {
            navigate(`/user/${nickname}`);
          }}
        >
          <div className="flex gap-2 items-center cursor-pointer">
            <p className="text-md font-bold">
              {firstName} {lastName}
            </p>
            <p className="text-sm text-blue-600">@{nickname}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-[0.6rem] ">
              {DateFormatter.formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative cursor-pointer"
        onMouseOver={onMouseOverHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <p className="text-primaryDark dark:text-blue-100">
          <BiDotsHorizontalRounded className="text-2xl" />
        </p>
        {optionsAreShown && (
          <div className="absolute z-40 right-0 bg-grayLight text-primaryDark dark:bg-grayDark dark:text-blue-50  py-2 px-4 flex flex-col gap-2 text-sm rounded-md shadow-md">
            <OutlineButton size="xs" fullWidth={true} onClick={() => {}}>
              Dodaj do ulubionych
            </OutlineButton>
            <OutlineButton size="xs" fullWidth={true} onClick={() => {}}>
              Zgłoś post
            </OutlineButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
