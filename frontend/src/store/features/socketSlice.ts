import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import ChatModel from "../../models/ChatModel";
import NotificationMessageModel from "../../models/NotificationMessageModel";
import NotificationModel from "../../models/NotificationModel";

export interface SocketState {
  connected: boolean;
  chats: ChatModel[];
  notifications: NotificationModel[];
  messageNotifications: NotificationMessageModel[];
}

const initialState: SocketState = {
  connected: false,
  chats: [],
  notifications: [],
  messageNotifications: [],
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
    setMessageNotifications(
      state,
      action: PayloadAction<NotificationMessageModel[]>
    ) {
      state.messageNotifications = action.payload;
    },
    addMessageNotification(
      state,
      action: PayloadAction<NotificationMessageModel>
    ) {
      const notificationExists = state.messageNotifications.find(
        (notification) => notification.channelId === action.payload.channelId
      );
      if (notificationExists) {
        state.messageNotifications = state.messageNotifications.map(
          (notification) =>
            notification.channelId === action.payload.channelId
              ? action.payload
              : notification
        );
        return;
      } else {
        state.messageNotifications = [
          action.payload,
          ...state.messageNotifications,
        ];
      }
    },
    changeMessageNotificationStatusAsRead(
      state,
      action: PayloadAction<number>
    ) {
      state.messageNotifications = state.messageNotifications.map(
        (notification) =>
          notification.channelId === action.payload
            ? { ...notification, read: true }
            : notification
      );
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
  setMessageNotifications,
  addMessageNotification,
  changeMessageNotificationStatusAsRead,
} = SocketSlice.actions;

export default SocketSlice.reducer;
