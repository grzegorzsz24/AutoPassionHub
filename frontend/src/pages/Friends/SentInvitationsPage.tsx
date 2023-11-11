import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import FriendSkeleton from "../../components/Friends/FriendSkeleton";
import NoContent from "../../ui/NoContent";
import PendingInvitation from "../../components/Friends/PendingInvitation";
import PendingInvitationModel from "../../models/PendingInvitationModel";
import { getSentInvitations } from "../../services/friendService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const SentInvitationsPage = () => {
  const dispatch = useAppDispatch();
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitationModel[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getInvitations = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <div className="text-primaryDark dark:text-blue-50 w-full flex flex-col gap-6 ">
      {isLoading && (
        <>
          <FriendSkeleton />
          <FriendSkeleton />
          <FriendSkeleton />
        </>
      )}
      {!isLoading &&
        pendingInvitations.map((invitation) => {
          return (
            <PendingInvitation key={invitation.id} invitation={invitation} />
          );
        })}
      {!isLoading && pendingInvitations.length === 0 && (
        <NoContent>Brak wysłanych zaproszeń</NoContent>
      )}
    </div>
  );
};

export default SentInvitationsPage;
