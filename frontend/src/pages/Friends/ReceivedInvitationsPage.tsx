import { useEffect, useState } from "react";

import FriendInvitation from "../../components/Friends/FriendInvitation";
import FriendSkeleton from "../../components/Friends/FriendSkeleton";
import NoContent from "../../ui/NoContent";
import PendingInvitationModel from "../../models/PendingInvitationModel";
import { getReceivedInvitations } from "../../services/friendService";
import { useNotification } from "../../hooks/useNotification";

const ReceivedInvitationsPage = () => {
  const { showErrorNotification } = useNotification();
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitationModel[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getInvitations = async () => {
    try {
      setIsLoading(true);
      const data = await getReceivedInvitations();
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

  const removeInvitationFromList = (invitationId: number) => {
    setPendingInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId),
    );
  };

  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <div className="flex w-full flex-col  gap-6 text-primaryDark dark:text-blue-50 ">
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
            <FriendInvitation
              key={invitation.id}
              invitation={invitation}
              removeInvitationFromList={removeInvitationFromList}
            />
          );
        })}
      {!isLoading && pendingInvitations.length === 0 && (
        <NoContent>Brak otrzymanych zaproszeń</NoContent>
      )}
    </div>
  );
};

export default ReceivedInvitationsPage;
