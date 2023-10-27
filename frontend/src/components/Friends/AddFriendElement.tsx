import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import { FC } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import UserModel from "../../models/UserModel";
import handleError from "../../services/errorHandler";
import { sendFriendRequest } from "../../services/friendsService";
import { useAppDispatch } from "../../store/store";

interface AddFriendElementProps {
  user: UserModel;
}

const AddFriendElement: FC<AddFriendElementProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const addFriend = async () => {
    try {
      dispatch(startLoading());
      const data = await sendFriendRequest(user.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      dispatch(
        addNotification({
          message: data.message,
          type: NotificationStatus.SUCCESS,
        })
      );
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
    <div className="flex items-center justify-between gap-4 w-full 2xl:w-1/2 overflow-y-auto py-4 px-6  rounded-md bg-white dark:bg-primaryDark2 shadow-md">
      <div className="flex items-center gap-6 ">
        <img
          className="w-12 h-12 rounded-full"
          //   src={user.photo}
          alt={user.firstName + " " + user.lastName}
        />
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-sm text-gray-500">{user.nickname}</span>
        </div>
      </div>
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
