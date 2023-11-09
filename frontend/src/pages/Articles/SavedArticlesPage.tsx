import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import ArticleList from "../../components/Articles/ArticleList";
import ArticleModel from "../../models/ArticleModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getSavedArticles } from "../../services/articleService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const ARTICLES_PER_PAGE = 100;

const SavedArticlesPage = () => {
  const reduxDispatch = useAppDispatch();
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const data = await getSavedArticles(1, ARTICLES_PER_PAGE);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setArticles(data.data);
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
    fetchArticles();
  }, []);

  if (isLoading) {
    return <LoadingSpinner small />;
  }

  return (
    <div className="max-w-4xl h-full flex flex-col justify-between">
      {!isLoading && articles.length === 0 && <p>Brak zapisanych forow</p>}
      {!isLoading && articles.length > 0 && <ArticleList articles={articles} />}
    </div>
  );
};

export default SavedArticlesPage;
