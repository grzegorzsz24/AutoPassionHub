import { FC, useEffect, useState } from "react";
import {
  addCommentToForum,
  addForumToSaved,
  deleteForum,
  deleteForumComment,
  getForumComments,
  updateForumComment,
} from "../../services/forumService";

import AddComment from "./AddComment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Comment from "./Comment";
import CommentModel from "../../models/CommentModel";
import DateFormatter from "../../utils/DateFormatter";
import DropdownMenu from "../../ui/DropdownMenu";
import ForumModel from "../../models/ForumModel";
import OutlineButton from "../../ui/OutlineButton";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import UserProfile from "../../ui/UserProfile";
import { reportForum } from "../../services/reportService";
import { useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { useStompClient } from "react-stomp-hooks";

interface ForumProps {
  forum: ForumModel;
}

const Forum: FC<ForumProps> = ({ forum }) => {
  const navigate = useNavigate();
  const stompClient = useStompClient();
  const {
    showErrorNotification,
    showSuccessNotification,
    showInfoNotification,
  } = useNotification();
  const { userId: loggedInUserId, role } = useAppSelector(
    (state) => state.user,
  );

  const [comments, setComments] = useState<CommentModel[]>([]);
  const [isLoadingAddComment, setIsLoadingAddComment] =
    useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(forum.saved);

  const userIsForumAuthor = Number(loggedInUserId) === forum.userId;

  const deleteForumHandler = async () => {
    try {
      const data = await deleteForum(forum.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      showSuccessNotification(data.message);
      navigate(-1);
    } catch (error) {
      showErrorNotification(error);
    }
  };

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
      showErrorNotification(error);
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
        prevState.filter((comment) => comment.id !== id),
      );
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
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
          comment.id === id ? { ...comment, content } : comment,
        ),
      );
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
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
      showErrorNotification(error);
    }
  };

  const toogleBookmarkHandler = async () => {
    try {
      const data = await addForumToSaved(forum.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (isBookmarked) {
        showInfoNotification("Usunięto z zapisanych");
      } else {
        showSuccessNotification(data.message);
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      showErrorNotification(error);
    }
  };

  const reportForumHandler = async () => {
    try {
      const data = await reportForum(forum.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      showSuccessNotification(data.message);
      if (stompClient) {
        stompClient.publish({
          destination: `/app/admin/notification`,
          body: JSON.stringify({
            userTriggeredId: loggedInUserId,
            receiverId: 1,
            content: "Użytkownik zgłosił post",
            type: "FORUM_REPORT",
            entityId: forum.id,
          }),
        });
      }
    } catch (error) {
      showErrorNotification(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="rounded-md bg-white p-6 shadow-md dark:bg-primaryDark2 ">
      <div className="my-6 flex items-start justify-between  gap-8">
        <div className="">
          <h1 className="text-wrap text-2xl font-bold">{forum.title}</h1>
          <p className="mb-4 text-xs text-gray-500 dark:text-gray-300">
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
        {!userIsForumAuthor && (
          <DropdownMenu
            triggerElement={
              <BiDotsHorizontalRounded className="text-lg sm:text-2xl" />
            }
          >
            {role !== "ADMIN" && (
              <OutlineButton
                size="sm"
                fullWidth={true}
                onClick={reportForumHandler}
              >
                Zgłoś forum
              </OutlineButton>
            )}
            {role === "ADMIN" && (
              <OutlineButton
                size="sm"
                color="red"
                fullWidth={true}
                onClick={deleteForumHandler}
              >
                Usuń forum
              </OutlineButton>
            )}
          </DropdownMenu>
        )}
      </div>
      <p className="mb-12 text-justify leading-10">{forum.content}</p>
      <div className="mx-auto flex w-full flex-col gap-6 p-6">
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
