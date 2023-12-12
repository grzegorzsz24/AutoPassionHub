import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import { clearUser } from "../../store/features/userSlice";
import { deleteUserAccount } from "../../services/userService";
import { useAppDispatch } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";

const UserCloseAccountPage = () => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const handleDeleteAccount = async () => {
    try {
      dispatch(startLoading());
      const data = await deleteUserAccount();
      if (data.status !== "ok") throw new Error(data.message);
      dispatch(clearUser());
      showSuccessNotification(data.message);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="mb-6 text-lg font-bold dark:text-blue-50">
        Zamknij konto
      </h2>
      <div className="ml-4">
        <p className="dark:text-blue-50">
          Na pewno chcesz zamknąć swoje konto? Proces ten jest nieodwracalny.
        </p>
        <button
          className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-red-50 shadow-md transition-all hover:bg-red-700"
          onClick={handleDeleteAccount}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default UserCloseAccountPage;
