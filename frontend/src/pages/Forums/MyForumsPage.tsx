import { useEffect, useState } from "react";

import ForumModel from "../../models/ForumModel";
import ForumSkeleton from "../../components/Forums/ForumSkeleton";
import ForumsLits from "../../components/Forums/ForumsLits";
import NoContent from "../../ui/NoContent";
import { getUserForums } from "../../services/forumService";
import { useAppSelector } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";

const MyForumsPage = () => {
  const { showErrorNotification } = useNotification();
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
      showErrorNotification(error);
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
        <div className="flex w-full max-w-4xl flex-col gap-4">
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
