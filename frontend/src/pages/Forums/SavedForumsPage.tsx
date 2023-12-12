import { useEffect, useState } from "react";

import ForumModel from "../../models/ForumModel";
import ForumSkeleton from "../../components/Forums/ForumSkeleton";
import ForumsLits from "../../components/Forums/ForumsLits";
import NoContent from "../../ui/NoContent";
import { getSavedForums } from "../../services/forumService";
import { useNotification } from "../../hooks/useNotification";

const FORUMS_PER_PAGE = 100;
const SavedForumsPage = () => {
  const { showErrorNotification } = useNotification();
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
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  return (
    <div className="flex h-full max-w-4xl flex-col justify-between">
      {isLoading && (
        <div className="flex max-w-4xl flex-col gap-4">
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
