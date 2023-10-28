import { FC, useEffect, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import PendingInvitationModel from "../../models/PendingInvitationModel";
import UserModel from "../../models/UserModel";
import { getUserById } from "../../services/userService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface PendingInvitationProps {
  invitation: PendingInvitationModel;
}

const PendingInvitation: FC<PendingInvitationProps> = ({ invitation }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const goToFriedProfile = () => {
    navigate(`/user/${user!.nickname}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-darkPrimary dark:text-blue-50">
      {user && (
        <div
          className="flex items-center justify-between gap-4 w-full 2xl:w-1/2 overflow-y-auto py-4 px-6  rounded-md bg-white dark:bg-primaryDark2 shadow-md"
          key={user.id}
        >
          <div
            className="flex items-center gap-6 cursor-pointer"
            onClick={goToFriedProfile}
          >
            <img
              className="w-12 h-12 rounded-full"
              src={user.imageUrl}
              alt={user.firstName + " " + user.lastName}
            />
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-sm text-gray-500">{user.nickname}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingInvitation;
