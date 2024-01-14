import { FC } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import UserWithRelationshipStatusModel from "../models/UserWithRelationshipStatusModel";
import { useAppSelector } from "../store/store";

interface FriendshipActionsProps {
  nickname: string | undefined;
  user: UserWithRelationshipStatusModel | null;
  sendInvitation: () => void;
  acceptInvitation: () => void;
  rejectInvitation: () => void;
}

const FriendshipActions: FC<FriendshipActionsProps> = ({
  nickname,
  user,
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
}) => {
  const { nickname: userNickname } = useAppSelector((state) => state.user);

  if (!nickname || !user || nickname === userNickname) {
    return null;
  }

  return (
    <div className=" flex rounded-md bg-blue-900 px-6 py-2 text-sm text-white">
      <div className="mx-auto text-center">
        {user.status === "FRIENDS" && <p>Znajomy</p>}
        {user.status === "INVITATION_SENT" && (
          <p>Wysłano zaproszenie - oczekiwanie na odpowiedź</p>
        )}
        {user.status === "INVITATION_RECEIVED" && (
          <div>
            <p>Otrzymano zaproszenie do grona znajomych</p>
            <div className="mt-2 flex items-center justify-center gap-4 text-center">
              <PrimaryButton onClick={acceptInvitation} color="green">
                Akceptuj
              </PrimaryButton>
              <PrimaryButton onClick={rejectInvitation} color="red">
                Odrzuć
              </PrimaryButton>
            </div>
          </div>
        )}
        {user.status === "NOT_FRIENDS" && (
          <PrimaryButton onClick={sendInvitation} color="green">
            Dodaj do znajomych
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default FriendshipActions;
