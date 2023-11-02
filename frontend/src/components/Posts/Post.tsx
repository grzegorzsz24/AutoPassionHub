import { FC, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import EditPost from "./EditPost";
import Gallery from "../Gallery";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostModel from "../../models/PostModel";
import PostText from "./PostText";
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
  likesNumber: likes,
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
  const [likesNumber, setLikesNumber] = useState(likes);

  //   const [commentsAreShown, setCommentsAreShown] = useState(false);
  //   const [downloadingComments, setDownloadingComments] = useState(false);

  const toggleLikeHandler = async () => {
    try {
      const data = await toggleLike(id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (isLiked) {
        setIsLiked(false);
        setLikesNumber((prev) => prev - 1);
      } else {
        setIsLiked(true);
        setLikesNumber((prev) => prev + 1);
      }
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    }
  };

  return (
    <div className="bg-white text-primaryDark dark:bg-primaryDark2 dark:text-blue-100 max-w-2xl w-full rounded-md shadow-md">
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
        likes={likesNumber}
        comments={commentsNumber}
      />
    </div>
  );
};

export default Post;
