import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserRole = "USER" | "ADMIN";

export interface UserState {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  nickname: string;
  imageUrl: string;
  cookieExpirationDate: string;
  publicProfile: boolean;
  role: UserRole;
}

const initialState: UserState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  nickname: "",
  imageUrl: "",
  cookieExpirationDate: "1970-01-01",
  publicProfile: false,
  role: "USER",
};

if (localStorage.getItem("MotoSplotUser")) {
  const user = JSON.parse(localStorage.getItem("MotoSplotUser") || "");
  initialState.userId = user.userId;
  initialState.firstName = user.firstName;
  initialState.lastName = user.lastName;
  initialState.email = user.email;
  initialState.nickname = user.nickname;
  initialState.imageUrl = user.imageUrl;
  initialState.cookieExpirationDate = user.cookieExpirationDate;
  initialState.publicProfile = user.publicProfile;
  initialState.role = user.role;
}

const clearLocalStorage = () => {
  localStorage.removeItem("MotoSplotUser");
};

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
      state.publicProfile = action.payload.publicProfile;
      state.role = action.payload.role;
      localStorage.setItem("MotoSplotUser", JSON.stringify(action.payload));
    },
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      if (action.payload.firstName !== undefined) {
        state.firstName = action.payload.firstName;
      }

      if (action.payload.lastName !== undefined) {
        state.lastName = action.payload.lastName;
      }

      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }

      if (action.payload.nickname !== undefined) {
        state.nickname = action.payload.nickname;
      }

      if (action.payload.imageUrl !== undefined) {
        state.imageUrl = action.payload.imageUrl;
      }

      localStorage.setItem("MotoSplotUser", JSON.stringify(state));
    },
    clearUser(state) {
      state.userId = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.nickname = "";
      state.imageUrl = "";
      state.cookieExpirationDate = "1970-01-01";
      state.publicProfile = false;
      state.role = "USER";
      clearLocalStorage();
    },
    updateUserImage(state, action: PayloadAction<string>) {
      state.imageUrl = action.payload;
      localStorage.setItem("MotoSplotUser", JSON.stringify(state));
    },
    updateUserPrivacy(state, action: PayloadAction<boolean>) {
      state.publicProfile = action.payload;
      localStorage.setItem("MotoSplotUser", JSON.stringify(state));
    },
  },
});

export const {
  setUser,
  clearUser,
  updateUser,
  updateUserImage,
  updateUserPrivacy,
} = UserSlice.actions;
export default UserSlice.reducer;
