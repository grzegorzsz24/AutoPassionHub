interface NotificationMessageModel {
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
  channelId: number;
  read: boolean;
}

export default NotificationMessageModel;
