import { useEffect, useState } from "react";

import FriendSkeleton from "../../components/Friends/FriendSkeleton";
import NoContent from "../../ui/NoContent";
import PendingInvitation from "../../components/Friends/PendingInvitation";
import PendingInvitationModel from "../../models/PendingInvitationModel";
import { getSentInvitations } from "../../services/friendService";
import { useNotification } from "../../hooks/useNotification";

const SentInvitationsPage = () => {
  const { showErrorNotification } = useNotification();
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
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6 text-primaryDark dark:text-blue-50 ">
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
