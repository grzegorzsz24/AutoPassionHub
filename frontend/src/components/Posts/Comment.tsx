import { FC, useState } from "react";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import CommentModel from "../../models/CommentModel";
import DateFormatter from "../../utils/formatDate";
import EditComment from "./EditComment";
import OutlineButton from "../../ui/OutlineButton";
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
    <div className="flex flex-col gap-4 bg-grayLight dark:bg-primaryDark rounded-md p-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div>
            <img
              src={comment.userImageUrl}
              alt={`${comment.firstName} ${comment.lastName} komentarz`}
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-md font-bold">
                {comment.firstName} {comment.lastName}
              </p>
              <p className="text-sm text-blue-600">{comment.user}</p>
            </div>

            <p className="text-[0.6rem]">
              {DateFormatter.formatDate(comment.commentedAt)}
            </p>
          </div>
        </div>
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
              <div className="absolute z-40 right-0 bg-grayLight text-primaryDark dark:bg-grayDark dark:text-blue-50  py-2 px-4 flex flex-col gap-2 text-sm rounded-md shadow-md">
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
