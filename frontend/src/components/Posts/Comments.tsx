import { FC, useEffect } from "react";

import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentModel from "../../models/CommentModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getPostComments } from "../../services/commentService";
import { useNotification } from "../../hooks/useNotification";

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
  const { showErrorNotification } = useNotification();
  const getCommentsHandler = async () => {
    try {
      setCommentsAreLoading(true);
      const data = await getPostComments(id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setComments(data.comments);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setCommentsAreLoading(false);
    }
  };

  useEffect(() => {
    getCommentsHandler();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
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
