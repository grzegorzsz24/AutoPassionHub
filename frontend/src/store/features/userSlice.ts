import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  fistsName: string;
  lastName: string;
  email: string;
  nickname: string;
  photoUrl: string;
  cookieExpirationDate: Date;
}

const initialState: UserState = {
  userId: "",
  fistsName: "",
  lastName: "",
  email: "",
  nickname: "",
  photoUrl: "",
  cookieExpirationDate: new Date("1970-01-01"),
};

if (localStorage.getItem("MotoSplotUser")) {
  const user = JSON.parse(localStorage.getItem("MotoSplotUser") || "");
  initialState.userId = user.userId;
  initialState.fistsName = user.fistsName;
  initialState.lastName = user.lastName;
  initialState.email = user.email;
  initialState.nickname = user.nickname;
  initialState.photoUrl = user.photoUrl;
  initialState.cookieExpirationDate = new Date(user.cookieExpirationDate);
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.fistsName = action.payload.fistsName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.photoUrl = action.payload.photoUrl;
      state.cookieExpirationDate = action.payload.cookieExpirationDate;
      localStorage.setItem("MotoSplotUser", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.userId = "";
      state.fistsName = "";
      state.lastName = "";
      state.email = "";
      state.nickname = "";
      state.photoUrl = "";
      state.cookieExpirationDate = new Date("1970-01-01");
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
