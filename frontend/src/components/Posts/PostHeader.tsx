import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropdownMenu from "../../ui/DropdownMenu";
import { FC } from "react";
import OutlineButton from "../../ui/OutlineButton";
import UserProfile from "../../ui/UserProfile";
import handleError from "../../services/errorHandler";
import { reportPost } from "../../services/reportService";

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
  const dispatch = useAppDispatch();
  const { nickname: userNickname, role } = useAppSelector(
    (state) => state.user
  );

  const reportPostHandler = async () => {
    try {
      const response = await reportPost(id);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(
        addNotification({
          message: response.message,
          type: NotificationStatus.SUCCESS,
        })
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    }
  };

  const userIsNotPostAuthor = nickname !== userNickname;

  return (
    <div className=" py-4 px-2 sm:px-4 flex items-center justify-between">
      <UserProfile
        size="medium"
        imageUrl={avatar}
        firstName={firstName}
        lastName={lastName}
        nickname={nickname}
        createdAt={createdAt}
      />
      <DropdownMenu
        triggerElement={
          <BiDotsHorizontalRounded className="text-lg sm:text-2xl" />
        }
      >
        {nickname === userNickname && (
          <OutlineButton
            size="sm"
            fullWidth={true}
            onClick={() => setEditMode(true)}
          >
            Edytuj post
          </OutlineButton>
        )}
        {(nickname === userNickname || role === "ADMIN") && (
          <OutlineButton
            size="sm"
            color="red"
            fullWidth={true}
            onClick={() => {
              deletePostHandler(id);
            }}
          >
            Usuń post
          </OutlineButton>
        )}

        {userIsNotPostAuthor && (
          <OutlineButton size="sm" fullWidth={true} onClick={reportPostHandler}>
            Zgłoś post
          </OutlineButton>
        )}
      </DropdownMenu>
    </div>
  );
};

export default PostHeader;
