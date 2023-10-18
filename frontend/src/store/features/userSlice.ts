import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  nickname: string;
  imageUrl: string;
  cookieExpirationDate: string;
}

const initialState: UserState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  nickname: "",
  imageUrl: "",
  cookieExpirationDate: "1970-01-01",
};

if (localStorage.getItem("MotoSplotUser")) {
  const user = JSON.parse(localStorage.getItem("MotoSplotUser") || "");
  initialState.userId = user.userId;
  initialState.firstName = user.fistsName;
  initialState.lastName = user.lastName;
  initialState.email = user.email;
  initialState.nickname = user.nickname;
  initialState.imageUrl = user.imageUrl;
  initialState.cookieExpirationDate = user.cookieExpirationDate;
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.imageUrl = action.payload.imageUrl;
      state.cookieExpirationDate = action.payload.cookieExpirationDate;
      localStorage.setItem("MotoSplotUser", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.userId = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.nickname = "";
      state.imageUrl = "";
      state.cookieExpirationDate = "1970-01-01";
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
