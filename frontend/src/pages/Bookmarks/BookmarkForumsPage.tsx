import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import ForumModel from "../../models/ForumModel";
import ForumsLits from "../../components/Forums/ForumsLits";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getSavedForums } from "../../services/forumService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const BookmarkForumsPage = () => {
  const dispatch = useAppDispatch();
  const [forums, setForums] = useState<ForumModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchForums = async () => {
    try {
      setIsLoading(true);
      const data = await getSavedForums(1, 100);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setForums(data.data);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div>
      {!isLoading && forums.length === 0 && <p>Brak zapisanych forów</p>}
      {!isLoading && forums.length > 0 && <ForumsLits forums={forums} />}
    </div>
  );
};

export default BookmarkForumsPage;
