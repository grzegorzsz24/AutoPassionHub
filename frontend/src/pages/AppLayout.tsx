import LoadingSpinner from "../ui/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useAppSocketSubscription } from "../hooks/useAppSocket";

const AppLayout = () => {
  const isLoading = useAppSelector((state) => state.loading.loading);
  useAppSocketSubscription();

  return (
    <div className="h-full min-h-screen w-full overflow-auto bg-blue-50 text-primaryDark dark:bg-primaryDark sm:h-screen">
      <Outlet />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default AppLayout;
