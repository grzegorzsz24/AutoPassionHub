interface MessageModel {
  channelId: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
}

export default MessageModel;
