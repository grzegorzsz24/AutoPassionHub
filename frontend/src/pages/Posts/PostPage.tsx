import { deletePost, editPost, getPostById } from "../../services/postService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useState } from "react";

import LoadingSpinner from "../../ui/LoadingSpinner";
import { NotificationStatus } from "../../store/features/notificationSlice";
import Post from "../../components/Posts/Post";
import PostModel from "../../models/PostModel";
import { addNotification } from "../../store/features/notificationSlice";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<PostModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const downloadPost = async (id: number) => {
    try {
      setIsLoading(true);
      const data = await getPostById(id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setPost(data.post);
      console.log(data.post);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deletePostHandler = async (id: number) => {
    try {
      dispatch(startLoading());
      const data = await deletePost(id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      dispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: data.message,
        })
      );
      setPost(null);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const editPostHandler = async (id: number, content: string) => {
    try {
      dispatch(startLoading());
      const data = await editPost(id, content);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      dispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: data.message,
        })
      );
      setPost(
        post && {
          ...post,
          content,
        }
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (id) {
      downloadPost(Number(id));
    }
  }, []);

  return (
    <div className="flex h-full py-6 w-full">
      <div className="my-4 md:m-6 lg:m-8 flex   gap-4 md:gap-8 grow  text-primaryDark2 dark:text-blue-50 overflow-y-auto">
        {isLoading && <LoadingSpinner />}
        {post && (
          <div className="mx-auto">
            <Post
              id={post.id}
              content={post.content}
              postedAt={post.postedAt}
              file={post.file}
              userId={post.userId}
              user={post.user}
              imageUrls={post.imageUrls}
              likesNumber={post.likesNumber}
              commentsNumber={post.commentsNumber}
              firstName={post.firstName}
              lastName={post.lastName}
              userImageUrl={post.userImageUrl}
              liked={post.liked}
              deletePostHandler={deletePostHandler}
              editPostHandler={editPostHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
