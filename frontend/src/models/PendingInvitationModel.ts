interface PendingInvitationModel {
  id: number;
  receiver: number;
  sender: number;
  status: string;
}

export default PendingInvitationModel;
