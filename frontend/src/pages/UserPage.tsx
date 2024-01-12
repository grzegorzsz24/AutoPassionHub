import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";
import { deletePost, editPost } from "../services/postService";
import { startLoading, stopLoading } from "../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AddPost from "../components/Posts/AddPost";
import OutlineButton from "../ui/OutlineButton";
import Post from "../components/Posts/Post";
import PostModel from "../models/PostModel";
import UserHeader from "../components/UserHeader";
import UserModel from "../models/UserModel";
import { getUserByNickname } from "../services/userService";
import { getUserPosts } from "../services/postService";
import handleError from "../services/errorHandler";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname: userNickname } = useAppSelector((state) => state.user);
  const { nickname: nicknameFromParams } = useParams();
  const [user, setUser] = useState<UserModel | null>(null);
  const [posts, setPosts] = useState<PostModel[]>([]);

  const nickname =
    location.pathname === "/me" ? userNickname : nicknameFromParams;

  const getUserData = async () => {
    try {
      dispatch(startLoading());
      const data = await getUserByNickname(nickname!);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser(data.user);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        }),
      );
    } finally {
      dispatch(stopLoading());
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
        }),
      );
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        }),
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
        }),
      );
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === id) {
            return { ...post, content };
          }
          return post;
        }),
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        }),
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const getUserPostsData = async () => {
    try {
      const data = await getUserPosts(user!.id);
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
        }),
      );
    }
  };

  const navigateToSettingsPage = () => {
    navigate("/me/settings/data");
  };

  useEffect(() => {
    if (nickname) {
      getUserData();
    }
  }, [nickname]);

  useEffect(() => {
    if (user) {
      getUserPostsData();
    }
  }, [user]);

  return (
    <div className="mx-auto flex h-full  flex-grow justify-center px-6">
      <div className=" mb-16 h-full w-full  overflow-y-auto py-8">
        <UserHeader user={user} />
        <div className="flex items-center justify-center py-4 ">
          {nickname === userNickname && (
            <div className="flex w-full max-w-2xl items-center">
              <OutlineButton
                size="sm"
                fullWidth
                onClick={navigateToSettingsPage}
              >
                Ustawienia
              </OutlineButton>
            </div>
          )}
        </div>
        <div className="my-6 flex flex-col items-center gap-4">
          {user && userNickname === nickname && (
            <AddPost addPostToList={addPostToList} />
          )}
          {posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              deletePostHandler={deletePostHandler}
              editPostHandler={editPostHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
