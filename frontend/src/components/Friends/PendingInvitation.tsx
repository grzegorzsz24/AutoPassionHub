import { FC, useEffect, useState } from "react";

import PendingInvitationModel from "../../models/PendingInvitationModel";
import UserModel from "../../models/UserModel";
import UserProfile from "../../ui/UserProfile";
import { getUserById } from "../../services/userService";
import { useNotification } from "../../hooks/useNotification";

interface PendingInvitationProps {
  invitation: PendingInvitationModel;
}

const PendingInvitation: FC<PendingInvitationProps> = ({ invitation }) => {
  const { showErrorNotification } = useNotification();
  const [user, setUser] = useState<UserModel>();

  const getUser = async () => {
    try {
      const data = await getUserById(invitation.receiver);
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
          className="flex w-full items-center justify-between gap-2 overflow-y-auto bg-white px-4 py-2 shadow-md dark:bg-primaryDark2 sm:gap-4  sm:rounded-md sm:px-6 sm:py-4 2xl:w-2/3"
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
