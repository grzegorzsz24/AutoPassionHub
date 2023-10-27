import { FC } from "react";
import PendingInvitationModel from "../../models/PendingInvitationModel";

// import UserModel from "../../models/UserModel";

interface PendingInvitationProps {
  invitation: PendingInvitationModel;
}

const FriendInvitation: FC<PendingInvitationProps> = ({ invitation }) => {
  //   const [user, setUser] = useState<UserModel>();

  //   const getUser = async () => {};

  return (
    <div className="text-darkPrimary dark:text-blue-50">
      {invitation.receiver} {invitation.sender}
    </div>
  );
};

export default FriendInvitation;
