import { FC, useState } from "react";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import CommentModel from "../../models/CommentModel";
import EditComment from "./EditComment";
import OutlineButton from "../../ui/OutlineButton";
import UserProfile from "../../ui/UserProfile";
import { useAppSelector } from "../../store/store";

interface CommentProps {
  comment: CommentModel;
  deleteCommentHandler: (id: number) => void;
  editCommentHandler: (id: number, content: string) => void;
}

const Comment: FC<CommentProps> = ({
  comment,
  deleteCommentHandler,
  editCommentHandler,
}) => {
  const { nickname: userNickname } = useAppSelector((state) => state.user);
  const [optionsAreShown, setOptionsAreShown] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onMouseOverHandler = () => {
    setOptionsAreShown(true);
  };

  const onMouseLeaveHandler = () => {
    setOptionsAreShown(false);
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-grayLight p-6 dark:bg-primaryDark">
      <div className="flex justify-between">
        <UserProfile
          size="small"
          imageUrl={comment.userImageUrl}
          firstName={comment.firstName}
          lastName={comment.lastName}
          nickname={comment.user}
          createdAt={comment.commentedAt}
        />
        {comment.user === userNickname && (
          <div
            className="relative cursor-pointer"
            onMouseOver={onMouseOverHandler}
            onMouseLeave={onMouseLeaveHandler}
          >
            <p className="text-primaryDark dark:text-blue-100">
              <BiDotsHorizontalRounded className="text-2xl" />
            </p>
            {optionsAreShown && (
              <div className="absolute right-0 z-40 flex flex-col gap-2 rounded-md  bg-grayLight px-4 py-2 text-sm text-primaryDark shadow-md dark:bg-grayDark dark:text-blue-50">
                <OutlineButton
                  size="xs"
                  fullWidth={true}
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Edytuj komentarz
                </OutlineButton>
                <OutlineButton
                  size="xs"
                  fullWidth={true}
                  onClick={() => {
                    deleteCommentHandler(comment.id);
                  }}
                >
                  Usuń komentarz
                </OutlineButton>
              </div>
            )}
          </div>
        )}
      </div>
      {!editMode && <div>{comment.content}</div>}
      {editMode && (
        <EditComment
          id={comment.id}
          currentContent={comment.content}
          setEditMode={setEditMode}
          editCommentHandler={editCommentHandler}
        />
      )}
    </div>
  );
};

export default Comment;
