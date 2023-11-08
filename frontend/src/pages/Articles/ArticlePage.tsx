import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import Article from "../../components/Articles/Article";
import ArticleModel from "../../models/ArticleModel";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getArticleById } from "../../services/articleService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const dispatch = useAppDispatch();
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
      console.log(data.data);
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
    getArticle();
  }, []);

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div className=" max-w-4xl pb-12">
      {article && <Article article={article} />}
    </div>
  );
};

export default ArticlePage;
