// import {
//   NotificationStatus,
//   addNotification,
// } from "../../store/features/notificationSlice";
// import { startLoading, stopLoading } from "../../store/features/loadingSlice";
// import { useEffect, useState } from "react";

// import PendingInvitationModel from "../../models/PendingInvitationModel";
// import UserModel from "../../models/UserModel";
// import { getPendingInvitations } from "../../services/friendsService";
// import handleError from "../../services/errorHandler";
// import { useAppDispatch } from "../../store/store";

// import { getPendingFriends } from "../../services/friendsService";

import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useState } from "react";

import PendingInvitation from "../../components/Friends/PendingInvitation";
import PendingInvitationModel from "../../models/PendingInvitationModel";
import { getSentInvitations } from "../../services/friendsService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const SentInvitationsPage = () => {
  const dispatch = useAppDispatch();
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitationModel[]
  >([]);

  const getInvitations = async () => {
    try {
      dispatch(startLoading());
      const data = await getSentInvitations();
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
    <div className="text-primaryDark dark:text-blue-50 w-full py-4 flex flex-col gap-6 ">
      {pendingInvitations.map((invitation) => {
        return (
          <PendingInvitation key={invitation.id} invitation={invitation} />
        );
      })}
      {pendingInvitations.length === 0 && (
        <h2 className="text-xl">Brak wysłanych zaproszeń</h2>
      )}
    </div>
  );
};

export default SentInvitationsPage;
