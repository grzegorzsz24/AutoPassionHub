import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import ArticleList from "../../components/Articles/ArticleList";
import ArticleModel from "../../models/ArticleModel";
import ArticleSkeleton from "../../components/Articles/ArticleSkeleton";
import NoContent from "../../ui/NoContent";
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

  return (
    <div className="max-w-4xl h-full flex flex-col justify-between">
      {!isLoading && articles.length === 0 && (
        <NoContent>Brak zapisanych artykułów</NoContent>
      )}
      {isLoading ? (
        <div className="flex flex-col gap-4 max-w-4xl">
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
        </div>
      ) : (
        <ArticleList articles={articles} />
      )}
    </div>
  );
};

export default SavedArticlesPage;
