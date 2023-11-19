import { useAppDispatch, useAppSelector } from "../store/store";
import { useLocation, useSearchParams } from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { addMessageNotification } from "../store/features/socketSlice";
import { addNotification } from "../store/features/socketSlice";
import { getAllChats } from "../services/chatService";
import handleError from "../services/errorHandler";
import { setChats } from "../store/features/socketSlice";
import { useSubscription } from "react-stomp-hooks";

const AppLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading.loading);

  const [searchParams] = useSearchParams();
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
  useSubscription(
    `/user/${Number(user.userId)}/queue/notifications`,
    (message) => {
      const body = JSON.parse(message.body);
      dispatch(addNotification(body));

      if (body.type === "INVITATION_ACCEPTED") {
        fetchAllChats();
      }
    }
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
      })
    );
  });

  return (
    <div className="bg-blue-50 dark:bg-primaryDark min-h-screen  w-full sm:h-screen h-full text-primaryDark overflow-auto ">
      {<Outlet />}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default AppLayout;
