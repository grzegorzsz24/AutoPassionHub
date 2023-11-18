interface NotificationModel {
  notificationId: number;
  userTriggeredId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  type: string;
  entityId: number;
  read: boolean;
}

export default NotificationModel;
