import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { FC } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import { sendFriendRequest } from "../../services/friendService";
import { useNotification } from "../../hooks/useNotification";
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
  const { showSuccessNotification, showErrorNotification } = useNotification();
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
      showSuccessNotification(data.message);
      deleteUserFromList(user.id);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 overflow-y-auto bg-white px-4 py-2 shadow-md dark:bg-primaryDark2 sm:gap-4  sm:rounded-md sm:px-6 sm:py-4 2xl:w-2/3">
      <UserProfile
        size="medium"
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
