import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import Forum from "../../components/Forums/Forum";
import ForumModel from "../../models/ForumModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getForumById } from "../../services/forumService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

const ForumPage = () => {
  const dispatch = useAppDispatch();
  const { forum: forumID } = useParams<{ forum: string }>();
  const [forum, setForum] = useState<ForumModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getForum = async () => {
    try {
      setIsLoading(true);
      const data = await getForumById(Number(forumID));
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setForum(data.data);
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
    getForum();
  }, []);

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div className=" max-w-4xl pb-12">{forum && <Forum forum={forum} />}</div>
  );
};

export default ForumPage;
