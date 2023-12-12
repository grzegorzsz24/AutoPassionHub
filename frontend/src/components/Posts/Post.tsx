import { FC, useEffect, useRef, useState } from "react";
import {
  addComment,
  deleteComment,
  editComment,
} from "../../services/commentService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import CommentModel from "../../models/CommentModel";
import Comments from "./Comments";
import EditPost from "./EditPost";
import Gallery from "../Gallery";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostModel from "../../models/PostModel";
import PostText from "./PostText";
import { debounce } from "lodash";
import { toggleLike } from "../../services/likeService";
import { useNotification } from "../../hooks/useNotification";
import { useStompClient } from "react-stomp-hooks";

interface PostProps extends PostModel {
  deletePostHandler: (id: number) => void;
  editPostHandler: (id: number, content: string) => void;
}

const Post: FC<PostProps> = ({
  id,
  content,
  postedAt,
  userId,
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
  const stompClient = useStompClient();
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
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
      if (
        stompClient &&
        isLiked === false &&
        userId !== Number(loggedInUserId)
      ) {
        stompClient.publish({
          destination: `/app/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: userId,
            content: "Użytkownik polubił twój post",
            type: "POST_LIKE",
            entityId: id,
          }),
        });
      }
    } catch (error) {
      showErrorNotification(error);
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
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
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
        }),
      );
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
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
      if (stompClient && userId !== Number(loggedInUserId)) {
        stompClient.publish({
          destination: `/app/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: userId,
            content: "Użytkownik skomentował twój post",
            type: "POST_COMMENT",
            entityId: id,
          }),
        });
      }
      setComments((prev) => [data.comment, ...prev]);
      setNumberOfComments((prev) => prev + 1);
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
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
      className="w-full max-w-2xl rounded-md bg-white text-primaryDark shadow-md dark:bg-primaryDark2 dark:text-blue-100"
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
        <div className="h-64 sm:h-96">
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
