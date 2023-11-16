import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SocketState {
  connected: boolean;
  chats: any[];
  onlineUsers: any[];
  currentChat: any;
  messages: any[];
}

const initialState: SocketState = {
  connected: false,
  chats: [],
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
    setChats(state, action: PayloadAction<any[]>) {
      state.chats = action.payload;
    },
    addChat(state, action: PayloadAction<any>) {
      state.chats.push(action.payload);
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
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  setCurrentChat,
  setMessages,
  addMessage,
} = SocketSlice.actions;

export default SocketSlice.reducer;
