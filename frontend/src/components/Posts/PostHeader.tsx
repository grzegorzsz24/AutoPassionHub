import { BiDotsHorizontalRounded } from "react-icons/bi";
import DropdownMenu from "../../ui/DropdownMenu";
import { FC } from "react";
import OutlineButton from "../../ui/OutlineButton";
import UserProfile from "../../ui/UserProfile";
import { reportPost } from "../../services/reportService";
import { useAppSelector } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";
import { useStompClient } from "react-stomp-hooks";

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
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const stompClient = useStompClient();
  const {
    nickname: userNickname,
    role,
    userId,
  } = useAppSelector((state) => state.user);

  const reportPostHandler = async () => {
    try {
      const response = await reportPost(id);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      showSuccessNotification(response.message);
      if (stompClient) {
        stompClient.publish({
          destination: `/app/admin/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(userId),
            receiverId: 1,
            content: "Użytkownik zgłosił post",
            type: "POST_REPORT",
            entityId: id,
          }),
        });
      }
    } catch (error) {
      showErrorNotification(error);
    }
  };

  const userIsNotPostAuthor = nickname !== userNickname;

  return (
    <div className=" flex items-center justify-between px-2 py-4 sm:px-4">
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

        {userIsNotPostAuthor && role !== "ADMIN" && (
          <OutlineButton size="sm" fullWidth={true} onClick={reportPostHandler}>
            Zgłoś post
          </OutlineButton>
        )}
      </DropdownMenu>
    </div>
  );
};

export default PostHeader;
