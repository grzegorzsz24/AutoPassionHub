import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";
import { startLoading, stopLoading } from "../store/features/loadingSlice";
import { useEffect, useState } from "react";

import Post from "../components/Posts/Post";
import PostModel from "../models/PostModel";
import UserHeader from "../components/UserHeader";
import UserModel from "../models/UserModel";
import { deletePost } from "../services/postService";
import { getUserByNickname } from "../services/userService";
import { getUserPosts } from "../services/postService";
import handleError from "../services/errorHandler";
import { useAppDispatch } from "../store/store";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { nickname } = useParams();
  const [user, setUser] = useState<UserModel | null>(null);
  const [posts, setPosts] = useState<PostModel[]>([]);

  const getUserData = async () => {
    try {
      dispatch(startLoading());
      const data = await getUserByNickname(nickname!);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser(data.user);
      console.log(data.user);
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
        })
      );
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
    <div className=" px-6 py-8 overflow-y-auto h-full flex-grow">
      <UserHeader user={user} />
      <div className="flex flex-col gap-4 items-center my-6">
        {posts.map((post) => (
          <Post key={post.id} {...post} deletePostHandler={deletePostHandler} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
