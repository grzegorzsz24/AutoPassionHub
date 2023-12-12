import { useEffect, useState } from "react";

import Forum from "../../components/Forums/Forum";
import ForumModel from "../../models/ForumModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import NoContent from "../../ui/NoContent";
import { getForumById } from "../../services/forumService";
import { useNotification } from "../../hooks/useNotification";
import { useParams } from "react-router-dom";

const ForumPage = () => {
  const { showErrorNotification } = useNotification();
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
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForum();
  }, []);

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div className=" max-w-4xl pb-12">
      {!isLoading && !forum && (
        <NoContent>Forum o podanym Id nie istnieje</NoContent>
      )}
      {forum && <Forum forum={forum} />}
    </div>
  );
};

export default ForumPage;
