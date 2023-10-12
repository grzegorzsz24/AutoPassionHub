import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import LoadingReducer from "./features/loadingSlice";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    loading: LoadingReducer,
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
