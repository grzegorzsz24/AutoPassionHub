import { useEffect, useState } from "react";

import Article from "../../components/Articles/Article";
import ArticleModel from "../../models/ArticleModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import NoContent from "../../ui/NoContent";
import { getArticleById } from "../../services/articleService";
import { useNotification } from "../../hooks/useNotification";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { showErrorNotification } = useNotification();
  const { article: articleID } = useParams<{ article: string }>();
  const [article, setArticle] = useState<ArticleModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getArticle = async () => {
    try {
      setIsLoading(true);
      const data = await getArticleById(Number(articleID));
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setArticle(data.data);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div className=" max-w-4xl pb-12">
      {!isLoading && !article && (
        <NoContent>Artykuł o podanym ID nie istnieje</NoContent>
      )}
      {article && <Article article={article} />}
    </div>
  );
};

export default ArticlePage;
