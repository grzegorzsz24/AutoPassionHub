import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";

import handleError from "../services/errorHandler";
import { useAppDispatch } from "../store/store";

const useErrorNotification = () => {
  const dispatch = useAppDispatch();

  const showErrorNotification = (error: unknown) => {
    const newError = handleError(error);
    dispatch(
      addNotification({
        message: newError.message,
        type: NotificationStatus.ERROR,
      })
    );
  };

  return { showErrorNotification };
};

export { useErrorNotification };
