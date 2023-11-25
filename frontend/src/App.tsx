import {
  setChats,
  setConnected,
  setNotifications,
} from "./store/features/socketSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

import Notification from "./ui/Notification";
import { RouterProvider } from "react-router-dom";
import { StompSessionProvider } from "react-stomp-hooks";
import { getAllChats } from "./services/chatService";
import { getNotifications } from "./services/notificationService";
import handleError from "./services/errorHandler";
import router from "./router/routerConfig";
import { useEffect } from "react";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string;

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const fetchAllChats = async () => {
    try {
      const response = await getAllChats();
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(setChats(response.data));
    } catch (error) {
      handleError(error);
    }
  };

  const fetchAllNotifications = async () => {
    try {
      const response = await getNotifications();
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(setNotifications(response.notifications));
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!user.userId) return;
    fetchAllNotifications();
  }, [user]);

  useEffect(() => {
    if (!user.userId) return;
    fetchAllChats();
  }, [user]);

  return (
    <>
      <StompSessionProvider
        url={SOCKET_URL}
        onConnect={() => {
          dispatch(setConnected(true));
          console.log("🟢 Połączono z socketem");
        }}
        onDisconnect={() => {
          dispatch(setConnected(false));
          console.log("🔴 Rozłączono z socketem");
        }}
      >
        <RouterProvider router={router}></RouterProvider>
        <Notification />
      </StompSessionProvider>
    </>
  );
}

export default App;
