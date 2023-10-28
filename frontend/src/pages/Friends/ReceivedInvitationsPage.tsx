import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useEffect, useState } from "react";

import FriendInvitation from "../../components/Friends/FriendInvitation";
import PendingInvitationModel from "../../models/PendingInvitationModel";
import { getReceivedInvitations } from "../../services/friendsService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const ReceivedInvitationsPage = () => {
  const dispatch = useAppDispatch();
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitationModel[]
  >([]);

  const getInvitations = async () => {
    try {
      dispatch(startLoading());
      const data = await getReceivedInvitations();
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

  const removeInvitationFromList = (invitationId: number) => {
    setPendingInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId)
    );
  };

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <div className="text-primaryDark dark:text-blue-50 w-full py-4 flex flex-col gap-6 ">
      {pendingInvitations.map((invitation) => {
        return (
          <FriendInvitation
            key={invitation.id}
            invitation={invitation}
            removeInvitationFromList={removeInvitationFromList}
          />
        );
      })}
      {pendingInvitations.length === 0 && (
        <h2 className="text-xl">Brak zaproszeń od innych użytkowników</h2>
      )}
    </div>
  );
};

export default ReceivedInvitationsPage;