const ARTICLES_PER_PAGE = import.meta.env.VITE_ARTICLES_PER_PAGE as number;

import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import {
  approveArticle,
  getArticlesWaitingForApproval,
  rejectArticle,
} from "../../services/adminService";
import { useEffect, useReducer, useState } from "react";

import ArticleModel from "../../models/ArticleModel";
import ArticleSkeleton from "../../components/Articles/ArticleSkeleton";
import NoContent from "../../ui/NoContent";
import Pagination from "../../components/Pagination";
import PendingArticleItem from "../../components/Articles/PendingArticleItem";
import articleFilterReducer from "../../reducers/ArticlePaginationReducer";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useSearchParams } from "react-router-dom";

const PendingArticlesPage = () => {
  const reduxDispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [totalNumberOfArticles, setTotalNumberOfArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const setFiltersFromParams = () => {
    return {
      page: getPageFromParams(),
      size: ARTICLES_PER_PAGE,
      title: params.get("title") || "",
    };
  };

  const getPageFromParams = () => {
    let page = Number(params.get("page")) || 1;
    if (page < 1) page = 1;
    return page;
  };

  const [filterState, filterDispatch] = useReducer(
    articleFilterReducer,
    setFiltersFromParams()
  );
  const { page, size } = filterState;

  const buildQueryParams = () => {
    let queryParams = "";
    queryParams += `page=${page}`;
    return queryParams;
  };

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setParams(buildQueryParams());
      const data = await getArticlesWaitingForApproval(page, size);
      if (data.status !== "ok") throw new Error(data.message);
      setArticles(data.data);
      setTotalNumberOfArticles(data.totalNumberOfArticles);
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const aprooveArticleHandler = async (id: number) => {
    try {
      const data = await approveArticle(id);
      if (data.status !== "ok") throw new Error(data.message);
      setArticles((prev) => prev.filter((article) => article.id !== id));
      reduxDispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: "Artykuł został zatwierdzony",
        })
      );
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  const rejectArticleHandler = async (id: number) => {
    try {
      const data = await rejectArticle(id);
      if (data.status !== "ok") throw new Error(data.message);
      setArticles((prev) => prev.filter((article) => article.id !== id));
      reduxDispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: "Artykuł został odrzucony",
        })
      );
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filterState]);

  return (
    <div className="max-w-4xl h-full flex flex-col justify-between">
      <div className="flex flex-col  gap-12">
        {isLoading ? (
          <div className="flex flex-col gap-4 max-w-4xl">
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
          </div>
        ) : (
          <div>
            {articles.map((article) => (
              <PendingArticleItem
                article={article}
                approveArticle={aprooveArticleHandler}
                rejectArticle={rejectArticleHandler}
              />
            ))}
          </div>
        )}
        {!isLoading && articles.length === 0 && (
          <NoContent>Brak artykułów</NoContent>
        )}
      </div>
      {!isLoading && articles.length > 0 && (
        <div className=" flex items-center justify-center my-4">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalNumberOfArticles / size)}
            goToPage={(page: number) =>
              filterDispatch({ type: "SET_PAGE", payload: page })
            }
          />
        </div>
      )}
    </div>
  );
};

export default PendingArticlesPage;