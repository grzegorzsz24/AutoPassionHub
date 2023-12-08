import { FC, useEffect, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import PendingInvitationModel from "../../models/PendingInvitationModel";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import { getUserById } from "../../services/userService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

interface PendingInvitationProps {
  invitation: PendingInvitationModel;
}

const PendingInvitation: FC<PendingInvitationProps> = ({ invitation }) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserModel>();

  const getUser = async () => {
    try {
      const data = await getUserById(invitation.receiver);
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
          className="flex items-center justify-between gap-2 sm:gap-4 w-full 2xl:w-2/3 overflow-y-auto py-2 sm:py-4 px-4 sm:px-6  sm:rounded-md bg-white dark:bg-primaryDark2 shadow-md"
          key={user.id}
        >
          <UserProfile
            size="medium"
            imageUrl={user.imageUrl}
            firstName={user.firstName}
            lastName={user.lastName}
            nickname={user.nickname}
          />
        </div>
      )}
    </div>
  );
};

export default PendingInvitation;
