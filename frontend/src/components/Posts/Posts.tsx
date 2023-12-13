import { deletePost, editPost } from "../../services/postService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useRef, useState } from "react";

import AddPost from "./AddPost";
import LoadingPost from "./LoadingPost";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Post from "./Post";
import PostModel from "../../models/PostModel";
import { getPosts } from "../../services/postService";
import { useAppDispatch } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";

const POSTS_PER_PAGE = import.meta.env.VITE_POSTS_PER_PAGE as number;
const Posts = () => {
  const dispatch = useAppDispatch();
  const postContainerRef = useRef<HTMLDivElement>(null);
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [page, setPage] = useState(1);
  const [numberOfAllPosts, setNumberOfAllPosts] = useState(0);
  const [downloadingPosts, setDownloadingPosts] = useState(true);
  const [downloadingMorePosts, setDownloadingMorePosts] = useState(false);

  const hasMorePosts = posts.length < numberOfAllPosts;

  const block = useRef(false);

  const downloadPosts = async () => {
    block.current = true;
    try {
      const data = await getPosts(page, POSTS_PER_PAGE);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setPosts(data.posts);
      setPage(2);
      setNumberOfAllPosts(data.totalPostsNumber);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      block.current = false;
      setDownloadingPosts(false);
    }
  };

  const loadMorePosts = async () => {
    try {
      const data = await getPosts(page, POSTS_PER_PAGE);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setPage((prev) => prev + 1);
      const newPosts = data.posts.filter(
        (newPost: PostModel) =>
          !posts.some((existingPost) => existingPost.id === newPost.id),
      );
      setPosts((prev) => [...prev, ...newPosts]);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      block.current = false;
      setTimeout(() => {
        setDownloadingMorePosts(false);
      }, 500);
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
      showSuccessNotification(data.message);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      showErrorNotification(error);
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
      showSuccessNotification(data.message);
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === id) {
            return { ...post, content };
          }
          return post;
        }),
      );
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleScroll = (event: Event) => {
    if (
      !hasMorePosts ||
      downloadingMorePosts ||
      downloadingPosts ||
      block.current
    )
      return;
    if (event.target instanceof Element) {
      const threshold = 0.7;
      const bottom =
        event.target.scrollTop >=
        (event.target.scrollHeight - event.target.clientHeight) * threshold;
      if (
        bottom &&
        hasMorePosts &&
        !downloadingPosts &&
        !downloadingMorePosts
      ) {
        block.current = true;
        setDownloadingMorePosts(true);
        loadMorePosts();
      }
    }
  };

  useEffect(() => {
    downloadPosts();
  }, []);

  useEffect(() => {
    const container = postContainerRef.current;
    if (container) {
      postContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page, downloadingMorePosts, loadMorePosts]);

  return (
    <div
      className="h-full flex-grow items-center gap-8 overflow-y-auto bg-gears-light bg-contain bg-center bg-no-repeat dark:bg-gears-dark"
      ref={postContainerRef}
    >
      <div className="flex flex-col items-center gap-6 py-6 sm:gap-12 sm:py-12">
        {!downloadingPosts && <AddPost addPostToList={addPostToList} />}
        {downloadingPosts && (
          <>
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
          </>
        )}
        {!downloadingPosts &&
          posts &&
          posts.map((post) => (
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
        {downloadingMorePosts && <LoadingSpinner small />}
      </div>
    </div>
  );
};

export default Posts;
