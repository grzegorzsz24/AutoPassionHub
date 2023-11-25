import { FC, useEffect, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import {
  addCommentToForum,
  addForumToSaved,
  deleteForumComment,
  getForumComments,
  updateForumComment,
} from "../../services/forumService";
import { useAppDispatch, useAppSelector } from "../../store/store";

import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentModel from "../../models/CommentModel";
import DateFormatter from "../../utils/DateFormatter";
import ForumModel from "../../models/ForumModel";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import UserProfile from "../../ui/UserProfile";
import handleError from "../../services/errorHandler";
import { useStompClient } from "react-stomp-hooks";

interface ForumProps {
  forum: ForumModel;
}

const Forum: FC<ForumProps> = ({ forum }) => {
  const stompClient = useStompClient();
  const dispatch = useAppDispatch();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);

  const [comments, setComments] = useState<CommentModel[]>([]);
  const [isLoadingAddComment, setIsLoadingAddComment] =
    useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(forum.saved);

  const addCommentHandler = async (content: string) => {
    try {
      setIsLoadingAddComment(true);
      const data = await addCommentToForum(forum.id, content);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (stompClient && Number(loggedInUserId) !== forum.userId) {
        stompClient.publish({
          destination: `/app/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: forum.userId,
            content: "Użytkownik skomentował twoje forum",
            type: "FORUM_COMMENT",
            entityId: forum.id,
          }),
        });
      }
      setComments((prevState) => [data.data, ...prevState]);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      setIsLoadingAddComment(false);
    }
  };

  const deleteCommentHandler = async (id: number) => {
    try {
      const data = await deleteForumComment(id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setComments((prevState) =>
        prevState.filter((comment) => comment.id !== id)
      );
      dispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: data.message,
        })
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  const updateCommentHandler = async (id: number, content: string) => {
    try {
      const data = await updateForumComment(id, content);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setComments((prevState) =>
        prevState.map((comment) =>
          comment.id === id ? { ...comment, content } : comment
        )
      );
      dispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: data.message,
        })
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  const getComments = async () => {
    try {
      const data = await getForumComments(forum.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setComments(data.data);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  const toogleBookmarkHandler = async () => {
    try {
      const data = await addForumToSaved(forum.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (isBookmarked) {
        dispatch(
          addNotification({
            type: NotificationStatus.INFO,
            message: "Usunięto z zapisanych",
          })
        );
      } else {
        dispatch(
          addNotification({
            type: NotificationStatus.SUCCESS,
            message: data.message,
          })
        );
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="bg-white dark:bg-primaryDark2 p-6 rounded-md shadow-md ">
      <div className="flex items-start justify-between gap-8  my-6">
        <div className="">
          <h1 className="font-bold text-2xl text-wrap">{forum.title}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
            {DateFormatter.formatDate(forum.createdAt)}
          </p>
          <ToogleBookmarkButton
            isBookmarked={isBookmarked}
            onClick={toogleBookmarkHandler}
            size="large"
          />
        </div>
        <UserProfile
          size="small"
          imageUrl={forum.userImageUrl}
          firstName={forum.firstName}
          lastName={forum.lastName}
          nickname={forum.user}
        />
      </div>
      <p className="leading-10 mb-12 text-justify">{forum.content}</p>
      <div className="w-full mx-auto p-6 flex flex-col gap-6">
        <AddComment
          addCommentHandler={addCommentHandler}
          isLoading={isLoadingAddComment}
        />
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteCommentHandler={deleteCommentHandler}
            editCommentHandler={updateCommentHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Forum;
