import { FC, useEffect, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../services/friendService";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import PendingInvitationModel from "../../models/PendingInvitationModel";
import PrimaryButton from "../../ui/PrimaryButton";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import { getAllChats } from "../../services/chatService";
import { getUserById } from "../../services/userService";
import handleError from "../../services/errorHandler";
import { setChats } from "../../store/features/socketSlice";
import { useStompClient } from "react-stomp-hooks";

interface PendingInvitationProps {
  invitation: PendingInvitationModel;
  removeInvitationFromList: (invitationId: number) => void;
}

const FriendInvitation: FC<PendingInvitationProps> = ({
  invitation,
  removeInvitationFromList,
}) => {
  const stompClient = useStompClient();
  const dispatch = useAppDispatch();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);

  const [user, setUser] = useState<UserModel>();

  const fetchAllChats = async () => {
    try {
      const response = await getAllChats();
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      console.log(response);
      dispatch(setChats(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  const acceptInvitation = async () => {
    try {
      dispatch(startLoading());
      const data = await acceptFriendRequest(invitation.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (stompClient) {
        stompClient.publish({
          destination: `/app/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: invitation.sender,
            content: "Użytkownik zaakceptował twoje zaproszenie do znajomych",
            type: "INVITATION_ACCEPTED",
            entityId: invitation.id,
          }),
        });
      }
      fetchAllChats();
      dispatch(
        addNotification({
          message: data.message,
          type: NotificationStatus.SUCCESS,
        })
      );
      removeInvitationFromList(invitation.id);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const rejectInvitation = async () => {
    try {
      dispatch(startLoading());
      const data = await rejectFriendRequest(invitation.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      dispatch(
        addNotification({
          message: data.message,
          type: NotificationStatus.SUCCESS,
        })
      );
      removeInvitationFromList(invitation.id);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const getUser = async () => {
    try {
      const data = await getUserById(invitation.sender);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser(data.user);
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-darkPrimary dark:text-blue-50">
      {user && (
        <div
          className="flex items-center justify-between gap-4 w-full 2xl:w-2/3 overflow-y-auto py-4 px-6  rounded-md bg-white dark:bg-primaryDark2 shadow-md"
          key={user.id}
        >
          <UserProfile
            size="large"
            imageUrl={user.imageUrl}
            firstName={user.firstName}
            lastName={user.lastName}
            nickname={user.nickname}
          />

          <div className="flex items-center gap-4">
            <PrimaryButton onClick={acceptInvitation} color="green">
              Akceptuj
            </PrimaryButton>
            <PrimaryButton onClick={rejectInvitation} color="red">
              Odrzuć
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendInvitation;
