import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import LoadingReducer from "./features/loadingSlice";
import NotificationReducer from "./features/notificationSlice";
import SocketReducer from "./features/socketSlice";
import ThemeReducer from "./features/themeSlice";
import UserReducer from "./features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    loading: LoadingReducer,
    notification: NotificationReducer,
    user: UserReducer,
    socket: SocketReducer,
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
