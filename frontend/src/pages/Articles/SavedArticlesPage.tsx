import { useEffect, useState } from "react";

import ArticleList from "../../components/Articles/ArticleList";
import ArticleModel from "../../models/ArticleModel";
import ArticleSkeleton from "../../components/Articles/ArticleSkeleton";
import NoContent from "../../ui/NoContent";
import { getSavedArticles } from "../../services/articleService";
import { useNotification } from "../../hooks/useNotification";

const ARTICLES_PER_PAGE = 100;

const SavedArticlesPage = () => {
  const { showErrorNotification } = useNotification();
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
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex h-full max-w-4xl flex-col justify-between">
      {!isLoading && articles.length === 0 && (
        <NoContent>Brak zapisanych artykułów</NoContent>
      )}
      {isLoading ? (
        <div className="flex max-w-4xl flex-col gap-4">
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
