import { FC, useEffect, useState } from "react";
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
import { setChats } from "../../store/features/socketSlice";
import { useNotification } from "../../hooks/useNotification";
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
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);

  const [user, setUser] = useState<UserModel>();

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
      showSuccessNotification(data.message);
      removeInvitationFromList(invitation.id);
    } catch (error) {
      showErrorNotification(error);
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
      showSuccessNotification(data.message);
      removeInvitationFromList(invitation.id);
    } catch (error) {
      showErrorNotification(error);
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
      showErrorNotification(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-darkPrimary dark:text-blue-50">
      {user && (
        <div
          className="flex w-full flex-col items-center justify-between gap-2 overflow-y-auto bg-white px-4 py-2 shadow-md dark:bg-primaryDark2 sm:flex-row sm:gap-4  sm:rounded-md sm:px-6 sm:py-4 2xl:w-2/3"
          key={user.id}
        >
          <UserProfile
            size="medium"
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
