import {
  addMessageNotification,
  addNotification,
  setChats,
} from "../store/features/socketSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useLocation, useSearchParams } from "react-router-dom";

import { getAllChats } from "../services/chatService";
import { useNotification } from "./useNotification";
import { useSubscription } from "react-stomp-hooks";

const useAppSocketSubscription = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { showErrorNotification } = useNotification();
  const user = useAppSelector((state) => state.user);

  const fetchAllChats = async () => {
    try {
      const response = await getAllChats();
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(setChats(response.data));
    } catch (error) {
      showErrorNotification(error);
    }
  };

  useSubscription(
    `/user/${Number(user.userId)}/queue/notifications`,
    (message) => {
      const body = JSON.parse(message.body);
      dispatch(addNotification(body));

      if (body.type === "INVITATION_ACCEPTED") {
        fetchAllChats();
      }
    },
  );

  useSubscription(`/user/${user.userId}/queue/messages`, (message) => {
    const body = JSON.parse(message.body);
    const currentUrl = location.pathname;
    const chatId = searchParams.get("chat");
    if (
      currentUrl.includes("chat") &&
      Number(chatId) === Number(body.channelId)
    ) {
      return;
    }
    dispatch(
      addMessageNotification({
        ...body,
        read: false,
      }),
    );
  });

  useSubscription(
    `/user/${user.userId}/queue/admin/notifications`,
    (message) => {
      const body = JSON.parse(message.body);
      dispatch(addNotification(body));
    },
  );
};

export { useAppSocketSubscription };
