import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useState } from "react";

import FriendInvitation from "../../components/Friends/FriendInvitation";
import PendingInvitationModel from "../../models/PendingInvitationModel";
import { getPendingInvitations } from "../../services/friendsService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const UserFriendsInvitationsPage = () => {
  const dispatch = useAppDispatch();
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitationModel[]
  >([]);

  const getInvitations = async () => {
    try {
      dispatch(startLoading());
      const data = await getPendingInvitations();
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setPendingInvitations(data.invitations);
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

  useEffect(() => {
    getInvitations();
  }, []);
  return (
    <div>
      {pendingInvitations.map((invitation) => {
        return <FriendInvitation key={invitation.id} invitation={invitation} />;
      })}
    </div>
  );
};

export default UserFriendsInvitationsPage;
