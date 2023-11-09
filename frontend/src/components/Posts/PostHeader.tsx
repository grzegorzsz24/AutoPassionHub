import { FC, useState } from "react";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import OutlineButton from "../../ui/OutlineButton";
import UserProfile from "../../ui/UserProfile";
import { useAppSelector } from "../../store/store";

interface PostHeaderProps {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string;
  createdAt: string;
  deletePostHandler: (id: number) => void;
  setEditMode: (value: boolean) => void;
}

const PostHeader: FC<PostHeaderProps> = ({
  id,
  firstName,
  lastName,
  nickname,
  avatar,
  createdAt,
  deletePostHandler,
  setEditMode,
}) => {
  const { nickname: userNickname } = useAppSelector((state) => state.user);
  const [optionsAreShown, setOptionsAreShown] = useState(false);

  const onMouseOverHandler = () => {
    setOptionsAreShown(true);
  };

  const onMouseLeaveHandler = () => {
    setOptionsAreShown(false);
  };

  return (
    <div className=" py-4 px-4 flex items-center justify-between">
      <UserProfile
        size="medium"
        imageUrl={avatar}
        firstName={firstName}
        lastName={lastName}
        nickname={nickname}
        createdAt={createdAt}
      />
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
            {nickname === userNickname && (
              <>
                <OutlineButton
                  size="xs"
                  fullWidth={true}
                  onClick={() => setEditMode(true)}
                >
                  Edytuj post
                </OutlineButton>
                <OutlineButton
                  size="xs"
                  fullWidth={true}
                  onClick={() => {
                    deletePostHandler(id);
                  }}
                >
                  Usuń post
                </OutlineButton>
              </>
            )}
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
