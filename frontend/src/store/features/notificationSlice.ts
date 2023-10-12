import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum NotificationStatus {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export interface Notification {
  id: string;
  message: string;
  type: NotificationStatus;
  visible: boolean;
}

export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(
      state,
      action: PayloadAction<{ message: string; type: NotificationStatus }>
    ) {
      const newNotification: Notification = {
        id: new Date().toISOString(),
        message: action.payload.message,
        type: action.payload.type,
        visible: true,
      };
      state.notifications.push(newNotification);
    },
    removeNotification(state, action: PayloadAction<{ id: string }>) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id
      );
    },
    setInvisible(state, action: PayloadAction<{ id: string }>) {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload.id
      );
      if (notification) {
        notification.visible = false;
      }
    },
  },
});

export const { addNotification, removeNotification, setInvisible } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
