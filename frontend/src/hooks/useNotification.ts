import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";

import handleError from "../services/errorHandler";
import { useAppDispatch } from "../store/store";

const useNotification = () => {
  const dispatch = useAppDispatch();

  const showErrorNotification = (error: unknown) => {
    const newError = handleError(error);
    dispatch(
      addNotification({
        message: newError.message,
        type: NotificationStatus.ERROR,
      }),
    );
  };

  const showSuccessNotification = (message: string) => {
    dispatch(
      addNotification({
        message,
        type: NotificationStatus.SUCCESS,
      }),
    );
  };

  const showInfoNotification = (message: string) => {
    dispatch(
      addNotification({
        message,
        type: NotificationStatus.INFO,
      }),
    );
  };

  return {
    showErrorNotification,
    showSuccessNotification,
    showInfoNotification,
  };
};

export { useNotification };
