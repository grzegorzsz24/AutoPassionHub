import { useAppDispatch, useAppSelector } from "../store/store";

import LoadingSpinner from "../ui/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { addNotification } from "../store/features/socketSlice";
import { useSubscription } from "react-stomp-hooks";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading.loading);
  useSubscription(
    `/user/${Number(user.userId)}/queue/notifications`,
    (message) => {
      dispatch(addNotification(JSON.parse(message.body)));
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
