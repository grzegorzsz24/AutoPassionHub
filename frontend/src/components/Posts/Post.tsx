import { FC, useEffect, useRef, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import {
  addComment,
  deleteComment,
  editComment,
} from "../../services/commentService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import CommentModel from "../../models/CommentModel";
import Comments from "./Comments";
import EditPost from "./EditPost";
import Gallery from "../Gallery";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostModel from "../../models/PostModel";
import PostText from "./PostText";
import { debounce } from "lodash";
import handleError from "../../services/errorHandler";
import { toggleLike } from "../../services/likeService";
import { useAppDispatch } from "../../store/store";

interface PostProps extends PostModel {
  deletePostHandler: (id: number) => void;
  editPostHandler: (id: number, content: string) => void;
}

const Post: FC<PostProps> = ({
  id,
  content,
  postedAt,
  // file,
  user,
  imageUrls,
  likesNumber,
  commentsNumber,
  firstName,
  lastName,
  userImageUrl,
  liked,
  deletePostHandler,
  editPostHandler,
}) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [numberOfLikes, setNumberOfLikes] = useState(likesNumber);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [commentsAreLoading, setCommentsAreLoading] = useState(false);
  const [numberOfComments, setNumberOfComments] = useState(commentsNumber);
  const postRef = useRef<HTMLDivElement>(null);

  const [commentsAreShown, setCommentsAreShown] = useState(false);

  const debouncedToggleLike = debounce(async () => {
    try {
      const data = await toggleLike(id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
      setIsLiked((prev) => !prev);
      setNumberOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  }, 500);

  const toggleLikeHandler = () => {
    setIsLiked((prev) => !prev);
    setNumberOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    debouncedToggleLike();
  };

  const toogleCommentsVisibilityHandler = () => {
    if (commentsAreShown) {
      setComments([]);
    }
    setCommentsAreShown((prev) => !prev);
  };

  const deleteCommentHandler = async (commentId: number) => {
    try {
      dispatch(startLoading());
      const data = await deleteComment(commentId);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      setNumberOfComments((prev) => prev - 1);
      dispatch(
        addNotification({
          message: data.message,
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
    } finally {
      dispatch(stopLoading());
    }
  };

  const editCommentHandler = async (commentId: number, content: string) => {
    try {
      dispatch(startLoading());
      const data = await editComment(commentId, content);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content };
          }
          return comment;
        })
      );
      dispatch(
        addNotification({
          message: data.message,
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
    } finally {
      dispatch(stopLoading());
    }
  };

  const addCommentHandler = async (content: string) => {
    try {
      dispatch(startLoading());
      const data = await addComment(id, content);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setComments((prev) => [data.comment, ...prev]);
      setNumberOfComments((prev) => prev + 1);
      dispatch(
        addNotification({
          message: data.message,
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
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (commentsAreShown && postRef.current) {
      postRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [commentsAreShown]);

  return (
    <div
      className="bg-white text-primaryDark dark:bg-primaryDark2 dark:text-blue-100 max-w-2xl w-full rounded-md shadow-md"
      ref={postRef}
    >
      <PostHeader
        id={id}
        firstName={firstName}
        lastName={lastName}
        nickname={user}
        avatar={userImageUrl}
        createdAt={postedAt}
        deletePostHandler={deletePostHandler}
        setEditMode={setEditMode}
      />
      {!editMode && <PostText text={content} />}
      {editMode && (
        <EditPost
          id={id}
          currentContent={content}
          setEditMode={setEditMode}
          editPostHandler={editPostHandler}
        />
      )}
      {imageUrls.length > 0 && (
        <div className="h-96">
          <Gallery images={imageUrls} />
        </div>
      )}
      <PostFooter
        liked={isLiked}
        toogleLikeHandler={toggleLikeHandler}
        likes={numberOfLikes}
        comments={numberOfComments}
        toogleCommentsVisibilityHandler={toogleCommentsVisibilityHandler}
      />
      {commentsAreShown && (
        <Comments
          id={id}
          comments={comments}
          setComments={setComments}
          commentsAreLoading={commentsAreLoading}
          setCommentsAreLoading={setCommentsAreLoading}
          deleteCommentHandler={deleteCommentHandler}
          editCommentHandler={editCommentHandler}
          addCommentHandler={addCommentHandler}
        />
      )}
    </div>
  );
};

export default Post;
