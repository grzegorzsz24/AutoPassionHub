import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import ChatModel from "../../models/ChatModel";
import NotificationModel from "../../models/NotificationModel";

export interface SocketState {
  connected: boolean;
  chats: ChatModel[];
  notifications: NotificationModel[];
  onlineUsers: any[];
  currentChat: any;
  messages: any[];
}

const initialState: SocketState = {
  connected: false,
  chats: [],
  notifications: [],
  onlineUsers: [],
  currentChat: {},
  messages: [],
};

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    setChats(state, action: PayloadAction<ChatModel[]>) {
      state.chats = action.payload;
    },
    addChat(state, action: PayloadAction<ChatModel>) {
      state.chats.push(action.payload);
    },
    setNotifications(state, action: PayloadAction<NotificationModel[]>) {
      state.notifications = action.payload;
    },
    addNotification(state, action: PayloadAction<NotificationModel>) {
      state.notifications = [action.payload, ...state.notifications];
    },
    changeNotificationStatusAsRead(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.map((notification) =>
        notification.notificationId === action.payload
          ? { ...notification, read: true }
          : notification
      );
    },
    setOnlineUsers(state, action: PayloadAction<any[]>) {
      state.onlineUsers = action.payload;
    },
    addOnlineUser(state, action: PayloadAction<any>) {
      state.onlineUsers.push(action.payload);
    },
    removeOnlineUser(state, action: PayloadAction<string>) {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user.userId !== action.payload
      );
    },
    setCurrentChat(state, action: PayloadAction<any>) {
      state.currentChat = action.payload;
      state.messages = [];
    },
    setMessages(state, action: PayloadAction<any[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<any>) {
      state.messages.push(action.payload);
    },
  },
});

export const {
  setConnected,
  setChats,
  addChat,
  setNotifications,
  addNotification,
  changeNotificationStatusAsRead,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  setCurrentChat,
  setMessages,
  addMessage,
} = SocketSlice.actions;

export default SocketSlice.reducer;
