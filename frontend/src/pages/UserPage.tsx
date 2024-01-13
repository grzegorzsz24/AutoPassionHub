import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../services/friendService";
import { deletePost, editPost } from "../services/postService";
import { startLoading, stopLoading } from "../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AddPost from "../components/Posts/AddPost";
import FriendshipActions from "../components/FriendshipActions";
import OutlineButton from "../ui/OutlineButton";
import Post from "../components/Posts/Post";
import PostModel from "../models/PostModel";
import UserHeader from "../components/UserHeader";
import UserWithRelationshipStatusModel from "../models/UserWithRelationshipStatusModel";
import { getAllChats } from "../services/chatService";
import { getUserByNicknameWithStatusOfRelationship } from "../services/userService";
import { getUserPosts } from "../services/postService";
import handleError from "../services/errorHandler";
import { setChats } from "../store/features/socketSlice";
import { useNotification } from "../hooks/useNotification";
import { useStompClient } from "react-stomp-hooks";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const navigate = useNavigate();
  const stompClient = useStompClient();
  const { nickname: userNickname, userId: loggedInUserId } = useAppSelector(
    (state) => state.user,
  );
  const { nickname: nicknameFromParams } = useParams();
  const [user, setUser] = useState<UserWithRelationshipStatusModel | null>(
    null,
  );
  const [posts, setPosts] = useState<PostModel[]>([]);

  const nickname =
    location.pathname === "/me" ? userNickname : nicknameFromParams;

  const getUserData = async () => {
    if (!nickname) return;
    try {
      dispatch(startLoading());
      const data = await getUserByNicknameWithStatusOfRelationship(nickname);
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

  const acceptInvitation = async () => {
    if (!user) return;
    try {
      dispatch(startLoading());
      const data = await acceptFriendRequest(user.invitationId);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser((prev) => ({ ...prev!, status: "FRIENDS" }));
      if (stompClient) {
        stompClient.publish({
          destination: `/app/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: user.id,
            content: "Użytkownik zaakceptował twoje zaproszenie do znajomych",
            type: "INVITATION_ACCEPTED",
            entityId: user.invitationId,
          }),
        });
      }
      fetchAllChats();
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const rejectInvitation = async () => {
    if (!user) return;
    try {
      dispatch(startLoading());
      const data = await rejectFriendRequest(user.invitationId);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser((prev) => ({ ...prev!, status: "NOT_FRIENDS" }));
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const sendInvitation = async () => {
    if (!user) return;
    try {
      dispatch(startLoading());
      const data = await sendFriendRequest(user.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser((prev) => ({ ...prev!, status: "INVITATION_SENT" }));
      if (stompClient) {
        stompClient.publish({
          destination: `/app/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: user.id,
            content: "Użytkownik wysłał ci zaproszenie do znajomych",
            type: "INVITATION_SENT",
            entityId: 0,
          }),
        });
      }
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const fetchAllChats = async () => {
    try {
      const response = await getAllChats();
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(setChats(response.data));
    } catch (error) {
      showErrorNotification(error);
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
        <div className="mx-auto max-w-2xl">
          <FriendshipActions
            nickname={nickname}
            user={user}
            sendInvitation={sendInvitation}
            acceptInvitation={acceptInvitation}
            rejectInvitation={rejectInvitation}
          />
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
