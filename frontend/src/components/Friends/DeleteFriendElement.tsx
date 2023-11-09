import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import { FC } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import { deleteFriend } from "../../services/friendService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

interface DeleteFriendElementProps {
  user: UserModel;
  deleteUserFromList: (userId: number) => void;
}

const DeleteFriendElement: FC<DeleteFriendElementProps> = ({
  user,
  deleteUserFromList,
}) => {
  const dispatch = useAppDispatch();

  const addFriend = async () => {
    try {
      dispatch(startLoading());
      const data = await deleteFriend(user.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
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
        Usuń
      </PrimaryButton>
    </div>
  );
};

export default DeleteFriendElement;
