import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";

import ForumModel from "../../models/ForumModel";
import ForumsLits from "../../components/Forums/ForumsLits";
import LoadingSpinner from "../../ui/LoadingSpinner";
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

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div>
      <ForumsLits forums={forums} />
      {!isLoading && forums.length === 0 && (
        <p className="text-lg">Brak forów</p>
      )}
    </div>
  );
};

export default MyForumsPage;
