import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import { clearUser } from "../../store/features/userSlice";
import { deleteUserAccount } from "../../services/userService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const UserCloseAccountPage = () => {
  const dispatch = useAppDispatch();

  const handleDeleteAccount = async () => {
    try {
      dispatch(startLoading());
      const data = await deleteUserAccount();
      if (data.status !== "ok") throw new Error(data.message);
      dispatch(clearUser());

      dispatch(
        addNotification({
          message: data.message,
          type: NotificationStatus.SUCCESS,
        })
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="font-bold text-lg mb-6 dark:text-blue-50">
        Zamknij konto
      </h2>
      <div className="ml-4">
        <p className="dark:text-blue-50">
          Na pewno chcesz zamknąć swoje konto? Proces ten jest nieodwracalny.
        </p>
        <button
          className="bg-red-600 rounded-md text-red-50 font-semibold shadow-md hover:bg-red-700 transition-all py-2 px-4 mt-4 w-full"
          onClick={handleDeleteAccount}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default UserCloseAccountPage;
