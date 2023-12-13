type NotificationType =
  | "POST_LIKE"
  | "POST_COMMENT"
  | "ARTICLE_LIKE"
  | "FORUM_COMMENT"
  | "INVITATION_SENT"
  | "INVITATION_ACCEPTED"
  | "POST_REPORT"
  | "FORUM_REPORT"
  | "EVENT_REPORT"
  | "ARTICLE_APPROVED"
  | "ARTICLE_DELETED";

interface NotificationModel {
  notificationId: number;
  userTriggeredId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  type: NotificationType;
  entityId: number;
  read: boolean;
}

export default NotificationModel;
