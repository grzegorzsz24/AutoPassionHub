import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { deletePost, editPost } from "../../services/postService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useState } from "react";

import AddPost from "./AddPost";
import LoadingPost from "./LoadingPost";
import Post from "./Post";
import PostModel from "../../models/PostModel";
import { getPosts } from "../../services/postService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const POSTS_PER_PAGE = import.meta.env.VITE_POSTS_PER_PAGE as number;
const Posts = () => {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const downloadPosts = async () => {
    try {
      setIsLoading(true);
      const data = await getPosts(page, POSTS_PER_PAGE);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setPosts(data.posts);
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

  const addPostToList = (post: PostModel) => {
    setPosts((prev) => [post, ...prev]);
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
      setPosts((prev) => prev.filter((post) => post.id !== id));
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
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === id) {
            return { ...post, content };
          }
          return post;
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
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    downloadPosts();
  }, []);

  return (
    <div className="bg-gears-light dark:bg-gears-dark bg-no-repeat bg-contain bg-center gap-8 items-center overflow-y-auto h-full flex-grow ">
      <div className="flex flex-col items-center gap-6 sm:gap-12 py-6 sm:py-12">
        {!isLoading && <AddPost addPostToList={addPostToList} />}
        {isLoading && (
          <>
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
          </>
        )}
        {posts.map((post) => (
          <Post
            key={post.id}
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
        ))}
      </div>
    </div>
  );
};

export default Posts;
