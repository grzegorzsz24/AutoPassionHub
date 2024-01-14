import UserModel from "./UserModel";

export type RelationshipStatus =
  | "FRIENDS"
  | "INVITATION_SENT"
  | "INVITATION_RECEIVED"
  | "NOT_FRIENDS";

interface UserWithRelationshipStatusModel extends UserModel {
  status: RelationshipStatus;
  invitationId: number;
}

export default UserWithRelationshipStatusModel;
