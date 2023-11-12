import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import ForumModel from "../../models/ForumModel";
import ForumSkeleton from "../../components/Forums/ForumSkeleton";
import ForumsLits from "../../components/Forums/ForumsLits";
import NoContent from "../../ui/NoContent";
import { getSavedForums } from "../../services/forumService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const FORUMS_PER_PAGE = 100;
const SavedForumsPage = () => {
  const reduxDispatch = useAppDispatch();
  const [forums, setForums] = useState<ForumModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchForums = async () => {
    try {
      setIsLoading(true);
      const data = await getSavedForums(1, FORUMS_PER_PAGE);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setForums(data.data);
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
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

  return (
    <div className="max-w-4xl h-full flex flex-col justify-between">
      {isLoading && (
        <div className="flex flex-col gap-4 max-w-4xl">
          <ForumSkeleton />
          <ForumSkeleton />
          <ForumSkeleton />
        </div>
      )}
      {!isLoading && forums.length === 0 && (
        <NoContent>Brak zapisanych forów</NoContent>
      )}
      {!isLoading && forums.length > 0 && <ForumsLits forums={forums} />}
    </div>
  );
};

export default SavedForumsPage;
