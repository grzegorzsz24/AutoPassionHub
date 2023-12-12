import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import { FC } from "react";
import PrimaryButton from "../../ui/PrimaryButton";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import { deleteFriend } from "../../services/friendService";
import { useAppDispatch } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";

interface DeleteFriendElementProps {
  user: UserModel;
  deleteUserFromList: (userId: number) => void;
}

const DeleteFriendElement: FC<DeleteFriendElementProps> = ({
  user,
  deleteUserFromList,
}) => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const addFriend = async () => {
    try {
      dispatch(startLoading());
      const data = await deleteFriend(user.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
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
        Usuń
      </PrimaryButton>
    </div>
  );
};

export default DeleteFriendElement;
