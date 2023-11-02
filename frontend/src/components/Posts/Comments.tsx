import { FC, useEffect } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentModel from "../../models/CommentModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getPostComments } from "../../services/commentService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

interface CommentsProps {
  id: number;
  comments: CommentModel[];
  setComments: (comments: CommentModel[]) => void;
  commentsAreLoading: boolean;
  setCommentsAreLoading: (isLoading: boolean) => void;
  deleteCommentHandler: (id: number) => void;
  editCommentHandler: (id: number, content: string) => void;
  addCommentHandler: (content: string) => void;
}

const Comments: FC<CommentsProps> = ({
  id,
  comments,
  setComments,
  commentsAreLoading,
  setCommentsAreLoading,
  deleteCommentHandler,
  editCommentHandler,
  addCommentHandler,
}) => {
  const dispatch = useAppDispatch();
  const getCommentsHandler = async () => {
    try {
      setCommentsAreLoading(true);
      const data = await getPostComments(id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      console.log(data);
      setComments(data.comments);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      setCommentsAreLoading(false);
    }
  };

  useEffect(() => {
    getCommentsHandler();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      {!commentsAreLoading && (
        <AddComment addCommentHandler={addCommentHandler} />
      )}
      {commentsAreLoading && (
        <LoadingSpinner small message="Pobieranie komentarzy..." />
      )}
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            deleteCommentHandler={deleteCommentHandler}
            editCommentHandler={editCommentHandler}
          />
        );
      })}
    </div>
  );
};

export default Comments;
