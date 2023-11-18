import { useAppDispatch, useAppSelector } from "../store/store";

import LoadingSpinner from "../ui/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { addNotification } from "../store/features/socketSlice";
import { getAllChats } from "../services/chatService";
import handleError from "../services/errorHandler";
import { setChats } from "../store/features/socketSlice";
import { useSubscription } from "react-stomp-hooks";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading.loading);

  const fetchAllChats = async () => {
    try {
      const response = await getAllChats();
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      console.log(response);
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

  return (
    <div className="bg-blue-50 dark:bg-primaryDark min-h-screen  w-full h-screen text-primaryDark overflow-auto">
      {<Outlet />}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default AppLayout;
