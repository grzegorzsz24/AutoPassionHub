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

import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentModel from "../../models/CommentModel";
import DateFormatter from "../../utils/DateFormatter";
import { FaBookmark } from "react-icons/fa";
import ForumModel from "../../models/ForumModel";
import UserProfile from "../../ui/UserProfile";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

interface ForumProps {
  forum: ForumModel;
}

const Forum: FC<ForumProps> = ({ forum }) => {
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [isLoadingAddComment, setIsLoadingAddComment] =
    useState<boolean>(false);

  const addCommentHandler = async (content: string) => {
    try {
      setIsLoadingAddComment(true);
      const data = await addCommentToForum(forum.id, content);
      if (data.status !== "ok") {
        throw new Error(data.message);
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

  const addForumToSavedHandler = async () => {
    try {
      const data = await addForumToSaved(forum.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
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

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="bg-white dark:bg-primaryDark2 p-6 rounded-md shadow-md ">
      <div className="flex items-center justify-between gap-8  my-6">
        <div className="">
          <h1 className="font-bold text-2xl text-wrap">{forum.title}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {DateFormatter.formatDate(forum.createdAt)}
          </p>
          <button onClick={addForumToSavedHandler}>
            <FaBookmark />
          </button>
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
