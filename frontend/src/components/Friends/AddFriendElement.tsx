import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { FC } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import handleError from "../../services/errorHandler";
import { sendFriendRequest } from "../../services/friendService";
import { useStompClient } from "react-stomp-hooks";

interface AddFriendElementProps {
  user: UserModel;
  deleteUserFromList: (id: number) => void;
}

const AddFriendElement: FC<AddFriendElementProps> = ({
  user,
  deleteUserFromList,
}) => {
  const stompClient = useStompClient();
  const dispatch = useAppDispatch();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);

  const addFriend = async () => {
    try {
      dispatch(startLoading());
      const data = await sendFriendRequest(user.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
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
      dispatch(
        addNotification({
          message: data.message,
          type: NotificationStatus.SUCCESS,
        })
      );
      deleteUserFromList(user.id);
    } catch (err) {
      const newError = handleError(err);
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

  return (
    <div className="flex items-center justify-between gap-4 w-full 2xl:w-2/3 overflow-y-auto py-4 px-6  rounded-md bg-white dark:bg-primaryDark2 shadow-md">
      <UserProfile
        size="large"
        imageUrl={user.imageUrl}
        firstName={user.firstName}
        lastName={user.lastName}
        nickname={user.nickname}
      />

      <PrimaryButton
        size="md"
        onClick={() => {
          addFriend();
        }}
      >
        Dodaj
      </PrimaryButton>
    </div>
  );
};

export default AddFriendElement;
