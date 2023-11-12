import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";

import ForumModel from "../../models/ForumModel";
import ForumSkeleton from "../../components/Forums/ForumSkeleton";
import ForumsLits from "../../components/Forums/ForumsLits";
import NoContent from "../../ui/NoContent";
import { getUserForums } from "../../services/forumService";
import handleError from "../../services/errorHandler";

const MyForumsPage = () => {
  const dispatch = useAppDispatch();
  const { nickname } = useAppSelector((state) => state.user);
  const [forums, setForums] = useState<ForumModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyForums = async () => {
    try {
      const data = await getUserForums(nickname);
      if (data.status !== "ok") throw new Error(data.message);
      console.log(data.data);
      setForums(data.data);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyForums();
  }, []);

  return (
    <div>
      {!isLoading && forums.length === 0 && <NoContent>Brak forów</NoContent>}
      {isLoading && (
        <div className="flex flex-col gap-4 w-full max-w-4xl">
          <ForumSkeleton />
          <ForumSkeleton />
          <ForumSkeleton />
        </div>
      )}
      <ForumsLits forums={forums} />
    </div>
  );
};

export default MyForumsPage;
