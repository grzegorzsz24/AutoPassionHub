import LoadingSpinner from "../ui/LoadingSpinner";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

const AppLayout = () => {
  const isLoading = useAppSelector((state) => state.loading.loading);

  return (
    <div className="bg-blue-50 dark:bg-primaryDark h-screen w-full">
      {<Outlet />}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default AppLayout;
